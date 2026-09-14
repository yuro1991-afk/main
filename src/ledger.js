import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import {
  assertNeverStatus,
  isJobKind,
  isJobStatus,
  jobScope,
} from "./kinds.js";

export const DEFAULT_LEASE_MS = 45 * 60 * 1000;

/**
 * @typedef {{
 *   agentId: string,
 *   claimedAt: string,
 *   leaseUntil: string
 * }} Claim
 *
 * @typedef {{
 *   id: string,
 *   title: string,
 *   repo: string,
 *   kind: string,
 *   priority: number,
 *   status: string,
 *   claim: Claim | null,
 *   notes: string,
 *   verify: string,
 *   files: string[],
 *   collision: string
 * }} Job
 *
 * @typedef {{ jobs: Job[] }} Ledger
 */

/**
 * @param {string} ledgerPath
 * @returns {Ledger}
 */
export function loadLedger(ledgerPath) {
  const raw = readFileSync(ledgerPath, "utf8");
  const parsed = JSON.parse(raw);
  if (!parsed || !Array.isArray(parsed.jobs)) {
    throw new Error("ledger must be { jobs: Job[] }");
  }
  for (const job of parsed.jobs) {
    validateJob(job);
  }
  return parsed;
}

/**
 * @param {string} ledgerPath
 * @param {Ledger} ledger
 */
export function saveLedger(ledgerPath, ledger) {
  mkdirSync(dirname(ledgerPath), { recursive: true });
  writeFileSync(ledgerPath, `${JSON.stringify(ledger, null, 2)}\n`);
}

/**
 * @param {Job} job
 */
export function validateJob(job) {
  if (!job || typeof job.id !== "string" || job.id.length === 0) {
    throw new Error("job.id is required");
  }
  if (!isJobKind(job.kind)) {
    throw new Error(`job ${job.id} has invalid kind: ${job.kind}`);
  }
  if (!isJobStatus(job.status)) {
    throw new Error(`job ${job.id} has invalid status: ${job.status}`);
  }
  if (!Number.isInteger(job.priority)) {
    throw new Error(`job ${job.id} priority must be an integer`);
  }
}

/**
 * @param {Job} job
 * @param {number} nowMs
 */
export function isClaimActive(job, nowMs) {
  if (job.status !== "claimed" || !job.claim) {
    return false;
  }
  return Date.parse(job.claim.leaseUntil) > nowMs;
}

/**
 * Expired claims become claimable again without rewriting status until next().
 * @param {Job} job
 * @param {number} nowMs
 */
export function effectiveStatus(job, nowMs) {
  switch (job.status) {
    case "open":
    case "done":
    case "blocked":
      return job.status;
    case "claimed":
      return isClaimActive(job, nowMs) ? "claimed" : "open";
    default:
      return assertNeverStatus(job.status);
  }
}

/**
 * @param {Ledger} ledger
 * @param {{ status?: string, kind?: string, repo?: string, scope?: string }} [filters]
 * @param {number} [nowMs]
 */
export function listJobs(ledger, filters = {}, nowMs = Date.now()) {
  return ledger.jobs.filter((job) => {
    const status = effectiveStatus(job, nowMs);
    if (filters.status && status !== filters.status) return false;
    if (filters.kind && job.kind !== filters.kind) return false;
    if (filters.repo && job.repo !== filters.repo) return false;
    if (filters.scope && jobScope(job) !== filters.scope) return false;
    return true;
  });
}

/**
 * Highest-priority open job. Lower number wins; ties keep ledger order.
 * @param {Ledger} ledger
 * @param {{ kind?: string, repo?: string, scope?: string }} [filters]
 * @param {number} [nowMs]
 * @returns {Job | null}
 */
export function nextJob(ledger, filters = {}, nowMs = Date.now()) {
  const open = listJobs(ledger, { ...filters, status: "open" }, nowMs);
  if (open.length === 0) return null;
  return [...open].sort((a, b) => a.priority - b.priority)[0];
}

