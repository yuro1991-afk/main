#!/usr/bin/env node
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import {
  blockJob,
  claimJob,
  completeJob,
  defaultLedgerPath,
  listJobs,
  loadLedger,
  nextJob,
  releaseJob,
  saveLedger,
  summarize,
} from "./ledger.js";
import { defaultSuperbrainPath, probeKnownLanes, writeLaneProbe } from "./probe.js";
import { routeIntent } from "./routing.js";
import { defaultInventoryPath, writeInventoryTick } from "./tick.js";
import { buildBrief } from "./brief.js";
import { buildHandoff } from "./handoff.js";
import { writePlaybooks } from "./playbook.js";
import { defaultSiblingsPath, loadSiblings } from "./siblings.js";

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
      const job = nextJob(ledger, jobFilters(flags), nowMs);
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
      const destPath = flags.out
        ? resolve(flags.out)
        : defaultSuperbrainPath(options.root ?? ROOT);
      writeLaneProbe(report, destPath);
      write(JSON.stringify(report, null, 2));
      return 0;
    }
    case "route": {
      const intent = positionals.join(" ") || flags.intent || "";
      write(JSON.stringify(routeIntent(intent), null, 2));
      return 0;
    }
    case "tick": {
      const ledger = loadLedger(ledgerPath);
      const destPath = flags.out
        ? resolve(flags.out)
        : defaultInventoryPath(options.root ?? ROOT);
      const snapshot = writeInventoryTick(ledger, destPath, nowMs);
      write(JSON.stringify(snapshot, null, 2));
      return 0;
    }
    case "siblings": {
      const siblings = loadSiblings(
        flags.siblings ? resolve(flags.siblings) : defaultSiblingsPath(options.root ?? ROOT),
      );
      write(JSON.stringify(siblings, null, 2));
      return 0;
    }
    case "handoff": {
      const ledger = loadLedger(ledgerPath);
      const siblings = loadSiblings(
        flags.siblings ? resolve(flags.siblings) : defaultSiblingsPath(options.root ?? ROOT),
      );
      const job = positionals[0]
        ? ledger.jobs.find((item) => item.id === positionals[0])
        : nextJob(ledger, jobFilters(flags), nowMs);
      if (positionals[0] && !job) {
        throw new Error(`unknown job: ${positionals[0]}`);
      }
      write(JSON.stringify(buildHandoff(job ?? null, siblings), null, 2));
      return job ? 0 : 1;
    }
    case "playbooks": {
      const ledger = loadLedger(ledgerPath);
      const dest = flags.out
        ? resolve(flags.out)
        : resolve(options.root ?? ROOT, "playbooks");
      const jobs = listJobs(ledger, { status: "open", ...jobFilters(flags) }, nowMs);
      const written = writePlaybooks(jobs, dest);
      write(JSON.stringify({ dir: dest, count: written.length, files: written }, null, 2));
      return 0;
    }
    case "brief": {
      const ledger = loadLedger(ledgerPath);
      const siblings = loadSiblings(
        flags.siblings ? resolve(flags.siblings) : defaultSiblingsPath(options.root ?? ROOT),
      );
      const job = positionals[0]
        ? ledger.jobs.find((item) => item.id === positionals[0])
        : nextJob(ledger, jobFilters(flags), nowMs);
      if (positionals[0] && !job) {
        throw new Error(`unknown job: ${positionals[0]}`);
      }
      write(JSON.stringify(buildBrief(job ?? null, siblings), null, 2));
      return job ? 0 : 1;
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

export function jobFilters(flags) {
  return {
    kind: flags.kind,
    repo: flags.repo,
    scope: flags.here === "true" ? "here" : undefined,
  };
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
  next [--kind kind] [--repo repo] [--here]
  claim <id> --agent <bcId>
  complete <id> --agent <bcId>
  block <id> --agent <bcId> --reason <text>
  release <id> --agent <bcId>
  status
  probe
  route <intent>
  tick [--out path]
  siblings
  brief [id]
  handoff [id]
  playbooks [--here] [--out dir]

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
