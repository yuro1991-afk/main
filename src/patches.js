import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export const PATCH_CONTRACT = Object.freeze({
  id: "agent-ops.patches.v1",
  command: "patches",
  apply: "git apply --check <file> && git apply <file>",
  doNot: "Do not copy PR #6 npm run autofix. This command lists diffs only.",
});

export const DEFAULT_SIBLINGS_ROOT = "/tmp/siblings";

export const SIBLING_CHECKOUT_ALIASES = Object.freeze({
  "github.com/yuro1991-afk/dronehive": Object.freeze(["dronehive"]),
  "github.com/yuro1991-afk/bloom-fair-yellow-charm": Object.freeze([
    "bloom",
    "bloom-fair-yellow-charm",
  ]),
  "github.com/yuro1991-afk/opensussy": Object.freeze(["opensussy"]),
  "github.com/yuro1991-afk/face-swap-ios": Object.freeze(["face-swap-ios", "faceswap"]),
  "github.com/yuro1991-afk/ollama-voice-access": Object.freeze([
    "ollama-voice-access",
    "ova",
  ]),
});

/**
 * @param {NodeJS.ProcessEnv} [env]
 */
export function defaultSiblingsRoot(env = process.env) {
  const fromEnv = env.SIBLINGS_ROOT;
  return fromEnv && fromEnv.length > 0 ? fromEnv : DEFAULT_SIBLINGS_ROOT;
}

/**
 * @param {string} repo
 * @param {string} siblingsRoot
 */
