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

/** Where this landing-pad token can finish the card. */
export const JOB_SCOPES = Object.freeze(["here", "relaunch"]);

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
 * @param {string} scope
 * @returns {never}
 */
export function assertNeverScope(scope) {
  throw new Error(`unhandled job scope: ${scope}`);
}

/**
 * @param {{ repo: string }} job
 * @returns {typeof JOB_SCOPES[number]}
 */
export function jobScope(job) {
  return job.repo === "github.com/yuro1991-afk/main" ? "here" : "relaunch";
}

/**
 * Yuri scoped this landing pad to Genesis. Other GitHub siblings stay
 * on the ledger as blocked history; they are not default work.
 * @param {{ kind?: string, repo?: string } | null | undefined} job
 */
export function isGenesisJob(job) {
  if (!job) return false;
  if (job.kind === "origin-slice") return true;
  const repo = typeof job.repo === "string" ? job.repo : "";
  return repo.includes("yuri-afk/genesis") || repo.includes("origin.cursor.com");
}

/** World-PM planes plus the Python body that occupies the world. */
export const WORLD_PHASE_IDS = Object.freeze([
  "genesis-sentient-world-96",
  "genesis-comms-server-94",
  "genesis-agent-support-99",
]);

/**
 * Real next phases on the Genesis Python world project.
 * Catalog / GUB inventory / hub-ops cards are Genesis but not world phases.
 * @param {{ id?: string, kind?: string, repo?: string } | null | undefined} job
 */
export function isWorldPhaseJob(job) {
  if (!isGenesisJob(job)) return false;
  const id = typeof job?.id === "string" ? job.id : "";
  if (id.startsWith("genesis-world-")) return true;
  if (id.startsWith("genesis-python-")) return true;
  return WORLD_PHASE_IDS.includes(id);
}

/**
 * @param {string} scope
 */
export function describeScope(scope) {
  switch (scope) {
    case "here":
      return "This landing-pad token can finish the card.";
    case "relaunch":
      return "Relaunch against the named repo or Origin.";
    default:
      return assertNeverScope(scope);
  }
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
