import { assertNeverKind } from "./kinds.js";

/**
 * Intent → destination map so idle agents stop all attaching to empty main.
 * @typedef {{
 *   intent: string,
 *   destination: string,
 *   kind: string,
 *   notes: string
 * }} Route
 */

/** @type {readonly Route[]} */
export const ROUTES = Object.freeze([
  {
    intent: "keep agents busy",
    destination: "github.com/yuro1991-afk/main (this dispatch board)",
    kind: "implement",
    notes: "Claim the next open job. Do not rebuild the 39 Genesis sibling stubs.",
  },
  {
    intent: "genesis slice / origin kernel",
    destination: "origin.cursor.com/git/yuri-afk/genesis",
    kind: "origin-slice",
    notes: "Source of truth. Do not reopen GitHub PR #1 on yuro1991-afk/main.",
  },
  {
    intent: "auto review / coderabbit",
    destination: "an existing open PR, not empty main",
    kind: "review",
    notes: "main has no mergeable Genesis tree. Review dronehive #1/#2 or an Origin PR.",
  },
  {
    intent: "items for attention",
    destination: "ledger next() then the named repo",
    kind: "fix",
    notes: "Highest-priority open job. Expired claims are fair game.",
  },
  {
    intent: "dronehive ci / packaging",
    destination: "github.com/yuro1991-afk/dronehive",
    kind: "fix",
    notes: "Unstick #1 UnicodeEncodeError first, then rebase #2.",
  },
  {
    intent: "superbrain / lanes",
    destination: "probe known lanes via agent-ops",
    kind: "probe",
    notes: "Failed probes are unreachable, never live. LANE-ETH-PEER ≠ :8791.",
  },
  {
    intent: "catalog / notion inventory",
    destination: "Origin genesis catalog + Notion Genesis Catalog",
    kind: "catalog",
    notes: "Notion is seeded first; do not invent URLs.",
  },
]);

/**
 * @param {string} text
 * @returns {Route}
 */
export function routeIntent(text) {
  const q = (text ?? "").toLowerCase();
  if (includesAny(q, ["keep", "busy", "workload", "dispatch", "idle"])) {
    return ROUTES[0];
  }
  if (includesAny(q, ["review", "coderabbit", "code rabbit"])) {
    return ROUTES[2];
  }
  if (includesAny(q, ["genesis", "origin", "sibling", "hub"])) {
    return ROUTES[1];
  }
  if (includesAny(q, ["attention", "needs attention", "attend"])) {
    return ROUTES[3];
  }
  if (includesAny(q, ["dronehive", "drone", "unicode", "wheel"])) {
    return ROUTES[4];
  }
  if (includesAny(q, ["superbrain", "lane", "probe", "boss"])) {
    return ROUTES[5];
  }
  if (includesAny(q, ["catalog", "notion", "inventory"])) {
    return ROUTES[6];
  }
  return ROUTES[0];
}

/**
 * @param {string} kind
 */
export function destinationForKind(kind) {
  switch (kind) {
    case "fix":
      return "the repo named on the job card";
    case "implement":
      return "the scoped files on the job card";
    case "review":
      return "an existing PR — never an empty LICENSE-only tree";
    case "probe":
      return "lane URLs; write unreachable on timeout";
    case "catalog":
      return "Notion + Origin catalog, not a GitHub duplicate";
    case "origin-slice":
      return "origin.cursor.com/git/yuri-afk/genesis";
    default:
      return assertNeverKind(kind);
  }
}

/**
 * @param {string} q
 * @param {string[]} needles
 */
function includesAny(q, needles) {
  return needles.some((needle) => q.includes(needle));
}
