export const id = "cpu-bridge";
export const title = "Genesis CPU bridge";
export const contract = "genesis.cpu-bridge.v1";
export const kind = "node";
export const summary = "Host CPU bridge. Port 8789.";

export function handshake() {
  return { protocol: contract, slice: id, version: 1 };
}

export function health() {
  return { status: "ok", slice: id, contract };
}

export function demo() {
  return { id, title, contract, ok: true, summary };
}
