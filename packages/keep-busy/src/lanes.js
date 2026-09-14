export const LANE_STATUSES = Object.freeze(["live", "unreachable", "unknown"]);

export const LANES = Object.freeze({
  bossSuperbrain: {
    id: "bossSuperbrain",
    title: "BOSS Ethernet live Superbrain",
    healthUrl: "http://169.254.124.8:45001/health",
    liveUrl: "http://169.254.124.8:45001/live",
    note: "LANE-ETH-PEER. Probe before LIVE claims. Not GOOSE-PC Core :8791.",
  },
  goosePcCore: {
    id: "goosePcCore",
    title: "GOOSE-PC Core",
    healthUrl: "http://169.254.124.8:8791/health",
    note: "Not the BOSS peer.",
  },
});

/**
 * Probe a health URL. Failed or missing probes are never "live".
 * @param {string} url
 * @param {{ fetchImpl?: typeof fetch, timeoutMs?: number }} [opts]
 */
export async function probe(url, opts = {}) {
  if (!url) {
    return { status: "unknown", url: null, reason: "no-url" };
  }

  const fetchImpl = opts.fetchImpl ?? globalThis.fetch;
  const timeoutMs = opts.timeoutMs ?? 2500;

  if (typeof fetchImpl !== "function") {
    return { status: "unknown", url, reason: "no-fetch" };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetchImpl(url, { signal: controller.signal });
    if (response && response.ok) {
      return { status: "live", url, httpStatus: response.status };
    }
    return {
      status: "unreachable",
      url,
      httpStatus: response ? response.status : null,
      reason: "non-ok",
    };
  } catch (error) {
    const reason = error && error.name === "AbortError" ? "timeout" : "error";
    return { status: "unreachable", url, reason };
  } finally {
    clearTimeout(timer);
  }
}

export async function probeLane(lane, opts = {}) {
  const result = await probe(lane.healthUrl, opts);
  return {
    id: lane.id,
    title: lane.title,
    ...result,
    note: lane.note,
  };
}

export function assertNotLive(result) {
  if (result.status === "live" && result.httpStatus == null) {
    throw new Error("lane cannot be live without an HTTP status from a probe");
  }
  return result;
}
