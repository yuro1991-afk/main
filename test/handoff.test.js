import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { buildHandoff, buildRelaunch, packetPathFor, relaunchFor } from "../src/handoff.js";
import { listJobs, loadLedger } from "../src/ledger.js";
import { loadSiblings, describeRole, SIBLING_ROLES } from "../src/siblings.js";
import { loadRoster } from "../src/dispatch.js";
import { runCli } from "../src/cli.js";

const NOW = Date.parse("2026-09-14T16:00:00.000Z");

test("handoff for dronehive points at github.com/yuro1991-afk/dronehive", () => {
  const siblings = loadSiblings(new URL("../ledger/siblings.json", import.meta.url));
  const job = {
    id: "dronehive-unicode-ci",
    title: "Fix unicode",
    repo: "github.com/yuro1991-afk/dronehive",
    kind: "fix",
    priority: 1,
    status: "open",
    claim: null,
    notes: "",
    verify: "true",
    files: [],
    collision: "",
  };
  const handoff = buildHandoff(job, siblings);
  assert.equal(handoff.relaunch.kind, "github");
  assert.match(handoff.relaunch.url, /dronehive/);
  assert.ok(handoff.related.some((pr) => pr.number === 6));
  assert.ok(handoff.doNot.some((line) => line.includes("fifth")));
  assert.match(handoff.relaunch.reason, /dronehive-pro-chat-cp1252\.patch/);
  assert.doesNotMatch(handoff.relaunch.reason, /npm run autofix/);
  const paths = relaunchFor({ ...job, id: "dronehive-portable-paths" });
  assert.match(paths.reason, /dronehive-portable-paths\.patch/);
  assert.doesNotMatch(paths.reason, /npm run autofix/);
  const scripts = relaunchFor({ ...job, id: "dronehive-script-host-roots" });
  assert.match(scripts.reason, /dronehive-script-host-roots\.patch/);
  const runtime = relaunchFor({ ...job, id: "dronehive-runtime-host-paths" });
  assert.match(runtime.reason, /dronehive-runtime-host-paths\.patch/);
  const overlay = relaunchFor({ ...job, id: "dronehive-config-load-overlay" });
  assert.match(overlay.reason, /dronehive-config-load-overlay\.patch/);
  assert.doesNotMatch(overlay.reason, /npm run autofix/);
  const icons = relaunchFor({ ...job, id: "dronehive-icons-manifest-relative" });
  assert.match(icons.reason, /dronehive-icons-manifest-relative\.patch/);
  assert.doesNotMatch(icons.reason, /npm run autofix/);
  const links = relaunchFor({ ...job, id: "dronehive-app-links-host-paths" });
  assert.match(links.reason, /dronehive-app-links-host-paths\.patch/);
  assert.doesNotMatch(links.reason, /npm run autofix/);
  const hiveDoc = relaunchFor({ ...job, id: "dronehive-hive-docstring-honesty" });
  assert.match(hiveDoc.reason, /dronehive-hive-docstring-honesty\.patch/);
  assert.doesNotMatch(hiveDoc.reason, /npm run autofix/);
  const workOrder = relaunchFor({ ...job, id: "dronehive-work-order-doc-honesty" });
  assert.match(workOrder.reason, /dronehive-work-order-doc-honesty\.patch/);
  assert.doesNotMatch(workOrder.reason, /npm run autofix/);
  const seedWorkOrder = relaunchFor({ ...job, id: "dronehive-seed-work-order-doc-honesty" });
  assert.match(seedWorkOrder.reason, /dronehive-seed-work-order-doc-honesty\.patch/);
  assert.doesNotMatch(seedWorkOrder.reason, /npm run autofix/);
  const benchGoal = relaunchFor({ ...job, id: "dronehive-bench-goal-honesty" });
  assert.match(benchGoal.reason, /dronehive-bench-goal-honesty\.patch/);
  assert.doesNotMatch(benchGoal.reason, /npm run autofix/);
  const buzzerHive = relaunchFor({ ...job, id: "dronehive-buzzer-hive-library-honesty" });
  assert.match(buzzerHive.reason, /dronehive-buzzer-hive-library-honesty\.patch/);
  assert.doesNotMatch(buzzerHive.reason, /npm run autofix/);
  const seedBuzzer = relaunchFor({ ...job, id: "dronehive-seed-buzzer-hive-library-honesty" });
  assert.match(seedBuzzer.reason, /dronehive-seed-buzzer-hive-library-honesty\.patch/);
  assert.doesNotMatch(seedBuzzer.reason, /npm run autofix/);
  const fabricRoot = relaunchFor({ ...job, id: "dronehive-work-order-fabric-root" });
  assert.match(fabricRoot.reason, /dronehive-work-order-fabric-root\.patch/);
  assert.doesNotMatch(fabricRoot.reason, /npm run autofix/);
  const seedFabric = relaunchFor({ ...job, id: "dronehive-seed-work-order-fabric-root" });
  assert.match(seedFabric.reason, /dronehive-seed-work-order-fabric-root\.patch/);
  assert.doesNotMatch(seedFabric.reason, /npm run autofix/);
  const jane = relaunchFor({ ...job, id: "dronehive-future-seer-jane-honesty" });
  assert.match(jane.reason, /dronehive-future-seer-jane-honesty\.patch/);
  assert.doesNotMatch(jane.reason, /npm run autofix/);
  const multiHosts = relaunchFor({ ...job, id: "dronehive-multi-hosts-exe-honesty" });
  assert.match(multiHosts.reason, /dronehive-multi-hosts-exe-honesty\.patch/);
  assert.doesNotMatch(multiHosts.reason, /npm run autofix/);
  const liveReg = relaunchFor({ ...job, id: "dronehive-work-order-live-registry" });
  assert.match(liveReg.reason, /dronehive-work-order-live-registry\.patch/);
  assert.doesNotMatch(liveReg.reason, /npm run autofix/);
  const seedLiveReg = relaunchFor({ ...job, id: "dronehive-seed-work-order-live-registry" });
  assert.match(seedLiveReg.reason, /dronehive-seed-work-order-live-registry\.patch/);
  assert.doesNotMatch(seedLiveReg.reason, /npm run autofix/);
  const school = relaunchFor({ ...job, id: "dronehive-work-order-school-root" });
  assert.match(school.reason, /dronehive-work-order-school-root\.patch/);
  assert.doesNotMatch(school.reason, /npm run autofix/);
  const seedSchool = relaunchFor({ ...job, id: "dronehive-seed-work-order-school-root" });
  assert.match(seedSchool.reason, /dronehive-seed-work-order-school-root\.patch/);
  assert.doesNotMatch(seedSchool.reason, /npm run autofix/);
  const refDb = relaunchFor({ ...job, id: "dronehive-work-order-reference-db" });
  assert.match(refDb.reason, /dronehive-work-order-reference-db\.patch/);
  assert.doesNotMatch(refDb.reason, /npm run autofix/);
  const seedRefDb = relaunchFor({ ...job, id: "dronehive-seed-work-order-reference-db" });
  assert.match(seedRefDb.reason, /dronehive-seed-work-order-reference-db\.patch/);
  assert.doesNotMatch(seedRefDb.reason, /npm run autofix/);
  const kexp = relaunchFor({ ...job, id: "dronehive-work-order-knowledge-expand" });
  assert.match(kexp.reason, /dronehive-work-order-knowledge-expand\.patch/);
  assert.doesNotMatch(kexp.reason, /npm run autofix/);
  const seedKexp = relaunchFor({ ...job, id: "dronehive-seed-work-order-knowledge-expand" });
  assert.match(seedKexp.reason, /dronehive-seed-work-order-knowledge-expand\.patch/);
  assert.doesNotMatch(seedKexp.reason, /npm run autofix/);
  const curric = relaunchFor({ ...job, id: "dronehive-work-order-curriculum-root" });
  assert.match(curric.reason, /dronehive-work-order-curriculum-root\.patch/);
  assert.doesNotMatch(curric.reason, /npm run autofix/);
  const seedCurric = relaunchFor({ ...job, id: "dronehive-seed-work-order-curriculum-root" });
  assert.match(seedCurric.reason, /dronehive-seed-work-order-curriculum-root\.patch/);
  assert.doesNotMatch(seedCurric.reason, /npm run autofix/);
  const mhHw = relaunchFor({ ...job, id: "dronehive-multi-hosts-hardwire" });
  assert.match(mhHw.reason, /dronehive-multi-hosts-hardwire\.patch/);
  assert.doesNotMatch(mhHw.reason, /npm run autofix/);
  const slHw = relaunchFor({ ...job, id: "dronehive-super-llms-hardwire" });
  assert.match(slHw.reason, /dronehive-super-llms-hardwire\.patch/);
  assert.doesNotMatch(slHw.reason, /npm run autofix/);
  const openTasks = relaunchFor({ ...job, id: "dronehive-work-order-open-tasks" });
  assert.match(openTasks.reason, /dronehive-work-order-open-tasks\.patch/);
  assert.doesNotMatch(openTasks.reason, /npm run autofix/);
  const seedOpenTasks = relaunchFor({ ...job, id: "dronehive-seed-work-order-open-tasks" });
  assert.match(seedOpenTasks.reason, /dronehive-seed-work-order-open-tasks\.patch/);
  assert.doesNotMatch(seedOpenTasks.reason, /npm run autofix/);
  const codex = relaunchFor({ ...job, id: "dronehive-work-order-codex-paths" });
  assert.match(codex.reason, /dronehive-work-order-codex-paths\.patch/);
  assert.doesNotMatch(codex.reason, /npm run autofix/);
  const seedCodex = relaunchFor({ ...job, id: "dronehive-seed-work-order-codex-paths" });
  assert.match(seedCodex.reason, /dronehive-seed-work-order-codex-paths\.patch/);
  assert.doesNotMatch(seedCodex.reason, /npm run autofix/);
  const law = relaunchFor({ ...job, id: "dronehive-work-order-law-truth" });
  assert.match(law.reason, /dronehive-work-order-law-truth\.patch/);
  assert.doesNotMatch(law.reason, /npm run autofix/);
  const seedLaw = relaunchFor({ ...job, id: "dronehive-seed-work-order-law-truth" });
  assert.match(seedLaw.reason, /dronehive-seed-work-order-law-truth\.patch/);
  assert.doesNotMatch(seedLaw.reason, /npm run autofix/);
  const docLaw = relaunchFor({ ...job, id: "dronehive-work-order-doc-law-truth" });
  assert.match(docLaw.reason, /dronehive-work-order-doc-law-truth\.patch/);
  assert.doesNotMatch(docLaw.reason, /npm run autofix/);
  const seedDocLaw = relaunchFor({ ...job, id: "dronehive-seed-work-order-doc-law-truth" });
  assert.match(seedDocLaw.reason, /dronehive-seed-work-order-doc-law-truth\.patch/);
  assert.doesNotMatch(seedDocLaw.reason, /npm run autofix/);
  const docFabric = relaunchFor({ ...job, id: "dronehive-work-order-doc-fabric-root" });
  assert.match(docFabric.reason, /dronehive-work-order-doc-fabric-root\.patch/);
  assert.doesNotMatch(docFabric.reason, /npm run autofix/);
  const seedDocFabric = relaunchFor({ ...job, id: "dronehive-seed-work-order-doc-fabric-root" });
  assert.match(seedDocFabric.reason, /dronehive-seed-work-order-doc-fabric-root\.patch/);
  assert.doesNotMatch(seedDocFabric.reason, /npm run autofix/);
  const docImprints = relaunchFor({ ...job, id: "dronehive-work-order-doc-imprints" });
  assert.match(docImprints.reason, /dronehive-work-order-doc-imprints\.patch/);
  assert.doesNotMatch(docImprints.reason, /npm run autofix/);
  const docLiveReg = relaunchFor({ ...job, id: "dronehive-work-order-doc-live-registry" });
  assert.match(docLiveReg.reason, /dronehive-work-order-doc-live-registry\.patch/);
  assert.doesNotMatch(docLiveReg.reason, /npm run autofix/);
  const seedDocLiveReg = relaunchFor({ ...job, id: "dronehive-seed-work-order-doc-live-registry" });
  assert.match(seedDocLiveReg.reason, /dronehive-seed-work-order-doc-live-registry\.patch/);
  assert.doesNotMatch(seedDocLiveReg.reason, /npm run autofix/);
  const docCodex = relaunchFor({ ...job, id: "dronehive-work-order-doc-codex-paths" });
  assert.match(docCodex.reason, /dronehive-work-order-doc-codex-paths\.patch/);
  assert.doesNotMatch(docCodex.reason, /npm run autofix/);
  const seedDocCodex = relaunchFor({ ...job, id: "dronehive-seed-work-order-doc-codex-paths" });
  assert.match(seedDocCodex.reason, /dronehive-seed-work-order-doc-codex-paths\.patch/);
  assert.doesNotMatch(seedDocCodex.reason, /npm run autofix/);
  const docCodexCli = relaunchFor({ ...job, id: "dronehive-work-order-doc-codex-cli" });
  assert.match(docCodexCli.reason, /dronehive-work-order-doc-codex-cli\.patch/);
  assert.doesNotMatch(docCodexCli.reason, /npm run autofix/);
  const seedDocCodexCli = relaunchFor({ ...job, id: "dronehive-seed-work-order-doc-codex-cli" });
  assert.match(seedDocCodexCli.reason, /dronehive-seed-work-order-doc-codex-cli\.patch/);
  assert.doesNotMatch(seedDocCodexCli.reason, /npm run autofix/);
  for (const id of [
    "dronehive-work-order-doc-recall-router",
    "dronehive-seed-work-order-doc-recall-router",
    "dronehive-work-order-doc-memory-recycle",
    "dronehive-seed-work-order-doc-memory-recycle",
    "dronehive-work-order-doc-models",
    "dronehive-seed-work-order-doc-models",
    "dronehive-work-order-doc-cd",
    "dronehive-seed-work-order-doc-cd",
    "dronehive-spec-relative",
    "dronehive-start-super-mesh-cd",
    "dronehive-start-multi-model-pythonpath",
    "dronehive-start-seer-pythonpath",
    "dronehive-enable-bridge-fallback",
    "dronehive-truth-bind-paths",
    "dronehive-package-release-v2-cargo",
    "dronehive-mount-launch-cargo",
    "dronehive-install-ollama-app-cargo",
    "dronehive-start-tui-cargo-honesty",
    "dronehive-ollama-tui-readme-cargo",
    "dronehive-mount-readme-cargo",
    "dronehive-tui-readme-cargo",
    "dronehive-apps-readme-cargo",
    "dronehive-install-ollama-app-root",
    "dronehive-install-ollama-app-mount",
    "dronehive-install-ollama-app-manifest",
    "dronehive-install-ollama-uninstall-root",
    "dronehive-tui-readme-root",
    "dronehive-ollama-tui-readme-install",
    "dronehive-mount-readme-layout",
    "dronehive-mount-readme-launch",
    "dronehive-mount-readme-related",
    "dronehive-readme-cd",
    "dronehive-doc-agent-loop-cd",
    "dronehive-doc-bridge-1080-cd",
    "dronehive-doc-code-worker-cd",
    "dronehive-doc-future-seer-cd",
    "dronehive-doc-measured-diagnostics-cd",
    "dronehive-doc-multi-face-cd",
    "dronehive-doc-operational-cd",
    "dronehive-seed-doc-operational-cd",
    "dronehive-doc-pro-cd",
    "dronehive-doc-super-llms-cd",
    "dronehive-doc-super-mesh-cd",
    "dronehive-doc-synaptic-loop-cd",
    "dronehive-doc-super-kernel-cd",
    "dronehive-doc-honesty-library",
    "dronehive-seed-doc-honesty-library",
    "dronehive-doc-app-library",
    "dronehive-seed-doc-app-library",
    "dronehive-doc-app-cd",
    "dronehive-seed-doc-app-cd",
    "dronehive-doc-grok-handoff-root",
    "dronehive-doc-grok-handoff-cd",
    "dronehive-truth-honesty-root",
    "dronehive-truth-honesty-oath-inline",
    "dronehive-ollama-app-readme-install",
    "dronehive-ollama-app-readme-dest",
    "dronehive-ollama-app-crash-log",
    "dronehive-ollama-app-ui-install-root",
    "dronehive-ollama-app-open-out",
    "dronehive-ollama-app-open-benchmarks",
    "dronehive-ollama-app-open-workspace",
    "dronehive-ollama-app-open-install",
    "dronehive-ollama-app-open-seal",
    "dronehive-mount-engine-out",
    "dronehive-mount-fabric-root",
    "dronehive-mount-smoke-seal",
    "dronehive-mount-swarm-seal",
    "dronehive-truth-honesty-library-list",
    "dronehive-ollama-app-bridge-paths",
  ]) {
    const target = relaunchFor({ ...job, id });
    assert.match(target.reason, new RegExp(`${id}\\.patch`));
    assert.doesNotMatch(target.reason, /npm run autofix/);
  }
});

