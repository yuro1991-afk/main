import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { effectiveStatus, listJobs } from "./ledger.js";
import { buildHelperPacket } from "./helpers.js";
import { buildRelaunch, packetPathFor, relaunchFor } from "./handoff.js";
import { ORIGIN_UI, renderLaunchPrompt } from "./prompt.js";

export const BUSY_CONTRACT = "agent-ops.busy.v1";
export const SLOTS_CONTRACT = "agent-ops.slots.v1";
export const ASSIGN_CONTRACT = "agent-ops.assign.v1";

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
    prompt: renderLaunchPrompt(job),
    helpers: buildHelperPacket(job).helpers,
    remaining: slots.filter((slot) => slot.id !== job.id),
    action: relaunch.action,
    doNot: relaunch.doNot,
  };
}

/**
 * @param {string} repoRoot
 */
export function defaultRosterPath(repoRoot) {
  return join(repoRoot, "ledger", "roster.json");
}

/**
 * @param {string} repoRoot
 */
export function defaultLaunchPath(repoRoot) {
  return join(repoRoot, "reviews", "launch");
}

/**
 * @param {string} jobId
 */
export function launchPathFor(jobId) {
  return `reviews/launch/${jobId}.md`;
}

/**
 * Paste-ready Origin brief for one parked pad agent.
 * @param {{ bcId: string, name: string, jobId: string }} row
 * @param {import("./ledger.js").Job | null} job
 */
export function renderAssignedLaunch(row, job) {
  const body = job
    ? renderLaunchPrompt(job)
    : "Unknown job. Do not invent a fifth landing-pad queue.";
  return `# Idle-agent relaunch — ${row.name}

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: ${row.name}
- bcId: \`${row.bcId}\`
- card: \`${row.jobId}\`
- launch: \`${launchPathFor(row.jobId)}\`
- Origin: ${ORIGIN_UI}

Paste the brief below into a new Origin cloud agent. Do not inventory this landing pad.

---

${body}
`;
}

/**
 * @param {string} rosterPath
 */
export function loadRoster(rosterPath) {
  const parsed = JSON.parse(readFileSync(rosterPath, "utf8"));
  if (!parsed || !Array.isArray(parsed.assignments)) {
    throw new Error("roster must be { assignments: Assignment[] }");
  }
  return parsed;
}

/**
 * Recommended relaunch targets for named idle Genesis agents.
 * Does not claim — idle agents that never wake must not hide next.
 * @param {import("./ledger.js").Ledger} ledger
 * @param {{ assignments: Array<{ bcId: string, name: string, jobId: string }> }} roster
 * @param {number} [nowMs]
 */
export function buildAssign(ledger, roster, nowMs = Date.now()) {
  const assignments = roster.assignments.map((row) => {
    const job = ledger.jobs.find((item) => item.id === row.jobId) ?? null;
    return {
      bcId: row.bcId,
      name: row.name,
      jobId: row.jobId,
      status: job ? effectiveStatus(job, nowMs) : "missing",
      packet: job ? packetPathFor(job) : null,
      launch: job ? launchPathFor(row.jobId) : null,
      relaunch: job ? relaunchFor(job) : null,
      prompt: renderAssignedLaunch(row, job),
    };
  });
  return {
    contract: ASSIGN_CONTRACT,
    count: assignments.length,
    assignments,
    next: assignments.find((row) => row.status === "open") ?? null,
    rule: "Every idle pad agent relaunches the listed Origin world-phase card. Do not stay on yuro1991-afk/main. Do not all peek next without claiming. Do not lease cards to agents that stay idle.",
  };
}

/**
 * @param {Array<{ jobId: string, prompt?: string | null }>} assignments
 * @param {string} dir
 */
export function writeLaunchPrompts(assignments, dir) {
  mkdirSync(dir, { recursive: true });
  return assignments
    .filter((row) => row.prompt)
    .map((row) => {
      const dest = join(dir, `${row.jobId}.md`);
      writeFileSync(dest, `${row.prompt}\n`);
      return dest;
    });
}

export function writeDispatch(snapshot, destPath) {
  mkdirSync(dirname(destPath), { recursive: true });
  writeFileSync(destPath, `${JSON.stringify(snapshot, null, 2)}\n`);
  return snapshot;
}
