import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_SIBLINGS_ROOT,
  PATCH_CONTRACT,
  assertPatchFilesExist,
  buildPatchCatalog,
  defaultPatchesIndexPath,
  defaultSiblingsRoot,
  listPatches,
  loadPatchIndex,
  patchForJob,
  applyNextFor,
  provePatches,
  resolveSiblingCheckout,
  validatePatchEntry,
} from "../src/patches.js";
import { runCli } from "../src/cli.js";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

test("defaultPatchesIndexPath is patches/index.json", () => {
  assert.equal(defaultPatchesIndexPath("/repo"), join("/repo", "patches", "index.json"));
});

test("validatePatchEntry rejects blank ids", () => {
  assert.throws(() => validatePatchEntry({ repo: "x", file: "a", base: "b", applyCheck: "ok" }), /id/);
  assert.throws(
    () =>
      validatePatchEntry({
        id: "x",
        repo: "r",
        file: "f",
        base: "b",
        applyCheck: "nope",
      }),
    /applyCheck/,
  );
});

test("repo index loads without duplicate ids and files exist", () => {
  const index = loadPatchIndex(defaultPatchesIndexPath(ROOT));
  assert.equal(index.contract, PATCH_CONTRACT.id);
  assert.equal(index.cannotPush, true);
  assert.ok(index.patches.length >= 162);
  assertPatchFilesExist(index, ROOT);
  const ids = index.patches.map((row) => row.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(ids.includes("dronehive-unicode-ci"));
  assert.ok(ids.includes("bloom-gitignore-vercel"));
  assert.ok(ids.includes("opensussy-ship-json-2-0-0"));
  assert.ok(ids.includes("faceswap-commit-pwa-icons"));
  assert.ok(ids.includes("ova-api-host-override"));
  assert.ok(ids.includes("opensussy-linux-syntax-ci"));
  assert.ok(ids.includes("faceswap-health-offline"));
  assert.ok(ids.includes("dronehive-ubuntu-smoke"));
  assert.ok(ids.includes("dronehive-portable-paths"));
  assert.ok(ids.includes("dronehive-script-host-roots"));
  assert.ok(ids.includes("faceswap-start-sh"));
  assert.ok(ids.includes("dronehive-runtime-host-paths"));
  assert.ok(ids.includes("faceswap-design-honesty"));
  assert.ok(ids.includes("dronehive-config-load-overlay"));
  assert.ok(ids.includes("ova-readme-linux-honesty"));
  assert.ok(ids.includes("dronehive-icons-manifest-relative"));
  assert.ok(ids.includes("dronehive-app-links-host-paths"));
  assert.ok(ids.includes("bloom-ci-lint"));
  assert.ok(ids.includes("ova-voice-card-linux-honesty"));
  assert.ok(ids.includes("faceswap-ios-readme-honesty"));
  assert.ok(ids.includes("dronehive-hive-docstring-honesty"));
  assert.ok(ids.includes("dronehive-work-order-doc-honesty"));
  assert.ok(ids.includes("dronehive-seed-work-order-doc-honesty"));
  assert.ok(ids.includes("dronehive-bench-goal-honesty"));
  assert.ok(ids.includes("faceswap-readme-requirements-honesty"));
  assert.ok(ids.includes("faceswap-readme-install-sh"));
  assert.ok(ids.includes("dronehive-buzzer-hive-library-honesty"));
  assert.ok(ids.includes("dronehive-seed-buzzer-hive-library-honesty"));
  assert.ok(ids.includes("dronehive-work-order-fabric-root"));
  assert.ok(ids.includes("dronehive-seed-work-order-fabric-root"));
  assert.ok(ids.includes("faceswap-readme-swift-honesty"));
  assert.ok(ids.includes("faceswap-readme-firewall-honesty"));
  assert.ok(ids.includes("dronehive-future-seer-jane-honesty"));
  assert.ok(ids.includes("dronehive-multi-hosts-exe-honesty"));
  assert.ok(ids.includes("dronehive-work-order-live-registry"));
  assert.ok(ids.includes("dronehive-seed-work-order-live-registry"));
  assert.ok(ids.includes("dronehive-work-order-school-root"));
  assert.ok(ids.includes("dronehive-seed-work-order-school-root"));
  assert.ok(ids.includes("dronehive-work-order-reference-db"));
  assert.ok(ids.includes("dronehive-seed-work-order-reference-db"));
  assert.ok(ids.includes("dronehive-work-order-knowledge-expand"));
  assert.ok(ids.includes("dronehive-seed-work-order-knowledge-expand"));
  assert.ok(ids.includes("dronehive-work-order-curriculum-root"));
  assert.ok(ids.includes("dronehive-seed-work-order-curriculum-root"));
  assert.ok(ids.includes("dronehive-multi-hosts-hardwire"));
  assert.ok(ids.includes("dronehive-super-llms-hardwire"));
  assert.ok(ids.includes("dronehive-work-order-open-tasks"));
  assert.ok(ids.includes("dronehive-seed-work-order-open-tasks"));
  assert.ok(ids.includes("dronehive-work-order-codex-paths"));
  assert.ok(ids.includes("dronehive-seed-work-order-codex-paths"));
  assert.ok(ids.includes("dronehive-work-order-law-truth"));
  assert.ok(ids.includes("dronehive-seed-work-order-law-truth"));
  assert.ok(ids.includes("dronehive-work-order-doc-law-truth"));
  assert.ok(ids.includes("dronehive-seed-work-order-doc-law-truth"));
  assert.ok(ids.includes("dronehive-work-order-doc-fabric-root"));
  assert.ok(ids.includes("dronehive-seed-work-order-doc-fabric-root"));
  assert.ok(ids.includes("dronehive-work-order-doc-imprints"));
  assert.ok(ids.includes("dronehive-work-order-doc-live-registry"));
  assert.ok(ids.includes("dronehive-seed-work-order-doc-live-registry"));
  assert.ok(ids.includes("dronehive-work-order-doc-codex-paths"));
  assert.ok(ids.includes("dronehive-seed-work-order-doc-codex-paths"));
  assert.ok(ids.includes("dronehive-work-order-doc-codex-cli"));
  assert.ok(ids.includes("dronehive-seed-work-order-doc-codex-cli"));
  assert.ok(ids.includes("dronehive-work-order-doc-recall-router"));
  assert.ok(ids.includes("dronehive-seed-work-order-doc-recall-router"));
  assert.ok(ids.includes("dronehive-work-order-doc-memory-recycle"));
  assert.ok(ids.includes("dronehive-seed-work-order-doc-memory-recycle"));
  assert.ok(ids.includes("dronehive-work-order-doc-models"));
  assert.ok(ids.includes("dronehive-seed-work-order-doc-models"));
  assert.ok(ids.includes("dronehive-work-order-doc-cd"));
  assert.ok(ids.includes("dronehive-seed-work-order-doc-cd"));
  assert.ok(ids.includes("dronehive-spec-relative"));
  assert.ok(ids.includes("dronehive-start-super-mesh-cd"));
  assert.ok(ids.includes("dronehive-start-multi-model-pythonpath"));
  assert.ok(ids.includes("dronehive-start-seer-pythonpath"));
  assert.ok(ids.includes("dronehive-enable-bridge-fallback"));
  assert.ok(ids.includes("dronehive-truth-bind-paths"));
  assert.ok(ids.includes("dronehive-package-release-v2-cargo"));
  assert.ok(ids.includes("dronehive-mount-launch-cargo"));
  assert.ok(ids.includes("dronehive-install-ollama-app-cargo"));
  assert.ok(ids.includes("dronehive-start-tui-cargo-honesty"));
  assert.ok(ids.includes("dronehive-ollama-tui-readme-cargo"));
  assert.ok(ids.includes("dronehive-mount-readme-cargo"));
  assert.ok(ids.includes("dronehive-tui-readme-cargo"));
  assert.ok(ids.includes("dronehive-apps-readme-cargo"));
  assert.ok(ids.includes("dronehive-install-ollama-app-root"));
  assert.ok(ids.includes("dronehive-install-ollama-app-mount"));
  assert.ok(ids.includes("dronehive-install-ollama-app-manifest"));
  assert.ok(ids.includes("dronehive-install-ollama-uninstall-root"));
  assert.ok(ids.includes("dronehive-tui-readme-root"));
  assert.ok(ids.includes("dronehive-ollama-tui-readme-install"));
  assert.ok(ids.includes("dronehive-mount-readme-layout"));
  assert.ok(ids.includes("dronehive-mount-readme-launch"));
  assert.ok(ids.includes("dronehive-mount-readme-related"));
  assert.ok(ids.includes("opensussy-sec-review-target"));
  assert.ok(ids.includes("opensussy-install-sec-review-target"));
  assert.ok(ids.includes("dronehive-readme-cd"));
  assert.ok(ids.includes("dronehive-doc-agent-loop-cd"));
  assert.ok(ids.includes("dronehive-doc-bridge-1080-cd"));
  assert.ok(ids.includes("dronehive-doc-code-worker-cd"));
  assert.ok(ids.includes("dronehive-doc-future-seer-cd"));
  assert.ok(ids.includes("dronehive-doc-measured-diagnostics-cd"));
  assert.ok(ids.includes("dronehive-doc-multi-face-cd"));
  assert.ok(ids.includes("dronehive-doc-operational-cd"));
  assert.ok(ids.includes("dronehive-seed-doc-operational-cd"));
  assert.ok(ids.includes("dronehive-doc-pro-cd"));
  assert.ok(ids.includes("dronehive-doc-super-llms-cd"));
  assert.ok(ids.includes("dronehive-doc-super-mesh-cd"));
  assert.ok(ids.includes("dronehive-doc-synaptic-loop-cd"));
  assert.ok(ids.includes("dronehive-doc-super-kernel-cd"));
  assert.ok(ids.includes("dronehive-doc-honesty-library"));
  assert.ok(ids.includes("dronehive-seed-doc-honesty-library"));
  assert.ok(ids.includes("dronehive-doc-app-library"));
  assert.ok(ids.includes("dronehive-seed-doc-app-library"));
  assert.ok(ids.includes("dronehive-doc-app-cd"));
  assert.ok(ids.includes("dronehive-seed-doc-app-cd"));
  assert.ok(ids.includes("dronehive-doc-grok-handoff-root"));
  assert.ok(ids.includes("dronehive-doc-grok-handoff-cd"));
  assert.ok(ids.includes("dronehive-truth-honesty-root"));
  assert.ok(ids.includes("dronehive-truth-honesty-oath-inline"));
  assert.ok(ids.includes("dronehive-ollama-app-readme-install"));
  assert.ok(ids.includes("dronehive-ollama-app-readme-dest"));
  assert.ok(ids.includes("dronehive-ollama-app-crash-log"));
  assert.ok(ids.includes("dronehive-ollama-app-ui-install-root"));
  assert.ok(ids.includes("dronehive-ollama-app-open-out"));
  assert.ok(ids.includes("dronehive-ollama-app-open-benchmarks"));
  assert.ok(ids.includes("dronehive-ollama-app-open-workspace"));
  assert.ok(ids.includes("dronehive-ollama-app-open-install"));
  assert.ok(ids.includes("dronehive-ollama-app-open-seal"));
  assert.ok(ids.includes("dronehive-mount-engine-out"));
  assert.ok(ids.includes("dronehive-mount-fabric-root"));
  assert.ok(ids.includes("dronehive-mount-smoke-seal"));
  assert.ok(ids.includes("dronehive-mount-swarm-seal"));
  assert.ok(ids.includes("dronehive-truth-honesty-library-list"));
  assert.ok(ids.includes("dronehive-ollama-app-bridge-paths"));
  assert.ok(ids.includes("dronehive-work-order-doc-board"));
  assert.ok(ids.includes("dronehive-seed-work-order-doc-board"));
  assert.ok(ids.includes("opensussy-superpowers-lab-plan"));
  assert.ok(ids.includes("opensussy-superpowers-lab-design"));
  assert.ok(ids.includes("faceswap-honesty-located-paths"));
  assert.ok(ids.includes("dronehive-work-order-registry-cli"));
  assert.ok(ids.includes("dronehive-grok-handoff-clone-dest"));
  assert.ok(ids.includes("dronehive-multi-face-pythonpath"));
  assert.ok(ids.includes("dronehive-future-seer-pythonpath"));
  assert.ok(ids.includes("dronehive-ai-bus-packs-root"));
  assert.ok(ids.includes("dronehive-work-order-live-mirror"));
  assert.ok(ids.includes("dronehive-seed-work-order-live-mirror"));
  assert.ok(ids.includes("dronehive-work-order-core-lessons"));
  assert.ok(ids.includes("dronehive-seed-work-order-core-lessons"));
  assert.ok(ids.includes("dronehive-work-order-ai-smarts-packs"));
  assert.ok(ids.includes("dronehive-seed-work-order-ai-smarts-packs"));
  assert.ok(ids.includes("bloom-grok-pwa-test-sync"));
});

test("text patches start with diff --git; icons are PNGs", () => {
  const index = loadPatchIndex(defaultPatchesIndexPath(ROOT));
  for (const row of index.patches) {
    const body = readFileSync(join(ROOT, row.file), "utf8");
    assert.match(body, /^diff --git /);
  }
  const icons = index.patches.find((row) => row.id === "faceswap-commit-pwa-icons");
  assert.ok(icons);
  for (const asset of icons.assets ?? []) {
    const bytes = readFileSync(join(ROOT, asset));
    assert.deepEqual(bytes.subarray(0, 8), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  }
});

test("listPatches and patchForJob filter", () => {
  const index = loadPatchIndex(defaultPatchesIndexPath(ROOT));
  const bloom = listPatches(index, { repo: "github.com/yuro1991-afk/bloom-fair-yellow-charm" });
  assert.ok(bloom.length >= 5);
  assert.ok(bloom.every((row) => row.repo.includes("bloom-fair-yellow-charm")));
  assert.equal(patchForJob(index, "missing"), null);
  assert.equal(patchForJob(index, "dronehive-unicode-ci")?.file, "patches/dronehive-pro-chat-cp1252.patch");
});

test("loadPatchIndex rejects duplicates", () => {
  const dir = mkdtempSync(join(tmpdir(), "agent-ops-patches-"));
  const path = join(dir, "index.json");
  writeFileSync(
    path,
    JSON.stringify({
      patches: [
        {
          id: "dup",
          repo: "github.com/yuro1991-afk/dronehive",
          file: "patches/a.patch",
          base: "abc",
          applyCheck: "ok",
        },
        {
          id: "dup",
          repo: "github.com/yuro1991-afk/dronehive",
          file: "patches/b.patch",
          base: "abc",
          applyCheck: "ok",
        },
      ],
    }),
  );
  assert.throws(() => loadPatchIndex(path), /duplicate/);
});

test("assertPatchFilesExist reports missing files", () => {
  const dir = mkdtempSync(join(tmpdir(), "agent-ops-patches-miss-"));
  mkdirSync(join(dir, "patches"));
  const indexPath = join(dir, "patches", "index.json");
  writeFileSync(
    indexPath,
    JSON.stringify({
      patches: [
        {
          id: "ghost",
          repo: "github.com/yuro1991-afk/dronehive",
          file: "patches/ghost.patch",
          base: "abc",
          applyCheck: "ok",
        },
      ],
    }),
  );
  const index = loadPatchIndex(indexPath);
  assert.throws(() => assertPatchFilesExist(index, dir), /ghost.patch/);
});

test("buildPatchCatalog is list-only", () => {
  const index = loadPatchIndex(defaultPatchesIndexPath(ROOT));
  const catalog = buildPatchCatalog(index, { id: "bloom-gitignore-vercel" });
  assert.equal(catalog.command, "patches");
  assert.equal(catalog.count, 1);
  assert.match(catalog.doNot, /autofix/);
  assert.equal(catalog.patches[0].id, "bloom-gitignore-vercel");
  assert.ok(catalog.patches[0].applyNext.includes("git rm -r --cached .vercel/output"));
  assert.deepEqual(catalog.applyNext, catalog.patches[0].applyNext);
});

test("cli patches lists the catalog", async () => {
  const chunks = [];
  const code = await runCli(["patches"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.command, "patches");
  assert.ok(parsed.count >= 162);
  assert.equal(parsed.cannotPush, true);
  assert.match(parsed.doNot, /autofix/);
});

test("cli patches --job filters one card", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-unicode-ci"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.count, 1);
  assert.equal(parsed.patches[0].id, "dronehive-unicode-ci");
  assert.ok(
    parsed.applyNext.some((line) => line.includes("dronehive-pro-chat-cp1252.patch")),
  );
  assert.ok(
    parsed.applyNext.some((line) => line.includes("cp1252") && line.includes("_chat")),
  );
});

test("cli patches --job dronehive-app-links-host-paths applies portable-paths first", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-app-links-host-paths"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  const lines = parsed.applyNext;
  const portable = lines.findIndex((line) => line.includes("dronehive-portable-paths.patch") && line.startsWith("git apply /"));
  const links = lines.findIndex((line) => line.includes("dronehive-app-links-host-paths.patch") && line.startsWith("git apply /"));
  assert.ok(portable >= 0 && links > portable);
  assert.ok(lines.some((line) => line.includes("from drone.app.links import LinkRegistry")));
});

test("cli patches --job dronehive-config-load-overlay applies portable-paths first", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-config-load-overlay"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  const lines = parsed.applyNext;
  const portable = lines.findIndex((line) => line.includes("dronehive-portable-paths.patch") && line.startsWith("git apply /"));
  const overlay = lines.findIndex((line) => line.includes("dronehive-config-load-overlay.patch") && line.startsWith("git apply /"));
  assert.ok(portable >= 0 && overlay > portable);
  assert.ok(lines.some((line) => line.includes("from drone.config_overlay import remap_host_strings")));
});

