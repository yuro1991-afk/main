# Origin relaunch packet — genesis-world-host-87

This landing-pad token cannot authenticate to Origin. Implement on Origin.

## Job

- id: `genesis-world-host-87`
- Origin PR: genesis#87
- Branch: `cursor/genesis-world-host-1a8f`
- Path: `packages/python-world-host`
- Import: `genesis_world_host`
- Contract: `genesis.python-world-host.v1`
- Notion: https://app.notion.com/p/3db735da33f38166aebfc5ed8ace53a9
- UI: https://cursor.com/codebase/yuri-afk/genesis

Runtime owner of a live Genesis world. Binds occupancy and ticks the
world clock. It does not merge shards, spawn brains, generate maps, or
run Genesis physics.

## Ports

HTTP `127.0.0.1:8794` — also world-canon #93, sentient #96, and sound
#104. Coordinate. Do not steal `:8792` / `:8793`. Never bind UDP 2419.

`GET /health` stays `live=dark`. `GET /live` is process liveness only.

## First commands (on Origin)

```bash
cd packages/python-world-host
pip install -e ".[dev]"
pytest
genesis-world-host serve
```

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not bind UDP 2419 or mark Superbrain LIVE from this card
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
