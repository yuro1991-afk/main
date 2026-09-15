import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import assert from "node:assert/strict";
import { loadLedger, saveLedger } from "../src/ledger.js";
import { loadRoster } from "../src/dispatch.js";
import { parseArgs, runCli } from "../src/cli.js";

const NOW = Date.parse("2026-09-14T16:00:00.000Z");

function seededPath() {
  const dir = mkdtempSync(join(tmpdir(), "agent-ops-cli-"));
  const path = join(dir, "queue.json");
  saveLedger(path, {
    jobs: [
      {
        id: "alpha",
        title: "Alpha",
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

test("parseArgs reads flags and positionals", () => {
  const parsed = parseArgs(["claim", "alpha", "--agent", "bc-1", "--kind", "fix"]);
  assert.equal(parsed.command, "claim");
  assert.deepEqual(parsed.positionals, ["alpha"]);
  assert.equal(parsed.flags.agent, "bc-1");
});

test("cli claim and complete persist", async () => {
  const ledgerPath = seededPath();
  const claimed = await capture(["claim", "alpha", "--agent", "bc-1", "--ledger", ledgerPath]);
  assert.equal(claimed.code, 0);
  assert.match(claimed.out, /"status": "claimed"/);
  const completed = await capture(["complete", "alpha", "--agent", "bc-1", "--ledger", ledgerPath]);
  assert.equal(completed.code, 0);
  const ledger = loadLedger(ledgerPath);
  assert.equal(ledger.jobs[0].status, "done");
  readFileSync(ledgerPath, "utf8");
});

test("cli next exits 1 when empty", async () => {
  const ledgerPath = seededPath();
  await capture(["claim", "alpha", "--agent", "bc-1", "--ledger", ledgerPath]);
  const result = await capture(["next", "--ledger", ledgerPath]);
  assert.equal(result.code, 1);
  assert.equal(result.out.trim(), "null");
});

test("cli route and probe", async () => {
  const routed = await capture(["route", "keep", "agents", "busy"]);
  assert.equal(routed.code, 0);
  assert.match(routed.out, /gub-route-intent/);
  assert.match(routed.out, /yuri-afk\/genesis/);
  const parked = loadRoster(fileURLToPath(new URL("../ledger/roster.json", import.meta.url)))
    .assignments[0];
  const mine = await capture(["route", "keep", "agents", "busy", "--agent", parked.bcId]);
  assert.equal(mine.code, 0);
  assert.match(mine.out, new RegExp(`"jobId": "${parked.jobId}"`));
  assert.doesNotMatch(mine.out, /"jobId": "gub-inventory-tick"/);
  const probed = await capture(["probe"], {
    fetchImpl: async () => ({ ok: false, status: 504 }),
    root: mkdtempSync(join(tmpdir(), "agent-ops-probe-cli-")),
  });
  assert.equal(probed.code, 1);
  assert.match(probed.out, /no more Superbrain/);
  assert.match(probed.out, /"refused": true/);
  assert.doesNotMatch(probed.out, /169\.254\.124\.8:45001/);
});

test("cli next --here stays on this repo", async () => {
  const result = await capture(["next", "--here"]);
  assert.equal(result.code, 1);
  assert.equal(result.out.trim(), "null");
});

test("cli next defaults to the first Genesis card", async () => {
  const result = await capture(["next"]);
  assert.equal(result.code, 0);
  assert.match(result.out, /gub-route-intent/);
  assert.match(result.out, /handoff-gub-route-intent/);
  assert.match(result.out, /yuri-afk\/genesis/);
  assert.doesNotMatch(result.out, /dronehive-unicode-ci/);
});

test("cli next --job peeks the named catalog card", async () => {
  const result = await capture(["next", "--job", "dronehive-unicode-ci"]);
  assert.equal(result.code, 0);
  const parsed = JSON.parse(result.out);
  assert.equal(parsed.id, "dronehive-unicode-ci");
  assert.ok(parsed.applyNext.some((line) => line.includes("dronehive-pro-chat-cp1252.patch")));
  assert.notEqual(parsed.id, "gub-route-intent");
});

test("cli status --job attaches the named catalog card without replacing leftover next", async () => {
  const result = await capture(["status", "--job", "dronehive-unicode-ci"]);
  assert.equal(result.code, 0);
  const parsed = JSON.parse(result.out);
  assert.equal(parsed.job.id, "dronehive-unicode-ci");
  assert.ok(parsed.job.applyNext.some((line) => line.includes("dronehive-pro-chat-cp1252.patch")));
  assert.notEqual(parsed.next.id, "dronehive-unicode-ci");
  assert.match(parsed.next.id, /^gub-/);
});

test("cli status without --job leaves leftover next and omits job", async () => {
  const result = await capture(["status"]);
  assert.equal(result.code, 0);
  const parsed = JSON.parse(result.out);
  assert.equal(parsed.job, undefined);
  assert.ok(parsed.next);
  assert.match(parsed.next.id, /^gub-/);
});

test("cli next --world is empty when every world card is rostered", async () => {
  const result = await capture(["next", "--world"]);
  assert.equal(result.code, 1);
  assert.equal(result.out.trim(), "null");
});

test("cli busy --world without agent does not peek a rostered world card", async () => {
  const out = join(mkdtempSync(join(tmpdir(), "agent-ops-busy-world-")), "last-dispatch.json");
  const result = await capture(["busy", "--world", "--out", out]);
  assert.equal(result.code, 1);
  assert.match(result.out, /"job": null/);
  assert.doesNotMatch(result.out, /"jobId": "genesis-world-layer-102"/);
});

test("cli busy without agent peeks the next Genesis card", async () => {
  const out = join(mkdtempSync(join(tmpdir(), "agent-ops-busy-cli-")), "last-dispatch.json");
  const result = await capture(["busy", "--out", out]);
  assert.equal(result.code, 0);
  assert.match(result.out, /gub-route-intent/);
  assert.match(result.out, /"reserved": false/);
  assert.doesNotMatch(result.out, /dronehive-unicode-ci/);
});

test("cli busy --job peeks the named catalog card", async () => {
  const out = join(mkdtempSync(join(tmpdir(), "agent-ops-busy-job-")), "last-dispatch.json");
  const result = await capture(["busy", "--job", "dronehive-unicode-ci", "--out", out]);
  assert.equal(result.code, 0);
  const parsed = JSON.parse(result.out);
  assert.equal(parsed.jobId, "dronehive-unicode-ci");
  assert.equal(parsed.reserved, false);
  assert.ok(parsed.applyNext.some((line) => line.includes("dronehive-pro-chat-cp1252.patch")));
  assert.notEqual(parsed.jobId, "gub-route-intent");
});

test("cli busy --job with --agent does not claim a blocked catalog card", async () => {
  const out = join(mkdtempSync(join(tmpdir(), "agent-ops-busy-job-agent-")), "last-dispatch.json");
  const before = JSON.parse(
    readFileSync(new URL("../ledger/queue.json", import.meta.url), "utf8"),
  );
  const result = await capture([
    "busy",
    "--job",
    "dronehive-unicode-ci",
    "--agent",
    "bc-test-busy-job",
    "--out",
    out,
  ]);
  assert.equal(result.code, 0);
  const parsed = JSON.parse(result.out);
  assert.equal(parsed.jobId, "dronehive-unicode-ci");
  assert.equal(parsed.reserved, false);
  const after = JSON.parse(
    readFileSync(new URL("../ledger/queue.json", import.meta.url), "utf8"),
  );
  const job = after.jobs.find((item) => item.id === "dronehive-unicode-ci");
  const prior = before.jobs.find((item) => item.id === "dronehive-unicode-ci");
  assert.equal(job.status, prior.status);
  assert.deepEqual(job.claim, prior.claim);
});

test("cli list --all drops the Genesis-only blocked line on catalog cards", async () => {
  const result = await capture(["list", "--all"]);
  assert.equal(result.code, 0);
  const jobs = JSON.parse(result.out);
  const drone = jobs.find((job) => job.id === "dronehive-unicode-ci");
  assert.ok(drone);
  assert.match(drone.notes, /cp1252|UnicodeEncodeError|python-smoke/);
  assert.doesNotMatch(drone.notes, /Blocked: Yuri scoped this landing pad to Genesis only/);
  const ledger = JSON.parse(
    readFileSync(new URL("../ledger/queue.json", import.meta.url), "utf8"),
  );
  const raw = ledger.jobs.find((job) => job.id === "dronehive-unicode-ci");
  assert.match(raw.notes, /Blocked: Yuri scoped this landing pad to Genesis only/);
});

test("unknown command is a usage error", async () => {
  const result = await capture(["explode"]);
  assert.equal(result.code, 2);
});