test("cli patches --job dronehive-runtime-host-paths applies portable-paths first", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-runtime-host-paths"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  const lines = parsed.applyNext;
  const portable = lines.findIndex((line) => line.includes("dronehive-portable-paths.patch") && line.startsWith("git apply /"));
  const runtime = lines.findIndex((line) => line.includes("dronehive-runtime-host-paths.patch") && line.startsWith("git apply /"));
  assert.ok(portable >= 0 && runtime > portable);
  assert.ok(lines.some((line) => line.includes("from drone.grok_handoff import DEFAULT_ROOT")));
});

test("cli patches --job dronehive-work-order-doc-codex-cli includes the docs query_llm_codex afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-work-order-doc-codex-cli"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-work-order-doc-codex-cli");
  assert.ok(parsed.applyNext.some((line) => line.includes("docs/WORK_ORDER.md") && line.includes("query_llm_codex.py stats") && line.includes("vram")));
});

test("cli patches --job dronehive-work-order-doc-recall-router includes the docs recall and router afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-work-order-doc-recall-router"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-work-order-doc-recall-router");
  assert.ok(parsed.applyNext.some((line) => line.includes("docs/WORK_ORDER.md") && line.includes("recall.py get knowledge_pack") && line.includes("ai_smarts_router.py route")));
});

