# Point work_order.json knowledge_expand at host/library

- id: `dronehive-work-order-knowledge-expand`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-work-order-knowledge-expand.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

configs/work_order.json knowledge_expand still pins F:\GrokSelfLibrary. Use host/library. `-U1` so context skips the reference_db leftover. Independent of portable-paths, school-root, and reference-db. Seed copy is a later leftover.

## Collision

configs/work_order.json knowledge_expand key only. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-knowledge-expand-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-knowledge-expand.patch
- git apply /path/to/main/patches/dronehive-work-order-knowledge-expand.patch

## Verify

configs/work_order.json knowledge_expand is host/library/knowledge/expand.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
