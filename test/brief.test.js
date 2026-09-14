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
  assert.equal(siblings.prs.length, 7);
  assert.equal(siblings.prs[5].number, 9);
  assert.equal(siblings.prs[6].number, 10);
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

test("review firstCommands name open PRs #8/#9/#10, not siblings.json only", () => {
  const queue = JSON.parse(readFileSync(new URL("../ledger/queue.json", import.meta.url), "utf8"));
  const landing = queue.jobs.find((item) => item.id === "review-landing-pad-prs");
  const landingLines = firstCommands(landing);
  assert.ok(landingLines.some((line) => line.includes("#8") && line.includes("#10")));
  assert.ok(!landingLines.some((line) => line.includes("ledger/siblings.json")));
  const pr10 = queue.jobs.find((item) => item.id === "review-main-pr10");
  const pr10Lines = firstCommands(pr10);
  assert.ok(pr10Lines.some((line) => line.includes("github.com/yuro1991-afk/main/pull/10")));
  assert.ok(pr10Lines.some((line) => line.includes("head / ears / eyes / vision / bridge")));
});

test("cataloged sibling firstCommands use git apply, not edit", () => {
  const queue = JSON.parse(readFileSync(new URL("../ledger/queue.json", import.meta.url), "utf8"));
  const drone = queue.jobs.find((item) => item.id === "dronehive-unicode-ci");
  const lines = firstCommands(drone);
  assert.ok(lines.some((line) => line.includes("git apply --check") && line.includes("dronehive-pro-chat-cp1252.patch")));
  assert.ok(lines.some((line) => line.startsWith("git apply /path/to/main/patches/dronehive-pro-chat-cp1252.patch")));
  assert.ok(!lines.some((line) => line.startsWith("edit:")));
  const honesty = queue.jobs.find((item) => item.id === "faceswap-honesty-env-paths");
  const honestyLines = firstCommands(honesty);
  assert.ok(honestyLines.some((line) => line.includes("faceswap-honesty-env-paths.patch")));
  assert.ok(!honestyLines.some((line) => line.includes("Notion")));
  const gitignore = queue.jobs.find((item) => item.id === "bloom-gitignore-vercel");
  const gitignoreLines = firstCommands(gitignore);
  assert.ok(gitignoreLines.includes("git rm -r --cached .vercel/output"));
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

test("cli brief --job selects the named card, not leftover next", async () => {
  const chunks = [];
  const code = await runCli(["brief", "--job", "review-main-pr10"], {
    nowMs: NOW,
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.job.id, "review-main-pr10");
  assert.ok(parsed.related.some((pr) => pr.number === 10));
  assert.doesNotMatch(chunks.join(""), /gub-superbrain-probe/);
  assert.doesNotMatch(chunks.join(""), /gub-route-intent/);
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
