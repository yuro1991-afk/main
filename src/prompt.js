import { applyNextForJob, catalogPatchFor, catalogPatchSummary, displayCollision, displayNotes, firstCommands, proveAfterApplyForJob } from "./brief.js";
import { packetPathFor, relaunchFor } from "./handoff.js";

export const PROMPT_CONTRACT = "agent-ops.prompt.v1";
export const ORIGIN_UI = "https://cursor.com/codebase/yuri-afk/genesis";

/**
 * Paste-ready brief for spinning an Origin cloud agent.
 * @param {import("./ledger.js").Job | null} job
 */
export function renderLaunchPrompt(job) {
  if (!job) {
    return `# No open Genesis card

Do not open another landing-pad queue on yuro1991-afk/main.
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
- Verify: ${job.verify}

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
  return `# Origin launch — ${job.id}

Work on Cursor Origin. This GitHub repo is the ops pad only.

- UI: ${target.url}
- Git: \`${job.repo}\`
- Job: \`${job.id}\` — ${job.title}
- Packet: \`${packetPathFor(job)}\`
- Playbook: \`playbooks/${job.id}.md\`
- Priority: ${job.priority}
- Verify: ${job.verify}

## Notes

${displayNotes(job)}

## Collision

${displayCollision(job)}

## First moves

${commands}

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
- Do not open another landing-pad queue
- Do not mark Superbrain LIVE without a successful probe
- This pad token cannot push Origin — implement there
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
    text: renderLaunchPrompt(job),
  };
}
