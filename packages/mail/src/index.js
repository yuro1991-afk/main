import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { REPO_ROOT } from "../../sibling-kit/src/index.js";

export const id = "mail";
export const title = "Genesis mail";
export const contract = "genesis.mail.v1";
export const kind = "node";
export const summary = "In-repo mail blobs for agent-to-agent notes.";

export function handshake() {
  return { protocol: contract, slice: id, version: 1 };
}

export function health() {
  return { status: "ok", slice: id, contract };
}

function mailDir() {
  const dir = join(REPO_ROOT, ".genesis", "mail");
  mkdirSync(dir, { recursive: true });
  return dir;
}

export function send({ from, to, subject, body }) {
  const idValue = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const blob = { id: idValue, from, to, subject, body, at: new Date().toISOString() };
  writeFileSync(join(mailDir(), `${idValue}.json`), JSON.stringify(blob, null, 2));
  return blob;
}

export function list() {
  return readdirSync(mailDir())
    .filter((name) => name.endsWith(".json"))
    .map((name) => JSON.parse(readFileSync(join(mailDir(), name), "utf8")));
}

export function read(messageId) {
  const path = join(mailDir(), `${messageId}.json`);
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, "utf8"));
}
