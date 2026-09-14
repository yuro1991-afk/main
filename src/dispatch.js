import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { listJobs } from "./ledger.js";
import { buildHelperPacket } from "./helpers.js";
import { buildRelaunch, packetPathFor, relaunchFor } from "./handoff.js";

export const BUSY_CONTRACT = "agent-ops.busy.v1";
export const SLOTS_CONTRACT = "agent-ops.slots.v1";

/**
 * @param {string} repoRoot
 */
export function defaultDispatchPath(repoRoot) {
  return join(repoRoot, ".genesis", "last-dispatch.json");
}

/**
 * @param {import("./ledger.js").Job} job
 * @param {number} rank
 */
export function slotFor(job, rank) {
  return {
    rank,
    id: job.id,
    title: job.title,
    priority: job.priority,
    packet: packetPathFor(job),
    playbook: `playbooks/${job.id}.md`,
    relaunch: relaunchFor(job),
  };
}

/**
 * Open Genesis (or filtered) cards in priority order so idle agents
 * do not all pile onto the same `next`.
 * @param {import("./ledger.js").Ledger} ledger
 * @param {{ kind?: string, repo?: string, scope?: string, genesis?: boolean }} [filters]
 * @param {number} [nowMs]
 */
export function listSlots(ledger, filters = {}, nowMs = Date.now()) {
  return listJobs(ledger, { ...filters, status: "open" }, nowMs)
    .slice()
    .sort((a, b) => a.priority - b.priority)
    .map((job, index) => slotFor(job, index + 1));
}

/**
 * @param {import("./ledger.js").Ledger} ledger
 * @param {{ kind?: string, repo?: string, scope?: string, genesis?: boolean }} [filters]
 * @param {number} [nowMs]
 */
export function buildSlots(ledger, filters = {}, nowMs = Date.now()) {
  const slots = listSlots(ledger, filters, nowMs);
  const claimed = listJobs(ledger, { ...filters, status: "claimed" }, nowMs).map((job) => ({
    id: job.id,
    agentId: job.claim?.agentId ?? null,
    leaseUntil: job.claim?.leaseUntil ?? null,
    packet: packetPathFor(job),
  }));
  return {
    contract: SLOTS_CONTRACT,
    count: slots.length,
    claimed,
    slots,
    rule: "Claim one id with `node src/cli.js busy --agent $CURSOR_AGENT_ID`. Do not all take the same next without claiming.",
  };
}

/**
 * One screen: reserved card + remaining slots + Origin relaunch.
 * @param {import("./ledger.js").Job | null} job
 * @param {{ prs: Array<{ owns?: string[], number: number, url: string, role: string, title: string, branch: string }> }} siblings
 * @param {ReturnType<typeof slotFor>[]} slots
 * @param {{ reserved?: boolean }} [options]
 */
export function buildBusy(job, siblings, slots, options = {}) {
  if (!job) {
    return {
      contract: BUSY_CONTRACT,
      reserved: false,
      job: null,
      helpers: [],
      remaining: slots,
      action: "No open Genesis card. Do not open another landing-pad queue.",
    };
  }
  const relaunch = buildRelaunch(job, siblings);
  return {
    contract: BUSY_CONTRACT,
    reserved: Boolean(options.reserved),
    jobId: job.id,
    packet: packetPathFor(job),
    playbook: `playbooks/${job.id}.md`,
    job,
    relaunch: relaunch.relaunch,
    helpers: buildHelperPacket(job).helpers,
    remaining: slots.filter((slot) => slot.id !== job.id),
    action: relaunch.action,
    doNot: relaunch.doNot,
  };
}

/**
 * @param {object} snapshot
 * @param {string} destPath
 */
export function writeDispatch(snapshot, destPath) {
  mkdirSync(dirname(destPath), { recursive: true });
  writeFileSync(destPath, `${JSON.stringify(snapshot, null, 2)}\n`);
  return snapshot;
}
