# Leftover unused — dronehive-work-order-live-mirror

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-work-order-live-mirror`
- launch: `reviews/launch/dronehive-work-order-live-mirror.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-work-order-live-mirror

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-work-order-live-mirror.patch`
- Job: `dronehive-work-order-live-mirror` — Point live_registry.mirror at host/library
- Playbook: `playbooks/dronehive-work-order-live-mirror.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-work-order-live-mirror`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-work-order-live-mirror` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; import json; r=json.loads(Path('configs/work_order.json').read_text())['live_registry']; assert r['mirror']=='host/library/registry'"

## Notes

configs/work_order.json still pins a host path. Applyable catalog patch is patches/dronehive-work-order-live-mirror.patch on main#9. live_registry.mirror uses host/library. -U1 trailing kind so it stacks after live-registry leftover. Independent of that leftover (mirror was context). Does not touch tool_agent.py. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

configs/work_order.json live_registry.mirror only. -U1 trailing kind. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-work-order-live-mirror
- node src/cli.js patches --prove-after-apply --job dronehive-work-order-live-mirror
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-live-mirror-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-live-mirror.patch
- git apply /path/to/main/patches/dronehive-work-order-live-mirror.patch
- python3 -c "from pathlib import Path; import json; r=json.loads(Path('configs/work_order.json').read_text())['live_registry']; assert r['mirror']=='host/library/registry'"
- work_order.json live_registry.mirror uses host/library/registry

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/dronehive — apply there

## Related

- #9 patch-catalog — Applyable sibling diffs under patches/. node src/cli.js patches lists them. Not an autofix runner.

