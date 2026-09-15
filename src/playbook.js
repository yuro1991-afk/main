import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { describeKind, jobScope } from "./kinds.js";
import { catalogPatchFor, catalogRequires, displayCollision, displayNotes, firstCommands } from "./brief.js";
import { relaunchFor } from "./handoff.js";

export const PLAYBOOK_CHECK_CONTRACT = "agent-ops.playbooks.check.v1";

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

${displayNotes(job)}

## Collision

${displayCollision(job)}

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

/**
 * First-command bullets under ## First commands.
 * @param {string} markdown
 * @returns {string[]}
 */
export function playbookFirstCommands(markdown) {
  const start = markdown.indexOf("## First commands");
  if (start < 0) return [];
  const rest = markdown.slice(start);
  const end = rest.indexOf("\n## ", 1);
  const section = end === -1 ? rest : rest.slice(0, end);
  return section
    .split("\n")
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2));
}

/**
 * Compare on-disk First commands to live firstCommands. Does not write.
 * @param {import("./ledger.js").Job} job
 * @param {string} markdown
 */
/**
 * Catalog priors the on-disk playbook must name. Empty when the card
 * has no requires or the markdown already lists every prior file.
 * @param {import("./ledger.js").Job} job
 * @param {string} [markdown]
 */
function playbookRequireFields(job, markdown = "") {
  const requires = catalogRequires(catalogPatchFor(job));
  return {
    requires,
    missingRequires: requires.filter((file) => !markdown.includes(file)),
  };
}

export function checkPlaybook(job, markdown) {
  const expected = firstCommands(job);
  const actual = playbookFirstCommands(markdown);
  const missing = expected.filter((line) => !actual.includes(line));
  const req = playbookRequireFields(job, markdown);
  return {
    id: job.id,
    stale: missing.length > 0 || req.missingRequires.length > 0,
    missing,
    ...req,
    prefer: `node src/cli.js brief --job ${job.id}`,
  };
}

/**
 * Read-only drift report. Never writes playbooks/.
 * @param {import("./ledger.js").Job[]} jobs
 * @param {string} dir
 */
export function checkPlaybooks(jobs, dir) {
  const results = jobs.map((job) => {
    const dest = playbookPath(job, dir);
    if (!existsSync(dest)) {
      return {
        id: job.id,
        stale: true,
        status: "missing-playbook",
        missing: firstCommands(job),
        ...playbookRequireFields(job),
        prefer: `node src/cli.js brief --job ${job.id}`,
      };
    }
    return checkPlaybook(job, readFileSync(dest, "utf8"));
  });
  const stale = results.filter((row) => row.stale).length;
  return {
    contract: PLAYBOOK_CHECK_CONTRACT,
    command: "playbooks",
    check: true,
    wrote: false,
    doNot: "Do not run writePlaybooks over playbooks/. Prefer brief / proveAfterApplyCommand.",
    count: results.length,
    ok: results.length - stale,
    stale,
    results,
  };
}
