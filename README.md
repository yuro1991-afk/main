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
node src/cli.js prompt --agent "$CURSOR_AGENT_ID"
node src/cli.js route "keep my agents busy" --agent "$CURSOR_AGENT_ID"
node src/cli.js next --origin          # Genesis cards only if asked
```

`assign` maps parked pad agents onto unique GitHub cards.
`busy --agent` claims **your roster card** first. Leftover unused is
`review-landing-pad-prs`. `next --world` / `--origin` are opt-in.

## Lanes

Probe before LIVE claims.

- BOSS Superbrain `http://169.254.124.8:45001` (LANE-ETH-PEER)
- GOOSE-PC Core `:8791` is **not** the BOSS peer
- Failed probes are `unreachable`, never `live`
