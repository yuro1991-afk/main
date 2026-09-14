export const id = "python-head";
export const title = "Genesis Python agent head";
export const contract = "genesis.python-head.v1";
export const kind = "python";
export const summary = "Head/planning slice.";

export function handshake() {
  return { protocol: contract, slice: id, version: 1 };
}

export function health() {
  return { status: "ok", slice: id, contract };
}

export function demo() {
  return { id, title, contract, ok: true, summary };
}
