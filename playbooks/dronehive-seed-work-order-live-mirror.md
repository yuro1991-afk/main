# Point seed live_registry.mirror at host/library

- id: `dronehive-seed-work-order-live-mirror`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-seed-work-order-live-mirror.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

drone/app/seed/configs/work_order.json live_registry.mirror still pins F:\GrokSelfLibrary. Use host/library. Independent of the live leftover (different file).

## Collision

seed work_order.json live_registry.mirror only. -U1 trailing kind. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-seed-work-order-live-mirror
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-seed-work-order-live-mirror-from-ops
- git apply --check /path/to/main/patches/dronehive-seed-work-order-live-mirror.patch
- git apply /path/to/main/patches/dronehive-seed-work-order-live-mirror.patch

## Verify

seed work_order.json live_registry.mirror is host/library/registry.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
