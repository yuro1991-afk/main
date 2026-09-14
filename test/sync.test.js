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

test("syncRoster maps a new idle agent onto the next unused GitHub card", () => {
  const gh = (id, priority) => ({
    ...job(id, { priority, kind: "fix" }),
    repo: "github.com/yuro1991-afk/dronehive",
  });
  const ledger = {
    jobs: [gh("dronehive-unicode-ci", 1), gh("dronehive-ubuntu-smoke", 5)],
  };
  const roster = {
    assignments: [{ bcId: "bc-old", name: "Parked", jobId: "dronehive-unicode-ci" }],
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
  assert.deepEqual(packet.added, [{ bcId: "bc-new", name: "New idle", jobId: "dronehive-ubuntu-smoke" }]);
  assert.equal(packet.uncovered.length, 0);
  assert.ok(!packet.leftover.includes("dronehive-unicode-ci"));
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
      {
        ...job("dronehive-unicode-ci", { priority: 1, kind: "fix" }),
        repo: "github.com/yuro1991-afk/dronehive",
      },
    ],
  };
  const roster = { assignments: [] };
  const packet = syncRoster(
    ledger,
    roster,
    [{ bcId: "bc-new", name: "New", status: "IDLE" }],
    NOW,
  );
  assert.equal(packet.added[0].jobId, "dronehive-unicode-ci");
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
    jobs: [{
      ...job("dronehive-unicode-ci", { priority: 1, kind: "fix" }),
      repo: "github.com/yuro1991-afk/dronehive",
    }],
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
  assert.equal(packet.added[0].jobId, "dronehive-unicode-ci");
  const roster = loadRoster(join(root, "ledger", "roster.json"));
  assert.equal(roster.assignments[0].bcId, "bc-new");
  const body = readFileSync(join(launches, "dronehive-unicode-ci.md"), "utf8");
  assert.match(body, /dronehive-unicode-ci/);
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
  assert.equal(packet.idle, 21);
});
