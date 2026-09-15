import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import assert from "node:assert/strict";
import { defaultLaunchPath, loadRoster } from "../src/dispatch.js";
import { claimJob, loadLedger, saveLedger } from "../src/ledger.js";
import { parseArgs, runCli } from "../src/cli.js";
import {
  INVENTORY_CONTRACT,
  defaultInventoryPath,
  writeInventoryTick,
} from "../src/tick.js";

const NOW = Date.parse("2026-09-14T16:00:00.000Z");

function sampleLedger() {
  return {
    jobs: [
      {
        id: "high",
        title: "High priority",
        repo: "github.com/yuro1991-afk/dronehive",
        kind: "fix",
        priority: 1,
        status: "open",
        claim: null,
        notes: "",
        verify: "true",
        files: [],
        collision: "",
      },
      {
        id: "low",
        title: "Low priority",
        repo: "github.com/yuro1991-afk/dronehive",
        kind: "implement",
        priority: 9,
        status: "done",
        claim: null,
        notes: "",
        verify: "true",
        files: [],
        collision: "",
      },
      {
        id: "stuck",
        title: "Blocked",
        repo: "github.com/yuro1991-afk/main",
        kind: "catalog",
        priority: 5,
        status: "blocked",
        claim: null,
        notes: "",
        verify: "true",
        files: [],
        collision: "",
      },
    ],
  };
}

test("writeInventoryTick writes contract snapshot and creates parent dirs", () => {
  const dir = mkdtempSync(join(tmpdir(), "agent-ops-tick-"));
  const dest = join(dir, "nested", "last-inventory.json");
  const ledger = sampleLedger();
  const snapshot = writeInventoryTick(ledger, dest, NOW);
  assert.equal(snapshot.contract, INVENTORY_CONTRACT);
  assert.equal(snapshot.at, new Date(NOW).toISOString());
  assert.equal(snapshot.total, 3);
  assert.equal(snapshot.open, 1);
  assert.equal(snapshot.claimed, 0);
  assert.equal(snapshot.done, 1);
  assert.equal(snapshot.blocked, 1);
  assert.equal(snapshot.nextId, "high");
  assert.equal(snapshot.takeInsteadId, null);
  assert.equal(snapshot.proveAfterApplyCommand, null);
  assert.equal(snapshot.worldNextId, null);
  assert.equal(snapshot.originLoggedIn, null);
  assert.equal(snapshot.originStatus, null);
  assert.equal(snapshot.idleCount, null);
  assert.equal(snapshot.runningCount, null);
  assert.deepEqual(snapshot.jobs, [
    {
      id: "high",
      status: "open",
      priority: 1,
      repo: "github.com/yuro1991-afk/dronehive",
      kind: "fix",
    },
    {
      id: "low",
      status: "done",
      priority: 9,
      repo: "github.com/yuro1991-afk/dronehive",
      kind: "implement",
    },
    {
      id: "stuck",
      status: "blocked",
      priority: 5,
      repo: "github.com/yuro1991-afk/main",
      kind: "catalog",
    },
  ]);
  const written = JSON.parse(readFileSync(dest, "utf8"));
  assert.deepEqual(written, snapshot);
});

test("expired claims count as open in the inventory tick", () => {
  const dir = mkdtempSync(join(tmpdir(), "agent-ops-tick-"));
  const dest = join(dir, "last-inventory.json");
  const ledger = sampleLedger();
  claimJob(ledger, "high", "agent-a", NOW, 1_000);
  const live = writeInventoryTick(ledger, dest, NOW);
  assert.equal(live.claimed, 1);
  assert.equal(live.open, 0);
  assert.equal(live.nextId, null);
  assert.equal(live.jobs.find((job) => job.id === "high").status, "claimed");
  const expired = writeInventoryTick(ledger, dest, NOW + 5_000);
  assert.equal(expired.claimed, 0);
  assert.equal(expired.open, 1);
  assert.equal(expired.nextId, "high");
  assert.equal(expired.jobs.find((job) => job.id === "high").status, "open");
});

test("defaultInventoryPath is repo/.genesis/last-inventory.json", () => {
  assert.equal(
    defaultInventoryPath("/workspace"),
    join("/workspace", ".genesis", "last-inventory.json"),
  );
});

