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

test("generic ship intent does not score a Compound Engineering playbook", () => {
  const ledger = loadLedger(join(ROOT, "ledger", "queue.json"));
  const roster = loadRoster(join(ROOT, "ledger", "roster.json"));
  const entries = loadEntries(defaultEntriesPath(ROOT));
  assert.equal(scorePlaybooks("ship something useful", entries).length, 0);
  const route = routeIntent("ship something useful", { ledger, roster, entries, nowMs: NOW });
  assert.notEqual(route.jobId, "catalog-compound-eng-feature");
  assert.doesNotMatch(route.notes ?? "", /compound-eng-feature/);
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
  assert.match(route.notes, /#8, #9, or #10/);
  assert.doesNotMatch(route.notes, /Origin PR/);
  assert.doesNotMatch(route.notes, /dronehive #1/);
});

test("review intent with ledger parks on landing-pad PRs, not Origin", () => {
  const ledger = loadLedger(join(ROOT, "ledger", "queue.json"));
  const roster = loadRoster(join(ROOT, "ledger", "roster.json"));
  const route = routeIntent("Have code rabbit auto review genesis", {
    ledger,
    roster,
    nowMs: NOW,
  });
  assert.equal(route.jobId, "review-landing-pad-prs");
  assert.match(route.destination, /main#review-landing-pad-prs/);
  assert.match(route.notes, /#8, #9, or #10/);
  assert.doesNotMatch(route.notes, /Relaunch Origin/);
  assert.doesNotMatch(route.notes, /dronehive #1/);
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

test("generic sibling intents park on first catalog apply, not leftover Superbrain", () => {
  const ledger = loadLedger(join(ROOT, "ledger", "queue.json"));
  const roster = loadRoster(join(ROOT, "ledger", "roster.json"));
  const entries = loadEntries(defaultEntriesPath(ROOT));
  const bloom = routeIntent("fix bloom", { ledger, roster, entries, nowMs: NOW });
  assert.equal(bloom.jobId, "bloom-grok-pwa-test-sync");
  assert.match(bloom.notes, /forget Origin/);
  assert.ok(bloom.applyNext.some((line) => line.includes("bloom-grok-pwa")));
  assert.doesNotMatch(bloom.destination, /gub-superbrain-probe/);

  const faceswap = routeIntent("fix face-swap honesty", { ledger, roster, entries, nowMs: NOW });
  assert.equal(faceswap.jobId, "faceswap-design-honesty");
  assert.doesNotMatch(faceswap.jobId, /catalog-hf-model-explore/);
  assert.match(faceswap.notes, /faceswap-design-honesty\.patch/);

  const opensussy = routeIntent("fix opensussy", { ledger, roster, entries, nowMs: NOW });
  assert.equal(opensussy.jobId, "opensussy-sec-review-target");
  assert.match(opensussy.notes, /opensussy-sec-review-target\.patch/);

  const voice = routeIntent("fix ollama voice", { ledger, roster, entries, nowMs: NOW });
  assert.equal(voice.jobId, "ova-readme-linux-honesty");
  assert.match(voice.notes, /ova-readme-linux-honesty\.patch/);

  const keep = routeIntent("keep agents busy", { ledger, roster, entries, nowMs: NOW });
  assert.equal(keep.jobId, "gub-route-intent");
});

test("cp1252 and python-smoke intents park on unicode-ci, not leftover Superbrain", () => {
  const ledger = loadLedger(join(ROOT, "ledger", "queue.json"));
  const roster = loadRoster(join(ROOT, "ledger", "roster.json"));
  const afterLease = Date.parse("2026-09-14T19:00:00.000Z");
  for (const intent of ["fix cp1252", "unstick python-smoke", "fix python smoke"]) {
    const route = routeIntent(intent, { ledger, roster, nowMs: afterLease });
    assert.equal(route.jobId, "dronehive-unicode-ci", intent);
    assert.match(route.destination, /dronehive#dronehive-unicode-ci/);
    assert.ok(route.applyNext.some((line) => line.includes("dronehive-pro-chat-cp1252.patch")));
    assert.doesNotMatch(route.destination, /gub-superbrain-probe/);
  }
  const keep = routeIntent("keep agents busy", { ledger, roster, nowMs: NOW });
  assert.equal(keep.jobId, "gub-route-intent");
});

test("ubuntu-smoke intent parks on ubuntu-smoke with unicode-ci requires first", () => {
  const ledger = loadLedger(join(ROOT, "ledger", "queue.json"));
  const roster = loadRoster(join(ROOT, "ledger", "roster.json"));
  const afterLease = Date.parse("2026-09-14T19:00:00.000Z");
  const route = routeIntent("add ubuntu-smoke", { ledger, roster, nowMs: afterLease });
  assert.equal(route.jobId, "dronehive-ubuntu-smoke");
  assert.match(route.notes, /dronehive-pro-chat-cp1252\.patch then patches\/dronehive-ubuntu-smoke\.patch/);
  const unicode = route.applyNext.findIndex((line) => line.includes("dronehive-pro-chat-cp1252.patch") && line.startsWith("git apply /"));
  const ubuntu = route.applyNext.findIndex((line) => line.includes("dronehive-ubuntu-smoke.patch") && line.startsWith("git apply /"));
  assert.ok(unicode >= 0 && ubuntu > unicode);
  assert.doesNotMatch(route.destination, /gub-superbrain-probe/);
  const keep = routeIntent("keep agents busy", { ledger, roster, nowMs: NOW });
  assert.equal(keep.jobId, "gub-route-intent");
});

test("merge / landing-pad intents park on review PRs, not leftover Superbrain", () => {
  const ledger = loadLedger(join(ROOT, "ledger", "queue.json"));
  const roster = loadRoster(join(ROOT, "ledger", "roster.json"));
  const afterLease = Date.parse("2026-09-14T19:00:00.000Z");
  for (const intent of ["merge #8 then #9", "review the landing pad", "landing-pad merge order"]) {
    const route = routeIntent(intent, { ledger, roster, nowMs: afterLease });
    assert.equal(route.jobId, "review-landing-pad-prs", intent);
    assert.match(route.notes, /#8, #9, or #10/);
    assert.doesNotMatch(route.destination, /gub-superbrain-probe/);
  }
  const keep = routeIntent("keep agents busy", { ledger, roster, nowMs: NOW });
  assert.equal(keep.jobId, "gub-route-intent");
});

test("attention intent parks on first catalog apply, not leftover Superbrain", () => {
  const ledger = loadLedger(join(ROOT, "ledger", "queue.json"));
  const roster = loadRoster(join(ROOT, "ledger", "roster.json"));
  const route = routeIntent("items for attention", { ledger, roster, nowMs: NOW });
  assert.equal(route.jobId, "dronehive-unicode-ci");
  assert.match(route.destination, /dronehive#dronehive-unicode-ci/);
  assert.match(route.notes, /dronehive-pro-chat-cp1252\.patch/);
  assert.doesNotMatch(route.notes, /gub-superbrain-probe/);
  assert.doesNotMatch(route.notes, /npm run autofix -- apply/);
  assert.doesNotMatch(route.notes, /pull\/5/);
  const keep = routeIntent("keep agents busy", { ledger, roster, nowMs: NOW });
  assert.equal(keep.jobId, "gub-route-intent");
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
  assert.equal(keep.takeInstead, undefined);
});

test("live leftover Superbrain keep-busy attaches take-instead apply pair", () => {
  const ledger = loadLedger(join(ROOT, "ledger", "queue.json"));
  const roster = loadRoster(join(ROOT, "ledger", "roster.json"));
  const afterLease = Date.parse("2026-09-14T19:00:00.000Z");
  const keep = routeIntent("keep agents busy", { ledger, roster, nowMs: afterLease });
  assert.equal(keep.jobId, "gub-superbrain-probe");
  assert.match(keep.destination, /gub-superbrain-probe/);
  assert.doesNotMatch(keep.destination, /dronehive-unicode-ci/);
  assert.equal(keep.takeInstead, "dronehive-unicode-ci");
  assert.ok(keep.applyNext.some((line) => line.includes("dronehive-pro-chat-cp1252.patch")));
  assert.equal(
    keep.proveAfterApplyCommand,
    "node src/cli.js patches --prove-after-apply --job dronehive-unicode-ci",
  );
  const unmatched = routeIntent("do something leftover", { ledger, roster, nowMs: afterLease });
  assert.equal(unmatched.jobId, "gub-superbrain-probe");
  assert.equal(unmatched.takeInstead, "dronehive-unicode-ci");
  assert.ok(unmatched.applyNext.some((line) => line.includes("dronehive-pro-chat-cp1252.patch")));
});

test("destinationForKind is exhaustive", () => {
  for (const kind of JOB_KINDS) {
    assert.equal(typeof destinationForKind(kind), "string");
  }
});
