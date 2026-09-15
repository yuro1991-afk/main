import { existsSync, mkdtempSync, readdirSync, readFileSync } from "node:fs";
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
  MISSING_LAUNCH_PREVIEW,
  withRelatedSection,
  loadRoster,
  peekBusyJob,
  renderAssignedLaunch,
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

test("busy JSON for Superbrain leftover attaches take-instead apply pair", () => {
  const ledger = loadLedger(new URL("../ledger/queue.json", import.meta.url));
  const job = ledger.jobs.find((item) => item.id === "gub-superbrain-probe");
  const siblings = loadSiblings(new URL("../ledger/siblings.json", import.meta.url));
  const packet = buildBusy(job, siblings, []);
  assert.ok(job);
  assert.equal(packet.jobId, "gub-superbrain-probe");
  assert.equal(packet.takeInstead, "dronehive-unicode-ci");
  assert.ok(packet.applyNext.some((line) => line.includes("dronehive-pro-chat-cp1252.patch")));
  assert.equal(
    packet.proveAfterApplyCommand,
    "node src/cli.js patches --prove-after-apply --job dronehive-unicode-ci",
  );
});

test("busy JSON for a cataloged job includes applyNext", () => {
  const ledger = loadLedger(new URL("../ledger/queue.json", import.meta.url));
  const job = ledger.jobs.find((item) => item.id === "dronehive-unicode-ci");
  const siblings = loadSiblings(new URL("../ledger/siblings.json", import.meta.url));
  const packet = buildBusy(job, siblings, []);
  assert.ok(job);
  assert.ok(packet.applyNext.some((line) => line.includes("dronehive-pro-chat-cp1252.patch")));
  assert.ok(packet.applyNext.some((line) => line.startsWith("git clone https://github.com/yuro1991-afk/dronehive.git")));
  assert.equal(
    packet.proveAfterApplyCommand,
    "node src/cli.js patches --prove-after-apply --job dronehive-unicode-ci",
  );
  assert.doesNotMatch(packet.applyNext.join("\n"), /prove-after-apply/);
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
  assert.equal(packet.count, 21);
  assert.equal(packet.next.jobId, "dronehive-unicode-ci");
  const ids = packet.assignments.map((row) => row.jobId);
  const agents = packet.assignments.map((row) => row.bcId);
  assert.equal(new Set(ids).size, 21);
  assert.equal(new Set(agents).size, 21);
  assert.ok(packet.assignments.some((row) => row.jobId === "dronehive-unicode-ci"));
  assert.ok(packet.assignments.some((row) => row.jobId === "review-main-pr8"));
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
  assert.equal(packet.leftoverTakeInstead, undefined);
  assert.equal(packet.leftoverApplyNext, undefined);
  assert.equal(packet.leftoverProveAfterApplyCommand, undefined);
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
  assert.doesNotMatch(leftoverText, /Leftover unused — gub-inventory-tick/);
  assert.match(result.out, /"leftoverNext": "review-landing-pad-prs"/);
  assert.doesNotMatch(result.out, /leftoverTakeInstead/);
});

