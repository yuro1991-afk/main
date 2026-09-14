import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadLedger, listJobs } from "../src/ledger.js";
import { renderPlaybook, writePlaybooks } from "../src/playbook.js";
import { runCli } from "../src/cli.js";

const NOW = Date.parse("2026-09-14T16:00:00.000Z");

test("renderPlaybook includes collision and verify", () => {
  const ledger = loadLedger(new URL("../ledger/queue.json", import.meta.url));
  const job = ledger.jobs.find((item) => item.id === "dronehive-unicode-ci");
  const md = renderPlaybook(job);
  assert.match(md, /dronehive-unicode-ci/);
  assert.match(md, /Collision/);
  assert.match(md, /Do not reopen/);
});

test("writePlaybooks writes one file per job", () => {
  const dir = mkdtempSync(join(tmpdir(), "agent-ops-playbooks-"));
  const ledger = loadLedger(new URL("../ledger/queue.json", import.meta.url));
  const open = listJobs(ledger, { status: "open", genesis: true }, NOW);
  const written = writePlaybooks(open, dir);
  assert.equal(written.length, open.length);
  const body = readFileSync(join(dir, "gub-inventory-tick.md"), "utf8");
  assert.match(body, /gub-inventory-tick/);
  assert.match(body, /origin auth status/);
  const world = readFileSync(join(dir, "genesis-world-layer-102.md"), "utf8");
  assert.match(world, /origin auth status/);
});

test("cli playbooks --here writes into --out", async () => {
  const dir = mkdtempSync(join(tmpdir(), "agent-ops-playbooks-cli-"));
  const chunks = [];
  const code = await runCli(["playbooks", "--here", "--out", dir], {
    nowMs: NOW,
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  assert.match(chunks.join(""), /"count": 0/);
});
