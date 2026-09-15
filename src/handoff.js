import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { applyNextForJob, catalogPatchFor, catalogPatchSummary, catalogRequires, displayCollision, displayNotes, displayVerify, proveAfterApplyForJob, takeInsteadFields } from "./brief.js";
import { assertNeverScope, jobScope } from "./kinds.js";
import { relatedForJob } from "./siblings.js";
import { defaultPatchesIndexPath, loadPatchIndex, patchForJob } from "./patches.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

export const HANDOFF_CONTRACT = "agent-ops.handoff.v1";
export const RELAUNCH_CONTRACT = "agent-ops.relaunch.v1";

/**
 * @param {import("./ledger.js").Job | null} job
 */
export function packetPathFor(job) {
  return job ? `reviews/handoff-${job.id}.md` : "reviews/NEXT.md";
}

/**
 * @param {import("./ledger.js").Job} job
 */
export function renderHandoffPacket(job) {
  if (job.id === "gub-superbrain-probe") {
    return `# Stop Superbrain probe — ${job.id}

**Yuri: no more Superbrain.** Pad probes stop. Do not hit \`:45001\` /
\`:8791\`. Do not run \`node src/cli.js probe\`.

This card is leftover Origin \`next\` when \`--origin\` is set.
Do not implement a probe here or on Origin. Take instead \`dronehive-unicode-ci\`.

## Job

- id: \`${job.id}\`
- kind: origin-slice
- repo: \`${job.repo}\`
- playbook: \`playbooks/${job.id}.md\`

## Take instead

- \`review-main-pr10\` — review https://github.com/yuro1991-afk/main/pull/10. Do not steal head / ears / eyes / vision / bridge.
- first parked apply: \`dronehive-unicode-ci\` on a sibling write checkout
- \`node src/cli.js brief --job review-main-pr10\`
- \`node src/cli.js patches --prove --job dronehive-unicode-ci\`
- \`node src/cli.js patches --prove-after-apply --job dronehive-unicode-ci\`

## Do not

- Do not probe Superbrain or GOOSE-PC
- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not open another landing-pad queue
- Do not copy PR #6 autofix
`;
  }
  const patch = catalogPatchFor(job);
  const target = relaunchFor(job);
  if (patch) {
    const after = (patch.afterApply ?? []).length
      ? `\n- After apply: ${(patch.afterApply ?? []).join("; ")}`
      : "";
    return `# Apply ${job.id}

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

## Job

- id: \`${job.id}\`
- title: ${job.title}
- kind: ${job.kind}
- priority: ${job.priority}
- repo: \`${job.repo}\`
- Sibling: https://${job.repo}
${catalogPatchSummary(patch)}
- Prove: \`node src/cli.js patches --prove --job ${job.id}\`
- Prove afterApply: \`${proveAfterApplyForJob(job)}\` (throwaways; never write /tmp/siblings)${after}
- playbook: \`playbooks/${job.id}.md\` (First commands may omit --prove-after-apply; prefer brief)

## Why apply

${target.reason}

## Notes

${displayNotes(job)}

## Collision

${displayCollision(job)}

## Verify

${displayVerify(job)}

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push ${job.repo} — apply there
`;
  }
  return `# GitHub relaunch packet — ${job.id}

Yuri: forget Origin. Take the named GitHub repo. This pad token cannot
push siblings — clone, patch, and relaunch there.

## Job

- id: \`${job.id}\`
- title: ${job.title}
- kind: ${job.kind}
- priority: ${job.priority}
- repo: \`${job.repo}\`
- UI: ${target.url}
- playbook: \`playbooks/${job.id}.md\`

## Why relaunch

${target.reason}

## Notes

${displayNotes(job)}

## Collision

${displayCollision(job)}

## Verify

${displayVerify(job)}

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not open another landing-pad queue
- Do not invent Origin work
`;
}

/**
 * @param {import("./ledger.js").Job[]} jobs
 * @param {string} dir
 */
