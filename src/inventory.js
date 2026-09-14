/**
 * Static map of known "needs attention" work for this attach target.
 * Live scanners overlay GitHub / probe status onto these rows.
 */

/** @typedef {'cleared' | 'blocked_human' | 'blocked_wrong_repo' | 'failed_ci' | 'unreachable' | 'open'} AttentionStatus */

/**
 * @typedef {object} AttentionItem
 * @property {string} id
 * @property {'genesis_pr' | 'genesis_origin' | 'dronehive_pr' | 'superbrain' | 'coderabbit'} kind
 * @property {string} title
 * @property {string} detail
 * @property {string} [url]
 * @property {AttentionStatus} status
 * @property {string} [fix]
 */

/** @type {readonly AttentionItem[]} */
export const STATIC_ITEMS = Object.freeze([
  {
    id: "genesis-pr-1",
    kind: "genesis_pr",
    title: "GitHub PR #1 Genesis sibling assembly",
    detail:
      "Closed on purpose. Origin already had the siblings. Do not reopen or regenerate stubs on this repo.",
    url: "https://github.com/yuro1991-afk/main/pull/1",
    status: "cleared",
  },
  {
    id: "genesis-origin",
    kind: "genesis_origin",
    title: "Genesis source of truth",
    detail:
      "Lives on Cursor Origin, not GitHub. This cloud token has no Origin login.",
    url: "https://cursor.com/codebase/yuri-afk/genesis",
    status: "blocked_human",
    fix: "Relaunch a cloud agent against cursor.com/codebase/yuri-afk/genesis after `origin auth login`.",
  },
  {
    id: "dronehive-pr-1",
    kind: "dronehive_pr",
    title: "DroneHive PR #1 python-smoke",
    detail:
      "Open, mergeable, rust-tui green. python-smoke dies on Windows cp1252 printing ✓ in drone/pro/tool_agent.py _chat.",
    url: "https://github.com/yuro1991-afk/dronehive/pull/1",
    status: "blocked_wrong_repo",
    fix: "Apply patches/dronehive-pro-chat-cp1252.patch on yuro1991-afk/dronehive (this token cannot push there).",
  },
  {
    id: "dronehive-pr-2",
    kind: "dronehive_pr",
    title: "DroneHive PR #2 python-smoke",
    detail:
      "Stacked on PR #1. Same UnicodeEncodeError in _chat during `drone app pro --no-ollama`.",
    url: "https://github.com/yuro1991-afk/dronehive/pull/2",
    status: "blocked_wrong_repo",
    fix: "Same _chat / PYTHONIOENCODING patch as PR #1.",
  },
  {
    id: "superbrain",
    kind: "superbrain",
    title: "BOSS Ethernet live Superbrain",
    detail:
      "LANE-ETH-PEER 169.254.124.8:45001. Cloud pods cannot reach the Ethernet peer.",
    url: "http://169.254.124.8:45001/health",
    status: "unreachable",
    fix: "Probe from a LAN/self-hosted worker, not this public cloud VM.",
  },
  {
    id: "coderabbit-oauth",
    kind: "coderabbit",
    title: "CodeRabbit CLI review of Genesis",
    detail:
      "coderabbit auth login --agent times out on cloud VMs (127.0.0.1 callback).",
    status: "blocked_human",
    fix: "Authenticate CodeRabbit locally or install the GitHub App, then review on Origin genesis — not this empty GitHub tree.",
  },
]);

/**
 * @param {AttentionItem} item
 * @returns {AttentionStatus}
 */
export function classify(item) {
  switch (item.kind) {
    case "genesis_pr":
      return item.status;
    case "genesis_origin":
      return "blocked_human";
    case "dronehive_pr":
      return item.status === "failed_ci" ? "failed_ci" : "blocked_wrong_repo";
    case "superbrain":
      return "unreachable";
    case "coderabbit":
      return "blocked_human";
    default: {
      const _exhaustive = item.kind;
      throw new Error(`unhandled attention kind: ${_exhaustive}`);
    }
  }
}

/**
 * @param {AttentionStatus} status
 */
export function isAutoFixableHere(status) {
  switch (status) {
    case "cleared":
    case "blocked_human":
    case "blocked_wrong_repo":
    case "failed_ci":
    case "unreachable":
    case "open":
      return false;
    default: {
      const _exhaustive = status;
      throw new Error(`unhandled status: ${_exhaustive}`);
    }
  }
}
