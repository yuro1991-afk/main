# Origin relaunch packet — genesis-python-infra-50

This landing-pad token cannot authenticate to Origin. Implement on Origin.

## Job

- id: `genesis-python-infra-50`
- Origin PR: genesis#50
- Branch: `cursor/python-infrastructure-6871`
- Path: `packages/python-infra`
- Import: `genesis_infra`
- Contract: `genesis.python-infra.v1`
- Notion: https://app.notion.com/p/3db735da33f381b5a411faa0d9317b81
- UI: https://cursor.com/codebase/yuri-afk/genesis

Shared Python handshake for the lattice. It does not speak for the
origin kernel. Sibling packages attach here for env, roster, mail,
dispatch, ports, and lane probes.

## Ports

Control plane `http://127.0.0.1:8800/health`. Do not steal `:8787`
inventory, `:8788` sandbox/runner/bridge, `:8789` CPU bridge, `:8790`
lattice, `:8765` glasses, or planned hub `:8801`.

## First commands (on Origin)

```bash
./scripts/install-python.sh
python3 -m pytest
genesis-infra wire
genesis-infra serve
```

Never report Superbrain LIVE without a probe. GOOSE-PC `:8791` is not
the BOSS peer.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not open another landing-pad queue
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
