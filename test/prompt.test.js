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

test("empty prompt refuses a fifth queue", () => {
  const packet = buildPrompt(null);
  assert.equal(packet.contract, PROMPT_CONTRACT);
  assert.equal(packet.url, ORIGIN_UI);
  assert.match(packet.text, /Do not invent Origin work/);
});

test("cli prompt defaults to leftover GitHub card as markdown", async () => {
  const chunks = [];
  const code = await runCli(["prompt"], {
    nowMs: NOW,
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const text = chunks.join("");
  assert.match(text, /review-landing-pad-prs/);
  assert.match(text, /GitHub launch/);
  assert.doesNotMatch(text, /gub-route-intent/);
});

test("cli prompt --agent prints the roster GitHub card, not leftover next", async () => {
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
  assert.match(text, new RegExp(`GitHub launch — ${parked.jobId}`));
  assert.doesNotMatch(text, /review-landing-pad-prs/);
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
  assert.equal(packet.jobId, "review-landing-pad-prs");
  assert.match(packet.text, /GitHub launch/);
});
