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
  assert.match(routed.out, /review-landing-pad-prs/);
  assert.match(routed.out, /yuro1991-afk\/main/);
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

test("cli live leftover keep-busy stays GitHub-first after the lease", async () => {
  const result = await capture(["route", "keep", "agents", "busy"], {
    nowMs: Date.parse("2026-09-14T19:00:00.000Z"),
  });
  assert.equal(result.code, 0);
  const parsed = JSON.parse(result.out);
  assert.equal(parsed.jobId, "review-landing-pad-prs");
  assert.doesNotMatch(parsed.destination, /gub-superbrain-probe/);
  assert.equal(parsed.takeInstead, undefined);
});

test("cli next --here stays on this repo", async () => {
  const result = await capture(["next", "--here"]);
  assert.equal(result.code, 1);
  assert.doesNotMatch(result.out, /gub-route-intent/);
  assert.equal(JSON.parse(result.out), null);
});

test("cli next defaults to leftover unused exhausted", async () => {
  const result = await capture(["next"]);
  assert.equal(result.code, 1);
  assert.doesNotMatch(result.out, /gub-route-intent/);
  const parsed = JSON.parse(result.out);
  assert.equal(parsed, null);
});

test("cli next --job Superbrain attaches take-instead apply pair", async () => {
  const result = await capture(["next", "--job", "gub-superbrain-probe"]);
  assert.equal(result.code, 0);
  const parsed = JSON.parse(result.out);
  assert.equal(parsed.id, "gub-superbrain-probe");
  assert.equal(parsed.takeInstead, "dronehive-unicode-ci");
  assert.ok(parsed.applyNext.some((line) => line.includes("dronehive-pro-chat-cp1252.patch")));
  assert.equal(
    parsed.proveAfterApplyCommand,
    "node src/cli.js patches --prove-after-apply --job dronehive-unicode-ci",
  );
  assert.doesNotMatch(parsed.applyNext.join("\n"), /prove-after-apply/);
});

test("cli next --origin leftover is first unused world card", async () => {
  const result = await capture(["next", "--origin"], {
    nowMs: Date.parse("2026-09-14T19:00:00.000Z"),
  });
  assert.equal(result.code, 0);
  const parsed = JSON.parse(result.out);
  assert.equal(parsed.id, "genesis-world-layer-102");
  assert.equal(parsed.takeInstead, undefined);
});

test("cli next --job peeks the named catalog card", async () => {
  const result = await capture(["next", "--job", "dronehive-unicode-ci"]);
  assert.equal(result.code, 0);
  const parsed = JSON.parse(result.out);
  assert.equal(parsed.id, "dronehive-unicode-ci");
  assert.ok(parsed.applyNext.some((line) => line.includes("dronehive-pro-chat-cp1252.patch")));
  assert.equal(
    parsed.proveAfterApplyCommand,
    "node src/cli.js patches --prove-after-apply --job dronehive-unicode-ci",
  );
  assert.notEqual(parsed.id, "gub-route-intent");
});

test("cli status --job attaches the named catalog card without replacing leftover next", async () => {
  const result = await capture(["status", "--job", "dronehive-unicode-ci"]);
  assert.equal(result.code, 0);
  const parsed = JSON.parse(result.out);
  assert.equal(parsed.job.id, "dronehive-unicode-ci");
  assert.ok(parsed.job.applyNext.some((line) => line.includes("dronehive-pro-chat-cp1252.patch")));
  assert.equal(
    parsed.job.proveAfterApplyCommand,
    "node src/cli.js patches --prove-after-apply --job dronehive-unicode-ci",
  );
  assert.equal(parsed.next, null);
});

test("cli status without --job leaves leftover unused exhausted", async () => {
  const result = await capture(["status"]);
  assert.equal(result.code, 0);
  const parsed = JSON.parse(result.out);
  assert.equal(parsed.job, undefined);
  assert.equal(parsed.next, null);
});

