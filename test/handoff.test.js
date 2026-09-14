import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { buildHandoff, buildRelaunch, packetPathFor, relaunchFor } from "../src/handoff.js";
import { listJobs, loadLedger } from "../src/ledger.js";
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

test("every open Genesis job has a reviews/handoff packet", () => {
  const root = fileURLToPath(new URL("..", import.meta.url));
  const ledger = loadLedger(new URL("../ledger/queue.json", import.meta.url));
  const jobs = listJobs(ledger, { genesis: true }, NOW).filter(
    (job) => job.status === "open" || job.status === "claimed",
  );
  assert.ok(jobs.length >= 8);
  for (const job of jobs) {
    assert.equal(existsSync(join(root, packetPathFor(job))), true, packetPathFor(job));
  }
});

test("relaunch packet points at Origin and the handoff file", () => {
  const siblings = loadSiblings(new URL("../ledger/siblings.json", import.meta.url));
  const job = {
    id: "gub-inventory-tick",
    title: "inventory",
    repo: "origin.cursor.com/git/yuri-afk/genesis",
    kind: "origin-slice",
    priority: 6,
    status: "open",
    claim: null,
    notes: "",
    verify: "",
    files: [],
    collision: "",
  };
  const packet = buildRelaunch(job, siblings);
  assert.equal(packet.contract, "agent-ops.relaunch.v1");
  assert.equal(packetPathFor(job), "reviews/handoff-gub-inventory-tick.md");
  assert.equal(packet.packet, "reviews/handoff-gub-inventory-tick.md");
  assert.match(packet.action, /yuri-afk\/genesis/);
  assert.match(packet.relaunch.url, /yuri-afk\/genesis/);
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

test("cli relaunch defaults to next Genesis card", async () => {
  const chunks = [];
  const code = await runCli(["relaunch"], {
    nowMs: NOW,
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const text = chunks.join("");
  assert.match(text, /gub-inventory-tick/);
  assert.match(text, /handoff-gub-inventory-tick/);
  assert.match(text, /yuri-afk\/genesis/);
  assert.doesNotMatch(text, /dronehive-unicode-ci/);
});
