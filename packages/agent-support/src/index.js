export const id = "agent-support";
export const title = "Genesis agent support";
export const contract = "genesis.agent-support.v1";
export const kind = "python";
export const summary = "Occupy/demo support slice.";

export function handshake() {
  return { protocol: contract, slice: id, version: 1 };
}

export function health() {
  return { status: "ok", slice: id, contract };
}

export function demo() {
  return { id, title, contract, ok: true, summary };
}
