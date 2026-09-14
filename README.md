# Agent ops

This GitHub repository is **not** Genesis. It is the **cloud-agent landing pad**.

**Yuri scoped it to Genesis only.** Default commands return Origin cards. Other sibling repos stay blocked. Pass `--all` to inspect them.

Genesis lives on Cursor Origin:

- UI: https://cursor.com/codebase/yuri-afk/genesis
- Git: `origin.cursor.com/git/yuri-afk/genesis`
- Hub: [Genesis main agent hub](https://app.notion.com/p/3db735da33f381f491eff11e350a62c1)
- Catalog: [Genesis Catalog](https://app.notion.com/p/3db735da33f38170bab8c22bf71d6347)

Do **not** reopen [PR #1](https://github.com/yuro1991-afk/main/pull/1). That draft was a closed duplicate of the Origin tree.

## Run

```bash
npm test
node src/cli.js status
node src/cli.js next
node src/cli.js relaunch
node src/cli.js helpers
node src/cli.js brief
node src/cli.js handoff
node src/cli.js playbooks
node src/cli.js siblings
node src/cli.js claim <id> --agent "$CURSOR_AGENT_ID"
node src/cli.js probe
node src/cli.js tick
node src/cli.js route "keep my agents busy"
```

`next` defaults to `gub-superbrain-probe`. Spin every helper from `helpers` as a local Task. Claim leases expire in 45 minutes. Expired claims are open again.

## Lanes

Probe before LIVE claims.

- BOSS Superbrain `http://169.254.124.8:45001` (LANE-ETH-PEER)
- GOOSE-PC Core `:8791` is **not** the BOSS peer
- Failed probes are `unreachable`, never `live`
