# Point multi_hosts.json G: exe paths at host/ai-center

- id: `dronehive-multi-hosts-exe-honesty`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-multi-hosts-exe-honesty.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

configs/multi_hosts.json supercell_muscle and everest exe still pin G:\AI-Center. Use host/ai-center. Independent of config-load-overlay (Python remap only) and future-seer-jane-honesty (different file). C:\ AppData hermes/openclaw/opencode exe leftovers stay for later. No seed copy of this file.

## Collision

configs/multi_hosts.json G: exe keys only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-multi-hosts-exe-honesty
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-multi-hosts-exe-honesty-from-ops
- git apply --check /path/to/main/patches/dronehive-multi-hosts-exe-honesty.patch
- git apply /path/to/main/patches/dronehive-multi-hosts-exe-honesty.patch
- python3 -c "from pathlib import Path; import json; hosts=json.loads(Path('configs/multi_hosts.json').read_text())['hosts']; by={h['id']:h for h in hosts}; assert by['supercell_muscle']['exe']=='host/ai-center/agents/super-cell-4/bridges/muscle_dispatch.py' and by['everest']['exe']=='host/ai-center/bridge/everest/cli.py'"

## Verify

configs/multi_hosts.json supercell_muscle.exe and everest.exe use host/ai-center.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
