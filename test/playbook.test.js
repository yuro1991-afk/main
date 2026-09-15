import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadLedger, listJobs } from "../src/ledger.js";
import { checkPlaybook, renderPlaybook, writePlaybooks } from "../src/playbook.js";
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
  assert.match(md, /patches --prove-after-apply --job dronehive-unicode-ci/);
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

test("cli playbooks --write --here writes into --out", async () => {
  const dir = mkdtempSync(join(tmpdir(), "agent-ops-playbooks-cli-"));
  const chunks = [];
  const code = await runCli(["playbooks", "--write", "--here", "--out", dir], {
    nowMs: NOW,
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  assert.match(chunks.join(""), /review-landing-pad-prs/);
});

test("cli playbooks without --job names first parked apply", async () => {
  const dest = join(ROOT, "playbooks", "dronehive-unicode-ci.md");
  const before = readFileSync(dest, "utf8");
  const chunks = [];
  const code = await runCli(["playbooks"], {
    nowMs: NOW,
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.wrote, false);
  assert.equal(parsed.nextApply, "dronehive-unicode-ci");
  assert.equal(parsed.prefer, "node src/cli.js brief --job dronehive-unicode-ci");
  assert.ok(parsed.missingRequiresJobs.includes("dronehive-ubuntu-smoke"));
  assert.ok(parsed.count >= 162);
  assert.equal(parsed.compact, true);
  assert.equal(parsed.results[0].missing, undefined);
  assert.equal(typeof parsed.results[0].missingCount, "number");
  assert.ok(Buffer.byteLength(chunks.join(""), "utf8") < 40_000);
  assert.equal(readFileSync(dest, "utf8"), before);
});

test("cli playbooks defaults to --check and never writes", async () => {
  const dest = join(ROOT, "playbooks", "dronehive-ubuntu-smoke.md");
  const before = readFileSync(dest, "utf8");
  const chunks = [];
  const code = await runCli(["playbooks", "--job", "dronehive-ubuntu-smoke"], {
    nowMs: NOW,
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.contract, "agent-ops.playbooks.check.v1");
  assert.equal(parsed.wrote, false);
  assert.equal(parsed.compact, false);
  assert.deepEqual(parsed.results[0].missingRequires, ["patches/dronehive-pro-chat-cp1252.patch"]);
  assert.ok(Array.isArray(parsed.results[0].missing));
  assert.equal(parsed.nextApply, "dronehive-ubuntu-smoke");
  assert.equal(parsed.prefer, "node src/cli.js brief --job dronehive-ubuntu-smoke");
  assert.match(parsed.doNot, /writePlaybooks/);
  assert.equal(readFileSync(dest, "utf8"), before);
});

test("cli playbooks --write refuses the in-repo playbooks directory", async () => {
  const dest = join(ROOT, "playbooks", "dronehive-unicode-ci.md");
  const before = readFileSync(dest, "utf8");
  const chunks = [];
  const code = await runCli(["playbooks", "--write"], {
    nowMs: NOW,
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 2);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.wrote, false);
  assert.match(parsed.error, /refuses the in-repo playbooks/);
  assert.match(parsed.prefer, /brief --job/);
  assert.equal(readFileSync(dest, "utf8"), before);
});

test("cli playbooks --check --write is a usage error", async () => {
  const dest = join(ROOT, "playbooks", "dronehive-unicode-ci.md");
  const before = readFileSync(dest, "utf8");
  const chunks = [];
  const code = await runCli(["playbooks", "--check", "--write", "--out", mkdtempSync(join(tmpdir(), "agent-ops-playbooks-both-"))], {
    nowMs: NOW,
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 2);
  assert.match(chunks.join(""), /pass --check or --write, not both/);
  assert.equal(readFileSync(dest, "utf8"), before);
});

test("on-disk catalog playbooks are stale vs live firstCommands", () => {
  const ledger = loadLedger(new URL("../ledger/queue.json", import.meta.url));
  const job = ledger.jobs.find((item) => item.id === "dronehive-unicode-ci");
  const onDisk = readFileSync(join(ROOT, "playbooks", "dronehive-unicode-ci.md"), "utf8");
  const stale = checkPlaybook(job, onDisk);
  assert.equal(stale.stale, true);
  assert.ok(stale.missing.some((line) => line.includes("prove-after-apply")));
  assert.equal(stale.prefer, "node src/cli.js brief --job dronehive-unicode-ci");
  const fresh = checkPlaybook(job, renderPlaybook(job));
  assert.equal(fresh.stale, false);
  assert.deepEqual(fresh.missing, []);
});

test("playbooks --check names missing stacked requires without rewriting", async () => {
  const ledger = loadLedger(new URL("../ledger/queue.json", import.meta.url));
  const job = ledger.jobs.find((item) => item.id === "dronehive-ubuntu-smoke");
  const onDisk = readFileSync(join(ROOT, "playbooks", "dronehive-ubuntu-smoke.md"), "utf8");
  const stale = checkPlaybook(job, onDisk);
  assert.equal(stale.stale, true);
  assert.deepEqual(stale.requires, ["patches/dronehive-pro-chat-cp1252.patch"]);
  assert.deepEqual(stale.missingRequires, ["patches/dronehive-pro-chat-cp1252.patch"]);
  assert.doesNotMatch(onDisk, /dronehive-pro-chat-cp1252\.patch/);
  const fresh = checkPlaybook(job, renderPlaybook(job));
  assert.equal(fresh.stale, false);
  assert.deepEqual(fresh.missingRequires, []);
  assert.match(renderPlaybook(job), /dronehive-pro-chat-cp1252\.patch then patches\/dronehive-ubuntu-smoke\.patch/);

  const chunks = [];
  const code = await runCli(["playbooks", "--check", "--job", "dronehive-ubuntu-smoke"], {
    nowMs: NOW,
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.wrote, false);
  assert.equal(parsed.nextApply, "dronehive-ubuntu-smoke");
  assert.deepEqual(parsed.results[0].missingRequires, ["patches/dronehive-pro-chat-cp1252.patch"]);
  assert.match(parsed.doNot, /writePlaybooks/);
});

test("cli playbooks --check does not write", async () => {
  const chunks = [];
  const code = await runCli(["playbooks", "--check", "--job", "dronehive-unicode-ci"], {
    nowMs: NOW,
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.contract, "agent-ops.playbooks.check.v1");
  assert.equal(parsed.wrote, false);
  assert.equal(parsed.stale, 1);
  assert.equal(parsed.results[0].id, "dronehive-unicode-ci");
  assert.ok(parsed.results[0].missing.some((line) => line.includes("prove-after-apply")));
  assert.match(parsed.doNot, /writePlaybooks/);
});
