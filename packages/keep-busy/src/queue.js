import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const CONTRACT = "keep-busy.lease.v1";
export const DEFAULT_LEASE_MS = 2 * 60 * 60 * 1000;
export const AVOID_REPOS = Object.freeze([
  "yuro1991-afk/dronehive",
  "yuro1991-afk/main#genesis-siblings",
]);

export const STATUSES = Object.freeze(["open", "claimed", "done", "blocked"]);

export class QueueError extends Error {
  /**
   * @param {string} code
   * @param {string} message
   */
  constructor(code, message) {
    super(message);
    this.name = "QueueError";
    this.code = code;
  }
}

export function defaultCatalogPath() {
  return join(repoRoot(), "queue", "jobs.json");
}

export function repoRoot() {
  const here = fileURLToPath(new URL(".", import.meta.url));
  return join(here, "..", "..", "..");
}

/**
 * @param {string} path
 */
export function loadQueue(path) {
  const raw = readFileSync(path, "utf8");
  const data = JSON.parse(raw);
  if (!data || !Array.isArray(data.jobs)) {
    throw new QueueError("invalid_catalog", "jobs.json must have a jobs array");
  }
  return data;
}

/**
 * @param {string} path
 * @param {object} data
 */
export function saveQueue(path, data) {
  mkdirSync(dirname(path), { recursive: true });
  const tmp = `${path}.${process.pid}.tmp`;
  writeFileSync(tmp, `${JSON.stringify(data, null, 2)}\n`);
  renameSync(tmp, path);
}

/**
 * @param {object} queue
 * @param {{ now?: Date }} [opts]
 */
export function expireLeases(queue, opts = {}) {
  const now = (opts.now ?? new Date()).toISOString();
  let expired = 0;
  for (const job of queue.jobs) {
    if (job.status !== "claimed" || !job.lease) continue;
    if (job.lease.until <= now) {
      job.status = "open";
      job.lease = null;
      expired += 1;
    }
  }
  return expired;
}

/**
 * @param {object} queue
 * @param {{ status?: string, repo?: string }} [filter]
 */
export function listJobs(queue, filter = {}) {
  return queue.jobs.filter((job) => {
    if (filter.status && job.status !== filter.status) return false;
    if (filter.repo && job.repo !== filter.repo) return false;
    return true;
  });
}

/**
 * @param {object} queue
 * @param {string} id
 */
export function getJob(queue, id) {
  const job = queue.jobs.find((item) => item.id === id);
  if (!job) throw new QueueError("not_found", `job not found: ${id}`);
  return job;
}

/**
 * @param {object} queue
 * @param {{ agent: string, repo?: string, now?: Date, leaseMs?: number }} opts
 */
export function claimNext(queue, opts) {
  if (!opts || !opts.agent) {
    throw new QueueError("agent_required", "claim requires an agent id");
  }
  expireLeases(queue, { now: opts.now });
  const candidates = queue.jobs
    .filter((job) => job.status === "open")
    .filter((job) => !AVOID_REPOS.includes(job.repo))
    .filter((job) => !opts.repo || job.repo === opts.repo)
    .sort((a, b) => (a.priority ?? 100) - (b.priority ?? 100));

  const job = candidates[0];
  if (!job) throw new QueueError("empty", "no open jobs match the filter");
  return claimJob(queue, job.id, opts);
}

/**
 * @param {object} queue
 * @param {string} id
 * @param {{ agent: string, now?: Date, leaseMs?: number }} opts
 */
export function claimJob(queue, id, opts) {
  if (!opts || !opts.agent) {
    throw new QueueError("agent_required", "claim requires an agent id");
  }
  expireLeases(queue, { now: opts.now });
  const job = getJob(queue, id);
  switch (job.status) {
    case "open":
      break;
    case "claimed":
      if (job.lease && job.lease.agent !== opts.agent) {
        throw new QueueError(
          "busy",
          `${id} is claimed by ${job.lease.agent} until ${job.lease.until}`,
        );
      }
      break;
    case "done":
      throw new QueueError("already_done", `${id} is already done`);
    case "blocked":
      throw new QueueError("blocked", `${id} is blocked: ${job.blockedReason ?? "unspecified"}`);
    default: {
      const _exhaustive = job.status;
      throw new QueueError("invalid_status", `unknown status: ${_exhaustive}`);
    }
  }

  const now = opts.now ?? new Date();
  const leaseMs = opts.leaseMs ?? DEFAULT_LEASE_MS;
  job.status = "claimed";
  job.lease = {
    agent: opts.agent,
    since: now.toISOString(),
    until: new Date(now.getTime() + leaseMs).toISOString(),
    heartbeat: now.toISOString(),
  };
  return job;
}

/**
 * @param {object} queue
 * @param {string} id
 * @param {{ agent: string, now?: Date, leaseMs?: number }} opts
 */
export function heartbeat(queue, id, opts) {
  const job = requireClaimHolder(queue, id, opts.agent);
  const now = opts.now ?? new Date();
  const leaseMs = opts.leaseMs ?? DEFAULT_LEASE_MS;
  job.lease.heartbeat = now.toISOString();
  job.lease.until = new Date(now.getTime() + leaseMs).toISOString();
  return job;
}

/**
 * @param {object} queue
 * @param {string} id
 * @param {{ agent: string, evidence: { pr?: string, notes?: string } }} opts
 */
export function completeJob(queue, id, opts) {
  const job = requireClaimHolder(queue, id, opts.agent);
  const evidence = opts.evidence ?? {};
  if (!evidence.pr && !evidence.notes) {
    throw new QueueError(
      "evidence_required",
      "complete requires evidence.pr or evidence.notes (no false green)",
    );
  }
  job.status = "done";
  job.lease = null;
  job.evidence = {
    pr: evidence.pr ?? null,
    notes: evidence.notes ?? null,
    at: new Date().toISOString(),
    agent: opts.agent,
  };
  return job;
}

/**
 * @param {object} queue
 * @param {string} id
 * @param {{ agent: string }} opts
 */
export function releaseJob(queue, id, opts) {
  const job = requireClaimHolder(queue, id, opts.agent);
  job.status = "open";
  job.lease = null;
  return job;
}

function requireClaimHolder(queue, id, agent) {
  if (!agent) throw new QueueError("agent_required", "agent id required");
  const job = getJob(queue, id);
  if (job.status !== "claimed" || !job.lease) {
    throw new QueueError("not_claimed", `${id} is not claimed`);
  }
  if (job.lease.agent !== agent) {
    throw new QueueError("not_holder", `${id} is held by ${job.lease.agent}`);
  }
  return job;
}

export function board(queue) {
  return {
    contract: CONTRACT,
    open: listJobs(queue, { status: "open" }).map(summarize),
    claimed: listJobs(queue, { status: "claimed" }).map(summarize),
    done: listJobs(queue, { status: "done" }).map(summarize),
    blocked: listJobs(queue, { status: "blocked" }).map(summarize),
  };
}

function summarize(job) {
  return {
    id: job.id,
    title: job.title,
    repo: job.repo,
    priority: job.priority,
    agent: job.lease ? job.lease.agent : null,
  };
}
