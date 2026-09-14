# autofix

Inbox repo for Cloud Agents that attach to [`yuro1991-afk/main`](https://github.com/yuro1991-afk/main).

This tree is **not** Genesis. Genesis is on Cursor Origin: [yuri-afk/genesis](https://cursor.com/codebase/yuri-afk/genesis).

## What this PR auto-fixes

GitHub Actions `python-smoke` on [yuro1991-afk/dronehive](https://github.com/yuro1991-afk/dronehive) dies on `windows-latest` when `_chat()` prints `✓` / `→` to a cp1252 stdout:

```
UnicodeEncodeError: 'charmap' codec can't encode character '\u2713'
```

That crash blocks dronehive PRs [#1](https://github.com/yuro1991-afk/dronehive/pull/1) and [#2](https://github.com/yuro1991-afk/dronehive/pull/2).

This repo cannot push `dronehive`. It **does** ship a verified drop-in `_chat` and a git patch a dronehive-scoped agent can apply.

## Commands

```bash
npm test
npm run autofix -- diagnose
npm run autofix -- reproduce    # unpatched _chat raises on cp1252
npm run autofix -- verify       # patched _chat does not
npm run autofix -- apply /path/to/dronehive
```

## Verify

```bash
npm test
git clone --depth 1 https://github.com/yuro1991-afk/dronehive.git /tmp/dronehive
npm run autofix -- apply /tmp/dronehive
```
