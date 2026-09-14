import { query } from "../../catalog/src/index.js";
import { enqueue } from "../../dispatch/src/index.js";

export const id = "mcp";
export const title = "Genesis MCP";
export const contract = "genesis.mcp.v1";
export const kind = "node";
export const summary = "MCP tool surface over catalog + dispatch.";

export function handshake() {
  return { protocol: contract, slice: id, version: 1 };
}

export function health() {
  return { status: "ok", slice: id, contract };
}

export function listTools() {
  return [
    {
      name: "genesis_catalog_query",
      description: "Query the in-repo Genesis catalog",
    },
    {
      name: "genesis_dispatch",
      description: "Enqueue a job on the Genesis dispatch sibling",
    },
  ];
}

/**
 * @param {string} name
 * @param {Record<string, unknown>} args
 */
export function callTool(name, args = {}) {
  switch (name) {
    case "genesis_catalog_query":
      return { entries: query(String(args.q ?? "")) };
    case "genesis_dispatch":
      return enqueue({
        kind: String(args.kind ?? "generic"),
        payload: args.payload ?? {},
      });
    default: {
      const _exhaustive = name;
      throw new Error(`unknown MCP tool: ${_exhaustive}`);
    }
  }
}
