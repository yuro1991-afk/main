import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { JOB_KINDS } from "../src/kinds.js";
import { TAKE_INSTEAD_CATALOG_ID, applyNextForJob, buildBrief, catalogPatchFor, catalogPatchSummary, catalogRequires, displayCollision, displayNotes, displayVerify, firstCommands, proveAfterApplyForJob, takeInsteadCatalogId, takeInsteadCatalogPatch, takeInsteadFields } from "../src/brief.js";
import { FIRST_PARKED_APPLY, SIBLINGS_CONTRACT, buildSiblingsBoard, describeRole, loadSiblings, siblingsForJob } from "../src/siblings.js";
import { saveLedger } from "../src/ledger.js";
import { runCli } from "../src/cli.js";

const NOW = Date.parse("2026-09-14T16:00:00.000Z");
const SIBLINGS = new URL("../ledger/siblings.json", import.meta.url);

function job(kind) {
  return {
    id: "sample",
    title: "Sample",
    repo: "github.com/yuro1991-afk/dronehive",
    kind,
    priority: 1,
    status: "open",
    claim: null,
    notes: "",
    verify: "true",
    files: ["a.js"],
    collision: "",
  };
}

test("siblings.json loads and maps dronehive to PR 5", () => {
  const siblings = loadSiblings(SIBLINGS);
  assert.deepEqual(
    siblings.prs.map((pr) => pr.number),
    [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84],
  );
  assert.equal(siblings.prs[7].number, 9);
  assert.equal(siblings.prs[8].number, 10);
  assert.equal(siblings.prs[9].number, 11);
  assert.equal(siblings.prs[12].number, 14);
  assert.equal(siblings.prs[17].number, 19);
  assert.equal(siblings.prs[21].number, 23);
  assert.equal(siblings.prs[24].number, 26);
  assert.equal(siblings.prs[28].number, 30);
  assert.equal(siblings.prs[32].number, 34);
  assert.equal(siblings.prs[36].number, 38);
  assert.equal(siblings.prs[40].number, 42);
  assert.equal(siblings.prs[44].number, 46);
  assert.equal(siblings.prs[48].number, 50);
  assert.equal(siblings.prs[52].number, 54);
  assert.equal(siblings.prs[56].number, 58);
  assert.equal(siblings.prs[60].number, 62);
  assert.equal(siblings.prs[63].number, 65);
  assert.equal(siblings.prs[66].number, 68);
  assert.equal(siblings.prs[70].number, 72);
  assert.equal(siblings.prs[74].number, 76);
  const related = siblingsForJob(siblings, "dronehive-unicode-ci");
  assert.deepEqual(
    related.map((pr) => pr.number),
    [9, 5, 6],
  );
  assert.match(describeRole("attention-and-dronehive-patch"), /dronehive/);
  assert.match(describeRole("ops-board"), /GitHub-first defaults live on #8/);
  assert.match(describeRole("ops-board"), /Patch catalog is #9/);
  assert.doesNotMatch(describeRole("ops-board"), /This PR is the patch catalog/);
  assert.doesNotMatch(describeRole("autofix-runner"), /npm run autofix -- apply/);
  assert.match(describeRole("autofix-runner"), /Do not copy/);
  assert.match(describeRole("merge-8-then-9"), /Resolved #8 then #9/);
  assert.match(describeRole("leftover-launches"), /Not a second catalog/);
  assert.match(describeRole("leftover-launches"), /Leftover launches are exhausted/);
  assert.match(describeRole("leftover-launches"), /dronehive-unicode-ci/);
  assert.match(describeRole("leftover-launches"), /163\+/);
  assert.match(describeRole("genesis-arena-paths"), /Wilderness/);
  assert.match(describeRole("assign-job"), /assign --job/);
  assert.match(describeRole("assign-job"), /Leftover launches are exhausted/);
  assert.match(describeRole("assign-job"), /dronehive-unicode-ci/);
  assert.match(describeRole("assign-job"), /163\+/);
  assert.match(describeRole("siblings-board"), /siblings\.json/);
  assert.match(describeRole("assign-missing"), /never writes/);
  assert.match(describeRole("assign-missing"), /Leftover launches are exhausted/);
  assert.match(describeRole("assign-missing"), /brief --job dronehive-unicode-ci/);
  assert.match(describeRole("assign-missing"), /Do not invent leftover 163\+/);
  assert.deepEqual(
    siblingsForJob(siblings, "bloom-grok-pwa-test-sync").map((pr) => pr.number),
    [9, 12],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "bloom-ci-lint").map((pr) => pr.number),
    [9, 18],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "review-landing-pad-prs").map((pr) => pr.number),
    [8, 11, 15, 20, 24, 27, 31, 35, 39, 43, 47, 51, 55, 59, 63, 66, 69, 73, 77, 81],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "dronehive-seed-work-order-doc-codex-paths").map((pr) => pr.number),
    [9, 36],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "dronehive-seed-work-order-doc-recall-router").map((pr) => pr.number),
    [9, 37],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "dronehive-seed-work-order-doc-models").map((pr) => pr.number),
    [9, 38],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "dronehive-start-super-mesh-cd").map((pr) => pr.number),
    [9, 40],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "dronehive-truth-bind-paths").map((pr) => pr.number),
    [9, 41],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "dronehive-start-tui-cargo-honesty").map((pr) => pr.number),
    [9, 42],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "dronehive-apps-readme-cargo").map((pr) => pr.number),
    [9, 44],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "dronehive-install-ollama-uninstall-root").map((pr) => pr.number),
    [9, 45],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "dronehive-mount-readme-launch").map((pr) => pr.number),
    [9, 46],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "dronehive-readme-cd").map((pr) => pr.number),
    [9, 48],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "dronehive-doc-future-seer-cd").map((pr) => pr.number),
    [9, 49],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "dronehive-seed-doc-operational-cd").map((pr) => pr.number),
    [9, 50],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "dronehive-doc-synaptic-loop-cd").map((pr) => pr.number),
    [9, 52],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "dronehive-doc-app-library").map((pr) => pr.number),
    [9, 53],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "dronehive-doc-grok-handoff-root").map((pr) => pr.number),
    [9, 54],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "dronehive-ollama-app-readme-install").map((pr) => pr.number),
    [9, 56],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "dronehive-ollama-app-open-out").map((pr) => pr.number),
    [9, 57],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "dronehive-ollama-app-open-seal").map((pr) => pr.number),
    [9, 58],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "dronehive-mount-swarm-seal").map((pr) => pr.number),
    [9, 60],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "dronehive-seed-work-order-doc-board").map((pr) => pr.number),
    [9, 61],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "dronehive-work-order-registry-cli").map((pr) => pr.number),
    [9, 62],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "dronehive-ai-bus-packs-root").map((pr) => pr.number),
    [9, 64],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "dronehive-seed-work-order-core-lessons").map((pr) => pr.number),
    [9, 65],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "dronehive-work-order-codex-paths").map((pr) => pr.number),
    [9, 32],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "dronehive-work-order-doc-law-truth").map((pr) => pr.number),
    [9, 33],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "dronehive-work-order-doc-imprints").map((pr) => pr.number),
    [9, 34],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "dronehive-work-order-school-root").map((pr) => pr.number),
    [9, 28],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "dronehive-work-order-knowledge-expand").map((pr) => pr.number),
    [9, 29],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "dronehive-multi-hosts-hardwire").map((pr) => pr.number),
    [9, 30],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "dronehive-work-order-fabric-root").map((pr) => pr.number),
    [9, 25],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "dronehive-future-seer-jane-honesty").map((pr) => pr.number),
    [9, 26],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "dronehive-hive-docstring-honesty").map((pr) => pr.number),
    [9, 22],
  );
  assert.deepEqual(
    siblingsForJob(siblings, "faceswap-readme-requirements-honesty").map((pr) => pr.number),
    [9, 23],
  );
});

