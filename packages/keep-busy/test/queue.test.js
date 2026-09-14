import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  QueueError,
  claimJob,
  claimNext,
  completeJob,
  expireLeases,
  heartbeat,
  loadQueue,
  releaseJob,
} from "../src/queue.js";

function fixture(jobs) {
  const dir = mkdtempSync(join(tmpdir(), "keep-busy-"));
  const path = join(dir, "jobs.json");
  writeFileSync(
    path,
    JSON.stringify(
      {
        contract: "keep-busy.lease.v1",
        jobs,
      },
      null,
      2,
    ),
  );
  return loadQueue(path);
}

function openJob(id, extras = {}) {
  return {
    id,
    title: id,
    repo: extras.repo ?? "yuro1991-afk/opensussy",
    status: extras.status ?? "open",
    priority: extras.priority ?? 10,
    invasiveness: "small",
    why: "test",
    acceptance: ["done"],
    lease: extras.lease ?? null,
    evidence: null,
    blockedReason: extras.blockedReason,
  };
}

test("claimNext picks the lowest priority open job and leases it", () => {
  const queue = fixture([
    openJob("later", { priority: 30 }),
    openJob("first", { priority: 5 }),
  ]);
  const now = new Date("2026-09-14T16:00:00.000Z");
  const job = claimNext(queue, { agent: "agent-a", now, leaseMs: 60_000 });
  assert.equal(job.id, "first");
  assert.equal(job.status, "claimed");
  assert.equal(job.lease.agent, "agent-a");
  assert.equal(job.lease.until, "2026-09-14T16:01:00.000Z");
});

test("a second agent cannot steal an active lease", () => {
  const queue = fixture([openJob("only")]);
  claimJob(queue, "only", { agent: "agent-a" });
  assert.throws(() => claimJob(queue, "only", { agent: "agent-b" }), (error) => {
    assert.equal(error instanceof QueueError, true);
    assert.equal(error.code, "busy");
    return true;
  });
});

test("expired leases return to open and can be claimed", () => {
  const now = new Date("2026-09-14T16:00:00.000Z");
  const queue = fixture([
    openJob("stale", {
      status: "claimed",
      lease: {
        agent: "old",
        since: "2026-09-14T13:00:00.000Z",
        until: "2026-09-14T15:00:00.000Z",
        heartbeat: "2026-09-14T13:00:00.000Z",
      },
    }),
  ]);
  assert.equal(expireLeases(queue, { now }), 1);
  assert.equal(queue.jobs[0].status, "open");
  const job = claimJob(queue, "stale", { agent: "agent-b", now });
  assert.equal(job.lease.agent, "agent-b");
});

test("complete rejects missing evidence (no false green)", () => {
  const queue = fixture([openJob("needs-proof")]);
  claimJob(queue, "needs-proof", { agent: "agent-a" });
  assert.throws(
    () => completeJob(queue, "needs-proof", { agent: "agent-a", evidence: {} }),
    (error) => {
      assert.equal(error.code, "evidence_required");
      return true;
    },
  );
});

test("complete accepts a PR URL and clears the lease", () => {
  const queue = fixture([openJob("shipped")]);
  claimJob(queue, "shipped", { agent: "agent-a" });
  const job = completeJob(queue, "shipped", {
    agent: "agent-a",
    evidence: { pr: "https://github.com/yuro1991-afk/opensussy/pull/9" },
  });
  assert.equal(job.status, "done");
  assert.equal(job.lease, null);
  assert.equal(job.evidence.pr, "https://github.com/yuro1991-afk/opensussy/pull/9");
});

test("blocked jobs are not claimable", () => {
  const queue = fixture([
    openJob("do-not-reopen-genesis-pr-1", {
      status: "blocked",
      repo: "yuro1991-afk/main#genesis-siblings",
      blockedReason: "user closed duplicate GitHub PR #1",
    }),
  ]);
  assert.throws(() => claimJob(queue, "do-not-reopen-genesis-pr-1", { agent: "x" }), (error) => {
    assert.equal(error.code, "blocked");
    return true;
  });
});

test("dronehive jobs are skipped by claimNext", () => {
  const queue = fixture([
    openJob("drone-pr-2", { repo: "yuro1991-afk/dronehive", priority: 1 }),
    openJob("opensussy-docs", { repo: "yuro1991-afk/opensussy", priority: 20 }),
  ]);
  const job = claimNext(queue, { agent: "agent-a" });
  assert.equal(job.id, "opensussy-docs");
});

test("only the lease holder can heartbeat or release", () => {
  const queue = fixture([openJob("held")]);
  claimJob(queue, "held", { agent: "agent-a" });
  assert.throws(() => heartbeat(queue, "held", { agent: "agent-b" }), (error) => {
    assert.equal(error.code, "not_holder");
    return true;
  });
  releaseJob(queue, "held", { agent: "agent-a" });
  assert.equal(queue.jobs[0].status, "open");
  assert.equal(queue.jobs[0].lease, null);
});
