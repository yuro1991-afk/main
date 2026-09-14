import { assertNeverScope, jobScope } from "./kinds.js";
import { siblingsForJob, describeRole } from "./siblings.js";

export const HANDOFF_CONTRACT = "agent-ops.handoff.v1";
export const RELAUNCH_CONTRACT = "agent-ops.relaunch.v1";

/**
 * @param {import("./ledger.js").Job | null} job
 */
export function packetPathFor(job) {
  return job ? `reviews/handoff-${job.id}.md` : "reviews/NEXT.md";
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
    packet: packetPathFor(job),
    relaunch: relaunchFor(job),
    related,
    doNot: [
      "Do not reopen yuro1991-afk/main#1.",
      "Do not copy PR #6 autofix onto this ops board.",
      "Do not open a fifth landing-pad queue.",
      "Do not work dronehive / opensussy / bloom from this pad.",
    ],
  };
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
      action: "Add a Genesis card. Do not open another landing-pad queue.",
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
    action:
      target.kind === "origin"
        ? "Open https://cursor.com/codebase/yuri-afk/genesis with Origin login. Do not implement on this GitHub pad."
        : target.reason,
    doNot: handoff.doNot,
  };
}

/**
 * @param {import("./ledger.js").Job} job
 */
export function relaunchFor(job) {
  const scope = jobScope(job);
  switch (scope) {
    case "here":
      return {
        kind: "here",
        url: "https://github.com/yuro1991-afk/main",
        reason: "Stay on this checkout. Review PRs #3–#6 or extend PR #3. Do not open another queue.",
      };
    case "relaunch":
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
        reason: "Relaunch against the named repo. This landing-pad token cannot push it.",
      };
    default:
      return assertNeverScope(scope);
  }
}
