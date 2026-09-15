import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { assertNeverKind, describeKind } from "./kinds.js";
import { destinationForKind } from "./routing.js";
import { relatedForJob } from "./siblings.js";
import { applyNextFor, defaultPatchesIndexPath, loadPatchIndex, patchForJob, proveAfterApplyCommand } from "./patches.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

export const BRIEF_CONTRACT = "agent-ops.brief.v1";

/** First parked catalog apply when leftover next is the Superbrain sit-out. */
export const TAKE_INSTEAD_CATALOG_ID = "dronehive-unicode-ci";
export const SUPERBRAIN_SITOUT_ID = "gub-superbrain-probe";

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
  const related = relatedForJob(siblings, job.id);
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
    ...takeInsteadFields(job),
    hardRules: hardRules(job),
  };
}

const BLOCKED_GENESIS_ONLY =
  /\nBlocked: Yuri scoped this landing pad to Genesis only\.\s*$/;
const AUTOFIX_RUNNER =
  /Patch is on landing-pad PR #5; verified apply runner is PR #6 \(`npm run autofix -- apply <checkout>`\)\.\s*/g;
const PULL5_APPLY =
  /Checkout dronehive, apply github\.com\/yuro1991-afk\/main\/pull\/5 patch, push on cursor\/setup-dev-environment-2e0b\.\s*/gi;

/**
 * Cataloged sibling cards stay status=blocked on this Genesis-only tree,
 * but --job apply text must not tell the agent to sit out or copy PR #6.
 * @param {import("./ledger.js").Job} job
 * @param {{ root?: string, patchesIndex?: string, skipCatalog?: boolean, patch?: { file: string, afterApply?: string[], requires?: string[] } | null }} [options]
 */
export function displayNotes(job, options = {}) {
  const notes = job.notes ?? "";
  const patch = catalogPatchFor(job, options);
  if (!patch) return notes;
  let shown = notes.replace(BLOCKED_GENESIS_ONLY, "").replace(AUTOFIX_RUNNER, "");
  const priors = catalogRequires(patch);
  const files = [...priors, patch.file].filter(Boolean).join(" then ");
  if (files && !shown.includes(patch.file)) {
    shown = `${shown.trim()} Applyable catalog patch is ${files} on main#9. Do not copy PR #6 autofix.`;
  } else if (priors.some((file) => !shown.includes(file))) {
    shown = `${shown.trim()} Requires (apply first): ${priors.join(", ")}.`;
  }
  return shown.replace(/\n{3,}/g, "\n\n").trimEnd();
}

/**
 * Catalog collisions must not send the agent to PR #5 or npm run autofix.
 * @param {import("./ledger.js").Job} job
 * @param {{ root?: string, patchesIndex?: string, skipCatalog?: boolean, patch?: { file: string, afterApply?: string[] } | null }} [options]
 */
export function displayCollision(job, options = {}) {
  const collision = job.collision ?? "";
  if (!catalogPatchFor(job, options)) return collision;
  const cleaned = collision.replace(PULL5_APPLY, "").trim();
  if (!cleaned || /pull\/5|npm run autofix/i.test(cleaned)) {
    return "Avoid rewriting the patched files while this card is claimed. Apply the catalog patch on a sibling write checkout. Do not copy PR #6 autofix.";
  }
  return cleaned;
}

/**
 * @param {import("./ledger.js").Job} job
 * @param {{ root?: string, patchesIndex?: string, skipCatalog?: boolean, patch?: { file: string, afterApply?: string[] } | null }} [options]
 */
/**
 * Verify text that firstCommands / helpers may run. Dollar idents expand
 * empty in bash; backticks are command substitution (same class as afterApply).
 * @param {import("./ledger.js").Job | null | undefined} job
 */
