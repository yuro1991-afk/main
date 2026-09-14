# Origin relaunch packet — genesis-python-agent-eyes-74

This landing-pad token cannot authenticate to Origin. Yuri scoped this
pad to Genesis only. This pod has **NO Origin auth**. Spin a cloud agent
against the Origin UI. Do not implement the eyes package here.

## Job

- id: `genesis-python-agent-eyes-74`
- title: Land Origin Python agent eyes genesis#74
- kind: origin-slice
- priority: 28
- scope: relaunch
- repo: `origin.cursor.com/git/yuri-afk/genesis`
- UI: https://cursor.com/codebase/yuri-afk/genesis
- Notion: https://app.notion.com/p/3db735da33f3810b8069d7f47940ccd6
- Related Origin PR: genesis#74
- Branch: `cursor/python-agent-eyes-9eb0`
- Playbook: `playbooks/genesis-python-agent-eyes-74.md`

## Why relaunch

Vision glasses for hub agents. A viewport sits on a shared board until
an agent gazes at it. Only the watcher can see. Lattice vision seat on
pin `faces`. Implement on Origin.

## Contract

- Package: `genesis-eyes`
- Lattice node: `vision`
- Pin: `faces`
- Lane: `LANE-ETH-PEER`
- Kind: `python.eyes`
- Protocol: `genesis-python-eyes/1`
- Gaze is exclusive (`look` / `blink` / `pass_to`)

## First commands (on Origin)

```bash
pip install -e ".[dev]"
pytest
python -m genesis_eyes list
python -m genesis_eyes demo
python -m genesis_eyes see lumen shelf
```

Default boards: desk/genesis, lane/sentinel, hud/mnemosyne, camera/forge,
world/atlas, shelf/lumen. Heuristic vision stays local; no LIVE without
a probe. Coordinate with `genesis-python-vision-84`.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not open another landing-pad queue
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
- Do not claim Superbrain LIVE from this card
