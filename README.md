# attention

Inbox repo for Cloud Agents that attach to [`yuro1991-afk/main`](https://github.com/yuro1991-afk/main).

This tree is **not** Genesis. Genesis is on Cursor Origin: [yuri-afk/genesis](https://cursor.com/codebase/yuri-afk/genesis).

## Why this exists

Mobile agents keep landing on an Apache-LICENSE-only GitHub repo and then:

- rebuilding Origin work as GitHub stubs (closed [PR #1](https://github.com/yuro1991-afk/main/pull/1))
- failing CodeRabbit OAuth
- timing out on the BOSS Ethernet Superbrain

`AGENTS.md` is the routing contract. `npm run attention` prints the current needs-attention board.

## Needs attention (auto-fix status)

| Item | Status | Auto-fix from this repo? |
|---|---|---|
| Genesis GitHub PR #1 | Closed on purpose | No — leave closed |
| Genesis on Origin | Needs Origin login | No |
| [DroneHive #1](https://github.com/yuro1991-afk/dronehive/pull/1) / [#2](https://github.com/yuro1991-afk/dronehive/pull/2) CI | `python-smoke` UnicodeEncodeError on `✓` | Patch ready (`patches/dronehive-pro-chat-cp1252.patch`); this token cannot push `dronehive` |
| Superbrain `:45001` | Unreachable from public cloud | No |
| CodeRabbit Genesis review | Cloud OAuth blocked | No |

The DroneHive crash is `_chat()` in `drone/pro/tool_agent.py` printing `✓` / `→` to a cp1252 stdout on `windows-latest`. `src/safe_chat.py` is the tested replacement.

## Verify

```bash
npm test
npm run attention -- --offline
```
