# Origin relaunch packet — gub-inventory-tick

This landing-pad token cannot authenticate to Origin. Yuri scoped this
pad to Genesis only. This pod has **NO Origin auth**. Spin a cloud agent
against the Origin UI. Do not implement the tick here. Do not rebuild
siblings on GitHub main.

## Job

- id: `gub-inventory-tick`
- title: Implement GUB continuous inventory tick
- kind: origin-slice
- priority: 6
- scope: relaunch
- repo: `origin.cursor.com/git/yuri-afk/genesis`
- UI: https://cursor.com/codebase/yuri-afk/genesis
- Notion draft: https://app.notion.com/p/3db735da33f38109a568ed3d589253b6
- Related Origin PR: genesis#22
- Playbook (this pad, read-only context): `playbooks/gub-inventory-tick.md`

## Why relaunch

Work the slice on Origin. Promote the Notion draft off draft there.
This GitHub tree (`yuro1991-afk/main`, branch
`cursor/agent-dispatch-board-108b`) is the ops board only. Optional local
`node src/cli.js tick` on this pad is **not** the Origin Wave 4 job.

## Wave 4 rebuild / stats

On Origin, implement the continuous inventory tick so Wave 4 rebuild
and stats persist to:

```
.genesis/last-inventory.json
```

That file is the contract artifact. A successful tick writes rebuild
counts and job stats there. Do not treat this landing pad's
`.genesis/last-inventory.json` (if present) as the Origin snapshot.

Verify: inventory tick writes `last-inventory.json` without claiming
Superbrain LIVE.

## Port :8787 vs auto-runner (genesis#41)

Port `:8787` is inventory (this card / genesis#22).

The Origin auto-runner (genesis#41) must **not** steal `:8787`.
Coordinate so the runner listens:

- HTTP `:8788`
- UDP `:8789`

Leave `:8787` for the inventory tick. Do not ship auto-runner bind
changes from this card. That work is `genesis-auto-runner-41`.

## Superbrain

Never mark Superbrain LIVE from this card.

- BOSS Superbrain `http://169.254.124.8:45001` is a different job
  (`gub-superbrain-probe`).
- GOOSE-PC `:8791` is not the BOSS peer.
- Timeouts / missing probes stay `unreachable`.
- Writing `last-inventory.json` is not a Superbrain health claim.

## Do not

- Do not reopen [main#1](https://github.com/yuro1991-afk/main/pull/1).
- Do not open another landing-pad queue.
- Do not work dronehive / opensussy / face-swap / ollama-voice / bloom.
- Do not implement genesis#41, hub genesis#24, or world-layer genesis#102
  from this packet.
- Do not claim Superbrain or GOOSE-PC LIVE from inventory stats.

## Engine (from Notion, 2026-09-14)

In-repo on Origin: `gub/`, `workflows/`, `data/playbooks/playbook__gub-*.json`.
Runs live under `.genesis/` (gitignored). Entry id: `playbook/gub-inventory-tick`.

```bash
python3 -m gub doctor
python3 -m gub serve --port 8787
# HTTP: GET /   POST /v1/route   POST /v1/runs   POST /v1/schedule/tick
```

Tick steps: snapshot catalog stats; run `scripts/build_catalog.py` and
`scripts/inventory.py` when present; write `.genesis/last-inventory.json`.
Shell allowlist is those two plus `scripts/query_catalog.py`. HTTP stays
on localhost / Superbrain peer. Operators are allowlisted.

## First commands (on Origin)

1. Attach to `origin.cursor.com/git/yuri-afk/genesis` via
   https://cursor.com/codebase/yuri-afk/genesis
2. Continue or land related Origin PR genesis#22
3. Wave 4 rebuild/stats → `.genesis/last-inventory.json`
4. Keep inventory on `:8787`; leave `:8788` / `:8789` for genesis#41
5. Promote the Notion draft off draft when the tick is real

## Hard rules (this pad)

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- This pod has no Origin auth — relaunch, do not pretend to push Origin
- Never mark Superbrain LIVE from this card