test("cli patches --job dronehive-work-order-doc-memory-recycle includes the docs memory_recycle afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-work-order-doc-memory-recycle"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-work-order-doc-memory-recycle");
  assert.ok(parsed.applyNext.some((line) => line.includes("docs/WORK_ORDER.md") && line.includes("data/hive/memory_recycle/") && line.includes("ai-worker-drone-0.5b")));
});

test("cli patches --job dronehive-seed-work-order-doc-memory-recycle includes the seed docs memory_recycle afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-seed-work-order-doc-memory-recycle"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-seed-work-order-doc-memory-recycle");
  assert.ok(parsed.applyNext.some((line) => line.includes("drone/app/seed/docs/WORK_ORDER.md") && line.includes("data/hive/memory_recycle/") && line.includes("ai-worker-drone-0.5b")));
});

test("cli patches --job dronehive-seed-work-order-doc-recall-router includes the seed docs recall and router afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-seed-work-order-doc-recall-router"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-seed-work-order-doc-recall-router");
  assert.ok(parsed.applyNext.some((line) => line.includes("drone/app/seed/docs/WORK_ORDER.md") && line.includes("recall.py get knowledge_pack") && line.includes("ai_smarts_router.py route")));
});

test("cli patches --job dronehive-seed-work-order-doc-codex-cli includes the seed docs query_llm_codex afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-seed-work-order-doc-codex-cli"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-seed-work-order-doc-codex-cli");
  assert.ok(parsed.applyNext.some((line) => line.includes("drone/app/seed/docs/WORK_ORDER.md") && line.includes("query_llm_codex.py stats") && line.includes("vram")));
});

