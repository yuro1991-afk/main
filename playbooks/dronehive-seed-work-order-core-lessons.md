# Point seed knowledge_imprint.core_lessons at host/core-memory

- id: `dronehive-seed-work-order-core-lessons`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-seed-work-order-core-lessons.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

drone/app/seed/configs/work_order.json knowledge_imprint.core_lessons still pins D:\GrokCoreMemory. Use host/core-memory. Independent of the live leftover (different file).

## Collision

seed work_order.json knowledge_imprint.core_lessons only. -U1 trailing cache_rel. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-seed-work-order-core-lessons
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-seed-work-order-core-lessons-from-ops
- git apply --check /path/to/main/patches/dronehive-seed-work-order-core-lessons.patch
- git apply /path/to/main/patches/dronehive-seed-work-order-core-lessons.patch
- python3 -c "from pathlib import Path; import json; k=json.loads(Path('drone/app/seed/configs/work_order.json').read_text())['knowledge_imprint']; assert k['core_lessons']=='host/core-memory/lessons'"

## Verify

seed work_order.json knowledge_imprint.core_lessons is host/core-memory/lessons.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
