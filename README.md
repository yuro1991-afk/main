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
node src/cli.js slots
node src/cli.js assign
node src/cli.js sync --agents .genesis/last-agents.json --write
node src/cli.js catalog --write           # ledger only; refuses playbooks/ reviews/
node src/cli.js prompt --agent "$CURSOR_AGENT_ID"   # roster card, not leftover next
node src/cli.js busy --agent "$CURSOR_AGENT_ID"
node src/cli.js relaunch
node src/cli.js helpers
node src/cli.js brief
node src/cli.js handoff
node src/cli.js playbooks                 # check; never writes playbooks/
node src/cli.js siblings [--job id]       # --job: catalog-first related PRs
node src/cli.js patches
node src/cli.js claim <id> --agent "$CURSOR_AGENT_ID"
node src/cli.js origin [--login]
node src/cli.js tick
node src/cli.js route "keep my agents busy"                 # leftover Origin card
node src/cli.js route "keep my agents busy" --agent "$CURSOR_AGENT_ID"  # your roster card
```

`assign` maps parked pad agents onto unique Genesis cards and writes
paste-ready briefs under `reviews/launch/`. `busy --agent` claims
**your roster card** first. Unassigned agents take leftover
`gub-route-intent` (`reviews/launch/gub-route-intent.md`). `busy --world --agent` still stays on
world planes. `slots --world` lists the rest. Peek `next` (no `--agent`)
is leftover unused `gub-route-intent` — it does not steal the fork's
`gub-inventory-tick`. Claim leases expire in 45 minutes.

## Lanes

**Yuri: no more Superbrain.** Do not probe `:45001` / `:8791`. Do not run
`node src/cli.js probe`. `cli probe` refuses and exits 1.

- GOOSE-PC Core `:8791` is **not** the BOSS peer
- Origin CLI `/exec-daemon/tools/origin` is present; `node src/cli.js origin` stays **logged-out** until `origin --login` has `CURSOR_API_KEY`

## Sibling patches

**Yuri: forget Origin** for public GitHub siblings. `node src/cli.js patches`
lists applyable diffs (compact: `nextApply` + id/file; `--job` for applyNext). Catalog includes DroneHive unicode, bloom ignore/README/CI, OpenSussy
2.0.0 leftovers, face-swap icons/env, Ollama Voice syntax + loopback API).
`node src/cli.js patches --prove --siblings-root /tmp/siblings` re-checks
vanilla+stacked `git apply --check` on a `--no-hardlinks` throwaway and
never writes or resets those checkouts. This pad token
cannot push those repos. Do **not** copy PR #6’s autofix runner.
See `reviews/SIBLING-PATCHES.md`.
