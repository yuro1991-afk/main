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
      return [
        {
          role: "review",
          title: `Review ${job.id}`,
          prompt: `Review the open PRs named on ${job.id}. Check mergeability vs main. Note duplicates (especially dronehive patches on #5 vs #6). Write reviews/landing-pad-prs.md. Do not comment on GitHub unless Yuri asked.`,
        },
        {
          role: "verify",
          title: `CI ${job.id}`,
          prompt: `gh pr view 3,4,5,6 --json mergeable,mergeStateStatus,statusCheckRollup. Report which PRs are CONFLICTING after #2 merged.`,
        },
      ];
    case "probe":
      return [
        {
          role: "probe",
          title: `Probe ${job.id}`,
          prompt: `Run node src/cli.js probe with a short timeout. Persist unreachable. Never write live on timeout. ${job.verify}`,
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
    rule: "Spin every helper as a local Task. Do not wait in inventory.",
  };
}
