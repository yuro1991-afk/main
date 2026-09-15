import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import assert from "node:assert/strict";
import { ORIGIN_UI, PROMPT_CONTRACT, buildPrompt, renderLaunchPrompt } from "../src/prompt.js";
import { loadRoster } from "../src/dispatch.js";
import { runCli } from "../src/cli.js";

const NOW = Date.parse("2026-09-14T16:00:00.000Z");

test("renderLaunchPrompt is paste-ready Origin text", () => {
  const text = renderLaunchPrompt({
    id: "gub-inventory-tick",
    title: "Implement GUB continuous inventory tick",
    repo: "origin.cursor.com/git/yuri-afk/genesis",
    kind: "origin-slice",
    priority: 6,
    status: "open",
    claim: null,
    notes: "Wave 4",
    verify: "write last-inventory.json",
    files: [],
    collision: "port 8787",
  });
  assert.match(text, /Origin launch — gub-inventory-tick/);
  assert.match(text, /yuri-afk\/genesis/);
  assert.match(text, /handoff-gub-inventory-tick/);
  assert.match(text, /origin auth status/);
  assert.match(text, /repo clone yuri-afk\/genesis/);
  assert.doesNotMatch(text, /dronehive-unicode/);
});

test("gub-superbrain-probe prompt refuses the probe", () => {
  const text = renderLaunchPrompt({
    id: "gub-superbrain-probe",
    title: "Probe Superbrain",
    repo: "origin.cursor.com/git/yuri-afk/genesis",
    kind: "origin-slice",
    priority: 3,
    status: "claimed",
    claim: null,
    notes: "Expired leftover next",
    verify: "Do not probe. Leave a review on main#10 or apply one catalog patch.",
    files: [],
    collision: "Do not reopen main#1",
  });
  assert.match(text, /Stop Superbrain probe — gub-superbrain-probe/);
  assert.match(text, /no more Superbrain/);
  assert.match(text, /Do not run node src\/cli.js probe/);
  assert.doesNotMatch(text, /Origin launch/);
  assert.doesNotMatch(text, /Do not mark Superbrain LIVE without a successful probe/);
  assert.doesNotMatch(text, /This pad token cannot push Origin — implement there/);
  assert.match(text, /patches --prove/);
  assert.match(text, /prove-after-apply/);
  const packet = buildPrompt({
    id: "gub-superbrain-probe",
    title: "Probe Superbrain",
    repo: "origin.cursor.com/git/yuri-afk/genesis",
    kind: "origin-slice",
    priority: 3,
    status: "claimed",
    claim: null,
    notes: "Expired leftover next",
    verify: "Do not probe. Leave a review on main#10 or apply one catalog patch.",
    files: [],
    collision: "Do not reopen main#1",
  });
  assert.equal(packet.takeInstead, "dronehive-unicode-ci");
  assert.ok(packet.applyNext.some((line) => line.includes("dronehive-pro-chat-cp1252.patch")));
  assert.equal(
    packet.proveAfterApplyCommand,
    "node src/cli.js patches --prove-after-apply --job dronehive-unicode-ci",
  );
});

test("cataloged sibling prompt is apply, not Origin launch", () => {
  const text = renderLaunchPrompt({
    id: "dronehive-unicode-ci",
    title: "Fix dronehive python-smoke UnicodeEncodeError",
    repo: "github.com/yuro1991-afk/dronehive",
    kind: "fix",
    priority: 8,
    status: "blocked",
    claim: null,
    notes: "cp1252",
    verify: "python -m drone app pro",
    files: [],
    collision: "tool_agent.py",
  });
  assert.match(text, /Apply dronehive-unicode-ci/);
  assert.match(text, /patches --prove --job dronehive-unicode-ci/);
  assert.match(text, /patches --prove-after-apply --job dronehive-unicode-ci/);
  assert.match(text, /never write \/tmp\/siblings/);
  assert.match(text, /prefer brief/);
  assert.match(text, /dronehive-pro-chat-cp1252\.patch/);
  assert.match(text, /forget Origin/);
  assert.doesNotMatch(text, /npm run autofix -- apply/);
  assert.doesNotMatch(text, /pull\/5/);
  assert.doesNotMatch(text, /Origin launch/);
  assert.doesNotMatch(text, /Do not work dronehive/);
});

