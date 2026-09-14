export const id = "live-alert";
export const title = "Genesis live alert";
export const contract = "genesis.live-alert.v1";
export const kind = "node";
export const summary = "Alerts. Never report LIVE without a probe.";

export function handshake() {
  return { protocol: contract, slice: id, version: 1 };
}

export function health() {
  return { status: "ok", slice: id, contract };
}

export function demo() {
  return { id, title, contract, ok: true, summary };
}
