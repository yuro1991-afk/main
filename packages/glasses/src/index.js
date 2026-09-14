export const id = "glasses";
export const title = "Genesis glasses";
export const contract = "genesis.glasses.v1";
export const kind = "node";
export const summary = "View layer. Port 8765 — do not reuse for the Python hub.";

export function handshake() {
  return { protocol: contract, slice: id, version: 1 };
}

export function health() {
  return { status: "ok", slice: id, contract };
}

export function demo() {
  return { id, title, contract, ok: true, summary };
}
