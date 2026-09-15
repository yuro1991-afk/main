# Agent ops

This GitHub repository is the **cloud-agent landing pad**.

**Yuri: forget Origin.** Default commands return GitHub sibling cards
(dronehive, opensussy, face-swap-ios, ollama-voice-access,
bloom-fair-yellow-charm, and this pad). Pass `--origin` to inspect
Genesis cards. Pass `--all` for both.

This pad token **cannot push** the sibling repos. Clone them and
relaunch an agent attached to that repo.

Do **not** reopen [PR #1](https://github.com/yuro1991-afk/main/pull/1).

## Run

```bash
npm test
node src/cli.js status
node src/cli.js next
node src/cli.js slots
node src/cli.js assign
node src/cli.js busy --agent "$CURSOR_AGENT_ID"
node src/cli.js prompt --agent "$CURSOR_AGENT_ID"   # roster card, not leftover next
node src/cli.js route "keep my agents busy" --agent "$CURSOR_AGENT_ID"
node src/cli.js next --origin          # Genesis cards only if asked
node src/cli.js sync --agents .genesis/last-agents.json --write
node src/cli.js catalog --write           # ledger only; refuses playbooks/ reviews/
node src/cli.js relaunch
node src/cli.js helpers
node src/cli.js brief
node src/cli.js handoff
node src/cli.js playbooks                 # check; never writes playbooks/
node src/cli.js siblings [--job id]       # bare: nextApply + lead #9; --job: catalog-first related
node src/cli.js patches
node src/cli.js claim <id> --agent "$CURSOR_AGENT_ID"
node src/cli.js origin [--login]
node src/cli.js tick
```

`assign` maps parked pad agents onto unique GitHub cards.
`assign --job <id>` writes one leftover Apply launch and names
catalog-first related PRs in both JSON and the launch file
(same order as `siblings --job`).
`assign --missing` lists catalog leftovers with no launch file and
never writes. Prefer `assign --job <id> --out /tmp/launches`.
`busy --agent` claims **your roster card** first. Leftover unused is
`review-landing-pad-prs`. `next --world` / `--origin` are opt-in.

## Lanes

**Yuri: no more Superbrain.** Do not probe `:45001` / `:8791`. Do not run
`node src/cli.js probe`. `cli probe` refuses and exits 1.

- GOOSE-PC Core `:8791` is **not** the BOSS peer
- Failed probes are `unreachable`, never `live`
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
