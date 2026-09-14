import { test } from "node:test";
import assert from "node:assert/strict";
import { ORIGIN_UI, PROMPT_CONTRACT, buildPrompt, renderLaunchPrompt } from "../src/prompt.js";
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
  assert.doesNotMatch(text, /dronehive-unicode/);
});

test("empty prompt refuses a fifth queue", () => {
  const packet = buildPrompt(null);
  assert.equal(packet.contract, PROMPT_CONTRACT);
  assert.equal(packet.url, ORIGIN_UI);
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
  assert.match(text, /gub-inventory-tick/);
  assert.match(text, /Origin launch/);
  assert.doesNotMatch(text, /dronehive-unicode-ci/);
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
  assert.equal(packet.jobId, "gub-inventory-tick");
  assert.match(packet.text, /python3 -m gub serve/);
});
