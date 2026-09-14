import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { assertNeverStatus } from "./kinds.js";
import { effectiveStatus, nextJob, summarize } from "./ledger.js";

export const INVENTORY_CONTRACT = "agent-ops.inventory.v1";

/**
 * @param {string} repoRoot
 */
export function defaultInventoryPath(repoRoot) {
  return join(repoRoot, ".genesis", "last-inventory.json");
}

/**
 * @param {import("./ledger.js").Ledger} ledger
 * @param {string} destPath
 * @param {number} nowMs
 */
export function writeInventoryTick(ledger, destPath, nowMs, extras = {}) {
  const counts = summarize(ledger, nowMs);
  const next = nextJob(ledger, { genesis: true }, nowMs) ?? nextJob(ledger, {}, nowMs);
  const worldNext = nextJob(ledger, { world: true }, nowMs);
  const origin = extras.origin ?? null;
  const snapshot = {
    contract: INVENTORY_CONTRACT,
    at: new Date(nowMs).toISOString(),
    total: counts.total,
    open: counts.open,
    claimed: counts.claimed,
    done: counts.done,
    blocked: counts.blocked,
    nextId: next ? next.id : null,
    worldNextId: worldNext ? worldNext.id : null,
    originLoggedIn: origin ? Boolean(origin.loggedIn) : null,
    originStatus: origin ? origin.status ?? null : null,
    jobs: ledger.jobs.map((job) => inventoryJob(job, nowMs)),
  };
  mkdirSync(dirname(destPath), { recursive: true });
  writeFileSync(destPath, `${JSON.stringify(snapshot, null, 2)}\n`);
  return snapshot;
}

/**
 * @param {import("./ledger.js").Job} job
 * @param {number} nowMs
 */
function inventoryJob(job, nowMs) {
  const status = effectiveStatus(job, nowMs);
  switch (status) {
    case "open":
    case "claimed":
    case "done":
    case "blocked":
      return {
        id: job.id,
        status,
        priority: job.priority,
        repo: job.repo,
        kind: job.kind,
      };
    default:
      return assertNeverStatus(status);
  }
}
