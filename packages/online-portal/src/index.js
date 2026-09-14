export const id = "online-portal";
export const title = "Genesis online portal";
export const contract = "genesis.online-portal.v1";
export const kind = "node";
export const summary = "Public gateway to the origin kernel.";

export function handshake() {
  return { protocol: contract, slice: id, version: 1 };
}

export function health() {
  return { status: "ok", slice: id, contract };
}

export function demo() {
  return { id, title, contract, ok: true, summary };
}
