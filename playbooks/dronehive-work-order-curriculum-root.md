# Point work_order.json curriculum keys at host/ai-center

- id: `dronehive-work-order-curriculum-root`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-work-order-curriculum-root.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

configs/work_order.json curriculum_root / curriculum_json still pin G:\AI-Center. Use host/ai-center. `-U1` so context is codex_root / curriculum_fts and skips the school leftover. Independent of portable-paths, school-root, and knowledge-expand. Seed copy is a later leftover.

## Collision

configs/work_order.json curriculum_root / curriculum_json only. Do not edit curriculum_fts (sandwiched against school leftover). Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-curriculum-root-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-curriculum-root.patch
- git apply /path/to/main/patches/dronehive-work-order-curriculum-root.patch

## Verify

configs/work_order.json curriculum_root is host/ai-center/learning-curriculum and curriculum_json is host/ai-center/learning-curriculum/CURRICULUM.json.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
