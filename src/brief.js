import { assertNeverKind, describeKind } from "./kinds.js";
import { destinationForKind } from "./routing.js";
import { describeRole, siblingsForJob } from "./siblings.js";

export const BRIEF_CONTRACT = "agent-ops.brief.v1";

/**
 * @param {import("./ledger.js").Job} job
 * @param {{ prs: Array<{ owns?: string[], number: number, url: string, role: string, title: string, branch: string }> }} siblings
 */
export function buildBrief(job, siblings) {
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
    firstCommands: firstCommands(job),
    hardRules: hardRules(),
  };
}

/**
 * @param {import("./ledger.js").Job} job
 * @returns {string[]}
 */
export function firstCommands(job) {
  switch (job.kind) {
    case "fix":
    case "implement":
      return [
        `git clone https://${job.repo}.git work && cd work`,
        `git checkout -b cursor/${job.id}-from-ops`,
        `edit: ${(job.files ?? []).join(", ") || "(see notes)"}`,
        job.verify,
      ];
    case "review":
      return [
        "Do not invent a new tree on empty main.",
        "Review an existing open PR listed in ledger/siblings.json.",
        job.verify,
      ];
    case "probe":
      return [
        "node src/cli.js probe",
        "Timeouts and non-2xx stay unreachable. Never write live.",
        job.verify,
      ];
    case "catalog":
      return [
        "Work Notion + Origin catalog. Do not invent URLs.",
        job.verify,
      ];
    case "origin-slice":
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
