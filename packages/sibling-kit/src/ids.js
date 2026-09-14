/** Canonical sibling slice ids. Keep this list exhaustive. */
export const SIBLING_IDS = Object.freeze([
  "local-repo",
  "hub",
  "catalog",
  "mail",
  "mcp",
  "floor-mesh",
  "genesis-ai",
  "roster",
  "dispatch",
  "sandbox",
  "cpu-bridge",
  "lattice",
  "vehicles",
  "bricks",
  "glasses",
  "data-logger",
  "online-portal",
  "job-organizer",
  "auto-agent-runner",
  "gub",
  "python-infra",
  "python-suit",
  "python-mind",
  "python-bridge",
  "python-head",
  "python-eyes",
  "python-ears",
  "live-alert",
  "python-vision",
  "python-world-host",
  "python-world-knowledge",
  "world-canon",
  "comms-server",
  "world-language",
  "sentient-world",
  "world-project-manager",
  "agent-support",
  "world-layer-engine",
  "world-3d-sound",
]);

/**
 * @param {string} id
 * @returns {id is typeof SIBLING_IDS[number]}
 */
export function isSiblingId(id) {
  return SIBLING_IDS.includes(id);
}

/**
 * @param {string} id
 * @returns {never}
 */
export function assertNeverSibling(id) {
  throw new Error(`unhandled sibling id: ${id}`);
}
