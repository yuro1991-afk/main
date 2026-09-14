export const id = "comms-server";
export const title = "Genesis communications server";
export const contract = "genesis.comms.v1";
export const kind = "node";
export const summary = "POST /genesis handshake genesis-comms/1.";

export function handshake() {
  return { protocol: contract, slice: id, version: 1 };
}

export function health() {
  return { status: "ok", slice: id, contract };
}

export function demo() {
  return { id, title, contract, ok: true, summary };
}
