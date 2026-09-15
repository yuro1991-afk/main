import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { assertNeverKind } from "./kinds.js";
import { jobIdForEntry } from "./catalog.js";
import { unusedGenesisCards } from "./sync.js";
import { peekBusyJob } from "./dispatch.js";
import { applyNextFor, defaultPatchesIndexPath, loadPatchIndex, patchForJob, proveAfterApplyCommand } from "./patches.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

export const ROUTE_CONTRACT = "agent-ops.route.v1";

/**
 * Intent → destination map so idle agents stop all attaching to empty main.
 * @typedef {{
 *   intent: string,
 *   destination: string,
 *   kind: string,
 *   notes: string,
 *   jobId?: string | null,
 *   packet?: string | null
 * }} Route
 */

/** @type {readonly Route[]} */
export const ROUTES = Object.freeze([
  {
    intent: "keep agents busy",
    destination: "origin.cursor.com/git/yuri-afk/genesis",
    kind: "origin-slice",
    notes: "Relaunch Origin. Take the next unused card. Do not sit on this pad.",
    jobId: null,
    packet: null,
  },
  {
    intent: "genesis slice / origin kernel",
    destination: "origin.cursor.com/git/yuri-afk/genesis",
    kind: "origin-slice",
    notes: "Source of truth. Do not reopen GitHub PR #1 on yuro1991-afk/main.",
    jobId: null,
    packet: null,
  },
  {
    intent: "auto review / coderabbit",
    destination: "an existing open PR: #8, #9, or #10 — never empty main",
    kind: "review",
    notes:
      "Review #8, #9, or #10. Skip conflicting #4/#5/#6. #3 is merged. Do not merge #7 after #8. Do not steal eyes / vision / bridge on #10.",
    jobId: "review-landing-pad-prs",
    packet: "playbooks/review-landing-pad-prs.md",
  },
  {
    intent: "items for attention",
    destination: "github.com/yuro1991-afk/dronehive#dronehive-unicode-ci",
    kind: "fix",
    notes:
      "First parked apply is dronehive-unicode-ci: apply patches/dronehive-pro-chat-cp1252.patch from main#9. Do not copy PR #5 / PR #6 autofix. Do not sit on leftover Superbrain.",
    jobId: "dronehive-unicode-ci",
    packet: "playbooks/dronehive-unicode-ci.md",
  },
  {
    intent: "dronehive ci / packaging",
    destination: "github.com/yuro1991-afk/dronehive",
    kind: "fix",
    notes:
      "First parked apply is dronehive-unicode-ci: apply patches/dronehive-pro-chat-cp1252.patch from main#9. Do not copy PR #6 autofix. Unstick dronehive#1 python-smoke, then rebase #2.",
    jobId: "dronehive-unicode-ci",
    packet: "playbooks/dronehive-unicode-ci.md",
  },
  {
    intent: "superbrain / lanes",
    destination: "https://github.com/yuro1991-afk/main/pull/10",
    kind: "review",
    notes:
      "Yuri: no more Superbrain. Do not probe :45001 / :8791. Do not run node src/cli.js probe. Take review-main-pr10.",
    jobId: "review-main-pr10",
    packet: "playbooks/review-main-pr10.md",
  },
  {
    intent: "catalog / notion inventory",
    destination: "Origin genesis catalog + Notion Genesis Catalog",
    kind: "catalog",
    notes: "Notion is seeded first; do not invent URLs.",
    jobId: null,
    packet: null,
  },
]);

const STOP = new Set([
  "the",
  "and",
  "for",
  "with",
  "into",
  "from",
  "that",
  "this",
  "only",
  "keep",
  "busy",
  "agents",
  "agent",
  "my",
]);

/**
 * @param {string} repoRoot
 */
export function defaultRoutePath(repoRoot) {
  return join(repoRoot, ".genesis", "last-route.json");
}

/**
 * @param {string} text
 * @returns {string[]}
 */
export function tokenizeIntent(text) {
  return String(text ?? "")
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .filter((token) => token.length > 2 && !STOP.has(token));
}

/**
 * Playbooks are boosted. Skills/tools/resources stay out unless they score on their own.
 * @param {string} text
 * @param {Array<{ entryId: string, name?: string, type?: string, description?: string, category?: string }>} entries
 */
export function scorePlaybooks(text, entries) {
  const tokens = tokenizeIntent(text);
  if (tokens.length === 0 || !Array.isArray(entries)) return [];
  return entries
    .filter((entry) => entry && entry.type === "playbook")
    .map((entry) => {
      const hay = `${entry.entryId} ${entry.name ?? ""} ${entry.description ?? ""} ${entry.category ?? ""}`.toLowerCase();
      const hits = tokens.filter((token) => hay.includes(token)).length;
      return { entry, score: hits + 2 };
    })
    .filter((row) => row.score >= 3 && tokenizeIntent(text).some((token) => `${row.entry.entryId} ${row.entry.name ?? ""}`.toLowerCase().includes(token)))
    .sort((a, b) => b.score - a.score || a.entry.entryId.localeCompare(b.entry.entryId));
}