/**
 * @param {Ledger} ledger
 * @param {string} jobId
 * @param {string} agentId
 * @param {number} [nowMs]
 * @param {number} [leaseMs]
 */
export function claimJob(
  ledger,
  jobId,
  agentId,
  nowMs = Date.now(),
  leaseMs = DEFAULT_LEASE_MS,
) {
  if (!agentId) {
    throw new Error("claim requires agentId");
  }
  const job = requireJob(ledger, jobId);
  const status = effectiveStatus(job, nowMs);
  if (status === "done") {
    throw new Error(`job ${jobId} is already done`);
  }
  if (status === "blocked") {
    throw new Error(`job ${jobId} is blocked`);
  }
  if (status === "claimed" && job.claim.agentId !== agentId) {
    throw new Error(
      `job ${jobId} is claimed by ${job.claim.agentId} until ${job.claim.leaseUntil}`,
    );
  }
  job.status = "claimed";
  job.claim = {
    agentId,
    claimedAt: new Date(nowMs).toISOString(),
    leaseUntil: new Date(nowMs + leaseMs).toISOString(),
  };
  return job;
}

/**
 * @param {Ledger} ledger
 * @param {string} jobId
 * @param {string} agentId
 * @param {number} [nowMs]
 */
export function completeJob(ledger, jobId, agentId, nowMs = Date.now()) {
  const job = requireClaimedBy(ledger, jobId, agentId, nowMs);
  job.status = "done";
  return job;
}

/**
 * @param {Ledger} ledger
 * @param {string} jobId
 * @param {string} agentId
 * @param {string} reason
 * @param {number} [nowMs]
 */
export function blockJob(ledger, jobId, agentId, reason, nowMs = Date.now()) {
  const job = requireClaimedBy(ledger, jobId, agentId, nowMs);
  job.status = "blocked";
  job.notes = reason ? `${job.notes}\nBlocked: ${reason}` : job.notes;
  return job;
}

/**
 * @param {Ledger} ledger
 * @param {string} jobId
 * @param {string} agentId
 * @param {number} [nowMs]
 */
export function releaseJob(ledger, jobId, agentId, nowMs = Date.now()) {
  const job = requireJob(ledger, jobId);
  if (job.status === "claimed" && job.claim && job.claim.agentId !== agentId) {
    if (isClaimActive(job, nowMs)) {
      throw new Error(`job ${jobId} is claimed by ${job.claim.agentId}`);
    }
  }
  job.status = "open";
  job.claim = null;
  return job;
}

/**
 * @param {Ledger} ledger
 */
export function summarize(ledger, nowMs = Date.now()) {
  const counts = { open: 0, claimed: 0, done: 0, blocked: 0 };
  for (const job of ledger.jobs) {
    const status = effectiveStatus(job, nowMs);
    switch (status) {
      case "open":
      case "claimed":
      case "done":
      case "blocked":
        counts[status] += 1;
        break;
      default:
        assertNeverStatus(status);
    }
  }
  return {
    total: ledger.jobs.length,
    ...counts,
    next: nextJob(ledger, {}, nowMs),
  };
}

export function defaultLedgerPath(repoRoot) {
  return join(repoRoot, "ledger", "queue.json");
}

/**
 * @param {Ledger} ledger
 * @param {string} jobId
 */
function requireJob(ledger, jobId) {
  const job = ledger.jobs.find((item) => item.id === jobId);
  if (!job) {
    throw new Error(`unknown job: ${jobId}`);
  }
  return job;
}

/**
 * @param {Ledger} ledger
 * @param {string} jobId
 * @param {string} agentId
 * @param {number} nowMs
 */
function requireClaimedBy(ledger, jobId, agentId, nowMs) {
  const job = requireJob(ledger, jobId);
  if (!agentId) {
    throw new Error("agentId is required");
  }
  if (effectiveStatus(job, nowMs) !== "claimed" || !job.claim) {
    throw new Error(`job ${jobId} is not claimed`);
  }
  if (job.claim.agentId !== agentId) {
    throw new Error(`job ${jobId} is claimed by ${job.claim.agentId}`);
  }
  return job;
}
