# Point seed work_order.json helper-school paths at host/ai-center

- id: `dronehive-seed-work-order-school-root`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-seed-work-order-school-root.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

drone/app/seed/configs/work_order.json school_root / school_lessons_md still pin G:\AI-Center\helper-school. Use host/ai-center. Independent of live configs/work_order.json leftover (different file).

## Collision

Seed school_root / school_lessons_md only. Different file from configs/work_order.json. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-seed-work-order-school-root
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-seed-work-order-school-root-from-ops
- git apply --check /path/to/main/patches/dronehive-seed-work-order-school-root.patch
- git apply /path/to/main/patches/dronehive-seed-work-order-school-root.patch

## Verify

drone/app/seed/configs/work_order.json school_root is host/ai-center/helper-school.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
