/** Canonical job kinds. Keep exhaustive — switch defaults must fail. */
export const JOB_KINDS = Object.freeze([
  "fix",
  "implement",
  "review",
  "probe",
  "catalog",
  "origin-slice",
]);

/** Canonical job statuses. Keep exhaustive — switch defaults must fail. */
export const JOB_STATUSES = Object.freeze(["open", "claimed", "done", "blocked"]);

/**
 * @param {string} kind
 * @returns {kind is typeof JOB_KINDS[number]}
 */
export function isJobKind(kind) {
  return JOB_KINDS.includes(kind);
}

/**
 * @param {string} status
 * @returns {status is typeof JOB_STATUSES[number]}
 */
export function isJobStatus(status) {
  return JOB_STATUSES.includes(status);
}

/**
 * @param {string} kind
 * @returns {never}
 */
export function assertNeverKind(kind) {
  throw new Error(`unhandled job kind: ${kind}`);
}

/**
 * @param {string} status
 * @returns {never}
 */
export function assertNeverStatus(status) {
  throw new Error(`unhandled job status: ${status}`);
}

/**
 * @param {string} kind
 * @returns {string}
 */
export function describeKind(kind) {
  switch (kind) {
    case "fix":
      return "Land a concrete bugfix in a named repo.";
    case "implement":
      return "Ship a scoped feature without crossing sibling slices.";
    case "review":
      return "Review an existing PR or branch; do not invent a new tree.";
    case "probe":
      return "Probe a lane. Timeouts are unreachable, never live.";
    case "catalog":
      return "Expand or sync inventory; do not duplicate Origin genesis.";
    case "origin-slice":
      return "Work on origin.cursor.com/git/yuri-afk/genesis only.";
    default:
      return assertNeverKind(kind);
  }
}
