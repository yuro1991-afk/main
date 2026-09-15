import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { assertNeverKind, describeKind } from "./kinds.js";
import { destinationForKind } from "./routing.js";
import { describeRole, siblingsForJob } from "./siblings.js";
import { applyNextFor, defaultPatchesIndexPath, loadPatchIndex, patchForJob, proveAfterApplyCommand } from "./patches.js";

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
      hardRules: hardRules(null),
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
    job: jobForDisplay(job, { root: options.root }),
    kind: describeKind(job.kind),
    destination: catalogPatchFor(job, { root: options.root })
      ? `Apply the catalog patch on ${job.repo}`
      : destinationForKind(job.kind),
    related,
    firstCommands: firstCommands(job, { root: options.root }),
    applyNext: applyNextForJob(job, { root: options.root }),
    proveAfterApplyCommand: proveAfterApplyForJob(job, { root: options.root }),
    hardRules: hardRules(job),
  };
}

const BLOCKED_GENESIS_ONLY =
  /\nBlocked: Yuri scoped this landing pad to Genesis only\.\s*$/;

/**
 * Cataloged sibling cards stay status=blocked on this Genesis-only tree,
 * but --job apply text must not tell the agent to sit out.
 * @param {import("./ledger.js").Job} job
 * @param {{ root?: string, patchesIndex?: string, skipCatalog?: boolean, patch?: { file: string, afterApply?: string[] } | null }} [options]
 */
export function displayNotes(job, options = {}) {
  const notes = job.notes ?? "";
  if (catalogPatchFor(job, options)) {
    return notes.replace(BLOCKED_GENESIS_ONLY, "").trimEnd();
  }
  return notes;
}

/**
 * @param {import("./ledger.js").Job} job
 * @param {{ root?: string, patchesIndex?: string, skipCatalog?: boolean, patch?: { file: string, afterApply?: string[] } | null }} [options]
 */
export function jobForDisplay(job, options = {}) {
  const notes = displayNotes(job, options);
  if (notes === (job.notes ?? "")) return job;
  return { ...job, notes };
}

/**
 * Write-checkout apply after a successful --prove. Undefined when the
 * card is not in the patch catalog (review / Origin leftovers).
 * @param {import("./ledger.js").Job | null} job
 * @param {{ root?: string, patchesIndex?: string, skipCatalog?: boolean, patch?: { id?: string, repo?: string, file: string, afterApply?: string[], requires?: string[] } | null }} [options]
 * @returns {string[] | undefined}
 */
export function applyNextForJob(job, options = {}) {
  if (!job) return undefined;
  const patch = catalogPatchFor(job, options);
  if (!patch) return undefined;
  return applyNextFor({
    id: patch.id ?? job.id,
    repo: patch.repo ?? job.repo,
    file: patch.file,
    afterApply: patch.afterApply,
    requires: patch.requires,
  });
}

/**
 * Throwaway afterApply prove for a cataloged card. Undefined when the
 * card is not in the patch catalog. Not a write-checkout step.
 * @param {import("./ledger.js").Job | null} job
 * @param {{ root?: string, patchesIndex?: string, skipCatalog?: boolean, patch?: { id?: string } | null }} [options]
 * @returns {string | undefined}
 */
export function proveAfterApplyForJob(job, options = {}) {
  if (!job) return undefined;
  const patch = catalogPatchFor(job, options);
  if (!patch) return undefined;
  return proveAfterApplyCommand(patch.id ?? job.id);
}

export function catalogPatchFor(job, options = {}) {
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
          `node src/cli.js patches --prove --job ${job.id}`,
          proveAfterApplyCommand(job.id),
          ...applyNextFor({
            id: patch.id ?? job.id,
            repo: patch.repo ?? job.repo,
            file: patch.file,
            afterApply: patch.afterApply,
            requires: patch.requires,
          }),
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
          "Do not run node src/cli.js probe (that hits Superbrain :45001 / :8791).",
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
          "Read reviews/main-pr10.md. Head and ears already landed. Leftover: eyes → vision → bridge.",
          "Do not invent a new tree on empty main.",
          "Do not implement eyes / vision / bridge here",
          job.verify,
        ];
      }
      if (job.id === "review-landing-pad-prs") {
        return [
          "Read reviews/landing-pad-prs.md.",
          "Review an existing open PR: #8, #9, or #10. Skip conflicting #4/#5/#6. #3 is merged. Do not merge #7 after #8.",
          "Do not invent a new tree on empty main.",
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
          "Take review-main-pr10, or run node src/cli.js patches --prove then apply a catalog patch on a sibling write checkout.",
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

/**
 * @param {import("./ledger.js").Job | null} [job]
 */
function hardRules(job) {
  const shared = [
    "Do not reopen https://github.com/yuro1991-afk/main/pull/1.",
    "Do not open another landing-pad queue. Review #8/#9/#10 or apply a catalog patch.",
    "Do not copy packages/keep-busy from PR #4 onto this branch.",
    "Yuri: no more Superbrain. Do not probe :45001 / :8791. Do not run node src/cli.js probe.",
  ];
  if (job && catalogPatchFor(job)) {
    return [
      ...shared,
      "Yuri: forget Origin for this card. Apply the catalog patch. Do not invent a new leftover.",
      "On-disk playbooks/ First commands may omit --prove-after-apply. Prefer brief / proveAfterApplyCommand. Do not run writePlaybooks over playbooks/.",
    ];
  }
  return [
    ...shared,
    "Yuri scoped this pad to Genesis only. Other sibling cards stay blocked until #8 merges.",
  ];
}
