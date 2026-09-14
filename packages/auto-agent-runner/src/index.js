export const id = "auto-agent-runner";
export const title = "Genesis auto agent runner";
export const contract = "genesis.auto-agent-runner.v1";
export const kind = "node";
export const summary = "Repeatable agent loop runner.";

export function handshake() {
  return { protocol: contract, slice: id, version: 1 };
}

export function health() {
  return { status: "ok", slice: id, contract };
}

export function demo() {
  return { id, title, contract, ok: true, summary };
}
