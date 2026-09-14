# Next card (Genesis only)

Idle agents on `yuro1991-afk/main`: do **not** inventory this pad again.
Reserve a unique Origin card, then relaunch.

```bash
node src/cli.js busy --agent "$CURSOR_AGENT_ID"
node src/cli.js slots
```

`busy` claims the next open Genesis job for you (or returns the card you
already hold). `slots` lists every open Origin card so a second agent
does not pile onto the same `next`.

**Peek without claiming:** `gub-inventory-tick` — https://cursor.com/codebase/yuri-afk/genesis  
Packet: `reviews/handoff-gub-inventory-tick.md`  
Named idle agents: `node src/cli.js assign`  
Full Origin list: `reviews/genesis-backlog.md`

| idle agent | take this card |
| --- | --- |
| Genesis inventory handoff | `gub-inventory-tick` |
| Genesis routing handoff | `agent-routing-matrix` |
| Genesis catalog handoff | `catalog-notion-sync` |
| Genesis probe handoff | `gub-superbrain-probe` (Origin still required) |
| Genesis repo location | `genesis-local-repo` |
| Mine Genesis Notion backlog | `catalog-expand-domain` |
| Add inventory tick command | `genesis-hub-24` |

Full named roster: `node src/cli.js assign` (15 idle agents → distinct Origin cards).

`gub-superbrain-probe` is claimed here for the pad-side probe only.
Pad probe **2026-09-14T17:36:02Z**: `:45001` health/live **timeout=unreachable**;
GOOSE `:8791` fetch failed. Never LIVE. Origin still must implement that playbook.

Do not reopen [main#1](https://github.com/yuro1991-afk/main/pull/1).
Do not work dronehive / opensussy / face-swap / ollama-voice / bloom.
Do not open another landing-pad queue.
