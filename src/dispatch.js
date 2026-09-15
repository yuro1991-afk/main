import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { isGenesisJob, isGithubJob, isWorldPhaseJob, jobScope } from "./kinds.js";
import {
  claimedByAgent,
  claimJob,
  effectiveStatus,
  listJobs,
  nextJob,
} from "./ledger.js";
import { applyNextForJob, catalogPatchFor, jobForDisplay, proveAfterApplyForJob, takeInsteadFields } from "./brief.js";
import { unusedGenesisCards, unusedGithubCards } from "./sync.js";
import { buildHelperPacket } from "./helpers.js";
import { buildRelaunch, packetPathFor, relaunchFor } from "./handoff.js";
import { renderLaunchPrompt } from "./prompt.js";
import { FIRST_PARKED_APPLY } from "./siblings.js";
import { SITOUT_JOB_IDS, isSitOutJob, sitOutAssignError } from "./sitout.js";

export { SITOUT_JOB_IDS, isSitOutJob, sitOutAssignError };

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
  const applyNext = applyNextForJob(job);
  const proveAfterApplyCommand = proveAfterApplyForJob(job);
  return {
    rank,
    id: job.id,
    title: job.title,
    priority: job.priority,
    packet: packetPathFor(job),
    playbook: `playbooks/${job.id}.md`,
    relaunch: relaunchFor(job),
    ...(applyNext ? { applyNext } : {}),
    ...(proveAfterApplyCommand ? { proveAfterApplyCommand } : {}),
    ...takeInsteadFields(job),
  };
}

/**
 * Peek one card as a slots packet. Blocked catalog leftovers are
 * allowed — this does not claim.
 * @param {import("./ledger.js").Job | null} job
 */
