# Point work_order.json open_tasks at host/continuous

- id: `dronehive-work-order-open-tasks`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-work-order-open-tasks.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

configs/work_order.json rank_5.open_tasks still pins D:\GrokCoreMemory. Use host/continuous (same as buzzer_hive continuous_tasks). Independent of portable-paths, fabric-root, and buzzer leftover (different file). Seed copy is a later leftover.

## Collision

configs/work_order.json open_tasks key only. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-open-tasks-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-open-tasks.patch
- git apply /path/to/main/patches/dronehive-work-order-open-tasks.patch

## Verify

configs/work_order.json rank_5.open_tasks is host/continuous/OPEN_TASKS.json.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
