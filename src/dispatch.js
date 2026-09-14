import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { isGenesisJob, isWorldPhaseJob, jobScope } from "./kinds.js";
import {
  claimedByAgent,
  claimJob,
  effectiveStatus,
  listJobs,
  nextJob,
} from "./ledger.js";
import { applyNextForJob, jobForDisplay } from "./brief.js";
import { unusedGenesisCards } from "./sync.js";
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
    job: jobForDisplay(job),
    relaunch: relaunch.relaunch,
    prompt: renderLaunchPrompt(job),
    helpers: buildHelperPacket(job).helpers,
    applyNext: applyNextForJob(job),
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
 * Unused leftover cards as writeLaunchPrompts rows.
 * @param {import("./ledger.js").Ledger} ledger
 * @param {{ assignments?: Array<{ jobId: string }> } | null} roster
 * @param {number} [nowMs]
 */
export function leftoverLaunchRows(ledger, roster, nowMs = Date.now()) {
  const used = new Set((roster?.assignments ?? []).map((row) => row.jobId));
  return unusedGenesisCards(ledger, used, nowMs).map((job) => ({
    jobId: job.id,
    prompt: renderLeftoverLaunch(job),
  }));
}

/**
 * Paste-ready Origin brief for an unused leftover card.
 * No parked agent owns it yet — the next unassigned idle agent takes it.
 * @param {import("./ledger.js").Job | null} job
 */
export function renderLeftoverLaunch(job) {
  if (!job) {
    return `# No leftover unused Genesis card

Do not open another landing-pad queue on yuro1991-afk/main.
Do not reopen https://github.com/yuro1991-afk/main/pull/1.
`;
  }
  return `# Leftover unused — ${job.id}

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: \`${job.id}\`
- launch: \`${launchPathFor(job.id)}\`
- Origin: ${ORIGIN_UI}

Paste the brief below into a new Origin cloud agent. Do not inventory this landing pad.

---

${renderLaunchPrompt(job)}
`;
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
 * @param {string} rosterPath
 * @param {{ assignments: Array<{ bcId: string, name: string, jobId: string }> }} roster
 */
export function saveRoster(rosterPath, roster) {
  mkdirSync(dirname(rosterPath), { recursive: true });
  writeFileSync(rosterPath, `${JSON.stringify(roster, null, 2)}\n`);
  return rosterPath;
}

/**
 * Which Origin card a waking pad agent should take.
 * Prefer an active claim, then the roster card for this bcId, then
 * leftover unused Genesis. Never a card already on the roster.
 * Does not lease.
 * @param {import("./ledger.js").Ledger} ledger
 * @param {string | undefined} agentId
 * @param {{ kind?: string, repo?: string, scope?: string, genesis?: boolean, world?: boolean }} [filters]
 * @param {number} [nowMs]
 * @param {{ assignments?: Array<{ bcId: string, jobId: string }> } | null} [roster]
 */
export function peekBusyJob(ledger, agentId, filters = {}, nowMs = Date.now(), roster = null) {
  if (agentId) {
    const existing = claimedByAgent(ledger, agentId, filters, nowMs);
    if (existing) return existing;
    const assignedId = roster?.assignments?.find((row) => row.bcId === agentId)?.jobId;
    if (assignedId) {
      const assigned = ledger.jobs.find((job) => job.id === assignedId);
      if (assigned && jobPassesBusyFilters(assigned, filters, nowMs)) {
        return assigned;
      }
    }
  }
  const used = new Set(
    (roster?.assignments ?? [])
      .filter((row) => !agentId || row.bcId !== agentId)
      .map((row) => row.jobId),
  );
  const leftover = unusedGenesisCards(ledger, used, nowMs).filter((job) =>
    jobPassesBusyFilters(job, filters, nowMs),
  );
  if (leftover[0]) return leftover[0];
  const raw = nextJob(ledger, filters, nowMs);
  if (raw && !used.has(raw.id)) return raw;
  return null;
}

/**
 * Reserve work for a waking pad agent.
 * Prefer the roster card already assigned to this bcId so 35 idle
 * agents do not all claim leftover `gub-inventory-tick`.
 * Unassigned agents take the next unused Genesis leftover. Do not
 * fall through to a card already recommended on the roster.
 * @param {import("./ledger.js").Ledger} ledger
 * @param {string} agentId
 * @param {{ kind?: string, repo?: string, scope?: string, genesis?: boolean, world?: boolean }} [filters]
 * @param {number} [nowMs]
 * @param {{ assignments?: Array<{ bcId: string, jobId: string }> } | null} [roster]
 */
export function claimBusyJob(ledger, agentId, filters = {}, nowMs = Date.now(), roster = null) {
  const job = peekBusyJob(ledger, agentId, filters, nowMs, roster);
  if (!job) return null;
  return claimJob(ledger, job.id, agentId, nowMs);
}

/**
 * @param {import("./ledger.js").Job} job
 * @param {{ kind?: string, repo?: string, scope?: string, genesis?: boolean, world?: boolean }} filters
 * @param {number} nowMs
 */
function jobPassesBusyFilters(job, filters, nowMs) {
  if (effectiveStatus(job, nowMs) !== "open") return false;
  if (filters.kind && job.kind !== filters.kind) return false;
  if (filters.repo && job.repo !== filters.repo) return false;
  if (filters.scope && jobScope(job) !== filters.scope) return false;
  if (filters.genesis === true && !isGenesisJob(job)) return false;
  if (filters.world === true && !isWorldPhaseJob(job)) return false;
  return true;
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
  const leftover = leftoverLaunchRows(ledger, roster, nowMs);
  return {
    contract: ASSIGN_CONTRACT,
    count: assignments.length,
    assignments,
    leftover: leftover.map((row) => row.jobId),
    leftoverNext: leftover[0]?.jobId ?? null,
    leftoverLaunches: leftover,
    next: assignments.find((row) => row.status === "open") ?? null,
    rule: "Every idle pad agent relaunches the listed Origin world-phase card. A new unassigned agent takes leftoverNext. Do not stay on yuro1991-afk/main. Do not all peek next without claiming. Do not lease cards to agents that stay idle.",
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