/**
 * @param {{ ledger?: { jobs: object[] }, roster?: { assignments?: Array<{ jobId: string }> }, nowMs?: number }} context
 */
export function leftoverForRoute(context = {}) {
  if (!context.ledger) return [];
  const used = new Set((context.roster?.assignments ?? []).map((row) => row.jobId));
  return unusedGenesisCards(context.ledger, used, context.nowMs ?? Date.now());
}

/**
 * @param {string} text
 * @param {object} job
 * @param {string} notes
 */
export function routeFromJob(text, job, notes, extras = {}) {
  return {
    contract: ROUTE_CONTRACT,
    intent: text,
    destination: `${job.repo}#${job.id}`,
    kind: job.kind,
    notes,
    jobId: job.id,
    packet: `reviews/handoff-${job.id}.md`,
    applyNext: extras.applyNext,
    proveAfterApplyCommand: extras.proveAfterApplyCommand,
  };
}

/**
 * @param {string} text
 * @param {{
 *   ledger?: { jobs: Array<{ id: string, repo: string, kind: string }> },
 *   roster?: { assignments?: Array<{ bcId: string, jobId: string }> },
 *   entries?: object[],
 *   nowMs?: number,
 *   agentId?: string
 * }} [context]
 * @returns {Route}
 */
export function routeIntent(text, context = {}) {
  const q = (text ?? "").toLowerCase();
  if (includesAny(q, ["review", "coderabbit", "code rabbit"])) {
    const review = context.ledger?.jobs?.find((job) => job.id === "review-landing-pad-prs");
    if (review) {
      return routeFromJob(
        text,
        review,
        "Review open PRs #8, #9, or #10. Skip conflicting #4/#5/#6. #3 is merged. Do not merge #7 after #8. Do not steal eyes / vision / bridge on #10.",
      );
    }
    return withContract(ROUTES[2], text);
  }
  if (includesAny(q, ["superbrain", "lane", "probe", "boss"])) {
    return withContract(ROUTES[5], text);
  }
  const named = namedJobForIntent(text, context.ledger);
  if (named) {
    const patch = catalogPatchRow(named.id);
    return routeFromJob(
      text,
      named,
      patch
        ? catalogRouteNotes(patch)
        : `Take ${named.id}. Do not invent a leftover.`,
      {
        applyNext: patch ? applyNextFor(patch) : undefined,
        proveAfterApplyCommand: patch ? proveAfterApplyCommand(patch.id) : undefined,
      },
    );
  }
  const sibling = routeSiblingPark(text, q, context);
  if (sibling) return sibling;

  const leftover = leftoverForRoute(context);
  const agentJob = jobForAgent(context);
  const scored = scorePlaybooks(text, context.entries ?? []);
  const scoredJob = jobForScored(scored[0], leftover, context.ledger);
  if (scoredJob) {
    return routeFromJob(
      text,
      scoredJob,
      `Catalog playbook ${scored[0].entry.entryId} scored ${scored[0].score}. Relaunch Origin. Do not sit on this pad.`,
    );
  }

  if (includesAny(q, ["keep", "busy", "workload", "dispatch", "idle"])) {
    if (agentJob) {
      return routeFromJob(
        text,
        agentJob,
        "Keep-busy goes to this agent's roster Origin card (or leftover next). Do not sit on this pad.",
      );
    }
    if (leftover[0]) {
      return routeFromJob(
        text,
        leftover[0],
        "Keep-busy goes to the next unused Origin card. Do not sit on this pad.",
      );
    }
    return withContract(ROUTES[0], text);
  }
  if (includesAny(q, ["genesis", "origin", "sibling", "hub"])) {
    return withContract(ROUTES[1], text);
  }
  if (includesAny(q, ["attention", "needs attention", "attend"])) {
    return withContract(ROUTES[3], text);
  }
  if (includesAny(q, ["catalog", "notion", "inventory"])) {
    return withContract(ROUTES[6], text);
  }
  if (agentJob) {
    return routeFromJob(
      text,
      agentJob,
      "Unmatched intent still takes this agent's roster Origin card.",
    );
  }
  if (leftover[0]) {
    return routeFromJob(
      text,
      leftover[0],
      "Unmatched intent still takes the next unused Origin card.",
    );
  }
  return withContract(ROUTES[0], text);
}

/**
 * @param {object} snapshot
 * @param {string} destPath
 */
export function writeRoute(snapshot, destPath) {
  mkdirSync(dirname(destPath), { recursive: true });
  writeFileSync(destPath, `${JSON.stringify(snapshot, null, 2)}\n`);
  return destPath;
}

/**
 * @param {string} kind
 */
export function destinationForKind(kind) {
  switch (kind) {
    case "fix":
      return "the repo named on the job card";
    case "implement":
      return "the scoped files on the job card";
    case "review":
      return "an existing PR — never an empty LICENSE-only tree";
    case "probe":
      return "lane URLs; write unreachable on timeout";
    case "catalog":
      return "Notion + Origin catalog, not a GitHub duplicate";
    case "origin-slice":
      return "origin.cursor.com/git/yuri-afk/genesis";
    default:
      return assertNeverKind(kind);
  }
}

