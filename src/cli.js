#!/usr/bin/env node
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import {
  blockJob,
  claimJob,
  completeJob,
  defaultLedgerPath,
  loadLedger,
  nextJob,
  releaseJob,
  saveLedger,
  summarize,
} from "./ledger.js";
import { probeKnownLanes } from "./probe.js";
import { routeIntent } from "./routing.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

export function parseArgs(argv) {
  const [command, ...rest] = argv;
  const flags = {};
  const positionals = [];
  for (let i = 0; i < rest.length; i += 1) {
    const token = rest[i];
    if (token.startsWith("--")) {
      const key = token.slice(2);
      const value = rest[i + 1] && !rest[i + 1].startsWith("--") ? rest[++i] : "true";
      flags[key] = value;
    } else {
      positionals.push(token);
    }
  }
  return { command: command ?? "status", positionals, flags };
}

export async function runCli(argv, options = {}) {
  const { command, positionals, flags } = parseArgs(argv);
  const ledgerPath = flags.ledger
    ? resolve(flags.ledger)
    : defaultLedgerPath(options.root ?? ROOT);
  const nowMs = options.nowMs ?? Date.now();
  const write = options.write ?? ((value) => process.stdout.write(`${value}\n`));

  switch (command) {
    case "list": {
      const ledger = loadLedger(ledgerPath);
      write(JSON.stringify(ledger.jobs, null, 2));
      return 0;
    }
    case "next": {
      const ledger = loadLedger(ledgerPath);
      const job = nextJob(
        ledger,
        { kind: flags.kind, repo: flags.repo },
        nowMs,
      );
      write(JSON.stringify(job, null, 2));
      return job ? 0 : 1;
    }
    case "claim": {
      const ledger = loadLedger(ledgerPath);
      const job = claimJob(ledger, requireId(positionals[0]), requireAgent(flags), nowMs);
      saveLedger(ledgerPath, ledger);
      write(JSON.stringify(job, null, 2));
      return 0;
    }
    case "complete": {
      const ledger = loadLedger(ledgerPath);
      const job = completeJob(ledger, requireId(positionals[0]), requireAgent(flags), nowMs);
      saveLedger(ledgerPath, ledger);
      write(JSON.stringify(job, null, 2));
      return 0;
    }
    case "block": {
      const ledger = loadLedger(ledgerPath);
      const job = blockJob(
        ledger,
        requireId(positionals[0]),
        requireAgent(flags),
        flags.reason ?? positionals.slice(1).join(" "),
        nowMs,
      );
      saveLedger(ledgerPath, ledger);
      write(JSON.stringify(job, null, 2));
      return 0;
    }
    case "release": {
      const ledger = loadLedger(ledgerPath);
      const job = releaseJob(ledger, requireId(positionals[0]), requireAgent(flags), nowMs);
      saveLedger(ledgerPath, ledger);
      write(JSON.stringify(job, null, 2));
      return 0;
    }
    case "status": {
      const ledger = loadLedger(ledgerPath);
      write(JSON.stringify(summarize(ledger, nowMs), null, 2));
      return 0;
    }
    case "probe": {
      const report = await probeKnownLanes({
        fetchImpl: options.fetchImpl,
        timeoutMs: flags.timeout ? Number(flags.timeout) : undefined,
        nowMs,
      });
      write(JSON.stringify(report, null, 2));
      return 0;
    }
    case "route": {
      const intent = positionals.join(" ") || flags.intent || "";
      write(JSON.stringify(routeIntent(intent), null, 2));
      return 0;
    }
    case "help":
    case "--help":
    case "-h": {
      write(helpText());
      return 0;
    }
    default:
      write(`unknown command: ${command}\n${helpText()}`);
      return 2;
  }
}

function requireId(id) {
  if (!id) {
    throw new Error("job id is required");
  }
  return id;
}

function requireAgent(flags) {
  const agentId = flags.agent || process.env.CURSOR_AGENT_ID || process.env.AGENT_ID;
  if (!agentId) {
    throw new Error("pass --agent <bcId> (or set CURSOR_AGENT_ID)");
  }
  return agentId;
}

function helpText() {
  return `agent-ops — claim work so agents stay busy

Commands:
  list
  next [--kind kind] [--repo repo]
  claim <id> --agent <bcId>
  complete <id> --agent <bcId>
  block <id> --agent <bcId> --reason <text>
  release <id> --agent <bcId>
  status
  probe
  route <intent>

Do not reopen GitHub PR #1. Genesis lives on Cursor Origin.`;
}

const isDirect = process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1]);
if (isDirect) {
  runCli(process.argv.slice(2)).then(
    (code) => {
      process.exitCode = code;
    },
    (error) => {
      process.stderr.write(`${error instanceof Error ? error.message : error}\n`);
      process.exitCode = 1;
    },
  );
}
