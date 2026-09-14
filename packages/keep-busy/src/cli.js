import { probeLane, LANES } from "./lanes.js";
import {
  QueueError,
  board,
  claimJob,
  claimNext,
  completeJob,
  defaultCatalogPath,
  heartbeat,
  loadQueue,
  releaseJob,
  saveQueue,
} from "./queue.js";

function usage() {
  return `keep-busy — claim real jobs so idle agents do not collide

Usage:
  node packages/keep-busy/src/cli.js list [--status open|claimed|done|blocked]
  node packages/keep-busy/src/cli.js next --agent <id> [--repo owner/name]
  node packages/keep-busy/src/cli.js claim <job-id> --agent <id>
  node packages/keep-busy/src/cli.js heartbeat <job-id> --agent <id>
  node packages/keep-busy/src/cli.js complete <job-id> --agent <id> --pr <url> | --notes <text>
  node packages/keep-busy/src/cli.js release <job-id> --agent <id>
  node packages/keep-busy/src/cli.js probe

Do not reopen yuro1991-afk/main#1 (Genesis duplicate; user closed it).
Do not claim dronehive — another agent already owns that lane.
Failed lane probes are unreachable, never live.
`;
}

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token.startsWith("--")) {
      const key = token.slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith("--")) {
        args[key] = true;
      } else {
        args[key] = next;
        i += 1;
      }
    } else {
      args._.push(token);
    }
  }
  return args;
}

function printJob(job) {
  const lines = [
    `id:          ${job.id}`,
    `title:       ${job.title}`,
    `repo:        ${job.repo}`,
    `status:      ${job.status}`,
    `priority:    ${job.priority}`,
    `size:        ${job.invasiveness}`,
    `why:         ${job.why}`,
    "acceptance:",
    ...(job.acceptance ?? []).map((item) => `  - ${item}`),
  ];
  if (job.lease) {
    lines.push(`lease:       ${job.lease.agent} until ${job.lease.until}`);
  }
  if (job.blockedReason) {
    lines.push(`blocked:     ${job.blockedReason}`);
  }
  return lines.join("\n");
}

async function main(argv) {
  const args = parseArgs(argv);
  const command = args._[0];
  const catalog = args.catalog ?? defaultCatalogPath();

  if (!command || command === "help" || args.help) {
    process.stdout.write(usage());
    return 0;
  }

  if (command === "probe") {
    const results = [];
    for (const lane of Object.values(LANES)) {
      results.push(await probeLane(lane));
    }
    process.stdout.write(`${JSON.stringify(results, null, 2)}\n`);
    return 0;
  }

  const queue = loadQueue(catalog);

  switch (command) {
    case "list": {
      process.stdout.write(`${JSON.stringify(board(queue), null, 2)}\n`);
      return 0;
    }
    case "next": {
      const job = claimNext(queue, { agent: args.agent, repo: args.repo });
      saveQueue(catalog, queue);
      process.stdout.write(`${printJob(job)}\n`);
      return 0;
    }
    case "claim": {
      const job = claimJob(queue, args._[1], { agent: args.agent });
      saveQueue(catalog, queue);
      process.stdout.write(`${printJob(job)}\n`);
      return 0;
    }
    case "heartbeat": {
      const job = heartbeat(queue, args._[1], { agent: args.agent });
      saveQueue(catalog, queue);
      process.stdout.write(`${printJob(job)}\n`);
      return 0;
    }
    case "complete": {
      const job = completeJob(queue, args._[1], {
        agent: args.agent,
        evidence: { pr: args.pr, notes: args.notes },
      });
      saveQueue(catalog, queue);
      process.stdout.write(`${printJob(job)}\n`);
      return 0;
    }
    case "release": {
      const job = releaseJob(queue, args._[1], { agent: args.agent });
      saveQueue(catalog, queue);
      process.stdout.write(`${printJob(job)}\n`);
      return 0;
    }
    default: {
      const _exhaustive = command;
      process.stderr.write(`unknown command: ${_exhaustive}\n\n${usage()}`);
      return 2;
    }
  }
}

main(process.argv.slice(2)).catch((error) => {
  const code = error instanceof QueueError ? error.code : "error";
  process.stderr.write(`${code}: ${error.message}\n`);
  process.exitCode = 1;
});
