import { firstCommands } from "./brief.js";
import { isGenesisJob } from "./kinds.js";
import { packetPathFor, relaunchFor } from "./handoff.js";

export const PROMPT_CONTRACT = "agent-ops.prompt.v1";
export const ORIGIN_UI = "https://cursor.com/codebase/yuri-afk/genesis";

/**
 * Paste-ready brief for a GitHub sibling (default) or Origin card.
 * @param {import("./ledger.js").Job | null} job
 */
export function renderLaunchPrompt(job) {
  if (!job) {
    return `# No open GitHub card

Review an existing PR. Do not invent Origin work.
Do not reopen https://github.com/yuro1991-afk/main/pull/1.
`;
  }
  const target = relaunchFor(job);
  const commands = firstCommands(job)
    .map((line) => `- ${line}`)
    .join("\n");
  const origin = isGenesisJob(job);
  const heading = origin ? `# Origin launch — ${job.id}` : `# GitHub launch — ${job.id}`;
  const where = origin
    ? "Work on Cursor Origin only if `--origin` was requested."
    : "Work on the named GitHub repo. Forget Origin.";
  return `${heading}

${where}

- UI: ${target.url}
- Git: \`${job.repo}\`
- Job: \`${job.id}\` — ${job.title}
- Packet: \`${packetPathFor(job)}\`
- Playbook: \`playbooks/${job.id}.md\`
- Priority: ${job.priority}
- Verify: ${job.verify}

## Notes

${job.notes}

## Collision

${job.collision}

## First moves

${commands}

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not open another landing-pad queue
- Do not mark Superbrain LIVE without a successful probe
- This pad token cannot push sibling GitHub repos — relaunch there or apply a verified patch
`;
}

/**
 * @param {import("./ledger.js").Job | null} job
 */
export function buildPrompt(job) {
  return {
    contract: PROMPT_CONTRACT,
    jobId: job ? job.id : null,
    url: job ? relaunchFor(job).url : ORIGIN_UI,
    packet: packetPathFor(job),
    text: renderLaunchPrompt(job),
  };
}
