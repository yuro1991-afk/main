# Leftover unused — dronehive-seed-work-order-open-tasks

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-seed-work-order-open-tasks`
- launch: `reviews/launch/dronehive-seed-work-order-open-tasks.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-seed-work-order-open-tasks

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-seed-work-order-open-tasks.patch`
- Job: `dronehive-seed-work-order-open-tasks` — Point seed work_order.json open_tasks at host/continuous
- Playbook: `playbooks/dronehive-seed-work-order-open-tasks.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-seed-work-order-open-tasks`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-seed-work-order-open-tasks` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; import json; assert json.loads(Path('drone/app/seed/configs/work_order.json').read_text())['ai_laws']['rank_5']['open_tasks']=='host/continuous/OPEN_TASKS.json'"

## Notes

drone/app/seed/configs/work_order.json rank_5.open_tasks still pins D:\\GrokCoreMemory. Applyable catalog patch is patches/dronehive-seed-work-order-open-tasks.patch on main#9. Independent of live leftover (different file). Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

Seed open_tasks key only. Different file from configs/work_order.json. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-seed-work-order-open-tasks
- node src/cli.js patches --prove-after-apply --job dronehive-seed-work-order-open-tasks
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-seed-work-order-open-tasks-from-ops
- git apply --check /path/to/main/patches/dronehive-seed-work-order-open-tasks.patch
- git apply /path/to/main/patches/dronehive-seed-work-order-open-tasks.patch
- python3 -c "from pathlib import Path; import json; assert json.loads(Path('drone/app/seed/configs/work_order.json').read_text())['ai_laws']['rank_5']['open_tasks']=='host/continuous/OPEN_TASKS.json'"
- drone/app/seed/configs/work_order.json rank_5.open_tasks is host/continuous/OPEN_TASKS.json.

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