export function displayVerify(job) {
  return String(job?.verify ?? "")
    .replace(/\$([A-Za-z_][A-Za-z0-9_]*)/g, "$1")
    .replace(/`/g, "");
}

export function jobForDisplay(job, options = {}) {
  const notes = displayNotes(job, options);
  const collision = displayCollision(job, options);
  const verify = displayVerify(job);
  if (
    notes === (job.notes ?? "") &&
    collision === (job.collision ?? "") &&
    verify === (job.verify ?? "")
  ) {
    return job;
  }
  return { ...job, notes, collision, verify };
}

/**
 * Leftover Superbrain sit-out parks first parked apply. Other Origin
 * leftovers stay Origin (keep-busy retarget is #8).
 * @param {import("./ledger.js").Job | null | undefined} job
 * @returns {string | undefined}
 */
export function takeInsteadCatalogId(job) {
  return job?.id === SUPERBRAIN_SITOUT_ID ? TAKE_INSTEAD_CATALOG_ID : undefined;
}

/**
 * @param {import("./ledger.js").Job | null | undefined} job
 */
export function takeInsteadFields(job) {
  const takeInstead = takeInsteadCatalogId(job);
  return takeInstead ? { takeInstead } : {};
}

/**
 * Catalog row for take-instead. Superbrain itself stays uncataloged so
 * refuse templates do not become apply templates.
 * @param {import("./ledger.js").Job | null} job
 * @param {{ root?: string, patchesIndex?: string, skipCatalog?: boolean, patch?: { file: string, afterApply?: string[] } | null }} [options]
 */
export function takeInsteadCatalogPatch(job, options = {}) {
  const id = takeInsteadCatalogId(job);
  if (!id) return null;
  return catalogPatchFor({ id }, options);
}

/**
 * Write-checkout apply after a successful --prove. Catalog cards use
 * their own row. Superbrain leftover uses take-instead unicode-ci.
 * Undefined for review / other Origin leftovers.
 * @param {import("./ledger.js").Job | null} job
 * @param {{ root?: string, patchesIndex?: string, skipCatalog?: boolean, patch?: { id?: string, repo?: string, file: string, afterApply?: string[], requires?: string[] } | null }} [options]
 * @returns {string[] | undefined}
 */
export function applyNextForJob(job, options = {}) {
  if (!job) return undefined;
  const patch = catalogPatchFor(job, options) ?? takeInsteadCatalogPatch(job, options);
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
 * Throwaway afterApply prove. Catalog cards use their id. Superbrain
 * leftover uses take-instead unicode-ci. Not a write-checkout step.
 * @param {import("./ledger.js").Job | null} job
 * @param {{ root?: string, patchesIndex?: string, skipCatalog?: boolean, patch?: { id?: string } | null }} [options]
 * @returns {string | undefined}
 */
export function proveAfterApplyForJob(job, options = {}) {
  if (!job) return undefined;
  const patch = catalogPatchFor(job, options) ?? takeInsteadCatalogPatch(job, options);
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
 * Prior patch files that must apply before the leftover.
 * @param {{ requires?: string[] } | null | undefined} patch
 * @returns {string[]}
 */
export function catalogRequires(patch) {
  return Array.isArray(patch?.requires)
    ? patch.requires.filter((file) => typeof file === "string" && file.startsWith("patches/"))
    : [];
}

/**
 * Human-readable catalog patch + priors for prompt / handoff.
 * @param {{ file: string, requires?: string[] } | null | undefined} patch
 */
export function catalogPatchSummary(patch) {
  if (!patch?.file) return "";
  const priors = catalogRequires(patch);
  const requireLine = priors.length
    ? `\n- Requires (apply first): ${priors.map((file) => `\`${file}\``).join(", ")}`
    : "";
  return `- Patch: \`${patch.file}\`${requireLine}`;
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
          displayVerify(job),
        ];
      }
      if (job.kind === "catalog") {
        return [
          "Work Notion + Origin catalog. Do not invent URLs.",
          displayVerify(job),
        ];
      }
      if (job.kind === "probe") {
        return [
          "Do not run node src/cli.js probe (that hits Superbrain :45001 / :8791).",
          displayVerify(job),
        ];
      }
      return [
        `git clone https://${job.repo}.git work && cd work`,
        `git checkout -b cursor/${job.id}-from-ops`,
        `edit: ${(job.files ?? []).join(", ") || "(see notes)"}`,
        displayVerify(job),
      ];
    case "review":
      if (job.id === "review-main-pr10") {
        return [
          "Review https://github.com/yuro1991-afk/main/pull/10",
          "Read reviews/main-pr10.md. Head and ears already landed. Leftover: eyes → vision → bridge.",
          "Do not invent a new tree on empty main.",
          "Do not implement eyes / vision / bridge here",
          displayVerify(job),
        ];
      }
      if (job.id === "review-landing-pad-prs") {
        return [
          "Read reviews/landing-pad-prs.md.",
          "Review an existing open PR: #8, #9, #10, #11, #12, #13, #14, #15, #16, #17, #18, #19, #20, #21, #22, #23, #24, #25, #26, #27, #28, #29, #30, #31, #32, #33, #34, #35, #36, #37, #38, #39, #40, #41, #42, #43, #44, #45, #46, #47, #48, #49, #50, #51, #52, #53, #54, #55, #56, #57, #58, #59, #60, #61, #62, #63, #64, #65, #66, #67, #68, #69, #70, #71, #72, #73, #74, #75, #76, #77, #78, #79, #80, #81, #82, #83, #84, #85, #86, #87, or #88. Skip conflicting #4/#5/#6. #3 is merged. Do not merge #7 after #8.",
          "Do not invent a new tree on empty main.",
          displayVerify(job),
        ];
      }
      return [
        "Do not invent a new tree on empty main.",
        "Review an existing open PR: #8, #9, #10, #11, #12, #13, #14, #15, #16, #17, #18, #19, #20, #21, #22, #23, #24, #25, #26, #27, #28, #29, #30, #31, #32, #33, #34, #35, #36, #37, #38, #39, #40, #41, #42, #43, #44, #45, #46, #47, #48, #49, #50, #51, #52, #53, #54, #55, #56, #57, #58, #59, #60, #61, #62, #63, #64, #65, #66, #67, #68, #69, #70, #71, #72, #73, #74, #75, #76, #77, #78, #79, #80, #81, #82, #83, #84, #85, #86, #87, or #88. Skip conflicting #4/#5/#6. #3 is merged.",
        displayVerify(job),
      ];
    case "origin-slice":
      if (job.id === "gub-superbrain-probe") {
        return [
          "Yuri: no more Superbrain. Do not probe :45001 / :8791.",
          "Do not run node src/cli.js probe.",
          "Take review-main-pr10, or run node src/cli.js patches --prove --job dronehive-unicode-ci then node src/cli.js patches --prove-after-apply --job dronehive-unicode-ci. Apply on a sibling write checkout.",
          displayVerify(job),
        ];
      }
      return [
        "origin auth status",
        "If logged out: origin auth login --api-key \"$CURSOR_API_KEY\" (browser login is not available on this pad)",
        "origin repo clone yuri-afk/genesis genesis && cd genesis",
        "Do not reopen yuro1991-afk/main#1.",
        displayVerify(job),
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
    "Do not open another landing-pad queue. Review #8/#9/#10/#11/#12/#13/#14/#15/#16/#17/#18/#19/#20/#21/#22/#23/#24/#25/#26/#27/#28/#29/#30/#31/#32/#33/#34/#35/#36/#37/#38/#39/#40/#41/#42/#43/#44/#45/#46/#47/#48/#49/#50/#51/#52/#53/#54/#55/#56/#57/#58/#59/#60/#61/#62/#63/#64/#65/#66/#67/#68/#69/#70/#71/#72/#73/#74/#75/#76/#77/#78/#79/#80/#81/#82/#83/#84/#85/#86/#87/#88 or apply a catalog patch.",
    "Do not copy packages/keep-busy from PR #4 onto this branch.",
    "Yuri: forget Origin. Default work is local GitHub siblings. This token cannot push them.",
    "Yuri: no more Superbrain. Do not probe :45001 / :8791. Do not run node src/cli.js probe.",
    "Failed Superbrain probes are unreachable, never live.",
  ];
  if (job && catalogPatchFor(job)) {
    return [
      ...shared,
      "Yuri: forget Origin for this card. Apply the catalog patch. Do not invent a new leftover.",
      "On-disk playbooks/ First commands may omit --prove-after-apply. Prefer brief / proveAfterApplyCommand. Do not run writePlaybooks over playbooks/.",
    ];
  }
  return shared;
}
