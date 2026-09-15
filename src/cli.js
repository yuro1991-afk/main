#!/usr/bin/env node
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import {
  blockJob,
  claimJob,
  completeJob,
  defaultLedgerPath,
  listJobs,
  loadLedger,
  releaseJob,
  saveLedger,
  summarize,
} from "./ledger.js";
import { refuseKnownLanes } from "./probe.js";
import {
  defaultOriginPath,
  loginOriginAuth,
  probeOriginAuth,
  readOriginProbe,
  writeOriginProbe,
} from "./origin.js";
import { defaultRoutePath, routeIntent, writeRoute } from "./routing.js";
import { defaultInventoryPath, writeInventoryTick } from "./tick.js";
import { TAKE_INSTEAD_CATALOG_ID, applyNextForJob, buildBrief, jobForDisplay, proveAfterApplyForJob, takeInsteadFields } from "./brief.js";
import { buildPrompt } from "./prompt.js";
import {
  buildHandoff,
  buildRelaunch,
  packetPathFor,
  relaunchFor,
  writeHandoffPackets,
} from "./handoff.js";
import { checkPlaybooks, writePlaybooks } from "./playbook.js";
import { buildHelperPacket } from "./helpers.js";
import { defaultSiblingsPath, loadSiblings } from "./siblings.js";
import {
  buildAssign,
  buildBusy,
  buildSlots,
  buildSlotsForJob,
  claimBusyJob,
  peekBusyJob,
  defaultDispatchPath,
  defaultLaunchPath,
  defaultRosterPath,
  listSlots,
  loadRoster,
  saveRoster,
  writeDispatch,
  writeLaunchPrompts,
} from "./dispatch.js";
import {
  defaultAgentsPath,
  loadAgents,
  readAgents,
  syncRoster,
} from "./sync.js";
import {
  applyProposedJobs,
  defaultCatalogMinePath,
  defaultEntriesPath,
  loadEntries,
  mineCatalog,
  writeCatalogMine,
} from "./catalog.js";
import {
  buildPatchCatalog,
  defaultPatchesIndexPath,
  defaultSiblingsRoot,
  loadPatchIndex,
  proveAfterApply,
  provePatches,
} from "./patches.js";

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
      const explicitId =
        positionals[0] || (flags.job && flags.job !== "true" ? flags.job : "");
      if (explicitId) {
        const job = resolveJob(ledger, positionals, flags, nowMs, options);
        write(JSON.stringify(job ? [withRelaunch(job)] : [], null, 2));
        return job ? 0 : 1;
      }
      const jobs = listJobs(ledger, jobFilters(flags), nowMs).map((job) =>
        jobForDisplay(job),
      );
      write(JSON.stringify(jobs, null, 2));
      return 0;
    }
    case "next": {
      const ledger = loadLedger(ledgerPath);
      const job = resolveJob(ledger, positionals, flags, nowMs, options);
      write(JSON.stringify(withRelaunch(job), null, 2));
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
      const summary = summarize(ledger, nowMs);
      summary.next = withRelaunch(peekDefaultJob(ledger, flags, nowMs, options));
      const explicitId =
        positionals[0] || (flags.job && flags.job !== "true" ? flags.job : "");
      if (explicitId) {
        summary.job = withRelaunch(resolveJob(ledger, positionals, flags, nowMs, options));
      }
      summary.origin = readOriginProbe(defaultOriginPath(options.root ?? ROOT));
      write(JSON.stringify(summary, null, 2));
      return 0;
    }
    case "probe": {
      write(JSON.stringify(refuseKnownLanes(), null, 2));
      return 1;
    }
    case "origin": {
      const destPath = flags.out
        ? resolve(flags.out)
        : defaultOriginPath(options.root ?? ROOT);
      let report = await probeOriginAuth({
        nowMs,
        execImpl: options.originExecImpl,
      });
      if (flags.login === "true" && !report.loggedIn) {
        report = await loginOriginAuth({
          nowMs,
          execImpl: options.originExecImpl,
          apiKey: options.originApiKey ?? process.env.CURSOR_API_KEY,
        });
      }
      writeOriginProbe(report, destPath);
      write(JSON.stringify(report, null, 2));
      return report.loggedIn ? 0 : 1;
    }
    case "route": {
      const intent = positionals.join(" ") || flags.intent || "";
      const roster = readRosterSafe(
        flags.roster ? resolve(flags.roster) : defaultRosterPath(options.root ?? ROOT),
      );
      const entries = readEntriesSafe(
        flags.entries
          ? resolve(flags.entries)
          : defaultEntriesPath(options.root ?? ROOT),
      );
      const packet = routeIntent(intent, {
        ledger: loadLedger(ledgerPath),
        roster,
        entries,
        nowMs,
        agentId: flags.agent || process.env.CURSOR_AGENT_ID || process.env.AGENT_ID,
      });
      writeRoute(
        packet,
        flags.out ? resolve(flags.out) : defaultRoutePath(options.root ?? ROOT),
      );
      write(JSON.stringify(packet, null, 2));
      return 0;
    }
    case "tick": {
      const ledger = loadLedger(ledgerPath);
      const destPath = flags.out
        ? resolve(flags.out)
        : defaultInventoryPath(options.root ?? ROOT);
      const agents = readAgents(defaultAgentsPath(options.root ?? ROOT));
      const roster = readRosterSafe(
        flags.roster ? resolve(flags.roster) : defaultRosterPath(options.root ?? ROOT),
      );
      const snapshot = writeInventoryTick(ledger, destPath, nowMs, {
        origin: readOriginProbe(defaultOriginPath(options.root ?? ROOT)),
        idleCount: agents ? agents.filter((agent) => agent.status === "IDLE").length : undefined,
        runningCount: agents ? agents.filter((agent) => agent.status === "RUNNING").length : undefined,
        roster,
      });
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
    case "patches": {
      const index = loadPatchIndex(
        flags.index
          ? resolve(flags.index)
          : defaultPatchesIndexPath(options.root ?? ROOT),
      );
      if (flags["prove-after-apply"] === "true") {
        const proof = proveAfterApply(index, {
          repoRoot: options.root ?? ROOT,
          siblingsRoot: flags["siblings-root"]
            ? resolve(flags["siblings-root"])
            : defaultSiblingsRoot(),
          id: positionals[0] || flags.job,
          repo: flags.repo,
          runGit: options.runGit,
        });
        write(JSON.stringify(proof, null, 2));
        return proof.failed === 0 && proof.skipped === 0 ? 0 : 1;
      }
      if (flags.prove === "true") {
        const proof = provePatches(index, {
          repoRoot: options.root ?? ROOT,
          siblingsRoot: flags["siblings-root"]
            ? resolve(flags["siblings-root"])
            : defaultSiblingsRoot(),
          id: positionals[0] || flags.job,
          repo: flags.repo,
          runGit: options.runGit,
        });
        write(JSON.stringify(proof, null, 2));
        return proof.failed === 0 && proof.skipped === 0 ? 0 : 1;
      }
      const catalog = buildPatchCatalog(index, {
        id: positionals[0] || flags.job,
        repo: flags.repo,
      });
      write(JSON.stringify(catalog, null, 2));
      return catalog.count > 0 ? 0 : 1;
    }
    case "handoff": {
      const ledger = loadLedger(ledgerPath);
      const siblings = loadSiblings(
        flags.siblings ? resolve(flags.siblings) : defaultSiblingsPath(options.root ?? ROOT),
      );
      const job = resolveJob(ledger, positionals, flags, nowMs, options);
      write(JSON.stringify(buildHandoff(job ?? null, siblings), null, 2));
      return job ? 0 : 1;
    }
    case "relaunch": {
      const ledger = loadLedger(ledgerPath);
      const siblings = loadSiblings(
        flags.siblings ? resolve(flags.siblings) : defaultSiblingsPath(options.root ?? ROOT),
      );
      const job = resolveJob(ledger, positionals, flags, nowMs, options);
      write(JSON.stringify(buildRelaunch(job ?? null, siblings), null, 2));
      return job ? 0 : 1;
    }
    case "helpers": {
      const ledger = loadLedger(ledgerPath);
      const job = resolveJob(ledger, positionals, flags, nowMs, options);
      write(JSON.stringify(buildHelperPacket(job ?? null), null, 2));
      return job ? 0 : 1;
    }
    case "assign": {
      const ledger = loadLedger(ledgerPath);
      const roster = loadRoster(
        flags.roster ? resolve(flags.roster) : defaultRosterPath(options.root ?? ROOT),
      );
      const packet = buildAssign(ledger, roster, nowMs);
      const dest = flags.out
        ? resolve(flags.out)
        : defaultLaunchPath(options.root ?? ROOT);
      const launches = writeLaunchPrompts(
        [...packet.assignments, ...packet.leftoverLaunches],
        dest,
      );
      const { leftoverLaunches, ...visible } = packet;
      write(JSON.stringify({ ...visible, launches }, null, 2));
      return 0;
    }
    case "catalog": {
      const ledger = loadLedger(ledgerPath);
      const entriesPath = flags.entries
        ? resolve(flags.entries)
        : defaultEntriesPath(options.root ?? ROOT);
      const entries = loadEntries(entriesPath);
      const packet = mineCatalog(entries, ledger, nowMs);
      const added =
        flags.write === "true" ? applyProposedJobs(ledger, packet.proposed) : [];
      if (flags.write === "true") {
        saveLedger(ledgerPath, ledger);
        if (added.length > 0) {
          const addedJobs = ledger.jobs.filter((job) => added.includes(job.id));
          const landingPlaybooks = resolve(ROOT, "playbooks");
          const landingReviews = resolve(ROOT, "reviews");
          const playbookDir = flags.playbooks
            ? resolve(flags.playbooks)
            : resolve(options.root ?? ROOT, "playbooks");
          const packetDir = flags.packets
            ? resolve(flags.packets)
            : resolve(options.root ?? ROOT, "reviews");
          if (playbookDir === landingPlaybooks) {
            packet.playbooks = [];
            packet.playbooksWrote = false;
            packet.doNot = "Do not run writePlaybooks over playbooks/. Prefer brief / proveAfterApplyCommand.";
            packet.prefer = `node src/cli.js brief --job ${TAKE_INSTEAD_CATALOG_ID}`;
          } else {
            packet.playbooks = writePlaybooks(addedJobs, playbookDir);
            packet.playbooksWrote = true;
          }
          if (packetDir === landingReviews) {
            packet.packets = [];
            packet.packetsWrote = false;
          } else {
            packet.packets = writeHandoffPackets(addedJobs, packetDir);
            packet.packetsWrote = true;
          }
        }
      }
      packet.added = added;
      const dest = flags.out
        ? resolve(flags.out)
        : defaultCatalogMinePath(options.root ?? ROOT);
      writeCatalogMine(packet, dest);
      write(JSON.stringify(packet, null, 2));
      return flags.write === "true" || packet.proposed.length === 0 ? 0 : 1;
    }
    case "sync": {
      const ledger = loadLedger(ledgerPath);
      const rosterPath = flags.roster
        ? resolve(flags.roster)
        : defaultRosterPath(options.root ?? ROOT);
      const roster = loadRoster(rosterPath);
      const agents = loadOrReadAgents(flags, options);
      const packet = syncRoster(ledger, roster, agents, nowMs);
      if (flags.write === "true") {
        saveRoster(rosterPath, roster);
        const dest = flags.out
          ? resolve(flags.out)
          : defaultLaunchPath(options.root ?? ROOT);
        const assigned = buildAssign(ledger, roster, nowMs);
        writeLaunchPrompts([...assigned.assignments, ...assigned.leftoverLaunches], dest);
      }
      write(JSON.stringify(packet, null, 2));
      return packet.uncovered.length === 0 ? 0 : 1;
    }
    case "slots": {
      const ledger = loadLedger(ledgerPath);
      const explicitId =
        positionals[0] || (flags.job && flags.job !== "true" ? flags.job : "");
      if (explicitId) {
        const job = resolveJob(ledger, positionals, flags, nowMs, options);
        write(JSON.stringify(buildSlotsForJob(job), null, 2));
        return job ? 0 : 1;
      }
      write(JSON.stringify(buildSlots(ledger, jobFilters(flags), nowMs), null, 2));
      return 0;
    }
    case "busy": {
      const ledger = loadLedger(ledgerPath);
      const siblings = loadSiblings(
        flags.siblings ? resolve(flags.siblings) : defaultSiblingsPath(options.root ?? ROOT),
      );
      const filters = jobFilters(flags);
      const agentId = flags.agent || process.env.CURSOR_AGENT_ID || process.env.AGENT_ID;
      const roster = readRosterSafe(
        flags.roster ? resolve(flags.roster) : defaultRosterPath(options.root ?? ROOT),
      );
      const explicitId =
        positionals[0] || (flags.job && flags.job !== "true" ? flags.job : "");
      const job = explicitId
        ? resolveJob(ledger, positionals, flags, nowMs, options)
        : agentId
          ? claimBusyJob(ledger, agentId, filters, nowMs, roster)
          : peekBusyJob(ledger, undefined, filters, nowMs, roster);
      if (agentId && !explicitId) {
        saveLedger(ledgerPath, ledger);
      }
      const slots = listSlots(ledger, filters, nowMs);
      const snapshot = buildBusy(job, siblings, slots, {
        reserved: Boolean(agentId && job && !explicitId),
      });
      const destPath = flags.out
        ? resolve(flags.out)
        : defaultDispatchPath(options.root ?? ROOT);
      writeDispatch(snapshot, destPath);
      write(JSON.stringify(snapshot, null, 2));
      return job ? 0 : 1;
    }
    case "playbooks": {
      const ledger = loadLedger(ledgerPath);
      const repoPlaybooks = resolve(options.root ?? ROOT, "playbooks");
      const dest = flags.out ? resolve(flags.out) : repoPlaybooks;
      const wantWrite = flags.write === "true";
      const wantCheck = flags.check === "true";
      if (wantWrite && wantCheck) {
        write("playbooks: pass --check or --write, not both");
        return 2;
      }
      if (wantWrite) {
        if (dest === repoPlaybooks) {
          write(
            JSON.stringify(
              {
                command: "playbooks",
                wrote: false,
                error: "playbooks --write refuses the in-repo playbooks/ directory",
                doNot: "Do not run writePlaybooks over playbooks/. Prefer brief / proveAfterApplyCommand.",
                prefer: "node src/cli.js brief --job <id>",
                hint: "pass --out <dir> to write a throwaway copy",
              },
              null,
              2,
            ),
          );
          return 2;
        }
        const explicitId =
          positionals[0] || (flags.job && flags.job !== "true" ? flags.job : "");
        const jobs = explicitId
          ? [resolveJob(ledger, positionals, flags, nowMs, options)].filter(Boolean)
          : listJobs(ledger, { status: "open", ...jobFilters(flags) }, nowMs);
        const written = writePlaybooks(jobs, dest);
        const packetDir = flags.packets ? resolve(flags.packets) : dest;
        const packets = writeHandoffPackets(jobs, packetDir);
        write(
          JSON.stringify(
            { dir: dest, count: written.length, files: written, packets, wrote: true },
            null,
            2,
          ),
        );
        return 0;
      }
      const explicitId =
        positionals[0] || (flags.job && flags.job !== "true" ? flags.job : "");
      const jobs = explicitId
        ? [resolveJob(ledger, positionals, flags, nowMs, options)].filter(Boolean)
        : catalogCheckJobs(ledger, options);
      const report = checkPlaybooks(jobs, dest);
      write(JSON.stringify(report, null, 2));
      return 0;
    }
    case "prompt": {
      const ledger = loadLedger(ledgerPath);
      const job = resolveJob(ledger, positionals, flags, nowMs, options);
      const packet = buildPrompt(job ?? null);
      write(flags.json === "true" ? JSON.stringify(packet, null, 2) : packet.text);
      return job ? 0 : 1;
    }
    case "brief": {
      const ledger = loadLedger(ledgerPath);
      const siblings = loadSiblings(
        flags.siblings ? resolve(flags.siblings) : defaultSiblingsPath(options.root ?? ROOT),
      );
      const job = resolveJob(ledger, positionals, flags, nowMs, options);
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

function withRelaunch(job) {
  if (!job) return null;
  const shown = jobForDisplay(job);
  return {
    ...shown,
    packet: packetPathFor(shown),
    relaunch: relaunchFor(shown),
    applyNext: applyNextForJob(shown),
    proveAfterApplyCommand: proveAfterApplyForJob(shown),
    ...takeInsteadFields(shown),
  };
}

export function jobFilters(flags) {
  return {
    kind: flags.kind,
    repo: flags.repo,
    scope: flags.here === "true" ? "here" : undefined,
    genesis: flags.all === "true" ? undefined : true,
    world: flags.world === "true" ? true : undefined,
  };
}

function requireId(id) {
  if (!id) {
    throw new Error("job id is required");
  }
  return id;
}

function loadOrReadAgents(flags, options) {
  const destPath = flags.agents
    ? resolve(flags.agents)
    : defaultAgentsPath(options.root ?? ROOT);
  return loadAgents(destPath);
}

/**
 * Explicit id wins. With --agent / CURSOR_AGENT_ID, honor the roster
 * card (or leftover next). Peek only — do not lease.
 * @param {import("./ledger.js").Ledger} ledger
 * @param {string[]} positionals
 * @param {Record<string, string>} flags
 * @param {number} nowMs
 * @param {{ root?: string }} options
 */
function catalogCheckJobs(ledger, options) {
  const index = loadPatchIndex(defaultPatchesIndexPath(options.root ?? ROOT));
  return index.patches
    .map((row) => ledger.jobs.find((job) => job.id === row.id))
    .filter(Boolean);
}

function resolveJob(ledger, positionals, flags, nowMs, options) {
  const id = positionals[0] || (flags.job && flags.job !== "true" ? flags.job : "");
  if (id) {
    const job = ledger.jobs.find((item) => item.id === id);
    if (!job) {
      throw new Error(`unknown job: ${id}`);
    }
    return job;
  }
  return peekDefaultJob(ledger, flags, nowMs, options);
}

/**
 * Roster-aware peek. Without --agent this is leftover unused
 * (not a card already recommended to a parked agent).
 * @param {import("./ledger.js").Ledger} ledger
 * @param {Record<string, string>} flags
 * @param {number} nowMs
 * @param {{ root?: string }} options
 */
function peekDefaultJob(ledger, flags, nowMs, options) {
  const agentId = flags.agent || process.env.CURSOR_AGENT_ID || process.env.AGENT_ID;
  const roster = readRosterSafe(
    flags.roster ? resolve(flags.roster) : defaultRosterPath(options.root ?? ROOT),
  );
  return peekBusyJob(ledger, agentId, jobFilters(flags), nowMs, roster);
}

function readRosterSafe(destPath) {
  if (!existsSync(destPath)) return { assignments: [] };
  return loadRoster(destPath);
}

function readEntriesSafe(destPath) {
  if (!existsSync(destPath)) return [];
  return loadEntries(destPath);
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
  list [--job id] [--kind kind] [--repo repo] [--here] [--all] [--world]  # --job is that card + applyNext
  next [id] [--job id] [--kind kind] [--repo repo] [--here] [--all] [--world] [--agent <bcId>]
  slots [--job id] [--here] [--all] [--world]  # --job peeks that card + applyNext
  assign [--out dir]
  sync --agents path.json [--write] [--out dir]
  catalog [--entries path.json] [--write] [--out path]
  busy [id] [--job id] [--agent <bcId>] [--here] [--all] [--world]   # --job peeks; else roster then leftover next
  helpers [id] [--job id] [--agent <bcId>]
  prompt [id] [--job id] [--agent <bcId>] [--json]
  brief [id] [--job id] [--agent <bcId>]
  handoff [id] [--job id] [--agent <bcId>]
  relaunch [id] [--job id] [--agent <bcId>]
  claim <id> --agent <bcId>
  complete <id> --agent <bcId>
  block <id> --agent <bcId> --reason <text>
  release <id> --agent <bcId>
  status [--job id]   # leftover next stays; Superbrain leftover attaches take-instead applyNext / proveAfterApplyCommand; --job attaches that card + applyNext / proveAfterApplyCommand
  probe                  Refuses Superbrain / GOOSE probes (Yuri: no more Superbrain)
  origin [--login] [--out path]
  route <intent> [--agent <bcId>]   # roster card if --agent, else leftover next
  tick [--out path]
  siblings
  patches [jobId] [--job id] [--repo github.com/yuro1991-afk/...] [--prove] [--prove-after-apply] [--siblings-root dir]
  playbooks [--check] [--write] [--job id] [--here] [--out dir]

Yuri: forget Origin for sibling work. patches lists applyable GitHub diffs.
--prove runs vanilla+stacked git apply --check and resets the checkout.
--prove-after-apply clones --no-hardlinks throwaways and never writes siblings.
playbooks defaults to --check: compares First commands, reports missingRequires, never writes. No --job names nextApply dronehive-unicode-ci. Prefer brief --job.
playbooks --write requires --out and refuses the in-repo playbooks/ directory.
catalog --write updates the ledger only; it refuses the in-repo playbooks/ and reviews/ directories.
This token cannot push those repos. Do not copy PR #6 autofix.
Genesis only unless you pass --all / merge the GitHub-first board.
Do not reopen GitHub PR #1. Origin: origin.cursor.com/git/yuri-afk/genesis.`;
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