test("cli assign --job writes one leftover Apply launch", async () => {
  const out = mkdtempSync(join(tmpdir(), "agent-ops-assign-job-"));
  const result = await capture(["assign", "--job", "bloom-grok-pwa-test-sync", "--out", out]);
  assert.equal(result.code, 0);
  const parsed = JSON.parse(result.out);
  assert.equal(parsed.contract, ASSIGN_CONTRACT);
  assert.equal(parsed.job, "bloom-grok-pwa-test-sync");
  assert.ok(parsed.applyNext.some((line) => line.includes("bloom-grok-pwa-test-sync.patch")));
  assert.equal(
    parsed.proveAfterApplyCommand,
    "node src/cli.js patches --prove-after-apply --job bloom-grok-pwa-test-sync",
  );
  assert.equal(parsed.prefer, "node src/cli.js brief --job bloom-grok-pwa-test-sync");
  assert.deepEqual(
    parsed.related.map((pr) => pr.number),
    [9, 12],
  );
  assert.equal(parsed.related[0].role, "patch-catalog");
  assert.equal(existsSync(join(out, "dronehive-unicode-ci.md")), false);
  const dest = join(out, "bloom-grok-pwa-test-sync.md");
  assert.equal(existsSync(dest), true);
  const text = readFileSync(dest, "utf8");
  assert.match(text, /# Leftover unused — bloom-grok-pwa-test-sync/);
  assert.match(text, /# Apply bloom-grok-pwa-test-sync/);
  assert.match(text, /## Related/);
  assert.match(text, /#9 patch-catalog/);
  assert.match(text, /#12 leftover-launches/);
  assert.ok(text.indexOf("#9 patch-catalog") < text.indexOf("#12 leftover-launches"));
  assert.doesNotMatch(text, /npm run autofix/);
});

test("cli assign --job names catalog-first related for unicode-ci", async () => {
  const out = mkdtempSync(join(tmpdir(), "agent-ops-assign-related-"));
  const result = await capture(["assign", "--job", "dronehive-unicode-ci", "--out", out]);
  assert.equal(result.code, 0);
  const parsed = JSON.parse(result.out);
  assert.deepEqual(
    parsed.related.map((pr) => pr.number),
    [9, 5, 6],
  );
  assert.equal(parsed.related[0].role, "patch-catalog");
  assert.equal(parsed.prefer, "node src/cli.js brief --job dronehive-unicode-ci");
  const text = readFileSync(join(out, "dronehive-unicode-ci.md"), "utf8");
  assert.match(text, /## Related/);
  assert.match(text, /#9 patch-catalog/);
  assert.match(text, /#5 attention-and-dronehive-patch/);
  assert.ok(text.indexOf("#9 patch-catalog") < text.indexOf("#5 attention-and-dronehive-patch"));
});

test("withRelatedSection is a no-op without related rows", () => {
  assert.equal(withRelatedSection("# Apply x\n", []), "# Apply x\n");
  assert.equal(withRelatedSection("# Apply x\n", null), "# Apply x\n");
});

test("cli assign --missing lists catalog leftovers with no launch and never writes", async () => {
  const empty = mkdtempSync(join(tmpdir(), "agent-ops-assign-missing-empty-"));
  const emptyResult = await capture(["assign", "--missing", "--out", empty]);
  assert.equal(emptyResult.code, 0);
  const emptyParsed = JSON.parse(emptyResult.out);
  assert.equal(emptyParsed.contract, ASSIGN_CONTRACT);
  assert.equal(emptyParsed.wrote, false);
  assert.equal(emptyParsed.nextMissing, "dronehive-unicode-ci");
  assert.equal(emptyParsed.next.length, MISSING_LAUNCH_PREVIEW);
  assert.equal(emptyParsed.next[0], "dronehive-unicode-ci");
  assert.equal(emptyParsed.prefer, "node src/cli.js assign --job dronehive-unicode-ci --out /tmp/launches");
  assert.equal(readdirSync(empty).length, 0);

  const onDisk = fileURLToPath(new URL("../reviews/launch", import.meta.url));
  const before = readdirSync(onDisk).length;
  const result = await capture(["assign", "--missing", "--out", onDisk]);
  assert.equal(result.code, 0);
  const parsed = JSON.parse(result.out);
  assert.equal(parsed.wrote, false);
  assert.equal(parsed.nextMissing, "dronehive-doc-synaptic-loop-cd");
  assert.ok(parsed.next.includes("dronehive-doc-synaptic-loop-cd"));
  assert.ok(parsed.missing > parsed.next.length);
  assert.equal(readdirSync(onDisk).length, before);
});

test("cli assign --missing rejects --job", async () => {
  const out = mkdtempSync(join(tmpdir(), "agent-ops-assign-missing-job-"));
  await assert.rejects(
    () => capture(["assign", "--missing", "--job", "bloom-ci-lint", "--out", out]),
    /assign --missing does not take --job/,
  );
  assert.equal(readdirSync(out).length, 0);
});

test("cli assign --job unknown id fails closed", async () => {
  const out = mkdtempSync(join(tmpdir(), "agent-ops-assign-missing-"));
  await assert.rejects(
    () => capture(["assign", "--job", "missing-leftover", "--out", out]),
    /unknown job/,
  );
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
  assert.equal(rows[0].takeInstead, undefined);
  assert.equal(rows[0].applyNext, undefined);
  assert.ok(!rows.some((row) => row.jobId === "dronehive-unicode-ci"));
  assert.ok(!rows.some((row) => row.jobId === "gub-route-intent"));
  assert.match(renderLeftoverLaunch(null), /No leftover unused GitHub card/);
});

test("assigned Superbrain launch refuses Origin paste", () => {
  const ledger = loadLedger(new URL("../ledger/queue.json", import.meta.url));
  const sitout = ledger.jobs.find((item) => item.id === "gub-superbrain-probe");
  const text = renderAssignedLaunch(
    { bcId: "bc-brand-new-sync", name: "New leftover", jobId: "gub-superbrain-probe" },
    sitout,
  );
  assert.match(text, /no more Superbrain/);
  assert.match(text, /take instead: `dronehive-unicode-ci`/);
  assert.match(text, /Do not paste this into an Origin cloud agent/);
  assert.doesNotMatch(text, /Paste the brief below into a new Origin cloud agent/);
});

test("live leftover Superbrain assign attaches take-instead apply pair", () => {
  const ledger = loadLedger(new URL("../ledger/queue.json", import.meta.url));
  const roster = loadRoster(fileURLToPath(new URL("../ledger/roster.json", import.meta.url)));
  const afterLease = Date.parse("2026-09-14T19:00:00.000Z");
  const sitout = ledger.jobs.find((item) => item.id === "gub-superbrain-probe");
  const text = renderLeftoverLaunch(sitout);
  assert.match(text, /no more Superbrain/);
  assert.match(text, /take instead: `dronehive-unicode-ci`/);
  assert.match(text, /patches --prove --job dronehive-unicode-ci/);
  assert.match(text, /patches --prove-after-apply --job dronehive-unicode-ci/);
  assert.match(text, /Do not paste this into an Origin cloud agent/);
  assert.doesNotMatch(text, /Paste the brief below into a new Origin cloud agent/);
  const rows = leftoverLaunchRows(ledger, roster, afterLease, { genesis: true });
  assert.equal(rows[0].jobId, "genesis-world-layer-102");
  const sitoutRow = rows.find((row) => row.jobId === "gub-superbrain-probe");
  assert.equal(sitoutRow.takeInstead, "dronehive-unicode-ci");
  assert.ok(sitoutRow.applyNext.some((line) => line.includes("dronehive-pro-chat-cp1252.patch")));
  assert.equal(
    sitoutRow.proveAfterApplyCommand,
    "node src/cli.js patches --prove-after-apply --job dronehive-unicode-ci",
  );
  const packet = buildAssign(ledger, roster, afterLease);
  assert.equal(packet.leftoverNext, "review-landing-pad-prs");
  assert.equal(packet.leftoverTakeInstead, undefined);
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
  assert.equal(
    packet.proveAfterApplyCommand,
    "node src/cli.js patches --prove-after-apply --job dronehive-unicode-ci",
  );
  assert.equal(packet.slots[0].proveAfterApplyCommand, packet.proveAfterApplyCommand);
});

test("cli slots --job peeks the named catalog card", async () => {
  const result = await capture(["slots", "--job", "dronehive-unicode-ci"]);
  assert.equal(result.code, 0);
  const parsed = JSON.parse(result.out);
  assert.equal(parsed.slots[0].id, "dronehive-unicode-ci");
  assert.ok(parsed.applyNext.some((line) => line.includes("dronehive-pro-chat-cp1252.patch")));
  assert.equal(
    parsed.proveAfterApplyCommand,
    "node src/cli.js patches --prove-after-apply --job dronehive-unicode-ci",
  );
  assert.doesNotMatch(result.out, /gub-inventory-tick/);
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

test("on-disk unicode launch is an Apply brief, not PR #5 autofix", () => {
  const text = readFileSync(new URL("../reviews/launch/dronehive-unicode-ci.md", import.meta.url), "utf8");
  assert.match(text, /# Apply dronehive-unicode-ci/);
  assert.match(text, /patches --prove --job dronehive-unicode-ci/);
  assert.doesNotMatch(text, /npm run autofix/);
  assert.doesNotMatch(text, /pull\/5/);
  const leftover = readFileSync(
    new URL("../reviews/launch/review-landing-pad-prs.md", import.meta.url),
    "utf8",
  );
  assert.match(leftover, /#11/);
  assert.match(leftover, /#12/);
  assert.match(leftover, /#13/);
  assert.match(leftover, /#14/);
  assert.match(leftover, /#15/);
  assert.match(leftover, /#19/);
  assert.match(leftover, /#20/);
  assert.match(leftover, /#23/);
  assert.match(leftover, /#24/);
  assert.match(leftover, /#26/);
  assert.match(leftover, /#27/);
  assert.match(leftover, /#30/);
  assert.match(leftover, /#31/);
  assert.match(leftover, /#34/);
  assert.match(leftover, /#35/);
  assert.match(leftover, /#38/);
  assert.match(leftover, /#39/);
  assert.match(leftover, /#42/);
  assert.match(leftover, /#43/);
  assert.match(leftover, /#46/);
});

test("unused leftover launch packets exist for parked next cards", () => {
  const ids = [
    "bloom-grok-pwa-test-sync",
    "dronehive-script-host-roots",
    "faceswap-design-honesty",
    "faceswap-start-sh",
    "ova-readme-linux-honesty",
    "dronehive-runtime-host-paths",
    "dronehive-config-load-overlay",
    "dronehive-app-links-host-paths",
    "dronehive-icons-manifest-relative",
    "bloom-ci-lint",
    "ova-voice-card-linux-honesty",
    "faceswap-ios-readme-honesty",
    "dronehive-hive-docstring-honesty",
    "dronehive-work-order-doc-honesty",
    "dronehive-seed-work-order-doc-honesty",
    "dronehive-bench-goal-honesty",
    "faceswap-readme-requirements-honesty",
    "faceswap-readme-install-sh",
    "dronehive-buzzer-hive-library-honesty",
    "dronehive-seed-buzzer-hive-library-honesty",
    "dronehive-work-order-fabric-root",
    "dronehive-seed-work-order-fabric-root",
    "faceswap-readme-swift-honesty",
    "faceswap-readme-firewall-honesty",
    "dronehive-future-seer-jane-honesty",
    "dronehive-multi-hosts-exe-honesty",
    "dronehive-work-order-live-registry",
    "dronehive-seed-work-order-live-registry",
    "dronehive-work-order-school-root",
    "dronehive-seed-work-order-school-root",
    "dronehive-work-order-reference-db",
    "dronehive-seed-work-order-reference-db",
    "dronehive-work-order-knowledge-expand",
    "dronehive-seed-work-order-knowledge-expand",
    "dronehive-work-order-curriculum-root",
    "dronehive-seed-work-order-curriculum-root",
    "dronehive-multi-hosts-hardwire",
    "dronehive-super-llms-hardwire",
    "dronehive-work-order-open-tasks",
    "dronehive-seed-work-order-open-tasks",
    "dronehive-work-order-codex-paths",
    "dronehive-seed-work-order-codex-paths",
    "dronehive-work-order-law-truth",
    "dronehive-seed-work-order-law-truth",
    "dronehive-work-order-doc-law-truth",
    "dronehive-seed-work-order-doc-law-truth",
    "dronehive-work-order-doc-fabric-root",
    "dronehive-seed-work-order-doc-fabric-root",
    "dronehive-work-order-doc-imprints",
    "dronehive-work-order-doc-live-registry",
    "dronehive-seed-work-order-doc-live-registry",
    "dronehive-work-order-doc-codex-paths",
    "dronehive-seed-work-order-doc-codex-paths",
    "dronehive-work-order-doc-codex-cli",
    "dronehive-seed-work-order-doc-codex-cli",
    "dronehive-work-order-doc-recall-router",
    "dronehive-seed-work-order-doc-recall-router",
    "dronehive-work-order-doc-memory-recycle",
    "dronehive-seed-work-order-doc-memory-recycle",
    "dronehive-work-order-doc-models",
    "dronehive-seed-work-order-doc-models",
    "dronehive-work-order-doc-cd",
    "dronehive-seed-work-order-doc-cd",
    "dronehive-spec-relative",
    "dronehive-start-super-mesh-cd",
    "dronehive-start-multi-model-pythonpath",
    "dronehive-start-seer-pythonpath",
    "dronehive-enable-bridge-fallback",
    "dronehive-truth-bind-paths",
    "dronehive-package-release-v2-cargo",
    "dronehive-mount-launch-cargo",
    "dronehive-install-ollama-app-cargo",
    "dronehive-start-tui-cargo-honesty",
    "dronehive-ollama-tui-readme-cargo",
    "dronehive-mount-readme-cargo",
    "dronehive-tui-readme-cargo",
    "dronehive-apps-readme-cargo",
    "dronehive-install-ollama-app-root",
    "dronehive-install-ollama-app-mount",
    "dronehive-install-ollama-app-manifest",
    "dronehive-install-ollama-uninstall-root",
    "dronehive-tui-readme-root",
    "dronehive-ollama-tui-readme-install",
    "dronehive-mount-readme-layout",
    "dronehive-mount-readme-launch",
    "dronehive-mount-readme-related",
    "opensussy-sec-review-target",
    "opensussy-install-sec-review-target",
    "dronehive-readme-cd",
    "dronehive-doc-agent-loop-cd",
    "dronehive-doc-bridge-1080-cd",
    "dronehive-doc-code-worker-cd",
    "dronehive-doc-future-seer-cd",
    "dronehive-doc-measured-diagnostics-cd",
    "dronehive-doc-multi-face-cd",
    "dronehive-doc-operational-cd",
    "dronehive-seed-doc-operational-cd",
    "dronehive-doc-pro-cd",
    "dronehive-doc-super-llms-cd",
    "dronehive-doc-super-mesh-cd",
  ];
  for (const id of ids) {
    const text = readFileSync(new URL(`../reviews/launch/${id}.md`, import.meta.url), "utf8");
    assert.match(text, new RegExp(`# Leftover unused — ${id}`), id);
    assert.match(text, new RegExp(`# Apply ${id}`), id);
    assert.match(text, new RegExp(`patches --prove --job ${id}`), id);
    assert.doesNotMatch(text, /npm run autofix/);
    assert.doesNotMatch(text, /pull\/5/);
  }
  const pr10 = readFileSync(new URL("../reviews/launch/review-main-pr10.md", import.meta.url), "utf8");
  assert.match(pr10, /# Leftover unused — review-main-pr10/);
  assert.match(pr10, /eyes/);
  assert.match(pr10, /bridge/);
  assert.doesNotMatch(pr10, /npm run autofix/);
});
