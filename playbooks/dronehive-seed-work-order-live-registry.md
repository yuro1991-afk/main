# Point seed work_order.json live_registry G: keys at host/ai-center

- id: `dronehive-seed-work-order-live-registry`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-seed-work-order-live-registry.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

drone/app/seed/configs/work_order.json live_registry cli/primary/events still pin G:\AI-Center. Use host/ai-center. Independent of live configs/work_order.json leftover (different file) and seed fabric-root. F:\ mirror leftover stays later.

## Collision

Seed live_registry G: keys only. Different file from configs/work_order.json. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-seed-work-order-live-registry
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-seed-work-order-live-registry-from-ops
- git apply --check /path/to/main/patches/dronehive-seed-work-order-live-registry.patch
- git apply /path/to/main/patches/dronehive-seed-work-order-live-registry.patch
- python3 -c "from pathlib import Path; import json; r=json.loads(Path('drone/app/seed/configs/work_order.json').read_text())['live_registry']; assert r['cli']=='host/ai-center/agents/super-cell-4/bridges/live_registry.py' and r['primary']=='host/ai-center/agents/super-cell-4/registry' and r['events']=='host/ai-center/agents/super-cell-4/registry/events.jsonl'"

## Verify

drone/app/seed/configs/work_order.json live_registry.cli/primary/events use host/ai-center.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
