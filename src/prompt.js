import { applyNextForJob, catalogPatchFor, catalogPatchSummary, displayCollision, displayNotes, displayVerify, firstCommands, proveAfterApplyForJob, takeInsteadFields } from "./brief.js";
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
  const commands = firstCommands(job)
    .map((line) => `- ${line}`)
    .join("\n");
  const patch = catalogPatchFor(job);
  if (patch) {
    const target = relaunchFor(job);
    const after = (patch.afterApply ?? []).length
      ? `\n- After apply: ${(patch.afterApply ?? []).join("; ")}`
      : "";
    return `# Apply ${job.id}

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://${job.repo}
- Relaunch: ${target.url}
${catalogPatchSummary(patch)}
- Job: \`${job.id}\` — ${job.title}
- Playbook: \`playbooks/${job.id}.md\` (First commands may omit --prove-after-apply; prefer brief)
- Prove: \`node src/cli.js patches --prove --job ${job.id}\`
- Prove afterApply: \`${proveAfterApplyForJob(job)}\` (throwaways; never write /tmp/siblings)${after}

## Notes

${displayNotes(job)}

## Collision

${displayCollision(job)}

## First moves

${commands}

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
  if (job.id === "gub-superbrain-probe") {
    return `# Stop Superbrain probe — ${job.id}

Yuri: no more Superbrain. Pad probes stop.

- Job: \`${job.id}\` — ${job.title}
- Packet: \`${packetPathFor(job)}\`
- Playbook: \`playbooks/${job.id}.md\`
- Priority: ${job.priority}
- Verify: ${displayVerify(job)}

## Notes

${displayNotes(job)}

## Collision

${displayCollision(job)}

## First moves

${commands}

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- Do not mark Superbrain LIVE
- Take review-main-pr10, or run node src/cli.js patches --prove then --prove-after-apply then apply a catalog patch on a sibling write checkout
`;
  }
  const target = relaunchFor(job);
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
- Verify: ${displayVerify(job)}

## Notes

${displayNotes(job)}

## Collision

${displayCollision(job)}

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
    applyNext: applyNextForJob(job),
    proveAfterApplyCommand: proveAfterApplyForJob(job),
    ...takeInsteadFields(job),
    text: renderLaunchPrompt(job),
  };
}
