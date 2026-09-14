# Point seed WORK_ORDER.md memory_recycle at repo data/

- id: `dronehive-seed-work-order-doc-memory-recycle`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-seed-work-order-doc-memory-recycle.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

drone/app/seed/docs/WORK_ORDER.md memory_recycle still pins G:\AI-Home\projects\ai-worker-drone-0.5b. Use repo-relative data/hive/memory_recycle/. Independent of live leftover (different file).

## Collision

Seed WORK_ORDER.md section 6.2 path only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-seed-work-order-doc-memory-recycle
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-seed-work-order-doc-memory-recycle-from-ops
- git apply --check /path/to/main/patches/dronehive-seed-work-order-doc-memory-recycle.patch
- git apply /path/to/main/patches/dronehive-seed-work-order-doc-memory-recycle.patch

## Verify

drone/app/seed/docs/WORK_ORDER.md memory_recycle path is data/hive/memory_recycle/.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
