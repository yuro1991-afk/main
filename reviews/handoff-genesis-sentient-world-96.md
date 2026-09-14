# Origin relaunch packet — genesis-sentient-world-96

This landing-pad token cannot authenticate to Origin. Yuri scoped this
pad to Genesis only. This pod has **NO Origin auth**. Implement on Origin.

## Job

- id: `genesis-sentient-world-96`
- title: Land Origin sentient world layer genesis#96
- kind: origin-slice
- priority: 30
- repo: `origin.cursor.com/git/yuri-afk/genesis`
- UI: https://cursor.com/codebase/yuri-afk/genesis
- Notion: https://app.notion.com/p/3db735da33f3810fa818ecbbe082f824
- Related Origin PR: genesis#96
- Branch: `cursor/sentient-world-layer-2726`
- Path: `packages/python-sentient-world`
- Playbook: `playbooks/genesis-sentient-world-96.md`

## Why relaunch

Phenomenal layer over Genesis occupancy: affect, attention, inner
speech, crowding, and Aether. It is not the hub, lattice, Python mind,
world unifier, or memory bridge.

## Ports

HTTP `127.0.0.1:8794`. The same port is claimed by world-canon #93 and
sound #104 — coordinate; do not steal `:8792` / `:8793`. Never bind
UDP 2419.

`GET /live` is process liveness. `claimed_live` is true only when
`/live` answers. Probe Superbrain separately. That peer is not
GOOSE-PC Core `:8791`.

## First commands (on Origin)

```bash
cd packages/python-sentient-world
python3 -m pip install -e ".[dev]"
pytest
genesis-sentient-world tick --steps 4
```

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not open another landing-pad queue
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
- Do not bind UDP 2419 or mark Superbrain LIVE from this card
