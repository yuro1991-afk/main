# Agent routing — `yuro1991-afk/main`

This GitHub repo is the default **mobile Cloud Agent attach target**. It is an inbox, not Genesis.

## Hard rules

1. **Do not reopen or rebuild** [PR #1](https://github.com/yuro1991-afk/main/pull/1). Yuri closed it: the siblings were already done on Origin.
2. **Genesis source of truth** is Cursor Origin: [cursor.com/codebase/yuri-afk/genesis](https://cursor.com/codebase/yuri-afk/genesis).
3. **Do not open another dispatch board or job queue.** Those already exist on [PR #3](https://github.com/yuro1991-afk/main/pull/3) and [PR #4](https://github.com/yuro1991-afk/main/pull/4).
4. **DroneHive work belongs in** [yuro1991-afk/dronehive](https://github.com/yuro1991-afk/dronehive). Open PRs [#1](https://github.com/yuro1991-afk/dronehive/pull/1) and [#2](https://github.com/yuro1991-afk/dronehive/pull/2) fail `python-smoke` because `_chat()` prints `✓` on a Windows cp1252 console. The fix is `patches/dronehive-pro-chat-cp1252.patch`. Tokens attached only to `main` cannot push that repo.
5. **BOSS Superbrain** is `http://169.254.124.8:45001`. Failed probes stay `unreachable`. Never mark the lane `live` from a public cloud pod.
6. **CodeRabbit** cloud OAuth cannot finish here. Do not spin a review loop.

## Commands

```bash
npm test
npm run autofix -- diagnose
npm run autofix -- reproduce
npm run autofix -- verify
npm run autofix -- apply /path/to/dronehive
```

If the user says "auto fix" while attached here: run the verifier, apply only work that belongs in **this** tree, and stop.
