import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export const PATCH_CONTRACT = Object.freeze({
  id: "agent-ops.patches.v1",
  command: "patches",
  apply: "git apply --check <file> && git apply <file>",
  doNot: "Do not copy PR #6 npm run autofix. This command lists diffs only.",
});

/**
 * @param {string} repoRoot
 */
export function defaultPatchesIndexPath(repoRoot) {
  return join(repoRoot, "patches", "index.json");
}

/**
 * @param {unknown} entry
 */
export function validatePatchEntry(entry) {
  if (!entry || typeof entry !== "object") {
    throw new Error("patch entry must be an object");
  }
  const row = /** @type {Record<string, unknown>} */ (entry);
  for (const key of ["id", "repo", "file", "base", "applyCheck"]) {
    if (typeof row[key] !== "string" || row[key].length === 0) {
      throw new Error(`patch entry missing ${key}`);
    }
  }
  if (row.applyCheck !== "ok" && row.applyCheck !== "pending") {
    throw new Error(`unknown applyCheck: ${row.applyCheck}`);
  }
  return /** @type {PatchEntry} */ (row);
}

/**
 * @typedef {{
 *   id: string,
 *   repo: string,
 *   file: string,
 *   base: string,
 *   applyCheck: "ok" | "pending",
 *   afterApply?: string[],
 *   assets?: string[],
 *   notes?: string,
 * }} PatchEntry
 */

/**
 * @typedef {{
 *   contract: string,
 *   cannotPush: boolean,
 *   apply: string,
 *   doNot: string,
 *   verifiedAt?: string,
 *   patches: PatchEntry[],
 * }} PatchIndex
 */

/**
 * @param {string} indexPath
 * @returns {PatchIndex}
 */
export function loadPatchIndex(indexPath) {
  const parsed = JSON.parse(readFileSync(indexPath, "utf8"));
  if (!parsed || !Array.isArray(parsed.patches)) {
    throw new Error("patches index must be { patches: [...] }");
  }
  const patches = parsed.patches.map(validatePatchEntry);
  const seen = new Set();
  for (const row of patches) {
    if (seen.has(row.id)) {
      throw new Error(`duplicate patch id: ${row.id}`);
    }
    seen.add(row.id);
  }
  return {
    contract: String(parsed.contract ?? PATCH_CONTRACT.id),
    cannotPush: parsed.cannotPush !== false,
    apply: String(parsed.apply ?? PATCH_CONTRACT.apply),
    doNot: String(parsed.doNot ?? PATCH_CONTRACT.doNot),
    verifiedAt: parsed.verifiedAt ? String(parsed.verifiedAt) : undefined,
    patches,
  };
}

/**
 * @param {PatchIndex} index
 * @param {{ repo?: string, id?: string }} [filters]
 */
export function listPatches(index, filters = {}) {
  return index.patches.filter((row) => {
    if (filters.id && row.id !== filters.id) return false;
    if (filters.repo && row.repo !== filters.repo) return false;
    return true;
  });
}

/**
 * @param {PatchIndex} index
 * @param {string} jobId
 */
export function patchForJob(index, jobId) {
  return index.patches.find((row) => row.id === jobId) ?? null;
}

/**
 * Confirm each catalog file exists under repoRoot.
 * @param {PatchIndex} index
 * @param {string} repoRoot
 */
export function assertPatchFilesExist(index, repoRoot) {
  const missing = [];
  for (const row of index.patches) {
    if (!existsSync(join(repoRoot, row.file))) {
      missing.push(row.file);
    }
    for (const asset of row.assets ?? []) {
      if (!existsSync(join(repoRoot, asset))) {
        missing.push(asset);
      }
    }
  }
  if (missing.length > 0) {
    throw new Error(`missing patch files: ${missing.join(", ")}`);
  }
  return true;
}

/**
 * @param {PatchIndex} index
 * @param {{ id?: string, repo?: string }} [filters]
 */
export function buildPatchCatalog(index, filters = {}) {
  const patches = listPatches(index, filters);
  return {
    contract: PATCH_CONTRACT.id,
    command: PATCH_CONTRACT.command,
    cannotPush: index.cannotPush,
    apply: index.apply,
    doNot: index.doNot,
    verifiedAt: index.verifiedAt ?? null,
    count: patches.length,
    patches,
  };
}
