# Point docs/WORK_ORDER.md Board at host/continuous

- id: `dronehive-work-order-doc-board`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-work-order-doc-board.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

docs/WORK_ORDER.md Board still pins D:\GrokCoreMemory\continuous\OPEN_TASKS.json. Use host/continuous. Independent of the JSON open-tasks leftover (configs/work_order.json) and other WORK_ORDER.md leftovers. Seed copy is a later leftover.

## Collision

docs/WORK_ORDER.md Board line only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-work-order-doc-board
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-doc-board-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-doc-board.patch
- git apply /path/to/main/patches/dronehive-work-order-doc-board.patch
- python3 -c "from pathlib import Path; t=Path('docs/WORK_ORDER.md').read_text(); line=next(x for x in t.splitlines() if x.startswith('- Board:')); assert 'host/continuous' in line; assert r'D:\\GrokCoreMemory' not in line"

## Verify

docs/WORK_ORDER.md Board is host/continuous/OPEN_TASKS.json.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
