import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  blockJob,
  claimJob,
  claimNextJob,
  claimedByAgent,
  completeJob,
  effectiveStatus,
  listJobs,
  loadLedger,
  nextJob,
  releaseJob,
  saveLedger,
  summarize,
} from "../src/ledger.js";
import { isGenesisJob, isWorldPhaseJob } from "../src/kinds.js";

const NOW = Date.parse("2026-09-14T16:00:00.000Z");

function sampleLedger() {
  return {
    jobs: [
      {
        id: "high",
        title: "High priority",
        repo: "github.com/yuro1991-afk/dronehive",
        kind: "fix",
        priority: 1,
        status: "open",
        claim: null,
        notes: "",
        verify: "true",
        files: [],
        collision: "",
      },
      {
        id: "low",
        title: "Low priority",
        repo: "github.com/yuro1991-afk/dronehive",
        kind: "implement",
        priority: 9,
        status: "open",
        claim: null,
        notes: "",
        verify: "true",
        files: [],
        collision: "",
      },
    ],
  };
}

test("nextJob picks the lowest priority number", () => {
  const job = nextJob(sampleLedger(), {}, NOW);
  assert.equal(job.id, "high");
});

test("claim then complete is exclusive", () => {
  const ledger = sampleLedger();
  claimJob(ledger, "high", "agent-a", NOW, 60_000);
  assert.equal(effectiveStatus(ledger.jobs[0], NOW + 1), "claimed");
  assert.throws(() => claimJob(ledger, "high", "agent-b", NOW + 1, 60_000), /claimed by agent-a/);
  completeJob(ledger, "high", "agent-a", NOW + 1);
  assert.equal(ledger.jobs[0].status, "done");
  assert.equal(nextJob(ledger, {}, NOW + 1).id, "low");
});

test("claimNextJob is exclusive and sticky per agent", () => {
  const ledger = sampleLedger();
  const first = claimNextJob(ledger, "agent-a", {}, NOW, 60_000);
  const again = claimNextJob(ledger, "agent-a", {}, NOW + 1, 60_000);
  const other = claimNextJob(ledger, "agent-b", {}, NOW + 2, 60_000);
  assert.equal(first.id, "high");
  assert.equal(again.id, "high");
  assert.equal(other.id, "low");
  assert.equal(claimedByAgent(ledger, "agent-a", {}, NOW + 2).id, "high");
});

test("expired lease becomes claimable", () => {
  const ledger = sampleLedger();
  claimJob(ledger, "high", "agent-a", NOW, 1_000);
  assert.equal(effectiveStatus(ledger.jobs[0], NOW + 5_000), "open");
  const job = claimJob(ledger, "high", "agent-b", NOW + 5_000, 60_000);
  assert.equal(job.claim.agentId, "agent-b");
});

test("block and release", () => {
  const ledger = sampleLedger();
  claimJob(ledger, "high", "agent-a", NOW, 60_000);
  blockJob(ledger, "high", "agent-a", "waiting on CI", NOW + 1);
  assert.equal(ledger.jobs[0].status, "blocked");
  assert.match(ledger.jobs[0].notes, /waiting on CI/);
  releaseJob(ledger, "high", "agent-a", NOW + 2);
  assert.equal(ledger.jobs[0].status, "open");
  assert.equal(ledger.jobs[0].claim, null);
});

test("load and save round-trip", () => {
  const dir = mkdtempSync(join(tmpdir(), "agent-ops-"));
  const path = join(dir, "queue.json");
  const ledger = sampleLedger();
  saveLedger(path, ledger);
  const loaded = loadLedger(path);
  assert.deepEqual(loaded, ledger);
});

test("summarize counts effective statuses", () => {
  const ledger = sampleLedger();
  claimJob(ledger, "high", "agent-a", NOW, 1_000);
  const live = summarize(ledger, NOW);
  assert.equal(live.claimed, 1);
  assert.equal(live.open, 1);
  const expired = summarize(ledger, NOW + 5_000);
  assert.equal(expired.claimed, 0);
  assert.equal(expired.open, 2);
});

test("next --here skips relaunch cards", () => {
  const ledger = loadLedger(new URL("../ledger/queue.json", import.meta.url));
  const here = nextJob(ledger, { scope: "here", genesis: true }, NOW);
  assert.equal(here, null);
});

test("repo queue validates", () => {
  const ledger = loadLedger(new URL("../ledger/queue.json", import.meta.url));
  assert.ok(ledger.jobs.length >= 8);
  const next = nextJob(ledger, { genesis: true }, NOW);
  assert.equal(next.id, "gub-inventory-tick");
  assert.equal(
    ledger.jobs.find((job) => job.id === "gub-superbrain-probe").status,
    "claimed",
  );
  assert.equal(
    ledger.jobs.find((job) => job.id === "do-not-reopen-main-pr1").status,
    "done",
  );
  assert.equal(
    ledger.jobs.find((job) => job.id === "dronehive-unicode-ci").status,
    "open",
  );
});

test("genesis filter skips sibling GitHub cards even when they are open", () => {
  const ledger = sampleLedger();
  ledger.jobs.push({
    id: "origin",
    title: "Origin",
    repo: "origin.cursor.com/git/yuri-afk/genesis",
    kind: "origin-slice",
    priority: 8,
    status: "open",
    claim: null,
    notes: "",
    verify: "true",
    files: [],
    collision: "",
  });
  assert.equal(isGenesisJob(ledger.jobs[0]), false);
  assert.equal(isGenesisJob(ledger.jobs[2]), true);
  assert.equal(nextJob(ledger, {}, NOW).id, "high");
  assert.equal(nextJob(ledger, { genesis: true }, NOW).id, "origin");
  assert.equal(listJobs(ledger, { genesis: true }, NOW).length, 1);
});

test("world filter keeps Python world phases and skips GUB catalog", () => {
  const ledger = loadLedger(new URL("../ledger/queue.json", import.meta.url));
  assert.equal(isWorldPhaseJob(ledger.jobs.find((job) => job.id === "genesis-world-layer-102")), true);
  assert.equal(isWorldPhaseJob(ledger.jobs.find((job) => job.id === "genesis-world-unifier")), true);
  assert.equal(isWorldPhaseJob(ledger.jobs.find((job) => job.id === "genesis-python-infra-50")), true);
  assert.equal(isWorldPhaseJob(ledger.jobs.find((job) => job.id === "gub-inventory-tick")), false);
  assert.equal(isWorldPhaseJob(ledger.jobs.find((job) => job.id === "catalog-expand-domain")), false);
  assert.equal(nextJob(ledger, { world: true }, NOW).id, "genesis-world-layer-102");
  const world = listJobs(ledger, { world: true, status: "open" }, NOW);
  assert.ok(world.length >= 17);
  assert.ok(world.every((job) => isWorldPhaseJob(job)));
});

test("rejects unknown kind", () => {
  const dir = mkdtempSync(join(tmpdir(), "agent-ops-"));
  const path = join(dir, "queue.json");
  writeFileSync(
    path,
    JSON.stringify({
      jobs: [
        {
          id: "bad",
          title: "bad",
          repo: "x",
          kind: "spawn-malware",
          priority: 1,
          status: "open",
          claim: null,
          notes: "",
          verify: "",
          files: [],
          collision: "",
        },
      ],
    }),
  );
  assert.throws(() => loadLedger(path), /invalid kind/);
});
