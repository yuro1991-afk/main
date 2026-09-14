export const id = "bricks";
export const title = "Genesis bricks";
export const contract = "genesis.bricks.v1";
export const kind = "node";
export const summary = "Reusable world bricks.";

export function handshake() {
  return { protocol: contract, slice: id, version: 1 };
}

export function health() {
  return { status: "ok", slice: id, contract };
}

export function demo() {
  return { id, title, contract, ok: true, summary };
}
