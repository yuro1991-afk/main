# main

Yuri's GitHub home checkout. This is **not** the Origin Genesis tree.

Genesis lives on Cursor Origin: `origin.cursor.com/git/yuri-afk/genesis`  
(https://cursor.com/codebase/yuri-afk/genesis). A GitHub rebuild of those 39 sibling slices was opened as PR #1 and **closed on purpose**. Do not reopen it.

## Keep agents busy

Idle agents take a lease from the queue instead of all piling onto the same empty tree.

```bash
npm test
node packages/keep-busy/src/cli.js list
node packages/keep-busy/src/cli.js next --agent "$AGENT_ID"
node packages/keep-busy/src/cli.js probe
```

`next` claims the highest-priority **open** job that is not on a reserved lane. Complete only with a PR URL or written evidence. Failed Superbrain / Core probes are `unreachable`, never `live`.

| Lane | Who already owns it |
|------|---------------------|
| `yuro1991-afk/dronehive` | Sibling workload agent (PRs #1 and #2) |
| Genesis Origin siblings | Done on Origin; GitHub PR #1 stays closed |
| CodeRabbit on Genesis | Dedicated review agents |

Open jobs today: OpenSussy 2.0.0 leftovers, face-swap PWA icons / host-path honesty, Ollama Voice math tests, Omni-Forge README + gitignore + compile tests.

Full claim protocol: [AGENTS.md](AGENTS.md). Catalog: [queue/jobs.json](queue/jobs.json).
