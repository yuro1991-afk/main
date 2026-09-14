import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { REPO_ROOT } from "../../sibling-kit/src/index.js";

export const id = "catalog";
export const title = "Genesis catalog";
export const contract = "genesis.catalog.v1";
export const kind = "node";
export const summary =
  "Durable inventory of skills, tools, playbooks, and resources.";

const ENTRIES_PATH = join(REPO_ROOT, "catalog", "entries.jsonl");
const STATS_PATH = join(REPO_ROOT, "catalog", "stats.json");

export function handshake() {
  return { protocol: contract, slice: id, version: 1 };
}

export function health() {
  const ready = existsSync(ENTRIES_PATH) && existsSync(STATS_PATH);
  return {
    status: ready ? "ok" : "error",
    slice: id,
    contract,
    detail: ready ? undefined : "catalog files missing",
  };
}

export function loadEntries() {
  if (!existsSync(ENTRIES_PATH)) return [];
  return readFileSync(ENTRIES_PATH, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

export function stats() {
  if (!existsSync(STATS_PATH)) {
    const entries = loadEntries();
    return { count: entries.length, byType: tally(entries) };
  }
  return JSON.parse(readFileSync(STATS_PATH, "utf8"));
}

export function query(term = "") {
  const needle = term.toLowerCase();
  return loadEntries().filter((entry) => {
    const hay = `${entry.id} ${entry.name} ${entry.type} ${entry.description ?? ""}`.toLowerCase();
    return !needle || hay.includes(needle);
  });
}

function tally(entries) {
  /** @type {Record<string, number>} */
  const byType = {};
  for (const entry of entries) {
    byType[entry.type] = (byType[entry.type] ?? 0) + 1;
  }
  return byType;
}
