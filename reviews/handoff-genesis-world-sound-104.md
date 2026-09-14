# Origin relaunch packet — genesis-world-sound-104

This landing-pad token cannot authenticate to Origin. Yuri scoped this
pad to Genesis only. This pod has **NO Origin auth**. Implement on Origin.

## Job

- id: `genesis-world-sound-104`
- title: Land Origin world 3D sound genesis#104
- kind: origin-slice
- priority: 32
- repo: `origin.cursor.com/git/yuri-afk/genesis`
- UI: https://cursor.com/codebase/yuri-afk/genesis
- Notion: https://app.notion.com/p/3db735da33f381b58ce8eb310d0c6fa2
- Related Origin PR: genesis#104
- Branch: `cursor/world-3d-sound-engine-2c62`
- Path: `src/genesis_sound` (beside `genesis_spatial`)
- Playbook: `playbooks/genesis-world-sound-104.md`

## Why relaunch

Hearing organ for the sealed arena. Mouth speaks; ears place that voice
in world space (`+Z` up). Not NVIDIA physics. Not GOOSE-PC Core `:8791`.

## Ports

HTTP `127.0.0.1:8794` — also used by world-canon #93 and sentient #96.
Coordinate. Hearing pin `ears` — coordinate with python-agent-ears #78.
Never bind UDP 2419.

## First commands (on Origin)

```bash
pip install -e ".[dev]"
pytest
python -m genesis_sound health
python -m genesis_sound demo --anechoic --out demo.wav
```

Health stays `live: dark` until Superbrain is probed this cycle.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not open another landing-pad queue
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
- Do not bind UDP 2419 or claim Superbrain LIVE from this card