test("brief attaches sibling PR 5 to the unicode card", () => {
  const siblings = loadSiblings(SIBLINGS);
  const queue = JSON.parse(readFileSync(new URL("../ledger/queue.json", import.meta.url), "utf8"));
  const drone = queue.jobs.find((item) => item.id === "dronehive-unicode-ci");
  const brief = buildBrief(drone, siblings);
  assert.equal(brief.contract, "agent-ops.brief.v1");
  assert.equal(brief.related[0].number, 9);
  assert.match(brief.related[0].meaning, /patches\//);
  assert.ok(brief.hardRules.some((rule) => rule.includes("no more Superbrain")));
  assert.ok(brief.hardRules.some((rule) => rule.includes("#8/#9/#10/#11/#12/#13/#14/#15/#16/#17/#18/#19/#20/#21/#22/#23/#24/#25/#26/#27/#28/#29/#30/#31/#32/#33/#34/#35/#36/#37/#38/#39/#40/#41/#42/#43/#44/#45/#46/#47/#48/#49/#50/#51/#52/#53/#54/#55/#56/#57/#58/#59/#60/#61/#62/#63/#64/#65/#66/#67/#68/#69/#70/#71/#72/#73/#74/#75/#76/#77/#78/#79/#80/#81/#82/#83/#84")));
  assert.ok(brief.hardRules.some((rule) => rule.includes("forget Origin for this card")));
  assert.ok(brief.hardRules.some((rule) => rule.includes("Prefer brief / proveAfterApplyCommand")));
  assert.ok(!brief.hardRules.some((rule) => rule.includes("sibling cards stay blocked")));
  assert.ok(!brief.hardRules.some((rule) => rule.includes("Extend PR #3")));
  assert.equal(brief.destination, "Apply the catalog patch on github.com/yuro1991-afk/dronehive");
  assert.doesNotMatch(brief.destination, /Notion/);
  assert.ok(brief.applyNext.some((line) => line.includes("dronehive-pro-chat-cp1252.patch")));
  assert.deepEqual(brief.applyNext, applyNextForJob(drone));
  assert.equal(brief.proveAfterApplyCommand, proveAfterApplyForJob(drone));
  assert.equal(
    brief.proveAfterApplyCommand,
    "node src/cli.js patches --prove-after-apply --job dronehive-unicode-ci",
  );
  assert.doesNotMatch(brief.applyNext.join("\n"), /prove-after-apply/);
  assert.match(drone.notes, /Blocked: Yuri scoped this landing pad to Genesis only/);
  assert.doesNotMatch(brief.job.notes, /Blocked: Yuri scoped this landing pad to Genesis only/);
  assert.doesNotMatch(brief.job.notes, /npm run autofix/);
  assert.doesNotMatch(brief.job.notes, /PR #5/);
  assert.doesNotMatch(brief.job.collision, /pull\/5/);
  assert.doesNotMatch(brief.job.collision, /npm run autofix -- apply/);
  assert.match(brief.job.notes, /dronehive-pro-chat-cp1252\.patch/);
  assert.ok(brief.related.some((pr) => pr.number === 6));
  assert.ok(
    brief.related
      .filter((pr) => pr.number === 6)
      .every((pr) => !/npm run autofix -- apply/.test(pr.meaning)),
  );
});

test("siblingsForJob lists the catalog before conflicting keep-busy owners", () => {
  const siblings = loadSiblings(SIBLINGS);
  for (const id of [
    "bloom-readme-honest-export",
    "faceswap-mock-engine-ci",
    "opensussy-linux-syntax-ci",
  ]) {
    const related = siblingsForJob(siblings, id);
    assert.deepEqual(
      related.map((pr) => pr.number),
      [9, 4],
      id,
    );
    assert.equal(related[0].role, "patch-catalog");
  }
});

test("catalog displayNotes drop PR #5 / autofix apply runner", () => {
  const stale = {
    id: "dronehive-unicode-ci",
    title: "Fix unicode",
    repo: "github.com/yuro1991-afk/dronehive",
    kind: "fix",
    priority: 1,
    status: "blocked",
    claim: null,
    notes:
      "cp1252. Patch is on landing-pad PR #5; verified apply runner is PR #6 (`npm run autofix -- apply <checkout>`). Relaunch.\nBlocked: Yuri scoped this landing pad to Genesis only.",
    verify: "true",
    files: [],
    collision:
      "Checkout dronehive, apply github.com/yuro1991-afk/main/pull/5 patch, push on cursor/setup-dev-environment-2e0b.",
  };
  const notes = displayNotes(stale);
  const collision = displayCollision(stale);
  assert.doesNotMatch(notes, /npm run autofix/);
  assert.doesNotMatch(notes, /PR #5/);
  assert.doesNotMatch(notes, /Blocked: Yuri scoped this landing pad to Genesis only/);
  assert.match(notes, /dronehive-pro-chat-cp1252\.patch/);
  assert.doesNotMatch(collision, /pull\/5/);
  assert.doesNotMatch(collision, /setup-dev-environment/);
  assert.match(collision, /Do not copy PR #6 autofix/);
});

test("stacked catalog displayNotes name requires priors before the leftover", () => {
  const queue = JSON.parse(readFileSync(new URL("../ledger/queue.json", import.meta.url), "utf8"));
  const ubuntu = queue.jobs.find((item) => item.id === "dronehive-ubuntu-smoke");
  const ubuntuNotes = displayNotes(ubuntu);
  assert.match(ubuntuNotes, /dronehive-pro-chat-cp1252\.patch then patches\/dronehive-ubuntu-smoke\.patch/);
  assert.doesNotMatch(ubuntuNotes, /Blocked: Yuri scoped this landing pad to Genesis only/);

  const runtime = queue.jobs.find((item) => item.id === "dronehive-runtime-host-paths");
  const runtimeNotes = displayNotes(runtime);
  assert.match(runtimeNotes, /Requires \(apply first\): patches\/dronehive-portable-paths\.patch/);
  assert.match(runtimeNotes, /patches\/dronehive-runtime-host-paths\.patch/);
});

test("firstCommands is exhaustive", () => {
  for (const kind of JOB_KINDS) {
    const lines = firstCommands(job(kind));
    assert.ok(lines.length > 0);
  }
});

test("review firstCommands name open PRs #8/#9/#10, not siblings.json only", () => {
  const queue = JSON.parse(readFileSync(new URL("../ledger/queue.json", import.meta.url), "utf8"));
  const landing = queue.jobs.find((item) => item.id === "review-landing-pad-prs");
  const landingLines = firstCommands(landing);
  assert.ok(landingLines.some((line) => line.includes("reviews/landing-pad-prs.md")));
  assert.ok(landingLines.some((line) => line.includes("#8") && line.includes("#10")));
  assert.ok(!landingLines.some((line) => line.includes("ledger/siblings.json")));
  const pr10 = queue.jobs.find((item) => item.id === "review-main-pr10");
  const pr10Lines = firstCommands(pr10);
  assert.ok(pr10Lines.some((line) => line.includes("github.com/yuro1991-afk/main/pull/10")));
  assert.ok(pr10Lines.some((line) => line.includes("reviews/main-pr10.md")));
  assert.ok(pr10Lines.some((line) => line.includes("eyes") && line.includes("bridge")));
});

test("probe-kind firstCommands without a catalog patch refuse cli probe", () => {
  const lines = firstCommands(
    {
      id: "some-lane-probe",
      title: "probe",
      repo: "github.com/yuro1991-afk/bloom-fair-yellow-charm",
      kind: "probe",
      priority: 21,
      status: "open",
      claim: null,
      notes: "",
      verify: "Write evidence. Never upgrade a timeout to LIVE.",
      files: [],
      collision: "",
    },
    { skipCatalog: true },
  );
  assert.ok(lines.some((line) => line.includes("Do not run node src/cli.js probe")));
  assert.ok(!lines.some((line) => line.startsWith("node src/cli.js probe")));
});

test("catalogPatchSummary lists the leftover and names requires priors", () => {
  const stacked = catalogPatchFor({ id: "dronehive-runtime-host-paths" });
  assert.deepEqual(catalogRequires(stacked), ["patches/dronehive-portable-paths.patch"]);
  const summary = catalogPatchSummary(stacked);
  assert.match(summary, /Patch: `patches\/dronehive-runtime-host-paths\.patch`/);
  assert.match(summary, /Requires \(apply first\): `patches\/dronehive-portable-paths\.patch`/);
  const portable = summary.indexOf("dronehive-portable-paths.patch");
  const runtime = summary.indexOf("dronehive-runtime-host-paths.patch");
  assert.ok(portable > runtime);

  const single = catalogPatchFor({ id: "dronehive-unicode-ci" });
  assert.deepEqual(catalogRequires(single), []);
  assert.equal(catalogPatchSummary(single), "- Patch: `patches/dronehive-pro-chat-cp1252.patch`");
  assert.doesNotMatch(catalogPatchSummary(single), /Requires/);
});

test("cataloged sibling firstCommands use git apply, not edit", () => {
  const queue = JSON.parse(readFileSync(new URL("../ledger/queue.json", import.meta.url), "utf8"));
  const drone = queue.jobs.find((item) => item.id === "dronehive-unicode-ci");
  const lines = firstCommands(drone);
  assert.equal(lines[0], "node src/cli.js patches --prove --job dronehive-unicode-ci");
  assert.equal(lines[1], "node src/cli.js patches --prove-after-apply --job dronehive-unicode-ci");
  assert.ok(lines.some((line) => line.includes("git apply --check") && line.includes("dronehive-pro-chat-cp1252.patch")));
  assert.ok(lines.some((line) => line.startsWith("git apply /path/to/main/patches/dronehive-pro-chat-cp1252.patch")));
  assert.ok(!lines.some((line) => line.startsWith("edit:")));
  const honesty = queue.jobs.find((item) => item.id === "faceswap-honesty-env-paths");
  const honestyLines = firstCommands(honesty);
  assert.ok(honestyLines.some((line) => line.includes("faceswap-honesty-env-paths.patch")));
  assert.ok(!honestyLines.some((line) => line.includes("Notion")));
  const gitignore = queue.jobs.find((item) => item.id === "bloom-gitignore-vercel");
  const gitignoreLines = firstCommands(gitignore);
  assert.ok(gitignoreLines.some((line) => line.includes(".gitignore") && line.includes(".vercel/") && line.includes("dist/")));
});

test("ubuntu-smoke firstCommands do not run the smoke", () => {
  const queue = JSON.parse(readFileSync(new URL("../ledger/queue.json", import.meta.url), "utf8"));
  const job = queue.jobs.find((item) => item.id === "dronehive-ubuntu-smoke");
  assert.match(job.verify, /Do not run the smoke/);
  assert.doesNotMatch(job.verify, /Same four python-smoke/);
  const lines = firstCommands(job);
  assert.equal(lines.at(-1), "ci.yml has python-smoke-ubuntu:. Do not run the smoke.");
  assert.ok(!lines.some((line) => /Same four python-smoke/.test(line)));
});

test("displayVerify strips dollar idents so firstCommands are bash-safe", () => {
  assert.equal(displayVerify({ verify: "Split-Path $PSScriptRoot -Parent" }), "Split-Path PSScriptRoot -Parent");
  assert.equal(displayVerify({ verify: "& $py query_llm_codex.py" }), "& py query_llm_codex.py");
  assert.equal(displayVerify({ verify: "ci.yml has python-smoke-ubuntu:. Do not run the smoke." }), "ci.yml has python-smoke-ubuntu:. Do not run the smoke.");
  assert.equal(displayVerify({ verify: "header fabric is `.`." }), "header fabric is ..");
  const queue = JSON.parse(readFileSync(new URL("../ledger/queue.json", import.meta.url), "utf8"));
  for (const job of queue.jobs) {
    assert.doesNotMatch(displayVerify(job), /\$[A-Za-z_]/, job.id);
    assert.doesNotMatch(displayVerify(job), /`/, job.id);
    if (job.id.startsWith("gub-") || job.kind === "origin-slice") continue;
    const lines = firstCommands(job);
    assert.ok(
      !lines.some((line) => /\$[A-Za-z_]/.test(line) && !line.includes("CURSOR_API_KEY")),
      job.id,
    );
  }
});

test("catalog leftover firstCommands do not run forbidden afterApply commands", () => {
  const queue = JSON.parse(readFileSync(new URL("../ledger/queue.json", import.meta.url), "utf8"));
  const cases = [
    ["dronehive-portable-paths", /python -m drone work-order-show/, /Do not run work-order-show/],
    ["dronehive-script-host-roots", /python3 -m py_compile/, /Do not py_compile/],
    ["faceswap-start-sh", /\.\/START\.sh/, /Do not run START\.sh/],
    ["ova-stop-noui-guard", /pwsh -File Stop-Ollama/, /Do not run Stop-Ollama/],
    ["bloom-ci-lint", /npm run lint exits 0/, /Do not run npm/],
    ["dronehive-runtime-host-paths", /python3 -m py_compile drone\/grok_handoff/, /Do not py_compile/],
    ["dronehive-config-load-overlay", /python3 -m py_compile drone\/config_overlay/, /Do not py_compile/],
    ["dronehive-app-links-host-paths", /python3 -m py_compile drone\/app\/links/, /Do not py_compile/],
    ["dronehive-hive-docstring-honesty", /python3 -m py_compile drone\/hive/, /Do not py_compile/],
  ];
  for (const [id, forbidden, gate] of cases) {
    const job = queue.jobs.find((item) => item.id === id);
    assert.match(job.verify, gate, id);
    const lines = firstCommands(job);
    assert.match(lines.at(-1), gate, id);
    assert.ok(!lines.some((line) => forbidden.test(line)), id);
  }
});

test("catalog-kind sibling brief destination is apply, not Notion", () => {
  const siblings = loadSiblings(SIBLINGS);
  const queue = JSON.parse(readFileSync(new URL("../ledger/queue.json", import.meta.url), "utf8"));
  const honesty = queue.jobs.find((item) => item.id === "faceswap-honesty-env-paths");
  const brief = buildBrief(honesty, siblings);
  assert.equal(brief.destination, "Apply the catalog patch on github.com/yuro1991-afk/face-swap-ios");
  assert.doesNotMatch(brief.destination, /Notion/);
  assert.ok(brief.hardRules.some((rule) => rule.includes("forget Origin for this card")));
});

test("unknown sibling role fails closed", () => {
  assert.throws(() => describeRole("spawn-extra-board"));
});

function superbrainJob() {
  return {
    id: "gub-superbrain-probe",
    title: "probe",
    repo: "origin.cursor.com/git/yuri-afk/genesis",
    kind: "origin-slice",
    priority: 3,
    status: "claimed",
    claim: null,
    notes: "",
    verify: "Failed probe stays unreachable.",
    files: [],
    collision: "",
  };
}

test("Superbrain leftover attaches take-instead unicode-ci apply pair", () => {
  const sitout = superbrainJob();
  const other = {
    ...sitout,
    id: "gub-inventory-tick",
    title: "inventory",
  };
  assert.equal(catalogPatchFor(sitout), null);
  assert.equal(takeInsteadCatalogId(sitout), TAKE_INSTEAD_CATALOG_ID);
  assert.deepEqual(takeInsteadFields(sitout), { takeInstead: "dronehive-unicode-ci" });
  const patch = takeInsteadCatalogPatch(sitout);
  assert.equal(patch.id, "dronehive-unicode-ci");
  assert.match(patch.file, /dronehive-pro-chat-cp1252\.patch/);
  const apply = applyNextForJob(sitout);
  assert.ok(apply.some((line) => line.includes("dronehive-pro-chat-cp1252.patch")));
  assert.ok(apply.some((line) => line.startsWith("git clone https://github.com/yuro1991-afk/dronehive.git")));
  assert.doesNotMatch(apply.join("\n"), /prove-after-apply/);
  assert.equal(
    proveAfterApplyForJob(sitout),
    "node src/cli.js patches --prove-after-apply --job dronehive-unicode-ci",
  );
  const brief = buildBrief(sitout, loadSiblings(SIBLINGS));
  assert.equal(brief.takeInstead, "dronehive-unicode-ci");
  assert.deepEqual(brief.applyNext, apply);
  assert.equal(brief.proveAfterApplyCommand, proveAfterApplyForJob(sitout));
  assert.doesNotMatch(brief.destination, /Apply the catalog patch/);
  assert.equal(catalogPatchFor(other), null);
  assert.equal(takeInsteadCatalogId(other), undefined);
  assert.equal(applyNextForJob(other), undefined);
  assert.equal(proveAfterApplyForJob(other), undefined);
});

test("cli siblings --job lists catalog-first related PRs", async () => {
  const chunks = [];
  const code = await runCli(["siblings", "--job", "dronehive-unicode-ci"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.contract, SIBLINGS_CONTRACT);
  assert.equal(parsed.job, "dronehive-unicode-ci");
  assert.deepEqual(
    parsed.related.map((pr) => pr.number),
    [9, 5, 6],
  );
  assert.equal(parsed.related[0].role, "patch-catalog");
  assert.match(parsed.related[0].meaning, /patches\//);
  assert.equal(parsed.prefer, "node src/cli.js brief --job dronehive-unicode-ci");

  const dual = [];
  const dualCode = await runCli(["siblings", "--job", "bloom-readme-honest-export"], {
    write: (value) => {
      dual.push(value);
    },
  });
  assert.equal(dualCode, 0);
  assert.deepEqual(
    JSON.parse(dual.join("")).related.map((pr) => pr.number),
    [9, 4],
  );
});

test("cli brief defaults to leftover unused exhausted", async () => {
  const chunks = [];
  const code = await runCli(["brief"], {
    nowMs: NOW,
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 1);
  assert.match(chunks.join(""), /No open job/);
  assert.doesNotMatch(chunks.join(""), /review-landing-pad-prs/);
  assert.doesNotMatch(chunks.join(""), /sibling cards stay blocked/);
  const listed = [];
  const siblingsCode = await runCli(["siblings"], {
    write: (value) => {
      listed.push(value);
    },
  });
  assert.equal(siblingsCode, 0);
  const board = JSON.parse(listed.join(""));
  assert.equal(board.contract, SIBLINGS_CONTRACT);
  assert.equal(board.nextApply, FIRST_PARKED_APPLY);
  assert.equal(board.prefer, "node src/cli.js siblings --job dronehive-unicode-ci");
  assert.equal(board.lead.number, 9);
  assert.equal(board.lead.role, "patch-catalog");
  assert.deepEqual(
    board.prs.map((pr) => pr.number),
    [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84],
  );
  assert.match(listed.join(""), /keep-busy-queue/);
  assert.match(listed.join(""), /patch-catalog/);
});

test("cli siblings unknown id errors", async () => {
  await assert.rejects(
    () =>
      runCli(["siblings", "--job", "missing"], {
        write: () => {},
      }),
    /unknown job/,
  );
});

test("buildSiblingsBoard leads with catalog #9 and keeps file PR order", () => {
  const siblings = loadSiblings(SIBLINGS);
  const board = buildSiblingsBoard(siblings);
  assert.equal(board.lead.number, 9);
  assert.match(board.lead.meaning, /patches\//);
  assert.equal(board.prs[0].number, 2);
  assert.equal(board.prs[3].number, 5);
});

test("cli brief --job selects the named card, not leftover next", async () => {
  const chunks = [];
  const code = await runCli(["brief", "--job", "review-main-pr10"], {
    nowMs: NOW,
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.job.id, "review-main-pr10");
  assert.ok(parsed.related.some((pr) => pr.number === 10));
  assert.doesNotMatch(chunks.join(""), /gub-superbrain-probe/);
  assert.doesNotMatch(chunks.join(""), /gub-route-intent/);
});

test("cli brief unknown id errors", async () => {
  const dir = mkdtempSync(join(tmpdir(), "agent-ops-brief-"));
  const path = join(dir, "queue.json");
  saveLedger(path, { jobs: [job("fix")] });
  await assert.rejects(
    () =>
      runCli(["brief", "missing", "--ledger", path], {
        nowMs: NOW,
        write: () => {},
      }),
    /unknown job/,
  );
});
