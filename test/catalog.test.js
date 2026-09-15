import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { loadLedger, saveLedger } from "../src/ledger.js";
import {
  CATALOG_CONTRACT,
  applyProposedJobs,
  defaultEntriesPath,
  jobIdForEntry,
  kindForJobId,
  loadEntries,
  mineCatalog,
  normalizeEntries,
  pageIdFromUrl,
} from "../src/catalog.js";
import { runCli } from "../src/cli.js";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const NOW = Date.parse("2026-09-14T18:06:00.000Z");

function job(id, extras = {}) {
  return {
    id,
    title: id,
    repo: "origin.cursor.com/git/yuri-afk/genesis",
    kind: extras.kind ?? "catalog",
    priority: extras.priority ?? 10,
    status: extras.status ?? "open",
    claim: extras.claim ?? null,
    notes: extras.notes ?? "",
    verify: "true",
    files: [],
    collision: "",
  };
}

test("jobIdForEntry maps aliases and default playbook slugs", () => {
  assert.equal(jobIdForEntry("playbook/gub-route-intent"), "gub-route-intent");
  assert.equal(jobIdForEntry("playbook/inventory-mcp-tools"), "catalog-inventory-mcp");
  assert.equal(jobIdForEntry("playbook/vercel-preview-debug"), "catalog-vercel-preview-debug");
  assert.equal(jobIdForEntry("resource/boss-superbrain"), null);
  assert.equal(kindForJobId("gub-route-intent"), "origin-slice");
  assert.equal(kindForJobId("catalog-inventory-mcp"), "catalog");
});

test("pageIdFromUrl accepts /p/ and bare Notion ids", () => {
  assert.equal(
    pageIdFromUrl("https://app.notion.com/3db735da33f3819db32ecfc122a40c70"),
    "3db735da33f3819db32ecfc122a40c70",
  );
  assert.equal(
    pageIdFromUrl("https://app.notion.com/p/3db735da33f3819db32ecfc122a40c70?pvs=204"),
    "3db735da33f3819db32ecfc122a40c70",
  );
});

test("mineCatalog proposes only uncarded playbooks", () => {
  const entries = normalizeEntries([
    {
      entryId: "playbook/gub-route-intent",
      name: "GUB Route Intent",
      type: "playbook",
      status: "active",
      url: "https://app.notion.com/p/3db735da33f3819db32ecfc122a40c70",
      description: "Score playbooks first.",
    },
    {
      entryId: "playbook/gub-inventory-tick",
      name: "GUB Continuous Inventory",
      type: "playbook",
      status: "draft",
      url: "https://app.notion.com/p/3db735da33f38109a568ed3d589253b6",
    },
    {
      entryId: "resource/boss-superbrain",
      name: "BOSS Ethernet live Superbrain",
      type: "resource",
      status: "cataloged",
      url: "https://app.notion.com/p/3db735da33f3810faa09de097a086e8e",
    },
  ]);
  const ledger = {
    jobs: [
      job("gub-inventory-tick", {
        kind: "origin-slice",
        notes: "Notion playbook/gub-inventory-tick",
      }),
    ],
  };
  const packet = mineCatalog(entries, ledger, NOW);
  assert.equal(packet.contract, CATALOG_CONTRACT);
  assert.deepEqual(packet.covered, ["gub-inventory-tick"]);
  assert.equal(packet.proposed.length, 1);
  assert.equal(packet.proposed[0].id, "gub-route-intent");
  assert.equal(packet.proposed[0].kind, "origin-slice");
  assert.equal(packet.proposed[0].priority, 10);
  assert.match(packet.proposed[0].notes, /playbook\/gub-route-intent/);
  assert.deepEqual(packet.skipped, [{ entryId: "resource/boss-superbrain", reason: "not-playbook" }]);
});

test("mineCatalog treats a Notion URL in notes as covered", () => {
  const entries = normalizeEntries([
    {
      "Entry ID": "playbook/agent-routing-matrix",
      Name: "Build Agent Routing Matrix",
      Type: "playbook",
      Status: "active",
      url: "https://app.notion.com/3db735da33f381679966e19d177079ce",
    },
  ]);
  const ledger = {
    jobs: [
      job("agent-routing-matrix", {
        notes: "Notion https://app.notion.com/p/3db735da33f381679966e19d177079ce",
      }),
    ],
  };
  const packet = mineCatalog(entries, ledger, NOW);
  assert.deepEqual(packet.proposed, []);
  assert.deepEqual(packet.covered, ["agent-routing-matrix"]);
});

