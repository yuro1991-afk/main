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
Full Origin list: `reviews/genesis-backlog.md`

`gub-superbrain-probe` is claimed here for the pad-side probe only
(unreachable, never LIVE). Origin still must implement that playbook.

Do not reopen [main#1](https://github.com/yuro1991-afk/main/pull/1).
Do not work dronehive / opensussy / face-swap / ollama-voice / bloom.
Do not open another landing-pad queue.
