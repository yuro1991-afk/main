import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { assertNeverKind, describeKind } from "./kinds.js";
import { destinationForKind } from "./routing.js";
import { describeRole, siblingsForJob } from "./siblings.js";
import { defaultPatchesIndexPath, loadPatchIndex, patchForJob } from "./patches.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

export const BRIEF_CONTRACT = "agent-ops.brief.v1";

/**
 * @param {import("./ledger.js").Job} job
 * @param {{ prs: Array<{ owns?: string[], number: number, url: string, role: string, title: string, branch: string }> }} siblings
 */
export function buildBrief(job, siblings, options = {}) {
  if (!job) {
    return {
      contract: BRIEF_CONTRACT,
      job: null,
      hardRules: hardRules(),
      message: "No open job. Add a card to ledger/queue.json instead of opening another board.",
    };
  }
  const related = siblingsForJob(siblings, job.id).map((pr) => ({
    number: pr.number,
    url: pr.url,
    role: pr.role,
    title: pr.title,
    branch: pr.branch,
    meaning: describeRole(pr.role),
  }));
  return {
    contract: BRIEF_CONTRACT,
    job,
    kind: describeKind(job.kind),
    destination: destinationForKind(job.kind),
    related,
    firstCommands: firstCommands(job, { root: options.root }),
    hardRules: hardRules(),
  };
}

/**
 * @param {import("./ledger.js").Job} job
 * @param {{ root?: string, patchesIndex?: string, skipCatalog?: boolean, patch?: { file: string, afterApply?: string[] } | null }} [options]
 */
function catalogPatchFor(job, options = {}) {
  if (options.patch) return options.patch;
  if (options.skipCatalog) return null;
  const indexPath = options.patchesIndex ?? defaultPatchesIndexPath(options.root ?? ROOT);
  if (!existsSync(indexPath)) return null;
  try {
    return patchForJob(loadPatchIndex(indexPath), job.id);
  } catch {
    return null;
  }
}

/**
 * @param {import("./ledger.js").Job} job
 * @param {{ root?: string, patchesIndex?: string, skipCatalog?: boolean, patch?: { file: string, afterApply?: string[] } | null }} [options]
 * @returns {string[]}
 */
export function firstCommands(job, options = {}) {
  const patch = catalogPatchFor(job, options);
  switch (job.kind) {
    case "fix":
    case "implement":
    case "catalog":
    case "probe":
      if (patch) {
        return [
          `git clone https://${job.repo}.git work && cd work`,
          `git checkout -b cursor/${job.id}-from-ops`,
          `git apply --check /path/to/main/${patch.file}`,
          `git apply /path/to/main/${patch.file}`,
          ...(patch.afterApply ?? []),
          job.verify,
        ];
      }
      if (job.kind === "catalog") {
        return [
          "Work Notion + Origin catalog. Do not invent URLs.",
          job.verify,
        ];
      }
      if (job.kind === "probe") {
        return [
          "node src/cli.js probe",
          "Timeouts and non-2xx stay unreachable. Never write live.",
          job.verify,
        ];
      }
      return [
        `git clone https://${job.repo}.git work && cd work`,
        `git checkout -b cursor/${job.id}-from-ops`,
        `edit: ${(job.files ?? []).join(", ") || "(see notes)"}`,
        job.verify,
      ];
    case "review":
      if (job.id === "review-main-pr10") {
        return [
          "Review https://github.com/yuro1991-afk/main/pull/10",
          "Do not invent a new tree on empty main.",
          "Do not implement head / ears / eyes / vision / bridge here",
          job.verify,
        ];
      }
      return [
        "Do not invent a new tree on empty main.",
        "Review an existing open PR: #8, #9, or #10. Skip conflicting #4/#5/#6. #3 is merged.",
        job.verify,
      ];
    case "origin-slice":
      if (job.id === "gub-superbrain-probe") {
        return [
          "Yuri: no more Superbrain. Do not probe :45001 / :8791.",
          "Do not run node src/cli.js probe.",
          "Take review-main-pr10, or apply a catalog patch on a sibling write checkout.",
          job.verify,
        ];
      }
      return [
        "origin auth status",
        "If logged out: origin auth login --api-key \"$CURSOR_API_KEY\" (browser login is not available on this pad)",
        "origin repo clone yuri-afk/genesis genesis && cd genesis",
        "Do not reopen yuro1991-afk/main#1.",
        job.verify,
      ];
    default:
      return assertNeverKind(job.kind);
  }
}

function hardRules() {
  return [
    "Do not reopen https://github.com/yuro1991-afk/main/pull/1.",
    "Do not open a fourth landing-pad queue. Extend PR #3 or claim a card.",
    "Do not copy packages/keep-busy from PR #4 onto this branch.",
    "Yuri scoped this pad to Genesis only. Other sibling cards stay blocked.",
    "Failed Superbrain probes are unreachable, never live.",
  ];
}
