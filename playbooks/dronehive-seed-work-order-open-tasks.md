# Point seed work_order.json open_tasks at host/continuous

- id: `dronehive-seed-work-order-open-tasks`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-seed-work-order-open-tasks.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

drone/app/seed/configs/work_order.json rank_5.open_tasks still pins D:\GrokCoreMemory. Use host/continuous. Independent of live leftover (different file).

## Collision

Seed open_tasks key only. Different file from configs/work_order.json. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-seed-work-order-open-tasks-from-ops
- git apply --check /path/to/main/patches/dronehive-seed-work-order-open-tasks.patch
- git apply /path/to/main/patches/dronehive-seed-work-order-open-tasks.patch

## Verify

drone/app/seed/configs/work_order.json rank_5.open_tasks is host/continuous/OPEN_TASKS.json.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
