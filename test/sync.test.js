import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadLedger, saveLedger } from "../src/ledger.js";
import { loadRoster, saveRoster } from "../src/dispatch.js";
import {
  SYNC_CONTRACT,
  normalizeAgents,
  syncRoster,
  unusedGenesisCards,
  writeAgents,
} from "../src/sync.js";
import { runCli } from "../src/cli.js";

const NOW = Date.parse("2026-09-14T16:00:00.000Z");

function job(id, extras = {}) {
  return {
    id,
    title: id,
    repo: "origin.cursor.com/git/yuri-afk/genesis",
    kind: extras.kind ?? "origin-slice",
    priority: extras.priority ?? 10,
    status: extras.status ?? "open",
    claim: extras.claim ?? null,
    notes: "",
    verify: "true",
    files: [],
    collision: "",
  };
}

test("normalizeAgents accepts cursor-cloud shaped lists", () => {
  const rows = normalizeAgents({
    agents: [{ bcId: "bc-new", name: "New idle", status: "IDLE" }],
  });
  assert.equal(rows[0].bcId, "bc-new");
  assert.equal(rows[0].status, "IDLE");
});

test("syncRoster maps a new idle agent onto the next unused world card", () => {
  const ledger = {
    jobs: [
      job("genesis-world-layer-102", { priority: 12 }),
      job("genesis-world-canon-93", { priority: 13 }),
      job("gub-inventory-tick", { priority: 6 }),
    ],
  };
  const roster = {
    assignments: [{ bcId: "bc-old", name: "Parked", jobId: "genesis-world-layer-102" }],
  };
  const packet = syncRoster(
    ledger,
    roster,
    [
      { bcId: "bc-old", name: "Parked", status: "IDLE" },
      { bcId: "bc-new", name: "New idle", status: "IDLE" },
      { bcId: "bc-run", name: "Running", status: "RUNNING" },
    ],
    NOW,
  );
  assert.equal(packet.contract, SYNC_CONTRACT);
  assert.equal(packet.idle, 2);
  assert.equal(packet.running, 1);
  assert.deepEqual(packet.added, [{ bcId: "bc-new", name: "New idle", jobId: "genesis-world-canon-93" }]);
  assert.equal(packet.uncovered.length, 0);
  assert.ok(packet.leftover.includes("gub-inventory-tick"));
  assert.equal(roster.assignments.length, 2);
});

test("syncRoster does not lease or steal a claimed card", () => {
  const ledger = {
    jobs: [
      job("gub-superbrain-probe", {
        priority: 3,
        status: "claimed",
        claim: {
          agentId: "bc-here",
          claimedAt: "2026-09-14T16:00:00.000Z",
          leaseUntil: "2026-09-14T17:00:00.000Z",
        },
      }),
      job("gub-inventory-tick", { priority: 6 }),
    ],
  };
  const roster = { assignments: [] };
  const packet = syncRoster(
    ledger,
    roster,
    [{ bcId: "bc-new", name: "New", status: "IDLE" }],
    NOW,
  );
  assert.equal(packet.added[0].jobId, "gub-inventory-tick");
  assert.ok(!packet.leftover.includes("gub-superbrain-probe"));
});

test("unusedGenesisCards prefers world planes over GUB inventory", () => {
  const ledger = {
    jobs: [job("gub-inventory-tick", { priority: 6 }), job("genesis-world-map", { priority: 36 })],
  };
  const leftover = unusedGenesisCards(ledger, new Set(), NOW);
  assert.equal(leftover[0].id, "genesis-world-map");
  assert.equal(leftover[1].id, "gub-inventory-tick");
});

test("cli sync --write persists a new assignment and launch file", async () => {
  const root = mkdtempSync(join(tmpdir(), "agent-ops-sync-"));
  saveLedger(join(root, "ledger", "queue.json"), {
    jobs: [job("genesis-world-layer-102", { priority: 12 })],
  });
  saveRoster(join(root, "ledger", "roster.json"), { assignments: [] });
  const agentsPath = join(root, "agents.json");
  writeAgents({ agents: [{ bcId: "bc-new", name: "New idle", status: "IDLE" }] }, agentsPath);
  const launches = join(root, "reviews", "launch");
  const chunks = [];
  const code = await runCli(
    ["sync", "--agents", agentsPath, "--write", "--out", launches],
    {
      nowMs: NOW,
      root,
      write: (value) => {
        chunks.push(value);
      },
    },
  );
  assert.equal(code, 0);
  const packet = JSON.parse(chunks.join(""));
  assert.equal(packet.added[0].jobId, "genesis-world-layer-102");
  const roster = loadRoster(join(root, "ledger", "roster.json"));
  assert.equal(roster.assignments[0].bcId, "bc-new");
  const body = readFileSync(join(launches, "genesis-world-layer-102.md"), "utf8");
  assert.match(body, /origin auth status/);
});

test("live leftover Superbrain sync attaches take-instead apply pair", () => {
  const ledger = loadLedger(new URL("../ledger/queue.json", import.meta.url));
  const roster = structuredClone(
    loadRoster(new URL("../ledger/roster.json", import.meta.url)),
  );
  const afterLease = Date.parse("2026-09-14T19:00:00.000Z");
  const parked = roster.assignments.map((row) => ({
    bcId: row.bcId,
    name: row.name,
    status: "IDLE",
  }));
  const leftoverOnly = syncRoster(ledger, structuredClone(roster), parked, afterLease);
  assert.equal(leftoverOnly.added.length, 0);
  assert.equal(leftoverOnly.leftover[0], "gub-superbrain-probe");
  assert.equal(leftoverOnly.leftoverTakeInstead, "dronehive-unicode-ci");
  assert.ok(
    leftoverOnly.leftoverApplyNext.some((line) => line.includes("dronehive-pro-chat-cp1252.patch")),
  );
  assert.equal(
    leftoverOnly.leftoverProveAfterApplyCommand,
    "node src/cli.js patches --prove-after-apply --job dronehive-unicode-ci",
  );
  const withNewcomer = syncRoster(
    ledger,
    roster,
    [...parked, { bcId: "bc-brand-new-sync", name: "New leftover", status: "IDLE" }],
    afterLease,
  );
  assert.equal(withNewcomer.added[0].jobId, "gub-superbrain-probe");
  assert.equal(withNewcomer.added[0].takeInstead, "dronehive-unicode-ci");
  assert.ok(withNewcomer.added[0].applyNext.some((line) => line.includes("dronehive-pro-chat-cp1252.patch")));
  assert.notEqual(withNewcomer.leftover[0], "gub-superbrain-probe");
  assert.equal(withNewcomer.leftoverTakeInstead, undefined);
});

test("repo roster already covers the current idle set", () => {
  const ledger = loadLedger(new URL("../ledger/queue.json", import.meta.url));
  const roster = loadRoster(new URL("../ledger/roster.json", import.meta.url));
  const agents = roster.assignments.map((row) => ({
    bcId: row.bcId,
    name: row.name,
    status: "IDLE",
  }));
  const packet = syncRoster(ledger, structuredClone(roster), agents, NOW);
  assert.equal(packet.added.length, 0);
  assert.equal(packet.uncovered.length, 0);
  assert.equal(packet.idle, 36);
});