test("origin jobs relaunch to the Origin codebase", () => {
  const target = relaunchFor({
    id: "gub-superbrain-probe",
    title: "probe",
    repo: "origin.cursor.com/git/yuri-afk/genesis",
    kind: "origin-slice",
    priority: 3,
    status: "open",
    claim: null,
    notes: "",
    verify: "",
    files: [],
    collision: "",
  });
  assert.equal(target.kind, "origin");
  assert.match(target.url, /yuri-afk\/genesis/);
});

test("every sibling role has a description", () => {
  for (const role of SIBLING_ROLES) {
    assert.equal(typeof describeRole(role), "string");
  }
});

test("here jobs stay on this checkout", () => {
  const target = relaunchFor({
    id: "review-landing-pad-prs",
    title: "review",
    repo: "github.com/yuro1991-afk/main",
    kind: "review",
    priority: 22,
    status: "open",
    claim: null,
    notes: "",
    verify: "",
    files: [],
    collision: "",
  });
  assert.equal(target.kind, "here");
  assert.match(target.reason, /Stay on this checkout/);
});

test("every open Genesis job has a reviews/handoff packet", () => {
  const root = fileURLToPath(new URL("..", import.meta.url));
  const ledger = loadLedger(new URL("../ledger/queue.json", import.meta.url));
  const jobs = listJobs(ledger, { genesis: true }, NOW).filter(
    (job) => job.status === "open" || job.status === "claimed",
  );
  assert.ok(jobs.length >= 8);
  for (const job of jobs) {
    assert.equal(existsSync(join(root, packetPathFor(job))), true, packetPathFor(job));
  }
});

