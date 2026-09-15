import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export const ARENA_CONTRACT = "agent-ops.arena.v1";
export const LIVE_ARENA_ROOT = "D:\\Wilderness\\Genesis";
export const LIVE_ARENA_RELATIVE_ROOT = ".";
export const DEAD_ARENA_ROOTS = Object.freeze([
  "C:\\Workspace\\.agentsroom\\Genesis",
  "C:\\Workspace\\.agentsroom",
  "C:\\Workspace\\python-arena",
]);

/** @typedef {"live" | "dead" | "unknown"} ArenaKind */

export const ARENA_KINDS = Object.freeze(["live", "dead", "unknown"]);

/**
 * @param {string} kind
 * @returns {kind is ArenaKind}
 */
export function isArenaKind(kind) {
  return ARENA_KINDS.includes(kind);
}

/**
 * @param {string} kind
 * @returns {never}
 */
export function assertNeverArenaKind(kind) {
  throw new Error(`unhandled arena kind: ${kind}`);
}

/**
 * @param {string} kind
 */
export function describeArenaKind(kind) {
  switch (kind) {
    case "live":
      return "Boss-metal checkout at D:\\Wilderness\\Genesis";
    case "dead":
      return "Cutover leftover. Do not use agentsroom or C:\\Workspace\\python-arena.";
    case "unknown":
      return "Not the live arena. Use D:\\Wilderness\\Genesis or a relative root inside it.";
    default:
      return assertNeverArenaKind(kind);
  }
}

/**
 * @param {string} repoRoot
 */
export function defaultArenaPath(repoRoot) {
  return join(repoRoot, "ledger", "arena.json");
}

/**
 * Slash-normalize a host path so Windows and POSIX spellings compare.
 * @param {unknown} value
 */
export function normalizeArenaPath(value) {
  return String(value ?? "")
    .trim()
    .replace(/\//g, "\\")
    .replace(/\\+$/g, "");
}

/**
 * @param {string} path
 * @param {string} root
 */
function pathEqualsOrUnder(path, root) {
  const normalized = normalizeArenaPath(path).toLowerCase();
  const prefix = normalizeArenaPath(root).toLowerCase();
  if (!normalized || !prefix) return false;
  return normalized === prefix || normalized.startsWith(`${prefix}\\`);
}

/**
 * @param {unknown} value
 * @returns {ArenaKind}
 */
export function classifyArenaPath(value) {
  const path = normalizeArenaPath(value);
  if (!path) return "unknown";
  if (pathEqualsOrUnder(path, LIVE_ARENA_ROOT)) return "live";
  if (DEAD_ARENA_ROOTS.some((root) => pathEqualsOrUnder(path, root))) return "dead";
  const lower = path.toLowerCase();
  if (lower.includes(".agentsroom") || /(^|\\)agentsroom(\\|$)/i.test(path)) {
    return "dead";
  }
  return "unknown";
}

/**
 * Live host root, or `.` when the caller is already inside the arena.
 * Rejects dead cutover env overrides.
 * @param {{
 *   relative?: boolean,
 *   env?: NodeJS.ProcessEnv
 * }} [options]
 */
export function resolveArenaRoot(options = {}) {
  const env = options.env ?? process.env;
  const fromEnv = env.GENESIS_ARENA_ROOT;
  if (fromEnv) {
    if (classifyArenaPath(fromEnv) === "dead") {
      throw new Error(`GENESIS_ARENA_ROOT is a dead cutover path: ${fromEnv}`);
    }
    return fromEnv;
  }
  if (options.relative) return LIVE_ARENA_RELATIVE_ROOT;
  return LIVE_ARENA_ROOT;
}

/**
 * Built-in pointer set when ledger/arena.json is absent (temp status roots).
 */
export function defaultArenaLedger() {
  return {
    contract: ARENA_CONTRACT,
    note: "One live Boss-metal arena. Do not invent a second. This GitHub pad is ops only.",
    live: {
      host: "boss-metal",
      root: LIVE_ARENA_ROOT,
      relativeRoot: LIVE_ARENA_RELATIVE_ROOT,
      kind: "boss-checkout",
    },
    dead: DEAD_ARENA_ROOTS.map((root) => ({
      root,
      reason: "dead cutover leftover; not the live arena",
    })),
    sourceOfTruth: "origin.cursor.com/git/yuri-afk/genesis",
  };
}

/**
 * @param {string} arenaPath
 */
export function loadArena(arenaPath) {
  if (!existsSync(arenaPath)) {
    return defaultArenaLedger();
  }
  const parsed = JSON.parse(readFileSync(arenaPath, "utf8"));
  if (!parsed || parsed.contract !== ARENA_CONTRACT) {
    throw new Error("arena must be { contract: agent-ops.arena.v1 }");
  }
  if (!parsed.live || classifyArenaPath(parsed.live.root) !== "live") {
    throw new Error("arena.live.root must be the Boss Wilderness checkout");
  }
  if (!Array.isArray(parsed.dead) || parsed.dead.length === 0) {
    throw new Error("arena.dead must list the cutover leftovers");
  }
  for (const entry of parsed.dead) {
    if (classifyArenaPath(entry.root) !== "dead") {
      throw new Error(`arena.dead entry is not a cutover path: ${entry.root}`);
    }
  }
  return parsed;
}

/**
 * @param {ReturnType<typeof loadArena>} arena
 */
export function summarizeArena(arena) {
  return {
    contract: ARENA_CONTRACT,
    live: arena.live.root,
    relativeRoot: arena.live.relativeRoot ?? LIVE_ARENA_RELATIVE_ROOT,
    dead: arena.dead.map((entry) => entry.root),
    note: arena.note,
    sourceOfTruth: arena.sourceOfTruth,
  };
}