test("cli status --origin leftover is first unused world card", async () => {
  const result = await capture(["status", "--origin"], {
    nowMs: Date.parse("2026-09-14T19:00:00.000Z"),
  });
  assert.equal(result.code, 0);
  const parsed = JSON.parse(result.out);
  assert.equal(parsed.next.id, "genesis-world-layer-102");
  assert.equal(parsed.next.takeInstead, undefined);
});

test("cli next --world is leftover Origin world after GitHub remapping", async () => {
  const result = await capture(["next", "--world"]);
  assert.equal(result.code, 0);
  assert.match(result.out, /genesis-world-layer-102/);
});

test("cli busy --world without agent peeks leftover Origin world", async () => {
  const out = join(mkdtempSync(join(tmpdir(), "agent-ops-busy-world-")), "last-dispatch.json");
  const result = await capture(["busy", "--world", "--out", out]);
  assert.equal(result.code, 0);
  assert.match(result.out, /"jobId": "genesis-world-layer-102"/);
});

test("cli busy without agent peeks leftover unused exhausted", async () => {
  const out = join(mkdtempSync(join(tmpdir(), "agent-ops-busy-cli-")), "last-dispatch.json");
  const result = await capture(["busy", "--out", out]);
  assert.equal(result.code, 1);
  assert.match(result.out, /"reserved": false/);
  assert.doesNotMatch(result.out, /"jobId": "dronehive-unicode-ci"/);
  const parsed = JSON.parse(result.out);
  assert.equal(parsed.jobId, undefined);
});

