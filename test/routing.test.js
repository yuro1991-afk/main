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
  assert.match(route.notes, /#8, #9, #10, #11, #12, #13, #14, #15, #16, #17, #18, #19, #20, #21, #22, #23, #24, #25, #26, #27, #28, #29, #30, #31, #32, #33, #34, #35, #36, #37, #38, #39, #40, #41, #42, #43, #44, #45, #46, #47, #48, #49, #50, #51, #52, #53, or #54/);
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
  assert.match(route.notes, /#8, #9, #10, #11, #12, #13, #14, #15, #16, #17, #18, #19, #20, #21, #22, #23, #24, #25, #26, #27, #28, #29, #30, #31, #32, #33, #34, #35, #36, #37, #38, #39, #40, #41, #42, #43, #44, #45, #46, #47, #48, #49, #50, #51, #52, #53, or #54/);
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
  assert.equal(keep.jobId, "review-landing-pad-prs");
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
  assert.equal(keep.jobId, "review-landing-pad-prs");
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
  assert.equal(keep.jobId, "review-landing-pad-prs");
});

test("stacked leftover short intents park before generic dronehive unicode-ci", () => {
  const ledger = loadLedger(join(ROOT, "ledger", "queue.json"));
  const roster = loadRoster(join(ROOT, "ledger", "roster.json"));
  const afterLease = Date.parse("2026-09-14T19:00:00.000Z");
  const runtime = routeIntent("apply runtime-host on dronehive", { ledger, roster, nowMs: afterLease });
  assert.equal(runtime.jobId, "dronehive-runtime-host-paths");
  assert.match(runtime.notes, /dronehive-portable-paths\.patch then patches\/dronehive-runtime-host-paths\.patch/);
  const portable = runtime.applyNext.findIndex((line) => line.includes("dronehive-portable-paths.patch") && line.startsWith("git apply /"));
  const runtimeApply = runtime.applyNext.findIndex((line) => line.includes("dronehive-runtime-host-paths.patch") && line.startsWith("git apply /"));
  assert.ok(portable >= 0 && runtimeApply > portable);
  assert.doesNotMatch(runtime.destination, /gub-superbrain-probe/);

  const overlay = routeIntent("apply config-load on dronehive", { ledger, roster, nowMs: afterLease });
  assert.equal(overlay.jobId, "dronehive-config-load-overlay");
  const overlayPortable = overlay.applyNext.findIndex((line) => line.includes("dronehive-portable-paths.patch") && line.startsWith("git apply /"));
  const overlayApply = overlay.applyNext.findIndex((line) => line.includes("dronehive-config-load-overlay.patch") && line.startsWith("git apply /"));
  assert.ok(overlayPortable >= 0 && overlayApply > overlayPortable);

  const links = routeIntent("apply app-links on dronehive", { ledger, roster, nowMs: afterLease });
  assert.equal(links.jobId, "dronehive-app-links-host-paths");

  const scripts = routeIntent("apply script-host on dronehive", { ledger, roster, nowMs: afterLease });
  assert.equal(scripts.jobId, "dronehive-script-host-roots");
  assert.ok(scripts.applyNext.some((line) => line.includes("dronehive-script-host-roots.patch")));

  const portableOnly = routeIntent("apply portable-paths on dronehive", { ledger, roster, nowMs: afterLease });
  assert.equal(portableOnly.jobId, "dronehive-portable-paths");

  const grok = routeIntent("apply grok-pwa", { ledger, roster, nowMs: afterLease });
  assert.equal(grok.jobId, "bloom-grok-pwa-test-sync");

  const start = routeIntent("add start.sh on face-swap", { ledger, roster, nowMs: afterLease });
  assert.equal(start.jobId, "faceswap-start-sh");

  const honesty = routeIntent("fix face-swap honesty", { ledger, roster, nowMs: afterLease });
  assert.equal(honesty.jobId, "faceswap-design-honesty");

  const unicode = routeIntent("unstick python-smoke", { ledger, roster, nowMs: afterLease });
  assert.equal(unicode.jobId, "dronehive-unicode-ci");

  const keep = routeIntent("keep agents busy", { ledger, roster, nowMs: NOW });
  assert.equal(keep.jobId, "review-landing-pad-prs");
});

test("merge / landing-pad intents park on review PRs, not leftover Superbrain", () => {
  const ledger = loadLedger(join(ROOT, "ledger", "queue.json"));
  const roster = loadRoster(join(ROOT, "ledger", "roster.json"));
  const afterLease = Date.parse("2026-09-14T19:00:00.000Z");
  for (const intent of ["merge #8 then #9", "review the landing pad", "landing-pad merge order"]) {
    const route = routeIntent(intent, { ledger, roster, nowMs: afterLease });
    assert.equal(route.jobId, "review-landing-pad-prs", intent);
    assert.match(route.notes, /#8, #9, #10, #11, #12, #13, #14, #15, #16, #17, #18, #19, #20, #21, #22, #23, #24, #25, #26, #27, #28, #29, #30, #31, #32, #33, #34, #35, #36, #37, #38, #39, #40, #41, #42, #43, #44, #45, #46, #47, #48, #49, #50, #51, #52, #53, or #54/);
    assert.doesNotMatch(route.destination, /gub-superbrain-probe/);
  }
  const keep = routeIntent("keep agents busy", { ledger, roster, nowMs: NOW });
  assert.equal(keep.jobId, "review-landing-pad-prs");
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
  assert.equal(keep.jobId, "review-landing-pad-prs");
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
  assert.equal(keep.jobId, "review-landing-pad-prs");
  assert.equal(keep.takeInstead, undefined);
});

test("live leftover keep-busy stays GitHub-first after the lease", () => {
  const ledger = loadLedger(join(ROOT, "ledger", "queue.json"));
  const roster = loadRoster(join(ROOT, "ledger", "roster.json"));
  const afterLease = Date.parse("2026-09-14T19:00:00.000Z");
  const keep = routeIntent("keep agents busy", { ledger, roster, nowMs: afterLease });
  assert.equal(keep.jobId, "review-landing-pad-prs");
  assert.doesNotMatch(keep.destination, /gub-superbrain-probe/);
  assert.equal(keep.takeInstead, undefined);
  const unmatched = routeIntent("do something leftover", { ledger, roster, nowMs: afterLease });
  assert.equal(unmatched.jobId, "review-landing-pad-prs");
  assert.equal(unmatched.takeInstead, undefined);
});

test("destinationForKind is exhaustive", () => {
  for (const kind of JOB_KINDS) {
    assert.equal(typeof destinationForKind(kind), "string");
  }
});
