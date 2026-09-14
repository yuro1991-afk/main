# Origin relaunch packet — genesis-python-bridge-57

This landing-pad token cannot authenticate to Origin. Yuri scoped this
pad to Genesis only. This pod has **NO Origin auth**. Implement on Origin.

## Job

- id: `genesis-python-bridge-57`
- title: Land Origin Python bridge server genesis#57
- kind: origin-slice
- priority: 33
- repo: `origin.cursor.com/git/yuri-afk/genesis`
- UI: https://cursor.com/codebase/yuri-afk/genesis
- Notion: https://app.notion.com/p/3db735da33f38161b4dbc856c5c46893
- Related Origin PR: genesis#57
- Branch: `cursor/python-bridge-server-629c`
- Path: `packages/python-bridge`
- Playbook: `playbooks/genesis-python-bridge-57.md`

## Why relaunch

Python Superbrain-compatible peer for Genesis agents on `LANE-ETH-PEER`.
Local HTTP/UDP/file peer that speaks `/health` `/live` `/chat`
`/knowledge` `/genesis`. Live is a probe result, never a default. This
is not GOOSE-PC Core `:8791`.

## Ports

Default HTTP `http://127.0.0.1:8788` — also auto-runner genesis#41.
`--loopback` keeps `/live` dark. Sibling ports: any-app `:8787`
(inventory), CPU bridge `:8789`, Python lattice `:8790`. Do not steal
`:8787` from `gub-inventory-tick`. UDP 2419 is pong only.

## First commands (on Origin)

```bash
cd packages/python-bridge
pip install -e ".[dev]"
python -m genesis_bridge serve --loopback
```

`GET /live` is 200 only when Ethernet Superbrain `/live` succeeds.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not open another landing-pad queue
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
- Do not steal `:8787` / `:8788` or bind UDP 2419
