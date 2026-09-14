import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import assert from "node:assert/strict";
import { loadLedger, saveLedger } from "../src/ledger.js";
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
  assert.match(routed.out, /dispatch board/);
  const probed = await capture(["probe"], {
    fetchImpl: async () => ({ ok: false, status: 504 }),
    root: mkdtempSync(join(tmpdir(), "agent-ops-probe-cli-")),
  });
  assert.equal(probed.code, 0);
  assert.match(probed.out, /unreachable/);
});

test("cli next --here stays on this repo", async () => {
  const result = await capture(["next", "--here"]);
  assert.equal(result.code, 1);
  assert.equal(result.out.trim(), "null");
});

test("cli next defaults to the first Genesis card", async () => {
  const result = await capture(["next"]);
  assert.equal(result.code, 0);
  assert.match(result.out, /gub-superbrain-probe/);
  assert.doesNotMatch(result.out, /dronehive-unicode-ci/);
});

test("unknown command is a usage error", async () => {
  const result = await capture(["explode"]);
  assert.equal(result.code, 2);
});
