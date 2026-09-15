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

test("keep-busy routes to Origin, not this pad", () => {
  const route = routeIntent("Keep my agents busy");
  assert.match(route.destination, /yuri-afk\/genesis/);
  assert.equal(route.kind, "origin-slice");
  assert.match(route.notes, /Do not sit on this pad/);
});

test("keep-busy with roster leftover picks the unused Origin card", () => {
  const ledger = {
    jobs: [
      job("genesis-world-layer-102", { priority: 12 }),
      job("gub-inventory-tick", { priority: 6 }),
    ],
  };
  const roster = {
    assignments: [{ bcId: "bc-old", name: "Parked", jobId: "genesis-world-layer-102" }],
  };
  const leftover = leftoverForRoute({ ledger, roster, nowMs: NOW });
  assert.deepEqual(leftover.map((item) => item.id), ["gub-inventory-tick"]);
  const route = routeIntent("keep agents busy", { ledger, roster, nowMs: NOW });
  assert.equal(route.jobId, "gub-inventory-tick");
  assert.match(route.destination, /gub-inventory-tick/);
  assert.equal(route.packet, "reviews/handoff-gub-inventory-tick.md");
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
  assert.notEqual(route.jobId, "gub-inventory-tick");
  const leftover = routeIntent("keep agents busy", { ledger, roster, nowMs: NOW });
  assert.equal(leftover.jobId, "gub-route-intent");
});

test("seeded queue leftover after the real roster is gub-route-intent", () => {
  const ledger = loadLedger(join(ROOT, "ledger", "queue.json"));
  const roster = loadRoster(join(ROOT, "ledger", "roster.json"));
  const entries = loadEntries(defaultEntriesPath(ROOT));
  const route = routeIntent("Keep my agents busy", { ledger, roster, entries, nowMs: NOW });
  assert.equal(route.jobId, "gub-route-intent");
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
  const drone = routeIntent("fix dronehive unicode");
  assert.equal(drone.kind, "fix");
  assert.equal(drone.jobId, "dronehive-unicode-ci");
  assert.match(drone.notes, /dronehive-pro-chat-cp1252\.patch/);
  assert.match(drone.notes, /Do not copy PR #6 autofix/);
  assert.doesNotMatch(drone.notes, /npm run autofix -- apply/);
  const superbrain = routeIntent("probe superbrain lanes");
  assert.equal(superbrain.kind, "review");
  assert.equal(superbrain.jobId, "review-main-pr10");
  assert.match(superbrain.notes, /no more Superbrain/);
});

test("dronehive intent with ledger parks on unicode-ci applyNext", () => {
  const ledger = loadLedger(join(ROOT, "ledger", "queue.json"));
  const roster = loadRoster(join(ROOT, "ledger", "roster.json"));
  const route = routeIntent("fix dronehive unicode", {
    ledger,
    roster,
    nowMs: NOW,
  });
  assert.equal(route.jobId, "dronehive-unicode-ci");
  assert.match(route.destination, /dronehive#dronehive-unicode-ci/);
  assert.match(route.notes, /forget Origin/);
  assert.match(route.notes, /dronehive-pro-chat-cp1252\.patch/);
  assert.ok(route.applyNext.some((line) => line.includes("dronehive-pro-chat-cp1252.patch")));
  assert.equal(
    route.proveAfterApplyCommand,
    "node src/cli.js patches --prove-after-apply --job dronehive-unicode-ci",
  );
  assert.doesNotMatch(route.notes, /npm run autofix -- apply/);
});

test("named stacked catalog route notes name requires priors first", () => {
  const ledger = loadLedger(join(ROOT, "ledger", "queue.json"));
  const roster = loadRoster(join(ROOT, "ledger", "roster.json"));
  const route = routeIntent("apply dronehive-runtime-host-paths", {
    ledger,
    roster,
    nowMs: NOW,
  });
  assert.equal(route.jobId, "dronehive-runtime-host-paths");
  assert.match(route.notes, /forget Origin/);
  assert.match(route.notes, /patches\/dronehive-portable-paths\.patch then patches\/dronehive-runtime-host-paths\.patch/);
  const portable = route.notes.indexOf("dronehive-portable-paths.patch");
  const runtime = route.notes.indexOf("dronehive-runtime-host-paths.patch");
  assert.ok(portable >= 0 && runtime > portable);
  assert.ok(route.applyNext.some((line) => line.includes("dronehive-portable-paths.patch")));
  const applyPortable = route.applyNext.findIndex((line) =>
    line.startsWith("git apply /path/to/main/patches/dronehive-portable-paths.patch"),
  );
  const applyRuntime = route.applyNext.findIndex((line) =>
    line.startsWith("git apply /path/to/main/patches/dronehive-runtime-host-paths.patch"),
  );
  assert.ok(applyPortable >= 0 && applyRuntime > applyPortable);
});

test("named catalog job id routes to apply, not leftover Origin", () => {
  const ledger = loadLedger(join(ROOT, "ledger", "queue.json"));
  const roster = loadRoster(join(ROOT, "ledger", "roster.json"));
  const route = routeIntent("apply dronehive-unicode-ci", {
    ledger,
    roster,
    nowMs: NOW,
  });
  assert.equal(route.jobId, "dronehive-unicode-ci");
  assert.match(route.destination, /dronehive#dronehive-unicode-ci/);
  assert.match(route.notes, /forget Origin/);
  assert.match(route.notes, /dronehive-pro-chat-cp1252\.patch/);
  assert.ok(route.applyNext.some((line) => line.includes("dronehive-pro-chat-cp1252.patch")));
  assert.equal(
    route.proveAfterApplyCommand,
    "node src/cli.js patches --prove-after-apply --job dronehive-unicode-ci",
  );
  assert.doesNotMatch(route.applyNext.join("\n"), /prove-after-apply/);
  assert.notEqual(route.jobId, "gub-route-intent");
  const keep = routeIntent("keep agents busy", { ledger, roster, nowMs: NOW });
  assert.equal(keep.jobId, "gub-route-intent");
});

test("destinationForKind is exhaustive", () => {
  for (const kind of JOB_KINDS) {
    assert.equal(typeof destinationForKind(kind), "string");
  }
});
