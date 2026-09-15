import { readFileSync } from "node:fs";
import { join } from "node:path";

export const SIBLING_ROLES = Object.freeze([
  "pointers",
  "ops-board",
  "keep-busy-queue",
  "attention-and-dronehive-patch",
  "autofix-runner",
  "patch-catalog",
  "python-arena",
]);

/**
 * @param {string} role
 * @returns {never}
 */
export function assertNeverRole(role) {
  throw new Error(`unhandled sibling role: ${role}`);
}

/**
 * @param {string} role
 */
export function describeRole(role) {
  switch (role) {
    case "pointers":
      return "README/AGENTS only. Do not treat as a second queue.";
    case "ops-board":
      return "Landing-pad ops CLI (merged #3). GitHub-first defaults live on #8. Patch catalog is #9.";
    case "keep-busy-queue":
      return "Sibling lease queue. Do not copy packages/keep-busy here.";
    case "attention-and-dronehive-patch":
      return "Holds patches/dronehive-pro-chat-cp1252.patch. Apply it on dronehive, not here.";
    case "autofix-runner":
      return "CONFLICTING PR #6 is an autofix runner. Do not copy it. Apply the catalog patch from main#9 instead.";
    case "patch-catalog":
      return "Applyable sibling diffs under patches/. node src/cli.js patches lists them. Not an autofix runner.";
    case "python-arena":
      return "Fork Python arena/infra on main#10. Review only. Head/ears landed. Do not steal eyes/vision/bridge.";
    default:
      return assertNeverRole(role);
  }
}

/**
 * @param {string} repoRoot
 */
export function defaultSiblingsPath(repoRoot) {
  return join(repoRoot, "ledger", "siblings.json");
}

/**
 * @param {string} siblingsPath
 */
export function loadSiblings(siblingsPath) {
  const parsed = JSON.parse(readFileSync(siblingsPath, "utf8"));
  if (!parsed || !Array.isArray(parsed.prs)) {
    throw new Error("siblings must be { prs: [...] }");
  }
  for (const pr of parsed.prs) {
    if (!SIBLING_ROLES.includes(pr.role)) {
      throw new Error(`unknown sibling role: ${pr.role}`);
    }
  }
  return parsed;
}

/**
 * Related PRs for a job. The patch catalog leads so brief/handoff
 * `related[0]` is applyable #9, not conflicting #4/#5/#6.
 *
 * @param {{ prs: Array<{ owns?: string[], number: number, url: string, role: string, title: string, branch: string }> }} siblings
 * @param {string} jobId
 */
export function siblingsForJob(siblings, jobId) {
  return siblings.prs
    .filter((pr) => Array.isArray(pr.owns) && pr.owns.includes(jobId))
    .sort((left, right) => {
      const leftCatalog = left.role === "patch-catalog" ? 0 : 1;
      const rightCatalog = right.role === "patch-catalog" ? 0 : 1;
      if (leftCatalog !== rightCatalog) return leftCatalog - rightCatalog;
      return left.number - right.number;
    });
}