export function buildSlotsForJob(job) {
  if (!job) {
    return {
      contract: SLOTS_CONTRACT,
      count: 0,
      claimed: [],
      slots: [],
      rule: "Unknown card.",
    };
  }
  const shown = jobForDisplay(job);
  return {
    contract: SLOTS_CONTRACT,
    count: 1,
    claimed: shown.claim
      ? [
          {
            id: shown.id,
            agentId: shown.claim.agentId ?? null,
            leaseUntil: shown.claim.leaseUntil ?? null,
            packet: packetPathFor(shown),
          },
        ]
      : [],
    slots: [slotFor(shown, 1)],
    applyNext: applyNextForJob(shown),
    proveAfterApplyCommand: proveAfterApplyForJob(shown),
    ...takeInsteadFields(shown),
    rule: "Peek the named card. Do not claim a blocked catalog leftover. Apply on a sibling write checkout.",
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
    proveAfterApplyCommand: proveAfterApplyForJob(job),
    ...takeInsteadFields(job),
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
 * Append catalog-first related PRs to a paste-ready launch.
 * JSON stdout is easy to ignore; idle agents paste the file.
 * @param {string} prompt
 * @param {Array<{ number: number, role: string, meaning: string }> | null | undefined} related
 */
export function withRelatedSection(prompt, related) {
  if (!Array.isArray(related) || related.length === 0) {
    return prompt;
  }
  const lines = related.map((pr) => `- #${pr.number} ${pr.role} — ${pr.meaning}`);
  return `${prompt.trimEnd()}\n\n## Related\n\n${lines.join("\n")}\n`;
}

export const MISSING_LAUNCH_PREVIEW = 8;

/**
 * Job ids that already have a launch file in dest.
 * @param {string | undefined} launchDir
 */
export function presentLaunchIds(launchDir) {
  if (!launchDir || !existsSync(launchDir)) return new Set();
  return new Set(
    readdirSync(launchDir)
      .filter((name) => name.endsWith(".md"))
      .map((name) => name.slice(0, -3)),
  );
}

/**
 * Catalog leftover ids that have no launch file in dest.
 * Never writes. Priority order. Blocked leftovers stay listed.
 * @param {import("./ledger.js").Ledger} ledger
 * @param {string} launchDir
 */
export function missingLaunchRows(ledger, launchDir) {
  const present = presentLaunchIds(launchDir);
  return ledger.jobs
    .filter((job) => catalogPatchFor(job) && !present.has(job.id))
    .slice()
    .sort((a, b) => a.priority - b.priority)
    .map((job) => ({
      jobId: job.id,
      priority: job.priority,
      launch: launchPathFor(job.id),
    }));
}

/**
 * Compact assign --missing packet. Does not write launch files.
 * @param {import("./ledger.js").Ledger} ledger
 * @param {string} launchDir
 */
export function buildMissingLaunches(ledger, launchDir) {
  const missing = missingLaunchRows(ledger, launchDir);
  const nextMissing = missing[0]?.jobId ?? null;
  return {
    contract: ASSIGN_CONTRACT,
    missing: missing.length,
    nextMissing,
    next: missing.slice(0, MISSING_LAUNCH_PREVIEW).map((row) => row.jobId),
    prefer: nextMissing
      ? `node src/cli.js assign --job ${nextMissing} --out /tmp/launches`
      : `node src/cli.js brief --job ${FIRST_PARKED_APPLY}`,
    wrote: false,
  };
}

/**
 * Unused leftover cards as writeLaunchPrompts rows.
 * GitHub leftover skips sit-outs and dest launches already on disk.
 * Genesis leftover still includes Superbrain take-instead.
 * @param {import("./ledger.js").Ledger} ledger
 * @param {{ assignments?: Array<{ jobId: string }> } | null} roster
 * @param {number} [nowMs]
 * @param {{ genesis?: boolean, github?: boolean, world?: boolean }} [filters]
 * @param {string} [launchDir]
 */
export function leftoverLaunchRows(ledger, roster, nowMs = Date.now(), filters = { github: true }, launchDir) {
  const used = new Set((roster?.assignments ?? []).map((row) => row.jobId));
  const launched = presentLaunchIds(launchDir);
  return unusedCardsForFilters(ledger, used, filters, nowMs)
    .filter((job) => !isSitOutJob(job.id) || filters.genesis)
    .filter((job) => filters.genesis || !launched.has(job.id))
    .map((job) => ({
      jobId: job.id,
      prompt: renderLeftoverLaunch(job),
      applyNext: applyNextForJob(job),
      proveAfterApplyCommand: proveAfterApplyForJob(job),
      ...takeInsteadFields(job),
    }));
}

/**
 * Paste-ready brief for an unused leftover card.
 * Superbrain leftover refuses Origin paste and names take-instead apply.
 * Default leftover is a GitHub sibling card.
 * @param {import("./ledger.js").Job | null} job
 */
export function renderLeftoverLaunch(job) {
  if (!job) {
    return `# No leftover unused GitHub card

Every GitHub sibling card is already assigned. Review an open PR.
Do not invent Origin work. Do not reopen https://github.com/yuro1991-afk/main/pull/1.
`;
  }
  if (job.id === "gub-superbrain-probe") {
    const prove = proveAfterApplyForJob(job);
    return `# Leftover unused — ${job.id}

Yuri: no more Superbrain. Do not probe :45001 / :8791. Do not run node src/cli.js probe.

No parked pad agent owns this card yet. Take review-main-pr10, or apply first parked catalog leftover dronehive-unicode-ci on a sibling write checkout.

- card: \`${job.id}\`
- take instead: \`dronehive-unicode-ci\`
- prove: \`node src/cli.js patches --prove --job dronehive-unicode-ci\`
- prove afterApply: \`${prove}\`

Do not paste this into an Origin cloud agent. Do not inventory this landing pad.

---

${renderLaunchPrompt(job)}
`;
  }
  const target = relaunchFor(job);
  return `# Leftover unused — ${job.id}

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: \`${job.id}\`
- launch: \`${launchPathFor(job.id)}\`
- GitHub: ${target.url}

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

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
  if (job?.id === "gub-superbrain-probe") {
    const prove = proveAfterApplyForJob(job);
    return `# Idle-agent relaunch — ${row.name}

Yuri: no more Superbrain. Do not probe :45001 / :8791. Do not run node src/cli.js probe.

You were assigned leftover Superbrain. Take review-main-pr10, or apply first parked catalog leftover dronehive-unicode-ci on a sibling write checkout.

- agent: ${row.name}
- bcId: \`${row.bcId}\`
- card: \`${row.jobId}\`
- take instead: \`dronehive-unicode-ci\`
- prove: \`node src/cli.js patches --prove --job dronehive-unicode-ci\`
- prove afterApply: \`${prove}\`

Do not paste this into an Origin cloud agent. Do not inventory this landing pad.

---

${renderLaunchPrompt(job)}
`;
  }
  const body = job
    ? renderLaunchPrompt(job)
    : "Unknown job. Do not invent a fifth landing-pad queue.";
  return `# Idle-agent relaunch — ${row.name}

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: ${row.name}
- bcId: \`${row.bcId}\`
- card: \`${row.jobId}\`
- launch: \`${launchPathFor(row.jobId)}\`
- GitHub: ${job ? relaunchFor(job).url : "https://github.com/yuro1991-afk"}

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

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
  const leftover = unusedCardsForFilters(ledger, used, filters, nowMs).filter((job) =>
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
  if (filters.github === true && !isGithubJob(job)) return false;
  if (filters.world === true && !isWorldPhaseJob(job)) return false;
  return true;
}

/**
 * @param {import("./ledger.js").Ledger} ledger
 * @param {Set<string>} used
 * @param {{ genesis?: boolean, github?: boolean, world?: boolean }} filters
 * @param {number} nowMs
 */
function unusedCardsForFilters(ledger, used, filters, nowMs) {
  if (filters.world === true || filters.genesis === true) {
    return unusedGenesisCards(ledger, used, nowMs);
  }
  return unusedGithubCards(ledger, used, nowMs);
}

/**
 * Recommended relaunch targets for named idle Genesis agents.
 * Does not claim — idle agents that never wake must not hide next.
 * @param {import("./ledger.js").Ledger} ledger
 * @param {{ assignments: Array<{ bcId: string, name: string, jobId: string }> }} roster
 * @param {number} [nowMs]
 * @param {string} [launchDir]
 */
export function buildAssign(ledger, roster, nowMs = Date.now(), launchDir) {
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
  const leftover = leftoverLaunchRows(ledger, roster, nowMs, { github: true }, launchDir);
  const first = leftover[0];
  return {
    contract: ASSIGN_CONTRACT,
    count: assignments.length,
    assignments,
    leftover: leftover.map((row) => row.jobId),
    leftoverNext: first?.jobId ?? null,
    leftoverTakeInstead: first?.takeInstead,
    leftoverApplyNext: first?.applyNext,
    leftoverProveAfterApplyCommand: first?.proveAfterApplyCommand,
    leftoverLaunches: leftover,
    next: assignments.find((row) => row.status === "open") ?? null,
    rule: "Every idle pad agent takes a unique GitHub sibling card. A new unassigned agent takes leftoverNext. Superbrain leftover attaches take-instead apply. Forget Origin. Do not all peek next without claiming. Do not lease cards to agents that stay idle.",
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