test("cli tick writes --out and prints the snapshot", async () => {
  const dir = mkdtempSync(join(tmpdir(), "agent-ops-tick-cli-"));
  const ledgerPath = join(dir, "queue.json");
  saveLedger(ledgerPath, sampleLedger());
  const dest = join(dir, "out", "inventory.json");
  const chunks = [];
  const code = await runCli(["tick", "--ledger", ledgerPath, "--out", dest], {
    nowMs: NOW,
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const printed = JSON.parse(chunks.join(""));
  assert.equal(printed.contract, INVENTORY_CONTRACT);
  assert.equal(printed.nextId, "high");
  const written = JSON.parse(readFileSync(dest, "utf8"));
  assert.deepEqual(written, printed);
});

test("cli tick defaults to <root>/.genesis/last-inventory.json", async () => {
  const root = mkdtempSync(join(tmpdir(), "agent-ops-tick-root-"));
  const ledgerPath = join(root, "queue.json");
  saveLedger(ledgerPath, sampleLedger());
  const code = await runCli(["tick", "--ledger", ledgerPath], {
    nowMs: NOW,
    root,
    write: () => {},
  });
  assert.equal(code, 0);
  const dest = defaultInventoryPath(root);
  const written = JSON.parse(readFileSync(dest, "utf8"));
  assert.equal(written.contract, INVENTORY_CONTRACT);
  assert.equal(written.total, 3);
});

test("parseArgs accepts tick --out", () => {
  const parsed = parseArgs(["tick", "--out", "/tmp/inv.json"]);
  assert.equal(parsed.command, "tick");
  assert.equal(parsed.flags.out, "/tmp/inv.json");
});

test("writeInventoryTick nextId skips rostered cards", () => {
  const dir = mkdtempSync(join(tmpdir(), "agent-ops-tick-roster-"));
  const dest = join(dir, "last-inventory.json");
  const ledger = loadLedger(new URL("../ledger/queue.json", import.meta.url));
  const roster = loadRoster(fileURLToPath(new URL("../ledger/roster.json", import.meta.url)));
  const snapshot = writeInventoryTick(ledger, dest, NOW, { roster });
  assert.equal(snapshot.nextId, "review-landing-pad-prs");
  assert.equal(snapshot.takeInsteadId, null);
  assert.equal(snapshot.proveAfterApplyCommand, null);
  assert.notEqual(snapshot.nextId, "dronehive-unicode-ci");
  assert.notEqual(snapshot.nextId, "gub-inventory-tick");
  assert.equal(snapshot.worldNextId, "genesis-world-layer-102");
});

test("live leftover tick Superbrain exposes take-instead prove", () => {
  const dir = mkdtempSync(join(tmpdir(), "agent-ops-tick-superbrain-"));
  const dest = join(dir, "last-inventory.json");
  const ledger = loadLedger(new URL("../ledger/queue.json", import.meta.url));
  const roster = loadRoster(fileURLToPath(new URL("../ledger/roster.json", import.meta.url)));
  const snapshot = writeInventoryTick(ledger, dest, Date.parse("2026-09-14T19:00:00.000Z"), {
    roster,
  });
  assert.equal(snapshot.nextId, "review-landing-pad-prs");
  assert.equal(snapshot.takeInsteadId, null);
  assert.equal(snapshot.proveAfterApplyCommand, null);
});

test("writeInventoryTick leftover unused nextId skips dest launches", () => {
  const dir = mkdtempSync(join(tmpdir(), "agent-ops-tick-launched-"));
  const dest = join(dir, "last-inventory.json");
  const ledger = loadLedger(new URL("../ledger/queue.json", import.meta.url));
  const roster = loadRoster(fileURLToPath(new URL("../ledger/roster.json", import.meta.url)));
  const onDisk = defaultLaunchPath(fileURLToPath(new URL("..", import.meta.url)));
  const snapshot = writeInventoryTick(ledger, dest, NOW, {
    roster,
    launchDir: onDisk,
    repoLaunchDir: onDisk,
  });
  assert.equal(snapshot.nextId, null);
  assert.equal(snapshot.worldNextId, "genesis-world-layer-102");
});

test("cli tick nextId is leftover unused exhausted, not the fork's card", async () => {
  const dest = join(mkdtempSync(join(tmpdir(), "agent-ops-tick-leftover-")), "inventory.json");
  const chunks = [];
  const code = await runCli(["tick", "--out", dest], {
    nowMs: NOW,
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const printed = JSON.parse(chunks.join(""));
  assert.equal(printed.nextId, null);
  assert.notEqual(printed.nextId, "dronehive-unicode-ci");
});
