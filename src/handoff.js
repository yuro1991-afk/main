import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
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
 * @param {import("./ledger.js").Job} job
 */
export function renderHandoffPacket(job) {
  const target = relaunchFor(job);
  return `# Origin relaunch packet — ${job.id}

This landing-pad token cannot authenticate to Origin. Yuri scoped this
pad to Genesis only. Do not implement here.

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

${job.notes}

## Collision

${job.collision}

## Verify

${job.verify}

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not open another landing-pad queue
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
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
 * Catalog diffs live on main#9. Do not send waking agents to copy PR #6 autofix.
 * @param {string} jobId
 */
function dronehiveRelaunchReason(jobId) {
  switch (jobId) {
    case "dronehive-unicode-ci":
      return "This token cannot push dronehive. Apply patches/dronehive-pro-chat-cp1252.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-ubuntu-smoke":
      return "This token cannot push dronehive. Apply patches/dronehive-ubuntu-smoke.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-portable-paths":
      return "This token cannot push dronehive. Apply patches/dronehive-portable-paths.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-script-host-roots":
      return "This token cannot push dronehive. Apply patches/dronehive-script-host-roots.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-runtime-host-paths":
      return "This token cannot push dronehive. Apply patches/dronehive-portable-paths.patch then patches/dronehive-runtime-host-paths.patch from main#9. Do not copy PR #6 autofix.";
    case "dronehive-config-load-overlay":
      return "This token cannot push dronehive. Apply patches/dronehive-portable-paths.patch then patches/dronehive-config-load-overlay.patch from main#9. Do not copy PR #6 autofix.";
    case "dronehive-icons-manifest-relative":
      return "This token cannot push dronehive. Apply patches/dronehive-icons-manifest-relative.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-app-links-host-paths":
      return "This token cannot push dronehive. Apply patches/dronehive-portable-paths.patch then patches/dronehive-app-links-host-paths.patch from main#9. Do not copy PR #6 autofix.";
    case "dronehive-hive-docstring-honesty":
      return "This token cannot push dronehive. Apply patches/dronehive-hive-docstring-honesty.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-work-order-doc-honesty":
      return "This token cannot push dronehive. Apply patches/dronehive-work-order-doc-honesty.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-seed-work-order-doc-honesty":
      return "This token cannot push dronehive. Apply patches/dronehive-seed-work-order-doc-honesty.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-bench-goal-honesty":
      return "This token cannot push dronehive. Apply patches/dronehive-bench-goal-honesty.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-buzzer-hive-library-honesty":
      return "This token cannot push dronehive. Apply patches/dronehive-buzzer-hive-library-honesty.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-seed-buzzer-hive-library-honesty":
      return "This token cannot push dronehive. Apply patches/dronehive-seed-buzzer-hive-library-honesty.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-work-order-fabric-root":
      return "This token cannot push dronehive. Apply patches/dronehive-work-order-fabric-root.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-seed-work-order-fabric-root":
      return "This token cannot push dronehive. Apply patches/dronehive-seed-work-order-fabric-root.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-future-seer-jane-honesty":
      return "This token cannot push dronehive. Apply patches/dronehive-future-seer-jane-honesty.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-multi-hosts-exe-honesty":
      return "This token cannot push dronehive. Apply patches/dronehive-multi-hosts-exe-honesty.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-work-order-live-registry":
      return "This token cannot push dronehive. Apply patches/dronehive-work-order-live-registry.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-seed-work-order-live-registry":
      return "This token cannot push dronehive. Apply patches/dronehive-seed-work-order-live-registry.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-work-order-school-root":
      return "This token cannot push dronehive. Apply patches/dronehive-work-order-school-root.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-seed-work-order-school-root":
      return "This token cannot push dronehive. Apply patches/dronehive-seed-work-order-school-root.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-work-order-reference-db":
      return "This token cannot push dronehive. Apply patches/dronehive-work-order-reference-db.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-seed-work-order-reference-db":
      return "This token cannot push dronehive. Apply patches/dronehive-seed-work-order-reference-db.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-work-order-knowledge-expand":
      return "This token cannot push dronehive. Apply patches/dronehive-work-order-knowledge-expand.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-seed-work-order-knowledge-expand":
      return "This token cannot push dronehive. Apply patches/dronehive-seed-work-order-knowledge-expand.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-work-order-curriculum-root":
      return "This token cannot push dronehive. Apply patches/dronehive-work-order-curriculum-root.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-seed-work-order-curriculum-root":
      return "This token cannot push dronehive. Apply patches/dronehive-seed-work-order-curriculum-root.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-multi-hosts-hardwire":
      return "This token cannot push dronehive. Apply patches/dronehive-multi-hosts-hardwire.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-super-llms-hardwire":
      return "This token cannot push dronehive. Apply patches/dronehive-super-llms-hardwire.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-work-order-open-tasks":
      return "This token cannot push dronehive. Apply patches/dronehive-work-order-open-tasks.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-seed-work-order-open-tasks":
      return "This token cannot push dronehive. Apply patches/dronehive-seed-work-order-open-tasks.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-work-order-codex-paths":
      return "This token cannot push dronehive. Apply patches/dronehive-work-order-codex-paths.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-seed-work-order-codex-paths":
      return "This token cannot push dronehive. Apply patches/dronehive-seed-work-order-codex-paths.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-work-order-law-truth":
      return "This token cannot push dronehive. Apply patches/dronehive-work-order-law-truth.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-seed-work-order-law-truth":
      return "This token cannot push dronehive. Apply patches/dronehive-seed-work-order-law-truth.patch from main#9 (`git apply --check`). Do not copy PR #6 autofix.";
    case "dronehive-rebase-packaging":
      return "This token cannot push dronehive. Rebase packaging stays blocked until dronehive#1 python-smoke is green. Do not copy PR #6 autofix.";
    default:
      return "This token cannot push dronehive. Apply the matching catalog patch from main#9 (`node src/cli.js patches --job <id>`). Do not copy PR #6 autofix.";
  }
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
          reason: dronehiveRelaunchReason(job.id),
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
