export const id = "python-bridge";
export const title = "Genesis Python bridge server";
export const contract = "genesis.python-bridge.v1";
export const kind = "python";
export const summary = "POST /genesis handshake genesis-python-bridge/1.";

export function handshake() {
  return { protocol: contract, slice: id, version: 1 };
}

export function health() {
  return { status: "ok", slice: id, contract };
}

export function demo() {
  return { id, title, contract, ok: true, summary };
}
