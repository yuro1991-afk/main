# Point docs/WORK_ORDER.md memory_recycle at repo data/

- id: `dronehive-work-order-doc-memory-recycle`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-work-order-doc-memory-recycle.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

docs/WORK_ORDER.md memory_recycle still pins G:\AI-Home\projects\ai-worker-drone-0.5b. Use repo-relative data/hive/memory_recycle/. Independent of header fabric leftover.

## Collision

docs/WORK_ORDER.md section 6.2 path only. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-doc-memory-recycle-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-doc-memory-recycle.patch
- git apply /path/to/main/patches/dronehive-work-order-doc-memory-recycle.patch

## Verify

docs/WORK_ORDER.md memory_recycle path is data/hive/memory_recycle/.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
