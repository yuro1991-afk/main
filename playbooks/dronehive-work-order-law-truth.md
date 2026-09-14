# Point work_order.json LAW_TRUTH at host/library

- id: `dronehive-work-order-law-truth`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-work-order-law-truth.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

configs/work_order.json ai_laws.rank_0.paths LAW_TRUTH.md still pins F:\GrokSelfLibrary. Use host/library. Portable-paths uses this line as context (title hunk) — apply this leftover after portable-paths. Leave the C:\ grok rules path. Seed copy is a later leftover.

## Collision

configs/work_order.json LAW_TRUTH.md path only. Do not edit the C:\ Users grok rules path. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-law-truth-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-law-truth.patch
- git apply /path/to/main/patches/dronehive-work-order-law-truth.patch

## Verify

configs/work_order.json rank_0.paths includes host/library/LAW_TRUTH.md.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
