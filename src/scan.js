import { classify, STATIC_ITEMS } from "./inventory.js";

const DRONEHIVE = "https://api.github.com/repos/yuro1991-afk/dronehive";
const SUPERBRAIN_HEALTH = "http://169.254.124.8:45001/health";
const USER_AGENT = "yuro1991-afk-attention/1.0";

/**
 * @param {string} url
 * @param {{ timeoutMs?: number }} [opts]
 */
export async function defaultFetchJson(url, opts = {}) {
  const timeoutMs = opts.timeoutMs ?? 8000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": USER_AGENT,
      },
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText} for ${url}`);
    }
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

/**
 * @param {string} url
 * @param {{ timeoutMs?: number }} [opts]
 */
export async function defaultProbe(url, opts = {}) {
  const timeoutMs = opts.timeoutMs ?? 3000;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    return { ok: res.ok, status: res.status };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * @param {object} pull
 * @returns {'failed_ci' | 'open' | 'cleared'}
 */
function rollupToStatus(pull) {
  const state = String(pull.state || "").toLowerCase();
  if (state === "closed") {
    return "cleared";
  }
  const checks = pull.statusCheckRollup;
  if (!Array.isArray(checks)) {
    return "open";
  }
  const failed = checks.some((check) => {
    const conclusion = String(check.conclusion || "").toLowerCase();
    const ctxState = String(check.state || "").toLowerCase();
    return conclusion === "failure" || ctxState === "failure";
  });
  return failed ? "failed_ci" : "open";
}

/**
 * @param {{ fetchJson?: typeof defaultFetchJson, probe?: typeof defaultProbe, offline?: boolean }} [deps]
 */
export async function scan(deps = {}) {
  const fetchJson = deps.fetchJson ?? defaultFetchJson;
  const probe = deps.probe ?? defaultProbe;
  const offline = Boolean(deps.offline);

  const items = STATIC_ITEMS.map((item) => ({ ...item }));

  if (!offline) {
    for (const item of items) {
      if (item.kind !== "dronehive_pr") {
        continue;
      }
      const number = item.id === "dronehive-pr-1" ? 1 : 2;
      try {
        const pull = await fetchJson(`${DRONEHIVE}/pulls/${number}`);
        const checks = await fetchJson(
          `${DRONEHIVE}/commits/${pull.head.sha}/check-runs`,
        );
        const rollup = (checks.check_runs || []).map((run) => ({
          name: run.name,
          conclusion: run.conclusion,
          state: run.status,
        }));
        item.status = rollupToStatus({
          state: pull.state,
          statusCheckRollup: rollup,
        });
        item.detail = `${item.detail} Live: ${pull.state} ${pull.mergeable_state || ""} checks=${rollup
          .map((run) => `${run.name}:${run.conclusion || run.state}`)
          .join(",")}`;
      } catch (err) {
        item.detail = `${item.detail} Live scan failed: ${
          err instanceof Error ? err.message : String(err)
        }`;
      }
    }

    const superbrain = items.find((item) => item.kind === "superbrain");
    if (superbrain) {
      const health = await probe(SUPERBRAIN_HEALTH, { timeoutMs: 2500 });
      if (health.ok) {
        superbrain.status = "cleared";
        superbrain.detail = `Health probe reached ${SUPERBRAIN_HEALTH} (${health.status}).`;
      } else {
        superbrain.status = "unreachable";
        superbrain.detail = `Health probe failed: ${health.error || health.status}. Cloud VMs cannot see LANE-ETH-PEER.`;
      }
    }
  }

  const report = items.map((item) => ({
    ...item,
    status: classify(item),
  }));

  const counts = report.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, /** @type {Record<string, number>} */ ({}));

  return {
    repo: "yuro1991-afk/main",
    scannedAt: new Date().toISOString(),
    offline,
    counts,
    items: report,
    autoFixableHere: 0,
    note:
      "Nothing on this GitHub repo is an application bug. Outstanding CI lives on dronehive; Genesis lives on Origin.",
  };
}
