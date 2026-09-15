# Point future_seer.json jane paths at host/ai-center

- id: `dronehive-future-seer-jane-honesty`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-future-seer-jane-honesty.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

configs/future_seer.json jane.* still pins G:\AI-Center. Use host/ai-center. Independent of config-load-overlay (Python remap only) and runtime-host-paths (future_seer.py Path wraps). No seed copy of this file.

## Collision

configs/future_seer.json jane keys only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-future-seer-jane-honesty
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-future-seer-jane-honesty-from-ops
- git apply --check /path/to/main/patches/dronehive-future-seer-jane-honesty.patch
- git apply /path/to/main/patches/dronehive-future-seer-jane-honesty.patch
- python3 -c "from pathlib import Path; import json; d=json.loads(Path('configs/future_seer.json').read_text()); assert d['jane']['super_cell'] == 'host/ai-center/agents/super-cell-4' and d['jane']['pythonpath_ai_center'] == 'host/ai-center'"

## Verify

configs/future_seer.json jane.super_cell is host/ai-center/agents/super-cell-4 and pythonpath_ai_center is host/ai-center.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
