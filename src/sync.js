import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { isGithubJob, isWorldPhaseJob } from "./kinds.js";
import { effectiveStatus, listJobs } from "./ledger.js";
import { applyNextFor, defaultPatchesIndexPath, loadPatchIndex, patchForJob, proveAfterApplyCommand } from "./patches.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

export const SYNC_CONTRACT = "agent-ops.sync.v1";

/**
 * @param {string} repoRoot
 */
export function defaultAgentsPath(repoRoot) {
  return join(repoRoot, ".genesis", "last-agents.json");
}

/**
 * @param {unknown} raw
 * @returns {{ bcId: string, name: string, status: string }[]}
 */
export function normalizeAgents(raw) {
  const rows = Array.isArray(raw) ? raw : raw && typeof raw === "object" && Array.isArray(raw.agents) ? raw.agents : null;
  if (!rows) {
    throw new Error("agents must be { agents: Agent[] } or Agent[]");
  }
  return rows.map((row) => {
    const bcId = row?.bcId ?? row?.id;
    if (!bcId) {
      throw new Error("each agent needs bcId");
    }
    return {
      bcId: String(bcId),
      name: String(row.name ?? row.bcId ?? bcId),
      status: String(row.status ?? "IDLE"),
    };
  });
}

/**
 * @param {string} destPath
 */
export function loadAgents(destPath) {
  if (!existsSync(destPath)) {
    throw new Error(`agents file missing: ${destPath}`);
  }
  return normalizeAgents(JSON.parse(readFileSync(destPath, "utf8")));
}

/**
 * @param {string} destPath
 */
export function readAgents(destPath) {
  if (!existsSync(destPath)) return null;
  return loadAgents(destPath);
}

/**
 * @param {{ agents?: unknown[] } | unknown[]} snapshot
 * @param {string} destPath
 */
export function writeAgents(snapshot, destPath) {
  mkdirSync(dirname(destPath), { recursive: true });
  const body = Array.isArray(snapshot) ? { agents: snapshot } : snapshot;
  writeFileSync(destPath, `${JSON.stringify(body, null, 2)}\n`);
  return destPath;
}

/**
 * Open Genesis cards not already recommended to an idle agent.
 * World planes first, then other Origin slices, then catalog.
 * Claimed cards stay off the list so a dead idle agent cannot hide next.
 * @param {import("./ledger.js").Ledger} ledger
 * @param {Set<string>} usedJobIds
 * @param {number} nowMs
 */
export function unusedGenesisCards(ledger, usedJobIds, nowMs) {
  const open = listJobs(ledger, { genesis: true, status: "open" }, nowMs);
  const unused = open.filter((job) => !usedJobIds.has(job.id) && effectiveStatus(job, nowMs) === "open");
  const world = unused.filter((job) => isWorldPhaseJob(job));
  const slices = unused.filter((job) => !isWorldPhaseJob(job) && job.kind === "origin-slice");
  const catalog = unused.filter((job) => job.kind === "catalog");
  return [...world, ...slices, ...catalog].sort((a, b) => {
    const rank = (job) => {
      if (isWorldPhaseJob(job)) return 0;
      if (job.kind === "origin-slice") return 1;
      return 2;
    };
    const delta = rank(a) - rank(b);
    return delta !== 0 ? delta : a.priority - b.priority;
  });
}

/**
 * Open GitHub sibling cards not already recommended to an idle agent.
 * Priority order. Claimed cards stay off the list.
 * @param {import("./ledger.js").Ledger} ledger
 * @param {Set<string>} usedJobIds
 * @param {number} nowMs
 */
export function unusedGithubCards(ledger, usedJobIds, nowMs) {
  return listJobs(ledger, { github: true, status: "open" }, nowMs)
    .filter((job) => !usedJobIds.has(job.id) && isGithubJob(job) && effectiveStatus(job, nowMs) === "open")
    .sort((a, b) => a.priority - b.priority);
}

/**
 * Map newly idle pad agents onto unused Genesis cards.
 * Does not lease. Does not drop existing assignments.
 * @param {import("./ledger.js").Ledger} ledger
 * @param {{ assignments: Array<{ bcId: string, name: string, jobId: string }> }} roster
 * @param {{ bcId: string, name: string, status: string }[]} agents
 * @param {number} [nowMs]
 */
export function syncRoster(ledger, roster, agents, nowMs = Date.now()) {
  const idle = agents.filter((agent) => agent.status === "IDLE");
  const running = agents.filter((agent) => agent.status === "RUNNING");
  const assignedIds = new Set(roster.assignments.map((row) => row.bcId));
  const usedJobIds = new Set(roster.assignments.map((row) => row.jobId));
  const newcomers = idle.filter((agent) => !assignedIds.has(agent.bcId));
  const leftover = unusedGithubCards(ledger, usedJobIds, nowMs);
  const added = [];
  for (const agent of newcomers) {
    const job = leftover.shift();
    if (!job) break;
    const row = { bcId: agent.bcId, name: agent.name, jobId: job.id };
    roster.assignments.push(row);
    usedJobIds.add(job.id);
    added.push({ ...row, ...takeInsteadSyncFields(job) });
  }
  const uncovered = newcomers.filter((agent) => !roster.assignments.some((row) => row.bcId === agent.bcId));
  const gone = roster.assignments.filter((row) => !idle.some((agent) => agent.bcId === row.bcId));
  const leftoverTake = leftover[0] ? takeInsteadSyncFields(leftover[0]) : {};
  return {
    contract: SYNC_CONTRACT,
    idle: idle.length,
    running: running.length,
    assigned: roster.assignments.length,
    added,
    uncovered,
    gone,
    leftover: leftover.map((job) => job.id),
    leftoverTakeInstead: leftoverTake.takeInstead,
    leftoverApplyNext: leftoverTake.applyNext,
    leftoverProveAfterApplyCommand: leftoverTake.proveAfterApplyCommand,
    rule: "New idle pad agents get the next unused GitHub sibling card. Superbrain leftover attaches take-instead apply. Existing assignments stay. No 45-minute leases. Forget Origin.",
  };
}

/**
 * Leftover Superbrain sit-out keeps jobId. Attach first parked catalog
 * apply so sync does not retarget keep-busy (#8).
 * @param {{ id?: string } | null | undefined} job
 */
function takeInsteadSyncFields(job) {
  if (job?.id !== "gub-superbrain-probe") return {};
  try {
    const patch = patchForJob(loadPatchIndex(defaultPatchesIndexPath(ROOT)), "dronehive-unicode-ci");
    if (!patch) return {};
    return {
      takeInstead: "dronehive-unicode-ci",
      applyNext: applyNextFor(patch),
      proveAfterApplyCommand: proveAfterApplyCommand(patch.id),
    };
  } catch {
    return {};
  }
}
