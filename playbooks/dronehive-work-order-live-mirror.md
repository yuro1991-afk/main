# Point live_registry.mirror at host/library

- id: `dronehive-work-order-live-mirror`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-work-order-live-mirror.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

configs/work_order.json live_registry.mirror still pins F:\GrokSelfLibrary. Use host/library. -U1 trailing kind so it stacks after the live-registry leftover (that leftover leaves mirror as context).

## Collision

configs/work_order.json live_registry.mirror only. -U1 trailing kind. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-work-order-live-mirror
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-live-mirror-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-live-mirror.patch
- git apply /path/to/main/patches/dronehive-work-order-live-mirror.patch
- python3 -c "from pathlib import Path; import json; r=json.loads(Path('configs/work_order.json').read_text())['live_registry']; assert r['mirror']=='host/library/registry'"

## Verify

configs/work_order.json live_registry.mirror is host/library/registry.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
