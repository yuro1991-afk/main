import { mkdirSync, appendFileSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { REPO_ROOT } from "../../sibling-kit/src/index.js";

export const id = "data-logger";
export const title = "Genesis data logger";
export const contract = "genesis.data-logger.v1";
export const kind = "node";
export const summary = "Append-only event log.";

export function handshake() {
  return { protocol: contract, slice: id, version: 1 };
}

export function health() {
  return { status: "ok", slice: id, contract };
}

function logPath() {
  const dir = join(REPO_ROOT, ".genesis", "log");
  mkdirSync(dir, { recursive: true });
  return join(dir, "events.jsonl");
}

export function append(event) {
  const record = { ...event, at: new Date().toISOString() };
  appendFileSync(logPath(), `${JSON.stringify(record)}\n`);
  return record;
}

export function list() {
  const path = logPath();
  if (!existsSync(path)) return [];
  return readFileSync(path, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}
