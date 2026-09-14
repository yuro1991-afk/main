export const id = "roster";
export const title = "Genesis roster";
export const contract = "genesis.roster.v1";
export const kind = "node";
export const summary = "Origin, Sentinel, Mnemosyne, Forge, Atlas, Lumen.";

export const MEMBERS = Object.freeze([
  { name: "Genesis", epithet: "Origin", role: "main agent", sibling: "hub" },
  { name: "Sentinel", epithet: "Wire", role: "lanes", sibling: "local-repo" },
  { name: "Mnemosyne", epithet: "Keep", role: "memory", sibling: "catalog" },
  { name: "Forge", epithet: "Iron", role: "repo/code", sibling: "dispatch" },
  { name: "Atlas", epithet: "Chart", role: "briefs", sibling: "job-organizer" },
  { name: "Lumen", epithet: "Lens", role: "Hugging Face shelf (Yuro1991)", sibling: "genesis-ai" },
]);

export function handshake() {
  return { protocol: contract, slice: id, version: 1 };
}

export function health() {
  return { status: "ok", slice: id, contract, count: MEMBERS.length };
}

export function members() {
  return MEMBERS;
}

export function find(name) {
  return MEMBERS.find((member) => member.name.toLowerCase() === name.toLowerCase()) ?? null;
}
