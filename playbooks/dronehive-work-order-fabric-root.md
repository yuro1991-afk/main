# Point work_order.json fabric_root at the app root

- id: `dronehive-work-order-fabric-root`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-work-order-fabric-root.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

configs/work_order.json fabric_root still pins G:\AI-Home\projects\ai-worker-drone-0.5b. Use `.` (app root). Independent of portable-paths (later hunks only). Seed copy is a later leftover.

## Collision

fabric_root key only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-work-order-fabric-root
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-fabric-root-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-fabric-root.patch
- git apply /path/to/main/patches/dronehive-work-order-fabric-root.patch

## Verify

configs/work_order.json fabric_root is `.`.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