test("cli patches --job dronehive-seed-work-order-doc-codex-paths includes the seed docs codex table afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-seed-work-order-doc-codex-paths"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-seed-work-order-doc-codex-paths");
  assert.ok(parsed.applyNext.some((line) => line.includes("drone/app/seed/docs/WORK_ORDER.md") && line.includes("host/library/knowledge/codex/CODEX.md") && line.includes("query_llm_codex.py")));
});

test("cli patches --job dronehive-work-order-doc-codex-paths includes the docs codex table afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-work-order-doc-codex-paths"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-work-order-doc-codex-paths");
  assert.ok(parsed.applyNext.some((line) => line.includes("docs/WORK_ORDER.md") && line.includes("host/library/knowledge/codex/CODEX.md") && line.includes("query_llm_codex.py")));
});

test("cli patches --job dronehive-seed-work-order-doc-live-registry includes the seed live-registry afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-seed-work-order-doc-live-registry"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-seed-work-order-doc-live-registry");
  assert.ok(parsed.applyNext.some((line) => line.includes("drone/app/seed/docs/WORK_ORDER.md") && line.includes("host/ai-center") && line.includes("host/library/registry")));
});

test("cli patches --job dronehive-work-order-doc-live-registry includes the live-registry afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-work-order-doc-live-registry"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-work-order-doc-live-registry");
  assert.ok(parsed.applyNext.some((line) => line.includes("docs/WORK_ORDER.md") && line.includes("host/ai-center") && line.includes("host/library/registry")));
});

test("cli patches --job dronehive-work-order-doc-imprints includes the imprint table afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-work-order-doc-imprints"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-work-order-doc-imprints");
  assert.ok(parsed.applyNext.some((line) => line.includes("docs/WORK_ORDER.md") && line.includes("host/library/knowledge/indexes/drone_imprints.jsonl")));
});

test("cli patches --job dronehive-seed-work-order-doc-fabric-root includes the seed docs header fabric afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-seed-work-order-doc-fabric-root"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-seed-work-order-doc-fabric-root");
  assert.ok(parsed.applyNext.some((line) => line.includes("drone/app/seed/docs/WORK_ORDER.md") && line.includes("fabric") && line.includes("`.`")));
});

test("cli patches --job dronehive-work-order-doc-fabric-root includes the docs header fabric afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-work-order-doc-fabric-root"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-work-order-doc-fabric-root");
  assert.ok(parsed.applyNext.some((line) => line.includes("docs/WORK_ORDER.md") && line.includes("fabric") && line.includes("`.`")));
});

