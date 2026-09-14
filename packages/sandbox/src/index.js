import { createContext, runInContext } from "node:vm";

export const id = "sandbox";
export const title = "Genesis local AI sandbox";
export const contract = "genesis.sandbox.v1";
export const kind = "node";
export const summary = "Isolated eval surface. Port 8788 in the lattice.";

export function handshake() {
  return { protocol: contract, slice: id, version: 1 };
}

export function health() {
  return { status: "ok", slice: id, contract, port: 8788 };
}

export function run(source) {
  const context = createContext({ result: undefined });
  const value = runInContext(source, context, { timeout: 200 });
  return { ok: true, value };
}
