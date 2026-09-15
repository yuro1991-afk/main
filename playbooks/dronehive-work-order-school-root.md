# Point work_order.json helper-school paths at host/ai-center

- id: `dronehive-work-order-school-root`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-work-order-school-root.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

configs/work_order.json school_root / school_lessons_md still pin G:\AI-Center\helper-school. Use host/ai-center. Independent of portable-paths (codex_extra hunk) and live-registry. Seed copy is a later leftover.

## Collision

configs/work_order.json school_root / school_lessons_md only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-work-order-school-root
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-school-root-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-school-root.patch
- git apply /path/to/main/patches/dronehive-work-order-school-root.patch
- python3 -c "from pathlib import Path; import json; k=json.loads(Path('configs/work_order.json').read_text())['knowledge_imprint']; assert k['school_root']=='host/ai-center/helper-school' and k['school_lessons_md']=='host/ai-center/helper-school/library/lessons'"

## Verify

configs/work_order.json school_root is host/ai-center/helper-school and school_lessons_md is host/ai-center/helper-school/library/lessons.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