export function writeHandoffPackets(jobs, dir, options = {}) {
  mkdirSync(dir, { recursive: true });
  return jobs.map((job) => {
    const dest = join(dir, `handoff-${job.id}.md`);
    if (!options.overwrite && existsSync(dest)) {
      return dest;
    }
    writeFileSync(dest, renderHandoffPacket(job));
    return dest;
  });
}

/**
 * @param {import("./ledger.js").Job | null} job
 * @param {{ prs: Array<{ owns?: string[], number: number, url: string, role: string, title: string, branch: string }> }} siblings
 */
export function buildHandoff(job, siblings) {
  if (!job) {
    return {
      contract: HANDOFF_CONTRACT,
      job: null,
      relaunch: null,
      message: "No open job. Add a card; do not open another landing-pad queue.",
    };
  }
  const related = relatedForJob(siblings, job.id);
  return {
    contract: HANDOFF_CONTRACT,
    jobId: job.id,
    packet: packetPathFor(job),
    relaunch: relaunchFor(job),
    related,
    applyNext: applyNextForJob(job),
    proveAfterApplyCommand: proveAfterApplyForJob(job),
    ...takeInsteadFields(job),
    doNot: handoffDoNot(job),
  };
}

/**
 * @param {import("./ledger.js").Job} job
 * @returns {string[]}
 */
function handoffDoNot(job) {
  if (job.id === "gub-superbrain-probe") {
    return [
      "Yuri: no more Superbrain. Do not probe :45001 / :8791.",
      "Do not run node src/cli.js probe.",
      "Do not reopen yuro1991-afk/main#1.",
      "Do not copy PR #6 autofix onto this ops board.",
    ];
  }
  if (catalogPatchFor(job)) {
    return [
      "Yuri: forget Origin for this card. Apply the catalog patch.",
      "Do not reopen yuro1991-afk/main#1.",
      "Do not copy PR #6 autofix onto this ops board.",
      "Do not open a fifth landing-pad queue.",
      "Do not invent a new leftover.",
      "Do not invent Origin work. Take the named GitHub sibling.",
    ];
  }
  return [
    "Do not reopen yuro1991-afk/main#1.",
    "Do not copy PR #6 autofix onto this ops board.",
    "Do not open a fifth landing-pad queue.",
    "Do not invent Origin work. Take the named GitHub sibling.",
  ];
}

/**
 * One screen so idle agents stop inventorying this pad.
 * @param {import("./ledger.js").Job | null} job
 * @param {{ prs: Array<{ owns?: string[], number: number, url: string, role: string, title: string, branch: string }> }} siblings
 */
export function buildRelaunch(job, siblings) {
  const handoff = buildHandoff(job, siblings);
  if (!job) {
    return {
      contract: RELAUNCH_CONTRACT,
      board: "reviews/NEXT.md",
      ...handoff,
      action: "Add a GitHub sibling card. Do not open another landing-pad queue.",
    };
  }
  const target = handoff.relaunch;
  return {
    contract: RELAUNCH_CONTRACT,
    board: "reviews/NEXT.md",
    jobId: job.id,
    packet: packetPathFor(job),
    playbook: `playbooks/${job.id}.md`,
    relaunch: target,
    applyNext: applyNextForJob(job),
    proveAfterApplyCommand: proveAfterApplyForJob(job),
    ...takeInsteadFields(job),
    action:
      target.kind === "origin"
        ? "Origin card (pass --origin). Prefer a GitHub sibling unless Yuri asks for Origin."
        : target.reason,
    doNot: handoff.doNot,
  };
}

/**
 * Non-dronehive GitHub cards share one reason that names the catalog file.
 * @param {import("./ledger.js").Job} job
 */
