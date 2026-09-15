import { applyNextForJob, catalogPatchFor, proveAfterApplyForJob } from "./brief.js";
import { assertNeverKind, jobScope } from "./kinds.js";

export const HELPER_CONTRACT = "agent-ops.helpers.v1";

/**
 * @typedef {{ role: string, title: string, prompt: string }} HelperPlan
 */

/**
 * Fan-out plan so a cloud agent does not sit in inventory.
 * @param {import("./ledger.js").Job} job
 * @returns {HelperPlan[]}
 */
/**
 * @param {import("./kinds.js").JobKind} kind
 */
function catalogApplyKind(kind) {
  switch (kind) {
    case "fix":
    case "implement":
    case "catalog":
    case "probe":
      return true;
    case "review":
    case "origin-slice":
      return false;
    default:
      return assertNeverKind(kind);
  }
}

export function planHelpers(job) {
  if (!job) return [];
  const scope = jobScope(job);
  const shared = [
    {
      role: "verify",
      title: `Verify ${job.id}`,
      prompt: `Read-only. Clone or fetch ${job.repo} into /tmp if needed. Confirm these files exist: ${(job.files ?? []).join(", ") || "(see notes)"}. Confirm verify command is still the right gate: ${job.verify}. Do not open a new landing-pad queue. Do not reopen main#1. Write findings only.`,
    },
  ];
  const patch = catalogPatchFor(job);
  if (patch && catalogApplyKind(job.kind)) {
    const after = (patch.afterApply ?? []).length
      ? ` Then: ${patch.afterApply.join("; ")}.`
      : "";
    return [
      {
        role: "prove",
        title: `Prove ${job.id}`,
        prompt: `Run node src/cli.js patches --prove --job ${job.id}. Do not copy PR #6 autofix. Do not invent a new leftover.`,
      },
      {
        role: "prove-after-apply",
        title: `Prove afterApply ${job.id}`,
        prompt: `Run node src/cli.js patches --prove-after-apply --job ${job.id}. Clones --no-hardlinks throwaways. Never write /tmp/siblings. afterApply must fail unpatched and pass patched. Do not copy PR #6 autofix. Do not invent a new leftover.`,
      },
      {
        role: "apply",
        title: `Apply ${job.id}`,
        prompt: `On a write checkout of ${job.repo}: git apply --check /path/to/main/${patch.file} && git apply /path/to/main/${patch.file}.${after} Gate: ${job.verify}. If this token cannot push, relaunch there. Do not inventory the pad again.`,
      },
    ];
  }
  switch (job.kind) {
    case "fix":
    case "implement":
      return [
        ...shared,
        {
          role: "draft",
          title: `Draft ${job.id}`,
          prompt: `Using playbooks/${job.id}.md, write a precise patch plan (files, before/after, collision: ${job.collision}). Scope=${scope}. If scope is relaunch, do not pretend this token can push. No new dispatch board.`,
        },
        {
          role: "test",
          title: `Test ${job.id}`,
          prompt: `Design the smallest test or command that would fail today and pass after ${job.id}. Gate: ${job.verify}. Do not invent Superbrain LIVE.`,
        },
      ];
    case "review":
      if (job.id === "review-main-pr10") {
        return [
          {
            role: "review",
            title: `Review ${job.id}`,
            prompt: `Review https://github.com/yuro1991-afk/main/pull/10. Do not steal head/ears/eyes/vision/bridge. Write findings locally. Do not comment on GitHub unless Yuri asked.`,
          },
          {
            role: "verify",
            title: `CI ${job.id}`,
            prompt: `gh pr view 10 --json mergeable,mergeStateStatus,statusCheckRollup. Base is cursor/agent-dispatch-board-108b, not main.`,
          },
        ];
      }
      return [
        {
          role: "review",
          title: `Review ${job.id}`,
          prompt: `Review the open PRs named on ${job.id}. Prefer #8, #9, or #10. #3 is merged. Skip conflicting #4/#5/#6. Do not steal head/ears/eyes/vision/bridge. Write findings locally. Do not comment on GitHub unless Yuri asked.`,
        },
        {
          role: "verify",
          title: `CI ${job.id}`,
          prompt: `gh pr view 8,9,10 --json mergeable,mergeStateStatus,statusCheckRollup. Skip conflicting #4/#5/#6. #3 is merged.`,
        },
      ];
    case "probe":
      return [
        {
          role: "probe",
          title: `Probe ${job.id}`,
          prompt: `Do not run node src/cli.js probe (that hits Superbrain :45001 / :8791). For ${job.id} follow the job verify only: ${job.verify}. Timeouts and non-2xx stay unreachable. Never write live.`,
        },
      ];
    case "catalog":
      return [
        ...shared,
        {
          role: "draft",
          title: `Catalog ${job.id}`,
          prompt: `List the exact Notion/Origin files to touch for ${job.id}. Do not invent URLs.`,
        },
      ];
    case "origin-slice":
      if (job.id === "gub-superbrain-probe") {
        return [
          {
            role: "refuse",
            title: `Stop Superbrain probe`,
            prompt: `Yuri: no more Superbrain. Do not probe :45001 / :8791. Do not run node src/cli.js probe. Do not origin auth / clone yuri-afk/genesis for this card. Take review-main-pr10 or run node src/cli.js patches --prove then apply a catalog patch on a sibling write checkout.`,
          },
          {
            role: "apply",
            title: `Take a GitHub card instead`,
            prompt: `Run node src/cli.js brief --job review-main-pr10, or node src/cli.js patches --prove --job dronehive-unicode-ci. Apply on a sibling write checkout. Do not inventory the pad again.`,
          },
        ];
      }
      return [
        {
          role: "relaunch",
          title: `Relaunch ${job.id} on Origin`,
          prompt: `Run origin auth status. If logged out: origin auth login --api-key "$CURSOR_API_KEY" then origin repo clone yuri-afk/genesis. Or open https://cursor.com/codebase/yuri-afk/genesis. Read reviews/handoff-${job.id}.md and playbooks/${job.id}.md. Implement the slice there. The handoff packet already exists — do not rewrite it. Do not work dronehive / opensussy / bloom.`,
        },
        {
          role: "reserve",
          title: `Reserve ${job.id}`,
          prompt: `Run node src/cli.js busy --agent "$CURSOR_AGENT_ID" to claim your roster Origin card (or leftover next if you have none). Other idle agents take a different slot from node src/cli.js slots.`,
        },
      ];
    default:
      return assertNeverKind(job.kind);
  }
}

/**
 * @param {import("./ledger.js").Job | null} job
 */
export function buildHelperPacket(job) {
  if (!job) {
    return {
      contract: HELPER_CONTRACT,
      job: null,
      helpers: [],
      rule: "No open job. Do not invent a fifth queue.",
    };
  }
  return {
    contract: HELPER_CONTRACT,
    jobId: job.id,
    scope: jobScope(job),
    helpers: planHelpers(job),
    applyNext: applyNextForJob(job),
    proveAfterApplyCommand: proveAfterApplyForJob(job),
    rule: "Spin every helper as a local Task. Do not wait in inventory.",
  };
}