export function resolveSiblingCheckout(repo, siblingsRoot) {
  if (typeof repo !== "string" || repo.length === 0) {
    return null;
  }
  const aliases = SIBLING_CHECKOUT_ALIASES[repo] ?? [repo.split("/").pop() ?? ""];
  for (const name of aliases) {
    if (!name) continue;
    const candidate = join(siblingsRoot, name);
    if (existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
}

/**
 * @param {string} cwd
 * @param {string[]} args
 */
export function defaultGitRunner(cwd, args) {
  return spawnSync("git", args, { cwd, encoding: "utf8" });
}

/**
 * @param {(cwd: string, args: string[]) => { status?: number | null, stdout?: string, stderr?: string }} runner
 * @param {string} cwd
 * @param {string[]} args
 */
function runGit(runner, cwd, args) {
  const result = runner(cwd, args);
  return {
    ok: (result.status ?? 1) === 0,
    stdout: String(result.stdout ?? ""),
    stderr: String(result.stderr ?? ""),
  };
}

/**
 * @param {{ ok: boolean, stdout: string, stderr: string }} result
 */
function gitOutput(result) {
  return `${result.stderr}\n${result.stdout}`.trim();
}

/**
 * Write-checkout steps after a successful --prove. Prove itself resets.
 * @param {PatchEntry} row
 * @returns {string[]}
 */
export function applyNextFor(row) {
  const priors = Array.isArray(row.requires) ? row.requires : [];
  return [
    `git clone https://${row.repo}.git work && cd work`,
    `git checkout -b cursor/${row.id}-from-ops`,
    ...priors.flatMap((file) => [
      `git apply --check /path/to/main/${file}`,
      `git apply /path/to/main/${file}`,
    ]),
    `git apply --check /path/to/main/${row.file}`,
    `git apply /path/to/main/${row.file}`,
    ...(Array.isArray(row.afterApply) ? row.afterApply : []),
  ];
}

/**
 * Vanilla + stacked `git apply --check` in catalog order. Applies priors
 * only to prove the next hunk, then `reset --hard` + `clean -fd`.
 * Does not leave diffs and does not push. Not PR #6 autofix.
 *
 * @param {PatchIndex} index
 * @param {{
 *   repoRoot: string,
 *   siblingsRoot?: string,
 *   id?: string,
 *   repo?: string,
 *   runGit?: (cwd: string, args: string[]) => { status?: number | null, stdout?: string, stderr?: string },
 * }} options
 */
export function provePatches(index, options) {
  if (!options?.repoRoot) {
    throw new Error("provePatches requires repoRoot");
  }
  const repoRoot = options.repoRoot;
  const siblingsRoot = options.siblingsRoot ?? defaultSiblingsRoot();
  const runner = options.runGit ?? defaultGitRunner;
  const selected = listPatches(index, { id: options.id, repo: options.repo });
  const selectedIds = new Set(selected.map((row) => row.id));

  /** @type {Map<string, PatchEntry[]>} */
  const byRepo = new Map();
  for (const row of index.patches) {
    const list = byRepo.get(row.repo) ?? [];
    list.push(row);
    byRepo.set(row.repo, list);
  }

  /** @type {Map<string, Record<string, unknown>>} */
  const recorded = new Map();
  const record = (row, extra) => {
    recorded.set(row.id, {
      id: row.id,
      repo: row.repo,
      file: row.file,
      applyNext: applyNextFor(row),
      ...extra,
    });
  };

  for (const [repo, rows] of byRepo) {
    const wanted = rows.filter((row) => selectedIds.has(row.id));
    if (wanted.length === 0) {
      continue;
    }
    const checkout = resolveSiblingCheckout(repo, siblingsRoot);
    if (!checkout) {
      for (const row of wanted) {
        record(row, { status: "missing-checkout", checkout: null });
      }
      continue;
    }

    let dirty = false;
    try {
      let blocked = /** @type {string | null} */ (null);
      for (let i = 0; i < rows.length; i += 1) {
        const row = rows[i];
        const patchPath = join(repoRoot, row.file);
        if (blocked) {
          if (selectedIds.has(row.id)) {
            record(row, { status: "fail", checkout, error: blocked });
          }
          continue;
        }
        const check = runGit(runner, checkout, ["apply", "--check", patchPath]);
        if (!check.ok) {
          blocked = `git apply --check failed for ${row.id}: ${gitOutput(check)}`;
          if (selectedIds.has(row.id)) {
            record(row, { status: "fail", checkout, error: blocked });
          }
          continue;
        }
        if (selectedIds.has(row.id)) {
          record(row, { status: "ok", checkout, stacked: i > 0 });
        }
        const apply = runGit(runner, checkout, ["apply", patchPath]);
        dirty = true;
        if (!apply.ok) {
          blocked = `git apply failed after --check for ${row.id}: ${gitOutput(apply)}`;
          if (selectedIds.has(row.id)) {
            record(row, { status: "fail", checkout, error: blocked });
          }
        }
      }
    } finally {
      if (dirty) {
        runGit(runner, checkout, ["reset", "--hard", "HEAD"]);
        runGit(runner, checkout, ["clean", "-fd"]);
      }
    }
  }

  const results = selected.map((row) => {
    return (
      recorded.get(row.id) ?? {
        id: row.id,
        repo: row.repo,
        file: row.file,
        applyNext: applyNextFor(row),
        status: "missing-checkout",
        checkout: null,
      }
    );
  });
  const failed = results.filter((row) => row.status === "fail").length;
  const skipped = results.filter((row) => row.status === "missing-checkout").length;
  const ok = results.filter((row) => row.status === "ok").length;
  return {
    contract: PATCH_CONTRACT.id,
    command: PATCH_CONTRACT.command,
    prove: true,
    cannotPush: index.cannotPush,
    doNot:
      "Do not copy PR #6 npm run autofix. --prove runs git apply --check only and resets the checkout. applyNext is the write-checkout apply, not a leftover hunt.",
    siblingsRoot,
    applyNext: results.length === 1 ? results[0].applyNext : undefined,
    count: results.length,
    ok,
    failed,
    skipped,
    results,
  };
}

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
  if (row.requires !== undefined) {
    if (!Array.isArray(row.requires) || row.requires.some((item) => typeof item !== "string" || !item.startsWith("patches/"))) {
      throw new Error("patch requires must be patches/ file paths");
    }
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
 *   requires?: string[],
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
  const patches = listPatches(index, filters).map((row) => ({
    ...row,
    applyNext: applyNextFor(row),
  }));
  return {
    contract: PATCH_CONTRACT.id,
    command: PATCH_CONTRACT.command,
    cannotPush: index.cannotPush,
    apply: index.apply,
    doNot: index.doNot,
    verifiedAt: index.verifiedAt ?? null,
    count: patches.length,
    applyNext: patches.length === 1 ? patches[0].applyNext : undefined,
    patches,
  };
}