test("stacked catalog prompt names requires priors", () => {
  const text = renderLaunchPrompt({
    id: "dronehive-runtime-host-paths",
    title: "Wrap leftover dronehive runtime Path()",
    repo: "github.com/yuro1991-afk/dronehive",
    kind: "implement",
    priority: 25,
    status: "blocked",
    claim: null,
    notes: "After portable-paths",
    verify: "python3 -m py_compile drone/grok_handoff.py",
    files: [],
    collision: "Apply after dronehive-portable-paths.",
  });
  assert.match(text, /Apply dronehive-runtime-host-paths/);
  assert.match(text, /Requires \(apply first\): `patches\/dronehive-portable-paths\.patch`/);
  assert.match(text, /Patch: `patches\/dronehive-runtime-host-paths\.patch`/);
  assert.match(text, /git apply \/path\/to\/main\/patches\/dronehive-portable-paths\.patch/);
});

test("cataloged sibling prompt notes drop the Genesis-only blocked line", () => {
  const queue = JSON.parse(
    readFileSync(new URL("../ledger/queue.json", import.meta.url), "utf8"),
  );
  const drone = queue.jobs.find((item) => item.id === "dronehive-unicode-ci");
  assert.match(drone.notes, /Blocked: Yuri scoped this landing pad to Genesis only/);
  const text = renderLaunchPrompt(drone);
  assert.match(text, /Apply dronehive-unicode-ci/);
  assert.match(text, /cp1252|UnicodeEncodeError|python-smoke/);
  assert.doesNotMatch(text, /Blocked: Yuri scoped this landing pad to Genesis only/);
});

test("cataloged sibling prompt JSON includes proveAfterApplyCommand", () => {
  const packet = buildPrompt({
    id: "dronehive-unicode-ci",
    title: "Fix dronehive python-smoke UnicodeEncodeError",
    repo: "github.com/yuro1991-afk/dronehive",
    kind: "fix",
    priority: 8,
    status: "blocked",
    claim: null,
    notes: "cp1252",
    verify: "python -m drone app pro",
    files: [],
    collision: "tool_agent.py",
  });
  assert.equal(
    packet.proveAfterApplyCommand,
    "node src/cli.js patches --prove-after-apply --job dronehive-unicode-ci",
  );
  assert.ok(packet.applyNext.some((line) => line.includes("dronehive-pro-chat-cp1252.patch")));
  assert.doesNotMatch(packet.applyNext.join("\n"), /prove-after-apply/);
});

test("empty prompt refuses a fifth queue", () => {
  const packet = buildPrompt(null);
  assert.equal(packet.contract, PROMPT_CONTRACT);
  assert.equal(packet.url, ORIGIN_UI);
  assert.equal(packet.applyNext, undefined);
  assert.equal(packet.proveAfterApplyCommand, undefined);
  assert.match(packet.text, /Do not open another landing-pad queue/);
});

test("cli prompt defaults to next Genesis card as markdown", async () => {
  const chunks = [];
  const code = await runCli(["prompt"], {
    nowMs: NOW,
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const text = chunks.join("");
  assert.match(text, /gub-route-intent/);
  assert.match(text, /Origin launch/);
  assert.doesNotMatch(text, /dronehive-unicode-ci/);
});

test("cli prompt --agent prints the roster Origin card, not leftover next", async () => {
  const parked = loadRoster(fileURLToPath(new URL("../ledger/roster.json", import.meta.url)))
    .assignments[0];
  const chunks = [];
  const code = await runCli(["prompt", "--agent", parked.bcId], {
    nowMs: NOW,
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const text = chunks.join("");
  assert.match(text, new RegExp(`Origin launch — ${parked.jobId}`));
  assert.doesNotMatch(text, /gub-inventory-tick/);
});

test("cli prompt --json wraps the text", async () => {
  const chunks = [];
  const code = await runCli(["prompt", "--json"], {
    nowMs: NOW,
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const packet = JSON.parse(chunks.join(""));
  assert.equal(packet.contract, PROMPT_CONTRACT);
  assert.equal(packet.jobId, "gub-route-intent");
  assert.match(packet.text, /POST \/v1\/route/);
});
