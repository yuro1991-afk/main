import { test } from "node:test";
import assert from "node:assert/strict";
import { JOB_KINDS } from "../src/kinds.js";
import { applyNextForJob, proveAfterApplyForJob } from "../src/brief.js";
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
    job("origin-slice", { id: "gub-inventory-tick" }),
  );
  assert.equal(packet.contract, "agent-ops.helpers.v1");
  assert.equal(packet.jobId, "gub-inventory-tick");
  assert.equal(packet.scope, "relaunch");
  assert.ok(packet.helpers.some((helper) => helper.role === "relaunch"));
  assert.ok(packet.helpers.some((helper) => helper.role === "reserve"));
  assert.match(packet.helpers[0].prompt, /yuri-afk\/genesis/);
  assert.match(packet.helpers[0].prompt, /origin auth status/);
});

test("gub-superbrain-probe helpers refuse the probe", () => {
  const packet = buildHelperPacket(
    job("origin-slice", { id: "gub-superbrain-probe" }),
  );
  assert.equal(packet.jobId, "gub-superbrain-probe");
  const text = packet.helpers.map((helper) => helper.prompt).join("\n");
  assert.ok(packet.helpers.some((helper) => helper.role === "refuse"));
  assert.match(text, /no more Superbrain/);
  assert.match(text, /Do not run node src\/cli.js probe/);
  assert.match(text, /patches --prove/);
  assert.match(text, /prove-after-apply/);
  assert.doesNotMatch(text, /origin auth status/);
  assert.doesNotMatch(text, /Implement the slice there/);
  assert.equal(packet.takeInstead, "dronehive-unicode-ci");
  assert.ok(packet.applyNext.some((line) => line.includes("dronehive-pro-chat-cp1252.patch")));
  assert.equal(
    packet.proveAfterApplyCommand,
    "node src/cli.js patches --prove-after-apply --job dronehive-unicode-ci",
  );
});

test("review helpers name open PRs #8/#9/#10", () => {
  const landing = planHelpers(job("review", { id: "review-landing-pad-prs" }));
  const landingText = landing.map((helper) => helper.prompt).join("\n");
  assert.match(landingText, /#8, #9, #10, #11, #12, #13, #14, #15, #16, #17, #18, #19, #20, #21, #22, #23, #24, #25, #26, #27, #28, #29, #30, #31, #32, #33, #34, #35, #36, #37, #38, #39, #40, #41, #42, #43, #44, #45, #46, #47, #48, #49, #50, #51, #52, #53, #54, #55, #56, #57, #58, #59, #60, #61, or #62/);
  assert.match(landingText, /gh pr view 8,9,10/);
  assert.doesNotMatch(landingText, /gh pr view 3,4,5,6/);

  const pr10 = planHelpers(job("review", { id: "review-main-pr10" }));
  const pr10Text = pr10.map((helper) => helper.prompt).join("\n");
  assert.match(pr10Text, /main\/pull\/10/);
  assert.match(pr10Text, /gh pr view 10/);
  assert.match(pr10Text, /Do not steal head\/ears\/eyes\/vision\/bridge/);
});

test("probe helpers refuse the Superbrain CLI probe", () => {
  const plans = planHelpers(job("probe", { id: "unlisted-lane-probe" }));
  assert.match(plans[0].prompt, /Do not run node src\/cli.js probe/);
  assert.doesNotMatch(plans[0].prompt, /^Run node src\/cli.js probe/);
});

test("cataloged sibling helpers prove then apply", () => {
  const cataloged = job("fix", {
    id: "dronehive-unicode-ci",
    repo: "github.com/yuro1991-afk/dronehive",
  });
  const plans = planHelpers(cataloged);
  const packet = buildHelperPacket(cataloged);
  const text = plans.map((helper) => helper.prompt).join("\n");
  assert.ok(plans.some((helper) => helper.role === "prove"));
  assert.ok(plans.some((helper) => helper.role === "prove-after-apply"));
  assert.ok(plans.some((helper) => helper.role === "apply"));
  const prove = plans.find((helper) => helper.role === "prove");
  assert.match(prove.prompt, /patches --prove --job dronehive-unicode-ci/);
  assert.match(prove.prompt, /Clones --no-hardlinks throwaways/);
  assert.match(prove.prompt, /Never write \/tmp\/siblings/);
  assert.match(text, /patches --prove-after-apply --job dronehive-unicode-ci/);
  assert.match(text, /Never write \/tmp\/siblings/);
  assert.match(text, /dronehive-pro-chat-cp1252\.patch/);
  assert.doesNotMatch(text, /write a precise patch plan/);
  assert.doesNotMatch(text, /Do not invent Superbrain LIVE/);
  assert.deepEqual(packet.applyNext, applyNextForJob(cataloged));
  assert.equal(packet.proveAfterApplyCommand, proveAfterApplyForJob(cataloged));
  assert.ok(packet.applyNext.some((line) => line.includes("dronehive-pro-chat-cp1252.patch")));
});

test("stacked catalog apply helper names requires priors first", () => {
  const stacked = job("implement", {
    id: "dronehive-runtime-host-paths",
    repo: "github.com/yuro1991-afk/dronehive",
  });
  const apply = planHelpers(stacked).find((helper) => helper.role === "apply");
  assert.ok(apply);
  assert.match(apply.prompt, /Write-checkout apply/);
  assert.match(apply.prompt, /never write \/tmp\/siblings/);
  assert.match(apply.prompt, /dronehive-portable-paths\.patch/);
  assert.match(apply.prompt, /dronehive-runtime-host-paths\.patch/);
  const portable = apply.prompt.indexOf("git apply /path/to/main/patches/dronehive-portable-paths.patch");
  const runtime = apply.prompt.indexOf("git apply /path/to/main/patches/dronehive-runtime-host-paths.patch");
  assert.ok(portable >= 0 && runtime > portable);
  assert.doesNotMatch(apply.prompt, /patches --prove-after-apply --job/);
  assert.doesNotMatch(apply.prompt, /npm run autofix/);
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
  assert.match(chunks.join(""), /review-landing-pad-prs/);
  assert.doesNotMatch(chunks.join(""), /gub-route-intent/);
});
