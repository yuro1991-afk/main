# Leftover unused — dronehive-seed-work-order-fabric-root

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-seed-work-order-fabric-root`
- launch: `reviews/launch/dronehive-seed-work-order-fabric-root.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-seed-work-order-fabric-root

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-seed-work-order-fabric-root.patch`
- Job: `dronehive-seed-work-order-fabric-root` — Point seed work_order.json fabric_root at the app root
- Playbook: `playbooks/dronehive-seed-work-order-fabric-root.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-seed-work-order-fabric-root`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-seed-work-order-fabric-root` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; import json; d=json.loads(Path('drone/app/seed/configs/work_order.json').read_text()); assert d['fabric_root'] == '.'"

## Notes

drone/app/seed/configs/work_order.json fabric_root still pins G:\\AI-Home\\projects\\ai-worker-drone-0.5b. Applyable catalog patch is patches/dronehive-seed-work-order-fabric-root.patch on main#9. Independent of live configs/work_order.json leftover (different file). Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

Seed fabric_root key only. Different file from configs/work_order.json. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-seed-work-order-fabric-root
- node src/cli.js patches --prove-after-apply --job dronehive-seed-work-order-fabric-root
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-seed-work-order-fabric-root-from-ops
- git apply --check /path/to/main/patches/dronehive-seed-work-order-fabric-root.patch
- git apply /path/to/main/patches/dronehive-seed-work-order-fabric-root.patch
- python3 -c "from pathlib import Path; import json; d=json.loads(Path('drone/app/seed/configs/work_order.json').read_text()); assert d['fabric_root'] == '.'"
- drone/app/seed/configs/work_order.json fabric_root is .

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

