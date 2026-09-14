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
  buildSlots,
  claimBusyJob,
  leftoverLaunchRows,
  loadRoster,
  peekBusyJob,
  renderLeftoverLaunch,
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
        id: "second",
        title: "Second",
        repo: "github.com/yuro1991-afk/opensussy",
        kind: "implement",
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

test("peekBusyJob uses the roster card without claiming", () => {
  const ledger = loadLedger(fileURLToPath(new URL("../ledger/queue.json", import.meta.url)));
  const roster = loadRoster(fileURLToPath(new URL("../ledger/roster.json", import.meta.url)));
  const parked = roster.assignments[0];
  const job = peekBusyJob(ledger, parked.bcId, { github: true }, NOW, roster);
  assert.equal(job.id, parked.jobId);
  assert.equal(job.status, "open");
  assert.equal(job.claim, null);
  const leftover = peekBusyJob(ledger, "bc-brand-new", { github: true }, NOW, roster);
  assert.equal(leftover.id, "review-landing-pad-prs");
  assert.equal(leftover.status, "open");
});

test("claimBusyJob uses the roster card instead of leftover next", () => {
  const ledger = loadLedger(fileURLToPath(new URL("../ledger/queue.json", import.meta.url)));
  const roster = loadRoster(fileURLToPath(new URL("../ledger/roster.json", import.meta.url)));
  const parked = roster.assignments[0];
  const job = claimBusyJob(ledger, parked.bcId, { github: true }, NOW, roster);
  assert.equal(job.id, parked.jobId);
  assert.notEqual(job.id, "review-landing-pad-prs");
  const leftoverAgent = claimBusyJob(ledger, "bc-brand-new", { github: true }, NOW, roster);
  assert.equal(leftoverAgent.id, "review-landing-pad-prs");
});

test("busy --agent claims the roster GitHub card, not leftover next", async () => {
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

test("assign maps parked agents to distinct GitHub sibling cards", () => {
  const ledger = loadLedger(new URL("../ledger/queue.json", import.meta.url));
  const roster = loadRoster(fileURLToPath(new URL("../ledger/roster.json", import.meta.url)));
  const packet = buildAssign(ledger, roster, NOW);
  assert.equal(packet.contract, ASSIGN_CONTRACT);
  assert.equal(packet.count, 20);
  assert.equal(packet.next.jobId, "dronehive-unicode-ci");
  const ids = packet.assignments.map((row) => row.jobId);
  const agents = packet.assignments.map((row) => row.bcId);
  assert.equal(new Set(ids).size, 20);
  assert.equal(new Set(agents).size, 20);
  assert.ok(packet.assignments.some((row) => row.jobId === "dronehive-unicode-ci"));
  assert.ok(packet.assignments.some((row) => row.jobId === "bloom-health-probe"));
  assert.ok(packet.assignments.every((row) => row.relaunch.kind === "github" || row.relaunch.kind === "here"));
  assert.ok(packet.assignments.every((row) => row.status === "open"));
  assert.ok(packet.assignments.every((row) => row.launch === `reviews/launch/${row.jobId}.md`));
  assert.ok(packet.assignments.every((row) => /Leave this pad/.test(row.prompt)));
  assert.match(packet.next.prompt, /dronehive-unicode-ci/);
  assert.ok(ids.includes("dronehive-unicode-ci"));
  assert.ok(!ids.includes("gub-route-intent"));
  assert.ok(!ids.includes("genesis-world-layer-102"));
  assert.ok(!ids.includes("review-landing-pad-prs"));
  assert.equal(packet.leftoverNext, "review-landing-pad-prs");
  assert.equal(packet.leftover[0], "review-landing-pad-prs");
  assert.ok(!packet.leftover.includes("dronehive-unicode-ci"));
  assert.ok(!packet.leftover.includes("gub-route-intent"));
});

test("cli assign writes paste-ready GitHub launch files", async () => {
  const out = mkdtempSync(join(tmpdir(), "agent-ops-launch-"));
  const result = await capture(["assign", "--out", out]);
  assert.equal(result.code, 0);
  assert.match(result.out, /dronehive-unicode-ci/);
  assert.match(result.out, /bloom-health-probe/);
  assert.doesNotMatch(result.out, /genesis-world-layer-102/);
  const dest = join(out, "dronehive-unicode-ci.md");
  assert.equal(existsSync(dest), true);
  const text = readFileSync(dest, "utf8");
  assert.match(text, /Genesis catalog handoff/);
  assert.match(text, /dronehive-unicode-ci/);
  assert.match(text, /github\.com\/yuro1991-afk\/dronehive/);
  assert.doesNotMatch(text, /genesis-world-layer-102/);
  const leftover = join(out, "review-landing-pad-prs.md");
  assert.equal(existsSync(leftover), true);
  const leftoverText = readFileSync(leftover, "utf8");
  assert.match(leftoverText, /Leftover unused — review-landing-pad-prs/);
  assert.match(leftoverText, /No parked pad agent owns this card yet/);
  assert.doesNotMatch(leftoverText, /Leftover unused — dronehive-unicode-ci/);
  assert.match(result.out, /"leftoverNext": "review-landing-pad-prs"/);
});

test("peekBusyJob --world is opt-in Origin leftover, not a GitHub steal", () => {
  const ledger = loadLedger(new URL("../ledger/queue.json", import.meta.url));
  const roster = loadRoster(fileURLToPath(new URL("../ledger/roster.json", import.meta.url)));
  assert.equal(peekBusyJob(ledger, undefined, { world: true }, NOW, roster).id, "genesis-world-layer-102");
  assert.equal(peekBusyJob(ledger, "bc-brand-new", { world: true }, NOW, roster).id, "genesis-world-layer-102");
  const parked = roster.assignments[0];
  assert.equal(peekBusyJob(ledger, parked.bcId, { github: true }, NOW, roster).id, parked.jobId);
  assert.equal(peekBusyJob(ledger, parked.bcId, { world: true }, NOW, roster).id, "genesis-world-layer-102");
  assert.equal(ledger.jobs.find((job) => job.id === "dronehive-unicode-ci").claim, null);
});

test("leftover launch rows skip rostered cards", () => {
  const ledger = loadLedger(new URL("../ledger/queue.json", import.meta.url));
  const roster = loadRoster(fileURLToPath(new URL("../ledger/roster.json", import.meta.url)));
  const rows = leftoverLaunchRows(ledger, roster, NOW);
  assert.equal(rows[0].jobId, "review-landing-pad-prs");
  assert.match(rows[0].prompt, /Leftover unused — review-landing-pad-prs/);
  assert.ok(!rows.some((row) => row.jobId === "dronehive-unicode-ci"));
  assert.ok(!rows.some((row) => row.jobId === "gub-route-intent"));
  assert.match(renderLeftoverLaunch(null), /No leftover unused GitHub card/);
});

test("cli slots defaults to GitHub sibling cards", async () => {
  const result = await capture(["slots"]);
  assert.equal(result.code, 0);
  assert.match(result.out, /dronehive-unicode-ci/);
  assert.match(result.out, /review-landing-pad-prs/);
  assert.doesNotMatch(result.out, /gub-inventory-tick/);
  assert.doesNotMatch(result.out, /genesis-world-unifier/);
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
