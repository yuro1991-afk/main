import { loadSibling } from "../../sibling-kit/src/index.js";

export const id = "hub";
export const title = "Genesis main agent hub";
export const contract = "genesis.hub.v1";
export const kind = "node";
export const summary =
  "Origin kernel: hear operator, route specialists, speak last.";

export function handshake() {
  return { protocol: contract, slice: id, version: 1 };
}

export function health() {
  return { status: "ok", slice: id, contract };
}

/**
 * @param {string} utterance
 */
export async function route(utterance) {
  const text = utterance.toLowerCase();
  if (text.includes("remember") || text.includes("memory")) {
    return { specialist: "Mnemosyne", lane: "keep", sibling: "catalog" };
  }
  if (text.includes("probe") || text.includes("lane") || text.includes("wire")) {
    return { specialist: "Sentinel", lane: "wire", sibling: "local-repo" };
  }
  if (text.includes("code") || text.includes("repo") || text.includes("debounce") || text.includes("src/")) {
    return { specialist: "Forge", lane: "iron", sibling: "dispatch" };
  }
  if (text.includes("brief") || text.includes("chart")) {
    return { specialist: "Atlas", lane: "chart", sibling: "job-organizer" };
  }
  if (text.includes("hugging") || text.includes("model") || text.includes("lumen")) {
    return { specialist: "Lumen", lane: "lens", sibling: "genesis-ai" };
  }
  return { specialist: "Genesis", lane: "origin", sibling: "hub" };
}

export async function speak(utterance) {
  const decision = await route(utterance);
  return {
    heard: utterance,
    ...decision,
    speaker: "Genesis",
    protocol: "local-first",
  };
}

export async function board() {
  const roster = await loadSibling("roster");
  return {
    path: "/hub",
    contract,
    members: roster.members(),
  };
}
