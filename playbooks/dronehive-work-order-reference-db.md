# Point work_order.json reference_db at host/ai-center

- id: `dronehive-work-order-reference-db`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-work-order-reference-db.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

configs/work_order.json reference_db still pins G:\AI-Center\databases. Use host/ai-center. `-U1` so context skips the school leftover. Independent of portable-paths, live-registry, and school-root. Seed copy is a later leftover.

## Collision

configs/work_order.json reference_db key only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-work-order-reference-db
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-reference-db-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-reference-db.patch
- git apply /path/to/main/patches/dronehive-work-order-reference-db.patch

## Verify

configs/work_order.json reference_db is host/ai-center/databases/ai_center_reference.db.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
