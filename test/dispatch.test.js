import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import assert from "node:assert/strict";
import { loadLedger, saveLedger } from "../src/ledger.js";
import {
  ASSIGN_CONTRACT,
  BUSY_CONTRACT,
  SLOTS_CONTRACT,
  buildAssign,
  buildSlots,
  loadRoster,
} from "../src/dispatch.js";
import { runCli } from "../src/cli.js";

const NOW = Date.parse("2026-09-14T16:00:00.000Z");
const SIBLINGS = fileURLToPath(new URL("../ledger/siblings.json", import.meta.url));

function seededPath() {
  const dir = mkdtempSync(join(tmpdir(), "agent-ops-dispatch-"));
  const path = join(dir, "queue.json");
  saveLedger(path, {
    jobs: [
      {
        id: "first",
        title: "First",
        repo: "origin.cursor.com/git/yuri-afk/genesis",
        kind: "origin-slice",
        priority: 1,
        status: "open",
        claim: null,
        notes: "",
        verify: "true",
        files: [],
        collision: "",
      },
      {
        id: "second",
        title: "Second",
        repo: "origin.cursor.com/git/yuri-afk/genesis",
        kind: "origin-slice",
        priority: 2,
        status: "open",
        claim: null,
        notes: "",
        verify: "true",
        files: [],
        collision: "",
      },
    ],
  });
  return path;
}

async function capture(argv, extras = {}) {
  const chunks = [];
  const code = await runCli(argv, {
    nowMs: NOW,
    write: (value) => {
      chunks.push(value);
    },
    ...extras,
  });
  return { code, out: chunks.join("") };
}

test("slots lists open Genesis cards in priority order", () => {
  const ledger = loadLedger(new URL("../ledger/queue.json", import.meta.url));
  const packet = buildSlots(ledger, { genesis: true }, NOW);
  assert.equal(packet.contract, SLOTS_CONTRACT);
  assert.ok(packet.count >= 8);
  assert.equal(packet.slots[0].id, "gub-inventory-tick");
  assert.ok(packet.slots.some((slot) => slot.id === "genesis-python-bridge-57"));
  assert.ok(packet.claimed.some((job) => job.id === "gub-superbrain-probe"));
});

test("busy without agent peeks and does not claim", async () => {
  const ledgerPath = seededPath();
  const out = join(mkdtempSync(join(tmpdir(), "agent-ops-busy-peek-")), "last-dispatch.json");
  const result = await capture(["busy", "--ledger", ledgerPath, "--siblings", SIBLINGS, "--out", out]);
  assert.equal(result.code, 0);
  assert.match(result.out, new RegExp(BUSY_CONTRACT));
  assert.match(result.out, /"reserved": false/);
  assert.match(result.out, /"jobId": "first"/);
  const ledger = loadLedger(ledgerPath);
  assert.equal(ledger.jobs[0].status, "open");
});

test("busy --agent claims next; a second agent gets the next slot", async () => {
  const ledgerPath = seededPath();
  const root = mkdtempSync(join(tmpdir(), "agent-ops-busy-claim-"));
  const first = await capture([
    "busy",
    "--agent",
    "bc-a",
    "--ledger",
    ledgerPath,
    "--siblings",
    SIBLINGS,
    "--out",
    join(root, "a.json"),
  ]);
  const second = await capture([
    "busy",
    "--agent",
    "bc-b",
    "--ledger",
    ledgerPath,
    "--siblings",
    SIBLINGS,
    "--out",
    join(root, "b.json"),
  ]);
  const again = await capture([
    "busy",
    "--agent",
    "bc-a",
    "--ledger",
    ledgerPath,
    "--siblings",
    SIBLINGS,
    "--out",
    join(root, "a2.json"),
  ]);
  assert.equal(first.code, 0);
  assert.equal(second.code, 0);
  assert.match(first.out, /"jobId": "first"/);
  assert.match(first.out, /"reserved": true/);
  assert.match(second.out, /"jobId": "second"/);
  assert.match(again.out, /"jobId": "first"/);
  const written = JSON.parse(readFileSync(join(root, "a.json"), "utf8"));
  assert.equal(written.jobId, "first");
});

test("assign maps every idle pad agent to a distinct Origin world card", () => {
  const ledger = loadLedger(new URL("../ledger/queue.json", import.meta.url));
  const roster = loadRoster(fileURLToPath(new URL("../ledger/roster.json", import.meta.url)));
  const packet = buildAssign(ledger, roster, NOW);
  assert.equal(packet.contract, ASSIGN_CONTRACT);
  assert.equal(packet.count, 35);
  assert.equal(packet.next.jobId, "genesis-world-layer-102");
  const ids = packet.assignments.map((row) => row.jobId);
  const agents = packet.assignments.map((row) => row.bcId);
  assert.equal(new Set(ids).size, 35);
  assert.equal(new Set(agents).size, 35);
  assert.ok(packet.assignments.some((row) => row.jobId === "genesis-world-unifier"));
  assert.ok(packet.assignments.some((row) => row.jobId === "genesis-world-robotics"));
  assert.ok(packet.assignments.every((row) => row.relaunch.kind === "origin"));
  assert.ok(packet.assignments.every((row) => row.status === "open"));
  assert.ok(!ids.includes("catalog-expand-domain"));
  assert.ok(!ids.includes("gub-inventory-tick"));
  assert.ok(!ids.includes("dronehive-unicode-ci"));
});

test("cli assign prints the world roster", async () => {
  const result = await capture(["assign"]);
  assert.equal(result.code, 0);
  assert.match(result.out, /genesis-world-layer-102/);
  assert.match(result.out, /genesis-world-unifier/);
  assert.match(result.out, /genesis-python-infra-50/);
  assert.doesNotMatch(result.out, /dronehive-unicode-ci/);
  assert.doesNotMatch(result.out, /catalog-expand-domain/);
});

test("cli slots defaults to Genesis cards", async () => {
  const result = await capture(["slots"]);
  assert.equal(result.code, 0);
  assert.match(result.out, /gub-inventory-tick/);
  assert.match(result.out, /genesis-python-bridge-57/);
  assert.match(result.out, /genesis-world-unifier/);
  assert.doesNotMatch(result.out, /dronehive-unicode-ci/);
});

test("cli slots --world hides GUB inventory and catalog cards", async () => {
  const result = await capture(["slots", "--world"]);
  assert.equal(result.code, 0);
  assert.match(result.out, /genesis-world-layer-102/);
  assert.match(result.out, /genesis-world-unifier/);
  assert.doesNotMatch(result.out, /gub-inventory-tick/);
  assert.doesNotMatch(result.out, /catalog-expand-domain/);
  assert.doesNotMatch(result.out, /dronehive-unicode-ci/);
});