/**
 * @param {string} destPath
 */
export function routeFileExists(destPath) {
  return existsSync(destPath);
}

/**
 * @param {Route} route
 * @param {string} text
 */
function withContract(route, text) {
  return {
    contract: ROUTE_CONTRACT,
    intent: text,
    destination: route.destination,
    kind: route.kind,
    notes: route.notes,
    jobId: route.jobId ?? null,
    packet: route.packet ?? null,
  };
}

/**
 * @param {{ entry: { entryId: string }, score: number } | undefined} scored
 * @param {object[]} leftover
 * @param {{ jobs?: object[] } | undefined} ledger
 */
/**
 * @param {{
 *   ledger?: { jobs: object[] },
 *   roster?: { assignments?: Array<{ bcId: string, jobId: string }> },
 *   nowMs?: number,
 *   agentId?: string
 * }} context
 */
function jobForAgent(context) {
  if (!context.agentId || !context.ledger) return null;
  return peekBusyJob(
    context.ledger,
    context.agentId,
    { genesis: true },
    context.nowMs ?? Date.now(),
    context.roster ?? null,
  );
}

function jobForScored(scored, leftover, ledger) {
  if (!scored) return null;
  const jobId = jobIdForEntry(scored.entry.entryId);
  if (!jobId) return null;
  return leftover.find((job) => job.id === jobId) ?? ledger?.jobs?.find((job) => job.id === jobId) ?? null;
}

/**
 * @param {string} q
 * @param {string[]} needles
 */
function includesAny(q, needles) {
  return needles.some((needle) => q.includes(needle));
}

/**
 * Longest ledger id mentioned in the intent wins (seed vs live leftovers).
 * @param {string} text
 * @param {{ jobs?: Array<{ id?: string }> } | undefined} ledger
 */
function namedJobForIntent(text, ledger) {
  if (!text || !Array.isArray(ledger?.jobs)) return null;
  const q = String(text).toLowerCase();
  let best = null;
  for (const job of ledger.jobs) {
    if (!job?.id) continue;
    if (!q.includes(job.id.toLowerCase())) continue;
    if (!best || job.id.length > best.id.length) best = job;
  }
  return best;
}

/**
 * @param {string} jobId
 */
/** First parked catalog apply for a sibling intent. Named job ids win first. */
const SIBLING_PARKS = Object.freeze([
  {
    needles: ["dronehive", "drone", "unicode", "wheel", "attention", "needs attention"],
    jobId: "dronehive-unicode-ci",
    fallback: 4,
  },
  { needles: ["bloom"], jobId: "bloom-grok-pwa-test-sync" },
  { needles: ["face-swap", "faceswap", "face swap"], jobId: "faceswap-design-honesty" },
  { needles: ["opensussy", "agama"], jobId: "opensussy-sec-review-target" },
  {
    needles: ["ollama-voice", "ollama voice", "voice-access", "voice access"],
    jobId: "ova-readme-linux-honesty",
  },
]);

/**
 * Generic sibling intents must not fall through to leftover Superbrain.
 * @param {string} text
 * @param {string} q
 * @param {{ ledger?: { jobs?: Array<{ id: string, repo: string, kind: string }> } }} context
 */
function routeSiblingPark(text, q, context) {
  const park = SIBLING_PARKS.find((row) => includesAny(q, row.needles));
  if (!park) return null;
  const job = context.ledger?.jobs?.find((item) => item.id === park.jobId);
  const patch = catalogPatchRow(park.jobId);
  if (job && patch) {
    return routeFromJob(text, job, catalogRouteNotes(patch), {
      applyNext: applyNextFor(patch),
      proveAfterApplyCommand: proveAfterApplyCommand(patch.id),
    });
  }
  if (patch) {
    return {
      contract: ROUTE_CONTRACT,
      intent: text,
      destination: `${patch.repo}#${patch.id}`,
      kind: job?.kind ?? "fix",
      notes: catalogRouteNotes(patch),
      jobId: patch.id,
      packet: `reviews/handoff-${patch.id}.md`,
      applyNext: applyNextFor(patch),
      proveAfterApplyCommand: proveAfterApplyCommand(patch.id),
    };
  }
  if (park.fallback !== undefined) return withContract(ROUTES[park.fallback], text);
  return null;
}

function catalogPatchRow(jobId) {
  try {
    return patchForJob(loadPatchIndex(defaultPatchesIndexPath(ROOT)), jobId);
  } catch {
    return null;
  }
}

/**
 * Named catalog route notes must list requires priors before the leftover.
 * @param {{ file: string, requires?: string[] }} patch
 */
function catalogRouteNotes(patch) {
  const priors = Array.isArray(patch.requires)
    ? patch.requires.filter((file) => typeof file === "string" && file.startsWith("patches/"))
    : [];
  const files = [...priors, patch.file].join(" then ");
  return `Yuri: forget Origin for this card. Apply ${files}. Do not invent a leftover. Do not copy PR #6 autofix.`;
}
