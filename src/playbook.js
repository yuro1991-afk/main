import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { describeKind, jobScope } from "./kinds.js";
import { firstCommands } from "./brief.js";
import { relaunchFor } from "./handoff.js";

/**
 * @param {import("./ledger.js").Job} job
 */
export function playbookPath(job, dir) {
  return join(dir, `${job.id}.md`);
}

/**
 * @param {import("./ledger.js").Job} job
 */
export function renderPlaybook(job) {
  const target = relaunchFor(job);
  const commands = firstCommands(job)
    .map((line) => `- ${line}`)
    .join("\n");
  return `# ${job.title}

- id: \`${job.id}\`
- kind: ${job.kind} (${describeKind(job.kind)})
- scope: ${jobScope(job)}
- repo: ${job.repo}
- relaunch: ${target.url}
- why: ${target.reason}

## Notes

${job.notes}

## Collision

${job.collision}

## First commands

${commands}

## Verify

${job.verify}

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
`;
}

/**
 * @param {import("./ledger.js").Job[]} jobs
 * @param {string} dir
 */
export function writePlaybooks(jobs, dir) {
  mkdirSync(dir, { recursive: true });
  return jobs.map((job) => {
    const dest = playbookPath(job, dir);
    writeFileSync(dest, renderPlaybook(job));
    return dest;
  });
}
