import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { REPO_ROOT, isSiblingId } from "../../sibling-kit/src/index.js";

export const id = "dispatch";
export const title = "Genesis dispatch";
export const contract = "genesis.dispatch.v1";
export const kind = "node";
export const summary = "Enqueue and run jobs across siblings.";

/** @type {Array<{ id: string, kind: string, payload: unknown, status: string }>} */
const queue = [];

export function handshake() {
  return { protocol: contract, slice: id, version: 1 };
}

export function health() {
  return { status: "ok", slice: id, contract, queued: queue.length };
}

export function enqueue({ kind, payload, target }) {
  if (target && !isSiblingId(target)) {
    throw new Error(`dispatch target is not a sibling: ${target}`);
  }
  const job = {
    id: `job-${Date.now()}-${queue.length + 1}`,
    kind,
    payload,
    target: target ?? null,
    status: "queued",
    at: new Date().toISOString(),
  };
  queue.push(job);
  persist(job);
  return job;
}

export function run(jobId) {
  const job = queue.find((item) => item.id === jobId);
  if (!job) return null;
  job.status = "done";
  persist(job);
  return job;
}

export function list() {
  return [...queue];
}

function persist(job) {
  const dir = join(REPO_ROOT, ".genesis", "jobs");
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${job.id}.json`), JSON.stringify(job, null, 2));
}
