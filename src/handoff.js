import { siblingsForJob, describeRole } from "./siblings.js";

export const HANDOFF_CONTRACT = "agent-ops.handoff.v1";

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
  const related = siblingsForJob(siblings, job.id).map((pr) => ({
    number: pr.number,
    url: pr.url,
    role: pr.role,
    title: pr.title,
    meaning: describeRole(pr.role),
  }));
  return {
    contract: HANDOFF_CONTRACT,
    jobId: job.id,
    relaunch: relaunchFor(job),
    related,
    doNot: [
      "Do not reopen yuro1991-afk/main#1.",
      "Do not copy PR #6 autofix onto this ops board.",
      "Do not open a fifth landing-pad queue.",
    ],
  };
}

/**
 * @param {import("./ledger.js").Job} job
 */
export function relaunchFor(job) {
  if (job.repo.startsWith("origin.cursor.com")) {
    return {
      kind: "origin",
      url: "https://cursor.com/codebase/yuri-afk/genesis",
      reason: "This cloud environment cannot authenticate to Origin.",
    };
  }
  if (job.repo.includes("dronehive")) {
    return {
      kind: "github",
      url: "https://github.com/yuro1991-afk/dronehive",
      reason: "This token cannot push dronehive. Apply PR #6: npm run autofix -- apply <checkout>.",
    };
  }
  return {
    kind: "github",
    url: `https://${job.repo}`,
    reason: "Work on the named repo. This landing pad only holds the card.",
  };
}