test("applyProposedJobs is idempotent", () => {
  const ledger = { jobs: [] };
  const proposed = [
    job("gub-route-intent", { kind: "origin-slice", notes: "playbook/gub-route-intent" }),
  ];
  assert.deepEqual(applyProposedJobs(ledger, proposed), ["gub-route-intent"]);
  assert.deepEqual(applyProposedJobs(ledger, proposed), []);
  assert.equal(ledger.jobs.length, 1);
});

test("seeded Notion snapshot cards every Genesis playbook", () => {
  const ledger = loadLedger(join(ROOT, "ledger", "queue.json"));
  const entries = loadEntries(defaultEntriesPath(ROOT));
  const packet = mineCatalog(entries, ledger, NOW);
  const expected = [
    "gub-route-intent",
    "gub-run-playbook",
    "catalog-inventory-mcp",
    "catalog-vercel-preview-debug",
    "catalog-context-web-research",
    "catalog-hf-model-explore",
    "catalog-apify-actor-extract",
    "catalog-figma-design-to-code",
    "catalog-pr-review-ship",
    "catalog-compound-eng-feature",
  ];
  const proposedIds = packet.proposed.map((item) => item.id);
  if (proposedIds.length > 0) {
    assert.deepEqual(proposedIds, expected);
  }
  for (const id of expected) {
    assert.ok(
      proposedIds.includes(id) ||
        packet.covered.includes(id) ||
        ledger.jobs.some((item) => item.id === id),
      `missing card ${id}`,
    );
  }
  assert.ok(packet.covered.includes("gub-inventory-tick"));
  assert.ok(packet.covered.includes("catalog-notion-sync"));
  assert.ok(packet.skipped.some((row) => row.entryId === "resource/boss-superbrain"));
});

test("cli catalog --write appends uncarded playbooks", async () => {
  const dir = mkdtempSync(join(tmpdir(), "agent-ops-catalog-"));
  const ledgerPath = join(dir, "queue.json");
  saveLedger(ledgerPath, {
    jobs: [
      job("gub-inventory-tick", {
        kind: "origin-slice",
        notes: "Notion playbook/gub-inventory-tick",
      }),
    ],
  });
  const chunks = [];
  const code = await runCli(
    [
      "catalog",
      "--ledger",
      ledgerPath,
      "--entries",
      defaultEntriesPath(ROOT),
      "--write",
      "--out",
      join(dir, "mine.json"),
    ],
    {
      root: dir,
      nowMs: NOW,
      write: (value) => chunks.push(value),
    },
  );
  assert.equal(code, 0);
  const packet = JSON.parse(chunks.join(""));
  assert.equal(packet.contract, CATALOG_CONTRACT);
  assert.ok(packet.added.includes("gub-route-intent"));
  const saved = loadLedger(ledgerPath);
  assert.ok(saved.jobs.some((item) => item.id === "gub-route-intent"));
  const mine = JSON.parse(readFileSync(join(dir, "mine.json"), "utf8"));
  assert.equal(mine.proposed.length, packet.proposed.length);
  assert.equal(packet.playbooksWrote, true);
  assert.equal(packet.packetsWrote, true);
});

test("cli catalog --write refuses in-repo playbooks and reviews", async () => {
  const dir = mkdtempSync(join(tmpdir(), "agent-ops-catalog-refuse-"));
  const ledgerPath = join(dir, "queue.json");
  saveLedger(ledgerPath, {
    jobs: [
      job("gub-inventory-tick", {
        kind: "origin-slice",
        notes: "Notion playbook/gub-inventory-tick",
      }),
    ],
  });
  const playbook = join(ROOT, "playbooks", "gub-route-intent.md");
  const packet = join(ROOT, "reviews", "handoff-gub-route-intent.md");
  const beforePlaybook = readFileSync(playbook, "utf8");
  const beforePacket = readFileSync(packet, "utf8");
  const chunks = [];
  const code = await runCli(
    [
      "catalog",
      "--ledger",
      ledgerPath,
      "--entries",
      defaultEntriesPath(ROOT),
      "--write",
      "--out",
      join(dir, "mine.json"),
    ],
    {
      nowMs: NOW,
      write: (value) => chunks.push(value),
    },
  );
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.ok(parsed.added.includes("gub-route-intent"));
  assert.equal(parsed.playbooksWrote, false);
  assert.equal(parsed.packetsWrote, false);
  assert.deepEqual(parsed.playbooks, []);
  assert.deepEqual(parsed.packets, []);
  assert.match(parsed.doNot, /writePlaybooks/);
  assert.equal(readFileSync(playbook, "utf8"), beforePlaybook);
  assert.equal(readFileSync(packet, "utf8"), beforePacket);
});
