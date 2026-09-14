# Point seed work_order.json LAW_TRUTH at host/library

- id: `dronehive-seed-work-order-law-truth`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-seed-work-order-law-truth.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

drone/app/seed/configs/work_order.json LAW_TRUTH.md still pins F:\GrokSelfLibrary. Use host/library. Independent of live leftover (different file). Leave the C:\ grok rules path.

## Collision

Seed LAW_TRUTH.md path only. Different file from configs/work_order.json. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-seed-work-order-law-truth
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-seed-work-order-law-truth-from-ops
- git apply --check /path/to/main/patches/dronehive-seed-work-order-law-truth.patch
- git apply /path/to/main/patches/dronehive-seed-work-order-law-truth.patch

## Verify

drone/app/seed/configs/work_order.json rank_0.paths includes host/library/LAW_TRUTH.md.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
