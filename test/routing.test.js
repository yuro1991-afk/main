import { test } from "node:test";
import assert from "node:assert/strict";
import { destinationForKind, leftoverForRoute, routeIntent, scorePlaybooks } from "../src/routing.js";
import { JOB_KINDS } from "../src/kinds.js";
import { loadEntries, defaultEntriesPath } from "../src/catalog.js";
import { loadLedger } from "../src/ledger.js";
import { loadRoster } from "../src/dispatch.js";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const NOW = Date.parse("2026-09-14T18:13:00.000Z");

function job(id, extras = {}) {
  return {
    id,
    title: id,
    repo: "origin.cursor.com/git/yuri-afk/genesis",
    kind: extras.kind ?? "origin-slice",
    priority: extras.priority ?? 10,
    status: extras.status ?? "open",
    claim: extras.claim ?? null,
    notes: "",
    verify: "true",
    files: [],
    collision: "",
  };
}

test("keep-busy routes to GitHub siblings, not Origin", () => {
  const route = routeIntent("Keep my agents busy");
  assert.match(route.destination, /GitHub sibling/);
  assert.equal(route.kind, "fix");
  assert.match(route.notes, /Forget Origin/);
});

test("keep-busy with roster leftover picks the unused GitHub card", () => {
  const ledger = {
    jobs: [
      {
        id: "dronehive-unicode-ci",
        title: "unicode",
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
        id: "bloom-readme-honest-export",
        title: "readme",
        repo: "github.com/yuro1991-afk/bloom-fair-yellow-charm",
        kind: "implement",
        priority: 19,
        status: "open",
        claim: null,
        notes: "",
        verify: "true",
        files: [],
        collision: "",
      },
    ],
  };
  const roster = {
    assignments: [{ bcId: "bc-old", name: "Parked", jobId: "dronehive-unicode-ci" }],
  };
  const leftover = leftoverForRoute({ ledger, roster, nowMs: NOW });
  assert.deepEqual(leftover.map((item) => item.id), ["bloom-readme-honest-export"]);
  const route = routeIntent("keep agents busy", { ledger, roster, nowMs: NOW });
  assert.equal(route.jobId, "bloom-readme-honest-export");
  assert.match(route.destination, /bloom-readme-honest-export/);
  assert.equal(route.packet, "reviews/handoff-bloom-readme-honest-export.md");
});

test("catalog playbook intent scores onto the matching leftover card", () => {
  const ledger = {
    jobs: [
      job("gub-route-intent", { priority: 10 }),
      job("gub-inventory-tick", { priority: 6 }),
    ],
  };
  const entries = [
    {
      entryId: "playbook/gub-route-intent",
      name: "GUB Route Intent",
      type: "playbook",
      description: "Score playbooks first.",
      category: "agents-workflows",
    },
  ];
  const scored = scorePlaybooks("gub route intent", entries);
  assert.equal(scored[0].entry.entryId, "playbook/gub-route-intent");
  const route = routeIntent("implement gub route intent", { ledger, entries, nowMs: NOW });
  assert.equal(route.jobId, "gub-route-intent");
});

test("keep-busy with --agent routes to the roster card, not leftover next", () => {
  const ledger = loadLedger(join(ROOT, "ledger", "queue.json"));
  const roster = loadRoster(join(ROOT, "ledger", "roster.json"));
  const parked = roster.assignments[0];
  const route = routeIntent("keep agents busy", {
    ledger,
    roster,
    nowMs: NOW,
    agentId: parked.bcId,
  });
  assert.equal(route.jobId, parked.jobId);
  assert.notEqual(route.jobId, "review-landing-pad-prs");
  const leftover = routeIntent("keep agents busy", { ledger, roster, nowMs: NOW });
  assert.equal(leftover.jobId, "review-landing-pad-prs");
});

test("seeded queue leftover after the real roster is review-landing-pad-prs", () => {
  const ledger = loadLedger(join(ROOT, "ledger", "queue.json"));
  const roster = loadRoster(join(ROOT, "ledger", "roster.json"));
  const entries = loadEntries(defaultEntriesPath(ROOT));
  const route = routeIntent("Keep my agents busy", { ledger, roster, entries, nowMs: NOW });
  assert.equal(route.jobId, "review-landing-pad-prs");
});

test("genesis routes to Origin, not GitHub PR 1", () => {
  const route = routeIntent("assemble genesis siblings");
  assert.match(route.destination, /yuri-afk\/genesis/);
  assert.match(route.notes, /Do not reopen GitHub PR #1/);
});

test("review does not target empty main", () => {
  const route = routeIntent("Have code rabbit auto review genesis");
  assert.equal(route.kind, "review");
  assert.match(route.destination, /existing open PR/);
});

test("dronehive and probe intents", () => {
  assert.equal(routeIntent("fix dronehive unicode").kind, "fix");
  assert.equal(routeIntent("probe superbrain lanes").kind, "probe");
});

test("destinationForKind is exhaustive", () => {
  for (const kind of JOB_KINDS) {
    assert.equal(typeof destinationForKind(kind), "string");
  }
});
