import { test } from "node:test";
import assert from "node:assert/strict";
import { JOB_KINDS } from "../src/kinds.js";
import { buildHelperPacket, planHelpers } from "../src/helpers.js";
import { runCli } from "../src/cli.js";

const NOW = Date.parse("2026-09-14T16:00:00.000Z");

function job(kind, extras = {}) {
  return {
    id: extras.id ?? "sample",
    title: extras.title ?? "Sample",
    repo: extras.repo ?? "origin.cursor.com/git/yuri-afk/genesis",
    kind,
    priority: 1,
    status: "open",
    claim: null,
    notes: "",
    verify: "true",
    files: [],
    collision: "",
  };
}

test("planHelpers is exhaustive", () => {
  for (const kind of JOB_KINDS) {
    const plans = planHelpers(job(kind));
    assert.ok(plans.length > 0);
    assert.ok(plans.every((plan) => plan.role && plan.prompt));
  }
});

test("origin-slice helpers relaunch to Genesis", () => {
  const packet = buildHelperPacket(
    job("origin-slice", { id: "gub-superbrain-probe" }),
  );
  assert.equal(packet.contract, "agent-ops.helpers.v1");
  assert.equal(packet.jobId, "gub-superbrain-probe");
  assert.equal(packet.scope, "relaunch");
  assert.ok(packet.helpers.some((helper) => helper.role === "relaunch"));
  assert.ok(packet.helpers.some((helper) => helper.role === "reserve"));
  assert.match(packet.helpers[0].prompt, /yuri-afk\/genesis/);
});

test("cli helpers defaults to next Genesis card", async () => {
  const chunks = [];
  const code = await runCli(["helpers"], {
    nowMs: NOW,
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  assert.match(chunks.join(""), /gub-inventory-tick/);
  assert.doesNotMatch(chunks.join(""), /dronehive-unicode-ci/);
});
