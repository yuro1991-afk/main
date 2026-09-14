import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadLedger, listJobs } from "../src/ledger.js";
import { renderPlaybook, writePlaybooks } from "../src/playbook.js";
import { defaultPatchesIndexPath, loadPatchIndex } from "../src/patches.js";
import { runCli } from "../src/cli.js";

const ROOT = dirname(fileURLToPath(new URL("../package.json", import.meta.url)));

const NOW = Date.parse("2026-09-14T16:00:00.000Z");

test("cataloged GitHub playbooks name the patch in why, not the generic relaunch line", () => {
  const index = loadPatchIndex(defaultPatchesIndexPath(ROOT));
  const playbookDir = join(ROOT, "playbooks");
  let checked = 0;
  for (const patch of index.patches) {
    const dest = join(playbookDir, `${patch.id}.md`);
    if (!existsSync(dest)) continue;
    const why = readFileSync(dest, "utf8")
      .split("\n")
      .find((line) => line.startsWith("- why:"));
    assert.ok(why, `${patch.id} playbook has a why line`);
    assert.doesNotMatch(why, /Relaunch against the named repo/);
    assert.match(why, new RegExp(patch.file.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    const body = readFileSync(dest, "utf8");
    assert.match(body, new RegExp(`patches --prove --job ${patch.id}`));
    assert.doesNotMatch(body, /Blocked: Yuri scoped this landing pad to Genesis only/);
    checked += 1;
  }
  assert.ok(checked >= 162, `expected catalog playbooks, got ${checked}`);
});

test("renderPlaybook includes collision and verify", () => {
  const ledger = loadLedger(new URL("../ledger/queue.json", import.meta.url));
  const job = ledger.jobs.find((item) => item.id === "dronehive-unicode-ci");
  const md = renderPlaybook(job);
  assert.match(md, /dronehive-unicode-ci/);
  assert.match(md, /patches --prove --job dronehive-unicode-ci/);
  assert.match(md, /Collision/);
  assert.match(md, /Do not reopen/);
  assert.match(job.notes, /Blocked: Yuri scoped this landing pad to Genesis only/);
  assert.doesNotMatch(md, /Blocked: Yuri scoped this landing pad to Genesis only/);
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
