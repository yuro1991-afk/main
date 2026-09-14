import { query } from "../../catalog/src/index.js";
import { probe } from "../../local-repo/src/index.js";
import { append } from "../../data-logger/src/index.js";

export const id = "gub";
export const title = "GUB automation engine";
export const contract = "genesis.gub.v1";
export const kind = "node";
export const summary = "Inventory tick, route intent, run playbook, superbrain probe.";

export function handshake() {
  return { protocol: contract, slice: id, version: 1 };
}

export function health() {
  return { status: "ok", slice: id, contract };
}

export function routeIntent(intent) {
  const matches = query(intent);
  const playbook = matches.find((entry) => entry.type === "playbook") ?? matches[0] ?? null;
  const decision = {
    intent,
    playbook: playbook?.id ?? null,
    candidates: matches.slice(0, 5).map((entry) => entry.id),
  };
  append({ type: "gub.route", ...decision });
  return decision;
}

export async function probeSuperbrain() {
  const result = await probe();
  append({ type: "gub.superbrain", lanes: result.lanes });
  return result.lanes.bossSuperbrain;
}

export function runPlaybook(entryId) {
  const [playbook] = query(entryId);
  const run = {
    playbook: playbook?.id ?? entryId,
    status: playbook ? "compiled" : "missing",
  };
  append({ type: "gub.playbook", ...run });
  return run;
}
