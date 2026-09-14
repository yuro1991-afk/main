# Point work_order.json live_registry G: keys at host/ai-center

- id: `dronehive-work-order-live-registry`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-work-order-live-registry.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

configs/work_order.json live_registry cli/primary/events still pin G:\AI-Center. Use host/ai-center. Independent of portable-paths (skill_tags / packet_recycle hunks) and fabric-root. F:\ mirror leftover stays later. Seed copy is a later leftover.

## Collision

configs/work_order.json live_registry G: keys only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-work-order-live-registry
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-live-registry-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-live-registry.patch
- git apply /path/to/main/patches/dronehive-work-order-live-registry.patch

## Verify

configs/work_order.json live_registry.cli/primary/events use host/ai-center. mirror stays F:\ for a later leftover.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
