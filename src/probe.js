import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

export const SUPERBRAIN_HEALTH = "http://169.254.124.8:45001/health";
export const SUPERBRAIN_LIVE = "http://169.254.124.8:45001/live";
export const GOOSE_PC_CORE = "http://127.0.0.1:8791/health";

export const DEFAULT_PROBE_TIMEOUT_MS = 2500;

export const PROBE_REFUSE = Object.freeze({
  contract: "agent-ops.probe.v1",
  refused: true,
  reason:
    "Yuri: no more Superbrain. Do not probe :45001 / :8791. Do not run node src/cli.js probe.",
  take: ["review-main-pr10", "dronehive-unicode-ci"],
});

/**
 * Pad CLI probe stops. Unit tests may still call probeKnownLanes with a fake fetch.
 */
export function refuseKnownLanes() {
  return { ...PROBE_REFUSE };
}

/**
 * @typedef {"unknown" | "live" | "unreachable"} LaneStatus
 *
 * @typedef {{
 *   id: string,
 *   url: string,
 *   status: LaneStatus,
 *   statusCode: number | null,
 *   error: string | null,
 *   at: string
 * }} ProbeResult
 */

/**
 * Failed probes are unreachable, never live.
 * @param {string} url
 * @param {{
 *   id?: string,
 *   timeoutMs?: number,
 *   nowMs?: number,
 *   fetchImpl?: typeof fetch
 * }} [options]
 * @returns {Promise<ProbeResult>}
 */
export async function probeLane(url, options = {}) {
  const timeoutMs = options.timeoutMs ?? DEFAULT_PROBE_TIMEOUT_MS;
  const nowMs = options.nowMs ?? Date.now();
  const fetchImpl = options.fetchImpl ?? globalThis.fetch;
  const id = options.id ?? url;
  const at = new Date(nowMs).toISOString();

  if (typeof fetchImpl !== "function") {
    return {
      id,
      url,
      status: "unreachable",
      statusCode: null,
      error: "fetch is not available",
      at,
    };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(url, { signal: controller.signal });
    if (response.ok) {
      return {
        id,
        url,
        status: "live",
        statusCode: response.status,
        error: null,
        at,
      };
    }
    return {
      id,
      url,
      status: "unreachable",
      statusCode: response.status,
      error: `HTTP ${response.status}`,
      at,
    };
  } catch (error) {
    return {
      id,
      url,
      status: "unreachable",
      statusCode: null,
      error: error instanceof Error ? error.name === "AbortError" ? "timeout" : error.message : String(error),
      at,
    };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * BOSS Superbrain and GOOSE-PC Core are different peers.
 * @param {{ fetchImpl?: typeof fetch, timeoutMs?: number, nowMs?: number }} [options]
 */
export async function probeKnownLanes(options = {}) {
  const shared = {
    fetchImpl: options.fetchImpl,
    timeoutMs: options.timeoutMs,
    nowMs: options.nowMs,
  };
  const [superbrainHealth, superbrainLive, goose] = await Promise.all([
    probeLane(SUPERBRAIN_HEALTH, { ...shared, id: "boss-superbrain-health" }),
    probeLane(SUPERBRAIN_LIVE, { ...shared, id: "boss-superbrain-live" }),
    probeLane(GOOSE_PC_CORE, { ...shared, id: "goose-pc-core" }),
  ]);
  return {
    contract: "agent-ops.probe.v1",
    note: "GOOSE-PC Core :8791 is not the BOSS peer. Timeouts stay unreachable.",
    lanes: [superbrainHealth, superbrainLive, goose],
  };
}

/**
 * @param {ProbeResult} result
 */
export function assertNotFalseLive(result) {
  if (result.status === "live" && result.statusCode === null) {
    throw new Error("live requires an HTTP status; timeouts are unreachable");
  }
}

/**
 * @param {string} repoRoot
 */
export function defaultSuperbrainPath(repoRoot) {
  return join(repoRoot, ".genesis", "last-superbrain.json");
}

/**
 * Persist a probe. Never rewrite a timeout as live.
 * @param {{ lanes: ProbeResult[] }} report
 * @param {string} destPath
 */
export function writeLaneProbe(report, destPath) {
  for (const lane of report.lanes) {
    assertNotFalseLive(lane);
  }
  mkdirSync(dirname(destPath), { recursive: true });
  writeFileSync(destPath, `${JSON.stringify(report, null, 2)}\n`);
  return destPath;
}