test("cli patches --job dronehive-seed-work-order-doc-law-truth includes the seed Library law afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-seed-work-order-doc-law-truth"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-seed-work-order-doc-law-truth");
  assert.ok(parsed.applyNext.some((line) => line.includes("drone/app/seed/docs/WORK_ORDER.md") && line.includes("Library law") && line.includes("host/library/LAW_TRUTH.md")));
});

test("cli patches --job dronehive-work-order-doc-law-truth includes the Library law afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-work-order-doc-law-truth"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-work-order-doc-law-truth");
  assert.ok(parsed.applyNext.some((line) => line.includes("docs/WORK_ORDER.md") && line.includes("Library law") && line.includes("host/library/LAW_TRUTH.md")));
});

test("cli patches --job dronehive-seed-work-order-law-truth includes the seed LAW_TRUTH afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-seed-work-order-law-truth"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-seed-work-order-law-truth");
  assert.ok(parsed.applyNext.some((line) => line.includes("drone/app/seed/configs/work_order.json") && line.includes("host/library/LAW_TRUTH.md")));
});

test("cli patches --job dronehive-work-order-law-truth includes the LAW_TRUTH afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-work-order-law-truth"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-work-order-law-truth");
  assert.ok(parsed.applyNext.some((line) => line.includes("configs/work_order.json") && line.includes("host/library/LAW_TRUTH.md")));
});

test("cli patches --job dronehive-seed-work-order-codex-paths includes the seed codex afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-seed-work-order-codex-paths"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-seed-work-order-codex-paths");
  assert.ok(parsed.applyNext.some((line) => line.includes("drone/app/seed/configs/work_order.json") && line.includes("host/library/knowledge/codex")));
});

test("cli patches --job dronehive-work-order-codex-paths includes the codex afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-work-order-codex-paths"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-work-order-codex-paths");
  assert.ok(parsed.applyNext.some((line) => line.includes("configs/work_order.json") && line.includes("host/library/knowledge/codex")));
});

test("cli patches --job dronehive-seed-work-order-open-tasks includes the seed open_tasks afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-seed-work-order-open-tasks"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-seed-work-order-open-tasks");
  assert.ok(parsed.applyNext.some((line) => line.includes("drone/app/seed/configs/work_order.json") && line.includes("host/continuous/OPEN_TASKS.json")));
});

test("cli patches --job dronehive-work-order-open-tasks includes the open_tasks afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-work-order-open-tasks"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-work-order-open-tasks");
  assert.ok(parsed.applyNext.some((line) => line.includes("configs/work_order.json") && line.includes("host/continuous/OPEN_TASKS.json")));
});

test("cli patches --job dronehive-super-llms-hardwire includes the hardwire afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-super-llms-hardwire"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-super-llms-hardwire");
  assert.ok(parsed.applyNext.some((line) => line.includes("configs/super_llms.json") && line.includes("data/super_mesh/HARDWIRE.json")));
});

test("cli patches --job dronehive-multi-hosts-hardwire includes the hardwire afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-multi-hosts-hardwire"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-multi-hosts-hardwire");
  assert.ok(parsed.applyNext.some((line) => line.includes("configs/multi_hosts.json") && line.includes("data/super_mesh/HARDWIRE.json")));
});

test("cli patches --job dronehive-seed-work-order-curriculum-root includes the seed curriculum_root afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-seed-work-order-curriculum-root"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-seed-work-order-curriculum-root");
  assert.ok(parsed.applyNext.some((line) => line.includes("drone/app/seed/configs/work_order.json") && line.includes("learning-curriculum")));
});

test("cli patches --job dronehive-work-order-curriculum-root includes the curriculum_root afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-work-order-curriculum-root"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-work-order-curriculum-root");
  assert.ok(parsed.applyNext.some((line) => line.includes("configs/work_order.json") && line.includes("learning-curriculum")));
});

test("cli patches --job dronehive-seed-work-order-knowledge-expand includes the seed knowledge_expand afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-seed-work-order-knowledge-expand"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-seed-work-order-knowledge-expand");
  assert.ok(parsed.applyNext.some((line) => line.includes("drone/app/seed/configs/work_order.json") && line.includes("host/library/knowledge/expand")));
});

test("cli patches --job dronehive-work-order-knowledge-expand includes the knowledge_expand afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-work-order-knowledge-expand"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-work-order-knowledge-expand");
  assert.ok(parsed.applyNext.some((line) => line.includes("configs/work_order.json") && line.includes("host/library/knowledge/expand")));
});

test("cli patches --job dronehive-seed-work-order-reference-db includes the seed reference_db afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-seed-work-order-reference-db"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-seed-work-order-reference-db");
  assert.ok(parsed.applyNext.some((line) => line.includes("drone/app/seed/configs/work_order.json") && line.includes("ai_center_reference.db")));
});

test("cli patches --job dronehive-work-order-reference-db includes the reference_db afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-work-order-reference-db"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-work-order-reference-db");
  assert.ok(parsed.applyNext.some((line) => line.includes("configs/work_order.json") && line.includes("ai_center_reference.db")));
});

test("cli patches --job dronehive-seed-work-order-school-root includes the seed school_root afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-seed-work-order-school-root"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-seed-work-order-school-root");
  assert.ok(parsed.applyNext.some((line) => line.includes("drone/app/seed/configs/work_order.json") && line.includes("helper-school")));
});

test("cli patches --job dronehive-work-order-school-root includes the school_root afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-work-order-school-root"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-work-order-school-root");
  assert.ok(parsed.applyNext.some((line) => line.includes("configs/work_order.json") && line.includes("helper-school")));
});

test("cli patches --job dronehive-seed-work-order-live-registry includes the seed live_registry afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-seed-work-order-live-registry"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-seed-work-order-live-registry");
  assert.ok(parsed.applyNext.some((line) => line.includes("drone/app/seed/configs/work_order.json") && line.includes("live_registry.py")));
});

test("cli patches --job dronehive-work-order-live-registry includes the live_registry afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-work-order-live-registry"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-work-order-live-registry");
  assert.ok(parsed.applyNext.some((line) => line.includes("configs/work_order.json") && line.includes("live_registry.py")));
});