test("cli busy --job peeks the named catalog card", async () => {
  const out = join(mkdtempSync(join(tmpdir(), "agent-ops-busy-job-")), "last-dispatch.json");
  const result = await capture(["busy", "--job", "dronehive-unicode-ci", "--out", out]);
  assert.equal(result.code, 0);
  const parsed = JSON.parse(result.out);
  assert.equal(parsed.jobId, "dronehive-unicode-ci");
  assert.equal(parsed.reserved, false);
  assert.ok(parsed.applyNext.some((line) => line.includes("dronehive-pro-chat-cp1252.patch")));
  assert.equal(
    parsed.proveAfterApplyCommand,
    "node src/cli.js patches --prove-after-apply --job dronehive-unicode-ci",
  );
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

test("cli list --job peeks the named catalog card", async () => {
  const result = await capture(["list", "--job", "dronehive-unicode-ci"]);
  assert.equal(result.code, 0);
  const parsed = JSON.parse(result.out);
  assert.equal(parsed.length, 1);
  assert.equal(parsed[0].id, "dronehive-unicode-ci");
  assert.ok(parsed[0].applyNext.some((line) => line.includes("dronehive-pro-chat-cp1252.patch")));
  assert.equal(
    parsed[0].proveAfterApplyCommand,
    "node src/cli.js patches --prove-after-apply --job dronehive-unicode-ci",
  );
  assert.doesNotMatch(parsed[0].notes, /Blocked: Yuri scoped this landing pad to Genesis only/);
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

test("help says playbooks defaults to check and refuses in-repo write", async () => {
  const result = await capture(["help"]);
  assert.equal(result.code, 0);
  assert.match(result.out, /playbooks defaults to --check/);
  assert.match(result.out, /missingRequires/);
  assert.match(result.out, /nextApply dronehive-unicode-ci/);
  assert.match(result.out, /No --job is compact/);
  assert.match(result.out, /Prefer brief --job/);
  assert.match(result.out, /refuses the in-repo playbooks\/ directory/);
  assert.match(result.out, /catalog --write updates the ledger only/);
  assert.match(result.out, /patches lists applyable GitHub diffs/);
  assert.match(result.out, /No --job is compact \(nextApply dronehive-unicode-ci \+ id\/file \+ nextMissing\)/);
  assert.match(result.out, /Prefer brief --job dronehive-unicode-ci when leftover launches are exhausted/);
  assert.match(result.out, /assign \[--job id\] \[--missing\]/);
  assert.match(result.out, /Leftover launches are exhausted \(nextMissing null\)/);
  assert.match(result.out, /sit-out jobs have no launch on purpose/);
  assert.match(result.out, /Do not invent leftover 163\+/);
  assert.match(result.out, /--prove clones --no-hardlinks throwaways/);
  assert.match(result.out, /never writes or resets siblings/);
  assert.match(result.out, /leftover unused peek \(exhausted without --agent\)/);
  assert.match(result.out, /leftover unused peek is exhausted/);
  assert.match(result.out, /leftover unused peek exhausted without --job/);
  assert.doesNotMatch(result.out, /else roster then leftover next/);
  assert.doesNotMatch(result.out, /leftover next stays/);
  assert.doesNotMatch(result.out, /Add a card to ledger/);
});

test("NEXT leftover unused merges the stack through the siblings-board tip", () => {
  const text = readFileSync(new URL("../reviews/NEXT.md", import.meta.url), "utf8");
  assert.match(text, /merge \*\*#11\*\* through \*\*#97\*\*/);
  assert.match(text, /Sibling board tip is \*\*#97\*\*/);
  assert.match(text, /Leftover launches exhausted/);
  assert.doesNotMatch(text, /through \*\*#93\*\*/);
});

test("README assign --job names exhausted leftover launches", () => {
  const text = readFileSync(new URL("../README.md", import.meta.url), "utf8");
  assert.match(
    text,
    /`assign --job <id>` writes one leftover Apply launch and names\ncatalog-first related PRs in both JSON and the launch file\n\(same order as `siblings --job`\)\. Leftover launches are exhausted\./,
  );
  assert.match(text, /Prefer `brief --job dronehive-unicode-ci`/);
  assert.match(text, /Do not invent leftover 163\+/);
});

test("leftover unused peek docs name leftover unused exhausted", () => {
  const readme = readFileSync(new URL("../README.md", import.meta.url), "utf8");
  assert.match(readme, /Leftover unused peek\nis exhausted/);
  assert.match(readme, /Empty leftover\nunused peek/);
  assert.match(readme, /Do not add a card to\n`ledger\/queue\.json`/);
  assert.doesNotMatch(readme, /Leftover unused is\n`review-landing-pad-prs`/);
  const agents = readFileSync(new URL("../AGENTS.md", import.meta.url), "utf8");
  assert.match(agents, /Leftover unused peek is exhausted/);
  assert.match(agents, /Empty leftover unused peek/);
  assert.match(agents, /Do not add a card to `ledger\/queue\.json`/);
  assert.doesNotMatch(agents, /A 22nd unassigned agent takes leftover `review-landing-pad-prs`/);
  const next = readFileSync(new URL("../reviews/NEXT.md", import.meta.url), "utf8");
  assert.match(next, /Peek leftover unused \(no `--agent`\):\*\* leftover unused exhausted/);
  assert.match(next, /Empty leftover unused peek/);
  assert.match(next, /Do not add a card to `ledger\/queue\.json`/);
  assert.doesNotMatch(next, /Peek leftover unused \(no `--agent`\):\*\* `review-landing-pad-prs`/);
});

test("ci uses Node 24 action runtimes and keeps project Node 20", () => {
  const yml = readFileSync(new URL("../.github/workflows/ci.yml", import.meta.url), "utf8");
  assert.match(yml, /actions\/checkout@v5/);
  assert.match(yml, /actions\/setup-node@v5/);
  assert.match(yml, /node-version: "20"/);
  assert.match(yml, /package-manager-cache: false/);
  assert.doesNotMatch(yml, /actions\/checkout@v4/);
  assert.doesNotMatch(yml, /actions\/setup-node@v4/);
});
