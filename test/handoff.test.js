import { test } from "node:test";
import assert from "node:assert/strict";
import { buildHandoff, relaunchFor } from "../src/handoff.js";
import { loadSiblings, describeRole, SIBLING_ROLES } from "../src/siblings.js";
import { runCli } from "../src/cli.js";

const NOW = Date.parse("2026-09-14T16:00:00.000Z");

test("handoff for dronehive points at github.com/yuro1991-afk/dronehive", () => {
  const siblings = loadSiblings(new URL("../ledger/siblings.json", import.meta.url));
  const job = {
    id: "dronehive-unicode-ci",
    title: "Fix unicode",
    repo: "github.com/yuro1991-afk/dronehive",
    kind: "fix",
    priority: 1,
    status: "open",
    claim: null,
    notes: "",
    verify: "true",
    files: [],
    collision: "",
  };
  const handoff = buildHandoff(job, siblings);
  assert.equal(handoff.relaunch.kind, "github");
  assert.match(handoff.relaunch.url, /dronehive/);
  assert.ok(handoff.related.some((pr) => pr.number === 6));
  assert.ok(handoff.doNot.some((line) => line.includes("fifth")));
});

test("origin jobs relaunch to the Origin codebase", () => {
  const target = relaunchFor({
    id: "gub-superbrain-probe",
    title: "probe",
    repo: "origin.cursor.com/git/yuri-afk/genesis",
    kind: "origin-slice",
    priority: 3,
    status: "open",
    claim: null,
    notes: "",
    verify: "",
    files: [],
    collision: "",
  });
  assert.equal(target.kind, "origin");
  assert.match(target.url, /yuri-afk\/genesis/);
});

test("every sibling role has a description", () => {
  for (const role of SIBLING_ROLES) {
    assert.equal(typeof describeRole(role), "string");
  }
});

test("here jobs stay on this checkout", () => {
  const target = relaunchFor({
    id: "review-landing-pad-prs",
    title: "review",
    repo: "github.com/yuro1991-afk/main",
    kind: "review",
    priority: 22,
    status: "open",
    claim: null,
    notes: "",
    verify: "",
    files: [],
    collision: "",
  });
  assert.equal(target.kind, "here");
  assert.match(target.reason, /Stay on this checkout/);
});

test("cli handoff defaults to next", async () => {
  const chunks = [];
  const code = await runCli(["handoff"], {
    nowMs: NOW,
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  assert.match(chunks.join(""), /gub-inventory-tick/);
  assert.match(chunks.join(""), /yuri-afk\/genesis/);
});