test("cli patches --job dronehive-multi-hosts-exe-honesty includes the exe afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-multi-hosts-exe-honesty"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-multi-hosts-exe-honesty");
  assert.ok(parsed.applyNext.some((line) => line.includes("configs/multi_hosts.json") && line.includes("muscle_dispatch.py")));
});

test("cli patches --job dronehive-future-seer-jane-honesty includes the jane afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-future-seer-jane-honesty"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-future-seer-jane-honesty");
  assert.ok(parsed.applyNext.some((line) => line.includes("configs/future_seer.json") && line.includes("host/ai-center")));
});

test("cli patches --job dronehive-seed-work-order-fabric-root includes the seed fabric_root afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-seed-work-order-fabric-root"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-seed-work-order-fabric-root");
  assert.ok(parsed.applyNext.some((line) => line.includes("drone/app/seed/configs/work_order.json") && line.includes("fabric_root")));
});

test("cli patches --job dronehive-work-order-fabric-root includes the fabric_root afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-work-order-fabric-root"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-work-order-fabric-root");
  assert.ok(parsed.applyNext.some((line) => line.includes("configs/work_order.json") && line.includes("fabric_root")));
});

test("cli patches --job dronehive-seed-buzzer-hive-library-honesty includes the seed buzzer_hive.json afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-seed-buzzer-hive-library-honesty"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-seed-buzzer-hive-library-honesty");
  assert.ok(parsed.applyNext.some((line) => line.includes("drone/app/seed/configs/buzzer_hive.json") && line.includes("host/continuous/OPEN_TASKS.json")));
});

test("cli patches --job dronehive-buzzer-hive-library-honesty includes the buzzer_hive.json afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-buzzer-hive-library-honesty"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-buzzer-hive-library-honesty");
  assert.ok(parsed.applyNext.some((line) => line.includes("configs/buzzer_hive.json") && line.includes("host/continuous/OPEN_TASKS.json")));
});

test("cli patches --job dronehive-bench-goal-honesty includes the GOAL afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-bench-goal-honesty"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-bench-goal-honesty");
  assert.ok(parsed.applyNext.some((line) => line.includes("scripts/bench_vs_helpers.py") && line.includes("one host example")));
});

test("cli patches --job dronehive-seed-work-order-doc-honesty includes the seed WORK_ORDER.md afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-seed-work-order-doc-honesty"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-seed-work-order-doc-honesty");
  assert.ok(parsed.applyNext.some((line) => line.includes("drone/app/seed/docs/WORK_ORDER.md") && line.includes("host/library/knowledge/codex")));
});

test("cli patches --job dronehive-work-order-doc-honesty includes the WORK_ORDER.md afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-work-order-doc-honesty"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-work-order-doc-honesty");
  assert.ok(parsed.applyNext.some((line) => line.includes("docs/WORK_ORDER.md") && line.includes("host/library/knowledge/codex")));
});

test("cli patches --job dronehive-hive-docstring-honesty includes the hive.py afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-hive-docstring-honesty"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-hive-docstring-honesty");
  assert.ok(parsed.applyNext.some((line) => line.includes("drone/hive.py") && line.includes("one host example")));
});

test("cli patches --job faceswap-readme-firewall-honesty includes the README firewall afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "faceswap-readme-firewall-honesty"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "faceswap-readme-firewall-honesty");
  assert.ok(parsed.applyNext.some((line) => line.includes("README.md") && line.includes("inbound TCP")));
});

test("cli patches --job faceswap-readme-swift-honesty includes the README Swift afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "faceswap-readme-swift-honesty"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "faceswap-readme-swift-honesty");
  assert.ok(parsed.applyNext.some((line) => line.includes("README.md") && line.includes("Mac with Xcode")));
});

test("cli patches --job faceswap-readme-install-sh includes the README install afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "faceswap-readme-install-sh"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "faceswap-readme-install-sh");
  assert.ok(parsed.applyNext.some((line) => line.includes("README.md") && line.includes("bash START.sh")));
});

test("cli patches --job faceswap-readme-requirements-honesty includes the README afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "faceswap-readme-requirements-honesty"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "faceswap-readme-requirements-honesty");
  assert.ok(parsed.applyNext.some((line) => line.includes("README.md") && line.includes("Engine healthy at")));
});

test("cli patches --job faceswap-ios-readme-honesty includes the ios/README afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "faceswap-ios-readme-honesty"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "faceswap-ios-readme-honesty");
  assert.ok(parsed.applyNext.some((line) => line.includes("ios/README.md") && line.includes("FACESWAP_ENGINE")));
});

test("cli patches --job ova-voice-card-linux-honesty includes the VOICE-ACCESS.md afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "ova-voice-card-linux-honesty"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "ova-voice-card-linux-honesty");
  assert.ok(parsed.applyNext.some((line) => line.includes("VOICE-ACCESS.md") && line.includes("Start Menu only")));
});

test("cli patches --job ova-readme-linux-honesty includes the README afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "ova-readme-linux-honesty"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "ova-readme-linux-honesty");
  assert.ok(parsed.applyNext.some((line) => line.includes("README.md") && line.includes("Windows 11 Voice Access")));
});

test("cli patches --job faceswap-design-honesty includes the DESIGN.md afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "faceswap-design-honesty"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "faceswap-design-honesty");
  assert.ok(parsed.applyNext.some((line) => line.includes("DESIGN.md") && line.includes("FACESWAP_ENGINE")));
});

test("cli patches --job dronehive-script-host-roots includes the ROOT afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "dronehive-script-host-roots"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "dronehive-script-host-roots");
  assert.ok(parsed.applyNext.some((line) => line.includes("py_compile")));
  assert.ok(parsed.applyNext.some((line) => line.includes("G:\\\\AI-Home") || line.includes("G:\\AI-Home")));
});

