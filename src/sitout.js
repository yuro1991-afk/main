import { FIRST_PARKED_APPLY } from "./siblings.js";

/** Sit-out jobs have no launch file on purpose. Do not hand them to leftover unused. */
export const SITOUT_JOB_IDS = Object.freeze([
  "gub-superbrain-probe",
  "do-not-reopen-main-pr1",
  "agent-ops-board",
  "do-not-open-fourth-queue",
]);

/**
 * @param {string} jobId
 */
export function isSitOutJob(jobId) {
  return SITOUT_JOB_IDS.includes(jobId);
}

/**
 * @param {string} jobId
 */
export function sitOutAssignError(jobId) {
  return `sit-out job has no launch on purpose: ${jobId}. Prefer brief --job ${FIRST_PARKED_APPLY}. Do not invent leftover 163+.`;
}

/**
 * Leftover unused peek with no leftover unused next.
 * Do not tell idle agents to add a ledger card (that invents leftover 163+).
 */
export function leftoverUnusedExhaustedPeek() {
  return `Leftover unused is exhausted. Prefer brief --job ${FIRST_PARKED_APPLY}. Do not invent leftover 163+.`;
}