function githubCatalogReason(job) {
  const indexPath = defaultPatchesIndexPath(ROOT);
  if (existsSync(indexPath)) {
    try {
      const patch = patchForJob(loadPatchIndex(indexPath), job.id);
      if (patch) {
        const name = job.repo.replace(/^github\.com\//, "");
        const files = [...catalogRequires(patch), patch.file].join(" then ");
        return `This token cannot push ${name}. Apply ${files} from main#9 (\`git apply --check\`). Do not copy PR #6 autofix.`;
      }
    } catch {
      // fall through to the generic relaunch line
    }
  }
  return "Relaunch against the named repo. This landing-pad token cannot push it.";
}

/**
 * Catalog diffs live on main#9. Do not send waking agents to copy PR #6 autofix.
 * Stacked leftovers name requires priors before the leftover file.
 * @param {import("./ledger.js").Job} job
 */
function dronehiveRelaunchReason(job) {
  if (job.id === "dronehive-rebase-packaging") {
    return "This token cannot push dronehive. Rebase packaging stays blocked until dronehive#1 python-smoke is green. Do not copy PR #6 autofix.";
  }
  const patch = catalogPatchFor(job);
  if (patch) {
    const priors = catalogRequires(patch);
    const files = [...priors, patch.file].join(" then ");
    const check = priors.length === 0 ? " (`git apply --check`)" : "";
    return `This token cannot push dronehive. Apply ${files} from main#9${check}. Do not copy PR #6 autofix.`;
  }
  return "This token cannot push dronehive. Apply the matching catalog patch from main#9 (`node src/cli.js patches --job <id>`). Do not copy PR #6 autofix.";
}

/**
 * Landing-pad review cards stay on this checkout. #3 is merged.
 * Leftover unused after #8 is review-main-pr10, then review-landing-pad-prs.
 * @param {import("./ledger.js").Job} job
 */
function hereRelaunchFor(job) {
  if (job.id === "review-main-pr10") {
    return {
      kind: "here",
      url: "https://github.com/yuro1991-afk/main/pull/10",
      reason:
        "Stay on this checkout. Review main#10. Do not steal head/ears/eyes/vision/bridge. Do not open another queue.",
    };
  }
  return {
    kind: "here",
    url: "https://github.com/yuro1991-afk/main",
    reason:
      "Stay on this checkout. Review open PRs #8/#9/#10/#11/#12/#13/#14/#15/#16/#17/#18/#19/#20/#21/#22/#23/#24/#25/#26/#27/#28/#29/#30/#31/#32/#33/#34/#35/#36/#37/#38/#39/#40/#41/#42/#43/#44/#45/#46/#47/#48/#49/#50/#51/#52/#53/#54/#55/#56/#57/#58/#59/#60/#61/#62/#63/#64/#65/#66/#67/#68. #3 is merged. Skip conflicting #4/#5/#6. Do not steal #13. Do not open another queue.",
  };
}

/**
 * Catalog why lines stay apply-specific. Append the throwaway afterApply prove once.
 * @param {import("./ledger.js").Job} job
 * @param {{ kind: string, url: string, reason: string }} target
 */
function withCatalogProve(job, target) {
  const cmd = proveAfterApplyForJob(job);
  if (!cmd || target.reason.includes("prove-after-apply")) return target;
  return {
    ...target,
    reason: `${target.reason} Then ${cmd} on throwaways (never write /tmp/siblings).`,
  };
}

/**
 * @param {import("./ledger.js").Job} job
 */
export function relaunchFor(job) {
  if (job.id === "gub-superbrain-probe") {
    return withCatalogProve(job, {
      kind: "here",
      url: "https://github.com/yuro1991-afk/main/pull/10",
      reason:
        "Yuri: no more Superbrain. Do not probe :45001 / :8791. Do not run node src/cli.js probe. Take review-main-pr10 or apply a catalog patch.",
    });
  }
  const scope = jobScope(job);
  switch (scope) {
    case "here":
      return hereRelaunchFor(job);
    case "relaunch":
      if (job.repo.startsWith("origin.cursor.com")) {
        return {
          kind: "origin",
          url: "https://cursor.com/codebase/yuri-afk/genesis",
          reason: "This cloud environment cannot authenticate to Origin.",
        };
      }
      if (job.repo.includes("dronehive")) {
        return withCatalogProve(job, {
          kind: "github",
          url: "https://github.com/yuro1991-afk/dronehive",
          reason: dronehiveRelaunchReason(job),
        });
      }
      return withCatalogProve(job, {
        kind: "github",
        url: `https://${job.repo}`,
        reason: githubCatalogReason(job),
      });
    default:
      return assertNeverScope(scope);
  }
}