test("cli patches --job faceswap-start-sh includes the fail-closed afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "faceswap-start-sh"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "faceswap-start-sh");
  assert.ok(
    parsed.applyNext.some((line) =>
      line.includes("FACESWAP_ENGINE=http://127.0.0.1:9 ./START.sh"),
    ),
  );
});

test("cli patches --job bloom-grok-pwa-test-sync includes the node --test afterApply", async () => {
  const chunks = [];
  const code = await runCli(["patches", "--job", "bloom-grok-pwa-test-sync"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 0);
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.patches[0].id, "bloom-grok-pwa-test-sync");
  assert.ok(
    parsed.applyNext.some((line) =>
      line.includes("node --test scripts/grok-pwa-plugin.test.mjs"),
    ),
  );
});

test("cli patches unknown job exits 1", async () => {
  const chunks = [];
  const code = await runCli(["patches", "no-such-card"], {
    write: (value) => {
      chunks.push(value);
    },
  });
  assert.equal(code, 1);
  assert.equal(JSON.parse(chunks.join("")).count, 0);
});

/**
 * @param {string} cwd
 * @param {string[]} args
 */
function gitOk(cwd, args) {
  const result = spawnSync("git", args, { cwd, encoding: "utf8" });
  assert.equal(result.status, 0, `${args.join(" ")}\n${result.stderr}\n${result.stdout}`);
  return result;
}

/**
 * @param {string} dir
 */
function initProveRepo(dir) {
  mkdirSync(dir, { recursive: true });
  gitOk(dir, ["init"]);
  gitOk(dir, ["config", "user.email", "prove@test"]);
  gitOk(dir, ["config", "user.name", "Prove Test"]);
}

test("resolveSiblingCheckout prefers bloom alias", () => {
  const root = mkdtempSync(join(tmpdir(), "agent-ops-sib-"));
  mkdirSync(join(root, "bloom"));
  assert.equal(
    resolveSiblingCheckout("github.com/yuro1991-afk/bloom-fair-yellow-charm", root),
    join(root, "bloom"),
  );
  assert.equal(resolveSiblingCheckout("github.com/yuro1991-afk/dronehive", root), null);
});

test("defaultSiblingsRoot reads SIBLINGS_ROOT", () => {
  assert.equal(defaultSiblingsRoot({}), DEFAULT_SIBLINGS_ROOT);
  assert.equal(defaultSiblingsRoot({ SIBLINGS_ROOT: "/custom/siblings" }), "/custom/siblings");
});

test("applyNextFor applies required patches before the leftover", () => {
  const lines = applyNextFor({
    id: "dronehive-runtime-host-paths",
    repo: "github.com/yuro1991-afk/dronehive",
    file: "patches/dronehive-runtime-host-paths.patch",
    requires: ["patches/dronehive-portable-paths.patch"],
    afterApply: ["python3 -c \"from drone.grok_handoff import DEFAULT_ROOT\""],
  });
  const portable = lines.indexOf("git apply /path/to/main/patches/dronehive-portable-paths.patch");
  const runtime = lines.indexOf("git apply /path/to/main/patches/dronehive-runtime-host-paths.patch");
  assert.ok(portable >= 0 && runtime > portable);
});

test("applyNextFor is the write-checkout apply, not a leftover hunt", () => {
  const lines = applyNextFor({
    id: "bloom-gitignore-vercel",
    repo: "github.com/yuro1991-afk/bloom-fair-yellow-charm",
    file: "patches/bloom-gitignore-vercel.patch",
    afterApply: ["git rm -r --cached .vercel/output"],
  });
  assert.equal(lines[0], "git clone https://github.com/yuro1991-afk/bloom-fair-yellow-charm.git work && cd work");
  assert.ok(lines.includes("git apply /path/to/main/patches/bloom-gitignore-vercel.patch"));
  assert.ok(lines.includes("git rm -r --cached .vercel/output"));
  assert.doesNotMatch(lines.join("\n"), /Origin/);
  assert.doesNotMatch(lines.join("\n"), /autofix/);
});

test("provePatches reports missing checkout", () => {
  const pad = mkdtempSync(join(tmpdir(), "agent-ops-prove-miss-"));
  mkdirSync(join(pad, "patches"));
  writeFileSync(join(pad, "patches", "one.patch"), "diff --git a/n b/n\n");
  writeFileSync(
    join(pad, "patches", "index.json"),
    JSON.stringify({
      cannotPush: true,
      patches: [
        {
          id: "one",
          repo: "github.com/yuro1991-afk/dronehive",
          file: "patches/one.patch",
          base: "abc",
          applyCheck: "ok",
        },
      ],
    }),
  );
  const index = loadPatchIndex(join(pad, "patches", "index.json"));
  const proof = provePatches(index, {
    repoRoot: pad,
    siblingsRoot: join(pad, "empty"),
  });
  assert.equal(proof.prove, true);
  assert.equal(proof.skipped, 1);
  assert.equal(proof.failed, 0);
  assert.equal(proof.results[0].status, "missing-checkout");
  assert.deepEqual(proof.results[0].applyNext, [
    "git clone https://github.com/yuro1991-afk/dronehive.git work && cd work",
    "git checkout -b cursor/one-from-ops",
    "git apply --check /path/to/main/patches/one.patch",
    "git apply /path/to/main/patches/one.patch",
  ]);
  assert.deepEqual(proof.applyNext, proof.results[0].applyNext);
  assert.match(proof.doNot, /autofix/);
  assert.match(proof.doNot, /applyNext/);
});

