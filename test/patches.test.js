import { mkdtempSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  PATCH_CONTRACT,
  assertPatchFilesExist,
  buildPatchCatalog,
  defaultPatchesIndexPath,
  listPatches,
  loadPatchIndex,
  patchForJob,
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
  assert.ok(index.patches.length >= 42);
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
  assert.ok(parsed.count >= 42);
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
