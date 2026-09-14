import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { JOB_KINDS } from "../src/kinds.js";
import { buildBrief, firstCommands } from "../src/brief.js";
import { describeRole, loadSiblings, siblingsForJob } from "../src/siblings.js";
import { saveLedger } from "../src/ledger.js";
import { runCli } from "../src/cli.js";

const NOW = Date.parse("2026-09-14T16:00:00.000Z");
const SIBLINGS = new URL("../ledger/siblings.json", import.meta.url);

function job(kind) {
  return {
    id: "sample",
    title: "Sample",
    repo: "github.com/yuro1991-afk/dronehive",
    kind,
    priority: 1,
    status: "open",
    claim: null,
    notes: "",
    verify: "true",
    files: ["a.js"],
    collision: "",
  };
}

test("siblings.json loads and maps dronehive to PR 5", () => {
  const siblings = loadSiblings(SIBLINGS);
  assert.equal(siblings.prs.length, 6);
  assert.equal(siblings.prs[5].number, 9);
  const related = siblingsForJob(siblings, "dronehive-unicode-ci");
  assert.deepEqual(
    related.map((pr) => pr.number),
    [5, 6],
  );
  assert.match(describeRole("attention-and-dronehive-patch"), /dronehive/);
});

test("brief attaches sibling PR 5 to the unicode card", () => {
  const siblings = loadSiblings(SIBLINGS);
  const queue = JSON.parse(readFileSync(new URL("../ledger/queue.json", import.meta.url), "utf8"));
  const drone = queue.jobs.find((item) => item.id === "dronehive-unicode-ci");
  const brief = buildBrief(drone, siblings);
  assert.equal(brief.contract, "agent-ops.brief.v1");
  assert.equal(brief.related[0].number, 5);
  assert.ok(brief.hardRules.some((rule) => rule.includes("fourth")));
});

test("firstCommands is exhaustive", () => {
  for (const kind of JOB_KINDS) {
    const lines = firstCommands(job(kind));
    assert.ok(lines.length > 0);
  }
});

test("unknown sibling role fails closed", () => {
  assert.throws(() => describeRole("spawn-extra-board"));
});

test("cli brief defaults to next and siblings lists PRs", async () => {
  const chunks = [];
  const code = await runCli(["brief"], {
    nowMs: NOW,
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  assert.match(chunks.join(""), /gub-route-intent/);
  const listed = [];
  const siblingsCode = await runCli(["siblings"], {
    write: (value) => {
      listed.push(value);
    },
  });
  assert.equal(siblingsCode, 0);
  assert.match(listed.join(""), /keep-busy-queue/);
  assert.match(listed.join(""), /patch-catalog/);
});

test("cli brief unknown id errors", async () => {
  const dir = mkdtempSync(join(tmpdir(), "agent-ops-brief-"));
  const path = join(dir, "queue.json");
  saveLedger(path, { jobs: [job("fix")] });
  await assert.rejects(
    () =>
      runCli(["brief", "missing", "--ledger", path], {
        nowMs: NOW,
        write: () => {},
      }),
    /unknown job/,
  );
});
