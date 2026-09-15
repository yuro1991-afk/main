import { existsSync, mkdtempSync, readFileSync } from "node:fs";
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
  buildBusy,
  buildSlots,
  buildSlotsForJob,
  claimBusyJob,
  leftoverLaunchRows,
  loadRoster,
  peekBusyJob,
  renderLeftoverLaunch,
} from "../src/dispatch.js";
import { loadSiblings } from "../src/siblings.js";
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

test("busy JSON for a cataloged job includes applyNext", () => {
  const ledger = loadLedger(new URL("../ledger/queue.json", import.meta.url));
  const job = ledger.jobs.find((item) => item.id === "dronehive-unicode-ci");
  const siblings = loadSiblings(new URL("../ledger/siblings.json", import.meta.url));
  const packet = buildBusy(job, siblings, []);
  assert.ok(job);
  assert.ok(packet.applyNext.some((line) => line.includes("dronehive-pro-chat-cp1252.patch")));
  assert.ok(packet.applyNext.some((line) => line.startsWith("git clone https://github.com/yuro1991-afk/dronehive.git")));
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

test("peekBusyJob uses the roster card without claiming", () => {
  const ledger = loadLedger(fileURLToPath(new URL("../ledger/queue.json", import.meta.url)));
  const roster = loadRoster(fileURLToPath(new URL("../ledger/roster.json", import.meta.url)));
  const parked = roster.assignments[0];
  const job = peekBusyJob(ledger, parked.bcId, { genesis: true }, NOW, roster);
  assert.equal(job.id, parked.jobId);
  assert.equal(job.status, "open");
  assert.equal(job.claim, null);
  const leftover = peekBusyJob(ledger, "bc-brand-new", { genesis: true }, NOW, roster);
  assert.equal(leftover.id, "gub-route-intent");
  assert.equal(leftover.status, "open");
});

test("claimBusyJob uses the roster card instead of leftover next", () => {
  const ledger = loadLedger(fileURLToPath(new URL("../ledger/queue.json", import.meta.url)));
  const roster = loadRoster(fileURLToPath(new URL("../ledger/roster.json", import.meta.url)));
  const parked = roster.assignments[0];
  const job = claimBusyJob(ledger, parked.bcId, { genesis: true }, NOW, roster);
  assert.equal(job.id, parked.jobId);
  assert.notEqual(job.id, "gub-inventory-tick");
  const leftoverAgent = claimBusyJob(ledger, "bc-brand-new", { genesis: true }, NOW, roster);
  assert.equal(leftoverAgent.id, "gub-route-intent");
});

test("busy --agent claims the roster Origin card, not leftover next", async () => {
  const dir = mkdtempSync(join(tmpdir(), "agent-ops-busy-roster-"));
  const ledgerPath = join(dir, "queue.json");
  saveLedger(ledgerPath, loadLedger(fileURLToPath(new URL("../ledger/queue.json", import.meta.url))));
  const rosterPath = fileURLToPath(new URL("../ledger/roster.json", import.meta.url));
  const parked = loadRoster(rosterPath).assignments[0];
  const result = await capture([
    "busy",
    "--agent",
    parked.bcId,
    "--ledger",
    ledgerPath,
    "--roster",
    rosterPath,
    "--siblings",
    SIBLINGS,
    "--out",
    join(dir, "out.json"),
  ]);
  assert.equal(result.code, 0);
  assert.match(result.out, new RegExp(`"jobId": "${parked.jobId}"`));
  assert.doesNotMatch(result.out, /"jobId": "gub-inventory-tick"/);
  const written = JSON.parse(readFileSync(join(dir, "out.json"), "utf8"));
  assert.equal(written.jobId, parked.jobId);
  assert.equal(written.reserved, true);
});

test("assign maps every idle pad agent to a distinct Origin world card", () => {
  const ledger = loadLedger(new URL("../ledger/queue.json", import.meta.url));
  const roster = loadRoster(fileURLToPath(new URL("../ledger/roster.json", import.meta.url)));
  const packet = buildAssign(ledger, roster, NOW);
  assert.equal(packet.contract, ASSIGN_CONTRACT);
  assert.equal(packet.count, 36);
  assert.equal(packet.next.jobId, "genesis-world-layer-102");
  const ids = packet.assignments.map((row) => row.jobId);
  const agents = packet.assignments.map((row) => row.bcId);
  assert.equal(new Set(ids).size, 36);
  assert.equal(new Set(agents).size, 36);
  assert.ok(packet.assignments.some((row) => row.jobId === "genesis-world-unifier"));
  assert.ok(packet.assignments.some((row) => row.jobId === "genesis-world-robotics"));
  assert.ok(packet.assignments.every((row) => row.relaunch.kind === "origin"));
  assert.ok(packet.assignments.every((row) => row.status === "open"));
  assert.ok(packet.assignments.every((row) => row.launch === `reviews/launch/${row.jobId}.md`));
  assert.ok(packet.assignments.every((row) => /Leave this pad/.test(row.prompt)));
  assert.match(packet.next.prompt, /genesis-world-layer-102/);
  assert.ok(ids.includes("gub-inventory-tick"));
  assert.ok(!ids.includes("catalog-expand-domain"));
  assert.ok(!ids.includes("gub-route-intent"));
  assert.ok(!ids.includes("dronehive-unicode-ci"));
  assert.equal(packet.leftoverNext, "gub-route-intent");
  assert.equal(packet.leftover[0], "gub-route-intent");
  assert.ok(packet.leftover.includes("gub-run-playbook"));
  assert.ok(packet.leftover.includes("catalog-expand-domain"));
  assert.ok(!packet.leftover.includes("gub-inventory-tick"));
});

test("cli assign writes paste-ready Origin launch files", async () => {
  const out = mkdtempSync(join(tmpdir(), "agent-ops-launch-"));
  const result = await capture(["assign", "--out", out]);
  assert.equal(result.code, 0);
  assert.match(result.out, /genesis-world-layer-102/);
  assert.match(result.out, /genesis-world-unifier/);
  assert.match(result.out, /genesis-python-infra-50/);
  assert.doesNotMatch(result.out, /dronehive-unicode-ci/);
  const dest = join(out, "genesis-world-layer-102.md");
  assert.equal(existsSync(dest), true);
  const text = readFileSync(dest, "utf8");
  assert.match(text, /Genesis catalog handoff/);
  assert.match(text, /cursor\.com\/codebase\/yuri-afk\/genesis/);
  assert.match(text, /origin auth status/);
  assert.match(text, /repo clone yuri-afk\/genesis/);
  assert.doesNotMatch(text, /dronehive-unicode-ci/);
  const leftover = join(out, "gub-route-intent.md");
  assert.equal(existsSync(leftover), true);
  const leftoverText = readFileSync(leftover, "utf8");
  assert.match(leftoverText, /Leftover unused — gub-route-intent/);
  assert.match(leftoverText, /No parked pad agent owns this card yet/);
  assert.doesNotMatch(leftoverText, /Leftover unused — gub-inventory-tick/);
  assert.doesNotMatch(leftoverText, /Agent workload management \(fork\)/);
  assert.match(result.out, /"leftoverNext": "gub-route-intent"/);
});

test("peekBusyJob --world does not steal a rostered world card", () => {
  const ledger = loadLedger(new URL("../ledger/queue.json", import.meta.url));
  const roster = loadRoster(fileURLToPath(new URL("../ledger/roster.json", import.meta.url)));
  assert.equal(peekBusyJob(ledger, undefined, { world: true }, NOW, roster), null);
  assert.equal(peekBusyJob(ledger, "bc-brand-new", { world: true }, NOW, roster), null);
  const parked = roster.assignments[0];
  assert.equal(peekBusyJob(ledger, parked.bcId, { world: true }, NOW, roster).id, parked.jobId);
  const claimed = claimBusyJob(ledger, "bc-brand-new", { world: true }, NOW, roster);
  assert.equal(claimed, null);
  assert.equal(ledger.jobs.find((job) => job.id === "genesis-world-layer-102").claim, null);
});

test("leftover launch rows skip rostered cards", () => {
  const ledger = loadLedger(new URL("../ledger/queue.json", import.meta.url));
  const roster = loadRoster(fileURLToPath(new URL("../ledger/roster.json", import.meta.url)));
  const rows = leftoverLaunchRows(ledger, roster, NOW);
  assert.equal(rows[0].jobId, "gub-route-intent");
  assert.match(rows[0].prompt, /Leftover unused — gub-route-intent/);
  assert.ok(!rows.some((row) => row.jobId === "gub-inventory-tick"));
  assert.ok(!rows.some((row) => row.jobId === "genesis-world-layer-102"));
  assert.match(renderLeftoverLaunch(null), /No leftover unused Genesis card/);
  assert.ok(
    rows.every((row) =>
      existsSync(fileURLToPath(new URL(`../reviews/launch/${row.jobId}.md`, import.meta.url))),
    ),
  );
});

test("slots --job peeks a blocked catalog card with applyNext", () => {
  const ledger = loadLedger(new URL("../ledger/queue.json", import.meta.url));
  const job = ledger.jobs.find((item) => item.id === "dronehive-unicode-ci");
  assert.ok(job);
  const packet = buildSlotsForJob(job);
  assert.equal(packet.contract, SLOTS_CONTRACT);
  assert.equal(packet.count, 1);
  assert.equal(packet.slots[0].id, "dronehive-unicode-ci");
  assert.ok(packet.applyNext.some((line) => line.includes("dronehive-pro-chat-cp1252.patch")));
  assert.deepEqual(packet.slots[0].applyNext, packet.applyNext);
});

test("cli slots --job peeks the named catalog card", async () => {
  const result = await capture(["slots", "--job", "dronehive-unicode-ci"]);
  assert.equal(result.code, 0);
  const parsed = JSON.parse(result.out);
  assert.equal(parsed.slots[0].id, "dronehive-unicode-ci");
  assert.ok(parsed.applyNext.some((line) => line.includes("dronehive-pro-chat-cp1252.patch")));
  assert.doesNotMatch(result.out, /gub-inventory-tick/);
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