test("provePatches stacked apply-check then resets", () => {
  const pad = mkdtempSync(join(tmpdir(), "agent-ops-prove-stack-"));
  const siblings = join(pad, "siblings");
  const checkout = join(siblings, "dronehive");
  const patchesDir = join(pad, "patches");
  mkdirSync(patchesDir, { recursive: true });
  initProveRepo(checkout);
  writeFileSync(join(checkout, "note.txt"), "line1\n");
  gitOk(checkout, ["add", "note.txt"]);
  gitOk(checkout, ["commit", "-m", "init"]);

  writeFileSync(join(checkout, "note.txt"), "line1A\n");
  gitOk(checkout, ["add", "note.txt"]);
  gitOk(checkout, ["commit", "-m", "a"]);
  const one = spawnSync("git", ["format-patch", "-1", "--stdout"], {
    cwd: checkout,
    encoding: "utf8",
  });
  assert.equal(one.status, 0, one.stderr);
  writeFileSync(join(patchesDir, "one.patch"), one.stdout);

  writeFileSync(join(checkout, "note.txt"), "line1B\n");
  gitOk(checkout, ["add", "note.txt"]);
  gitOk(checkout, ["commit", "-m", "b"]);
  const two = spawnSync("git", ["format-patch", "-1", "--stdout"], {
    cwd: checkout,
    encoding: "utf8",
  });
  assert.equal(two.status, 0, two.stderr);
  writeFileSync(join(patchesDir, "two.patch"), two.stdout);

  gitOk(checkout, ["reset", "--hard", "HEAD~2"]);
  assert.equal(readFileSync(join(checkout, "note.txt"), "utf8"), "line1\n");

  writeFileSync(
    join(pad, "patches", "index.json"),
    JSON.stringify({
      cannotPush: true,
      patches: [
        {
          id: "one",
          repo: "github.com/yuro1991-afk/dronehive",
          file: "patches/one.patch",
          base: "init",
          applyCheck: "ok",
        },
        {
          id: "two",
          repo: "github.com/yuro1991-afk/dronehive",
          file: "patches/two.patch",
          base: "init",
          applyCheck: "ok",
        },
      ],
    }),
  );
  const index = loadPatchIndex(join(pad, "patches", "index.json"));
  const proof = provePatches(index, { repoRoot: pad, siblingsRoot: siblings });
  assert.equal(proof.failed, 0, JSON.stringify(proof.results, null, 2));
  assert.equal(proof.ok, 2);
  assert.equal(proof.results[0].stacked, false);
  assert.equal(proof.results[1].stacked, true);

  const onlyTwo = provePatches(index, {
    repoRoot: pad,
    siblingsRoot: siblings,
    id: "two",
  });
  assert.equal(onlyTwo.ok, 1);
  assert.equal(onlyTwo.results[0].id, "two");
  assert.equal(onlyTwo.results[0].stacked, true);
  assert.ok(onlyTwo.results[0].applyNext.some((line) => line.includes("patches/two.patch")));
  assert.deepEqual(onlyTwo.applyNext, onlyTwo.results[0].applyNext);
  assert.equal(readFileSync(join(checkout, "note.txt"), "utf8"), "line1\n");
  const status = spawnSync("git", ["status", "--porcelain"], {
    cwd: checkout,
    encoding: "utf8",
  });
  assert.equal(status.stdout, "");
});

test("cli patches --prove stacked then resets", async () => {
  const pad = mkdtempSync(join(tmpdir(), "agent-ops-prove-cli-"));
  const siblings = join(pad, "siblings");
  const checkout = join(siblings, "dronehive");
  const patchesDir = join(pad, "patches");
  mkdirSync(patchesDir, { recursive: true });
  initProveRepo(checkout);
  writeFileSync(join(checkout, "note.txt"), "line1\n");
  gitOk(checkout, ["add", "note.txt"]);
  gitOk(checkout, ["commit", "-m", "init"]);
  writeFileSync(join(checkout, "note.txt"), "line1A\n");
  gitOk(checkout, ["add", "note.txt"]);
  gitOk(checkout, ["commit", "-m", "a"]);
  const one = spawnSync("git", ["format-patch", "-1", "--stdout"], {
    cwd: checkout,
    encoding: "utf8",
  });
  assert.equal(one.status, 0, one.stderr);
  writeFileSync(join(patchesDir, "one.patch"), one.stdout);
  gitOk(checkout, ["reset", "--hard", "HEAD~1"]);

  writeFileSync(
    join(patchesDir, "index.json"),
    JSON.stringify({
      cannotPush: true,
      patches: [
        {
          id: "one",
          repo: "github.com/yuro1991-afk/dronehive",
          file: "patches/one.patch",
          base: "init",
          applyCheck: "ok",
        },
      ],
    }),
  );

  const chunks = [];
  const code = await runCli(
    ["patches", "--prove", "--index", join(patchesDir, "index.json"), "--siblings-root", siblings],
    {
      root: pad,
      write: (value) => {
        chunks.push(value);
      },
    },
  );
  assert.equal(code, 0, chunks.join(""));
  const parsed = JSON.parse(chunks.join(""));
  assert.equal(parsed.prove, true);
  assert.equal(parsed.ok, 1);
  assert.equal(parsed.failed, 0);
  assert.equal(readFileSync(join(checkout, "note.txt"), "utf8"), "line1\n");
});

test("cli patches --prove missing checkout exits 1", async () => {
  const pad = mkdtempSync(join(tmpdir(), "agent-ops-prove-cli-miss-"));
  mkdirSync(join(pad, "patches"));
  writeFileSync(join(pad, "patches", "one.patch"), "diff --git a/n b/n\n");
  const indexPath = join(pad, "patches", "index.json");
  writeFileSync(
    indexPath,
    JSON.stringify({
      cannotPush: true,
      patches: [
        {
          id: "one",
          repo: "github.com/yuro1991-afk/dronehive",
          file: "patches/one.patch",
          base: "abc",
          applyCheck: "ok",
        },
      ],
    }),
  );
  const chunks = [];
  const code = await runCli(
    ["patches", "--prove", "--index", indexPath, "--siblings-root", join(pad, "empty")],
    {
      root: pad,
      write: (value) => {
        chunks.push(value);
      },
    },
  );
  assert.equal(code, 1);
  assert.equal(JSON.parse(chunks.join("")).skipped, 1);
});