test("relaunch packet points at Origin and the handoff file", () => {
  const siblings = loadSiblings(new URL("../ledger/siblings.json", import.meta.url));
  const job = {
    id: "gub-inventory-tick",
    title: "inventory",
    repo: "origin.cursor.com/git/yuri-afk/genesis",
    kind: "origin-slice",
    priority: 6,
    status: "open",
    claim: null,
    notes: "",
    verify: "",
    files: [],
    collision: "",
  };
  const packet = buildRelaunch(job, siblings);
  assert.equal(packet.contract, "agent-ops.relaunch.v1");
  assert.equal(packetPathFor(job), "reviews/handoff-gub-inventory-tick.md");
  assert.equal(packet.packet, "reviews/handoff-gub-inventory-tick.md");
  assert.match(packet.action, /yuri-afk\/genesis/);
  assert.match(packet.relaunch.url, /yuri-afk\/genesis/);
});

test("cli handoff defaults to next", async () => {
  const chunks = [];
  const code = await runCli(["handoff"], {
    nowMs: NOW,
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  assert.match(chunks.join(""), /gub-route-intent/);
  assert.match(chunks.join(""), /yuri-afk\/genesis/);
});

test("cli relaunch --agent peeks the roster Origin card", async () => {
  const parked = loadRoster(fileURLToPath(new URL("../ledger/roster.json", import.meta.url)))
    .assignments[0];
  const chunks = [];
  const code = await runCli(["relaunch", "--agent", parked.bcId], {
    nowMs: NOW,
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const text = chunks.join("");
  assert.match(text, new RegExp(parked.jobId));
  assert.doesNotMatch(text, /gub-inventory-tick/);
});

test("cli relaunch defaults to next Genesis card", async () => {
  const chunks = [];
  const code = await runCli(["relaunch"], {
    nowMs: NOW,
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const text = chunks.join("");
  assert.match(text, /gub-route-intent/);
  assert.match(text, /handoff-gub-route-intent/);
  assert.match(text, /yuri-afk\/genesis/);
  assert.doesNotMatch(text, /dronehive-unicode-ci/);
});
