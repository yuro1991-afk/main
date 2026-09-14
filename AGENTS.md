# Agent routing — `yuro1991-afk/main`

This GitHub repo is the default **mobile Cloud Agent attach target**. It is an inbox, not Genesis.

## Hard rules

1. **Do not reopen or rebuild** [PR #1](https://github.com/yuro1991-afk/main/pull/1). Yuri closed it: the siblings were already done on Origin. Regenerating 39 health-shim packages here is the wrong move.
2. **Genesis source of truth** is Cursor Origin: [cursor.com/codebase/yuri-afk/genesis](https://cursor.com/codebase/yuri-afk/genesis) (`origin.cursor.com/git/yuri-afk/genesis`). Notion catalog: [Genesis Catalog](https://app.notion.com/p/3db735da33f38170bab8c22bf71d6347).
3. **Do not treat a green `health()` stub as a working sibling.** Tests of generated registries prove consistency, not Origin implementations.
4. **DroneHive work belongs in** [yuro1991-afk/dronehive](https://github.com/yuro1991-afk/dronehive). Open PRs [#1](https://github.com/yuro1991-afk/dronehive/pull/1) and [#2](https://github.com/yuro1991-afk/dronehive/pull/2) are blocked by Windows `python-smoke` (`UnicodeEncodeError` on `✓` in `drone/pro/tool_agent.py`). The fix is `patches/dronehive-pro-chat-cp1252.patch`. Tokens attached only to `main` cannot push that repo.
5. **BOSS Superbrain** is `http://169.254.124.8:45001` (LANE-ETH-PEER). GOOSE-PC Core `:8791` is not that peer. Public cloud pods time out; do not mark the lane `live` from here.
6. **CodeRabbit** cloud OAuth (`127.0.0.1` callback) cannot finish on these VMs. Do not spin a review loop. Authenticate locally or review on Origin.

## Commands

```bash
npm test
npm run attention          # live GitHub + Superbrain probes
npm run attention -- --offline
npm run verify
```

If the user says "needs attention" / "keep agents busy" / "auto review" while attached here: run the scanner, apply only work that belongs in **this** tree, and stop. Do not open a second Genesis monorepo.
