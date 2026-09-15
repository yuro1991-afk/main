# Leftover unused — dronehive-work-order-open-tasks

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-work-order-open-tasks`
- launch: `reviews/launch/dronehive-work-order-open-tasks.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-work-order-open-tasks

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-work-order-open-tasks.patch`
- Job: `dronehive-work-order-open-tasks` — Point work_order.json open_tasks at host/continuous
- Playbook: `playbooks/dronehive-work-order-open-tasks.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-work-order-open-tasks`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-work-order-open-tasks` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; import json; assert json.loads(Path('configs/work_order.json').read_text())['ai_laws']['rank_5']['open_tasks']=='host/continuous/OPEN_TASKS.json'"

## Notes

configs/work_order.json rank_5.open_tasks still pins D:\\GrokCoreMemory. Applyable catalog patch is patches/dronehive-work-order-open-tasks.patch on main#9. Same host/continuous mapping as buzzer leftover. Independent of portable-paths, fabric-root, and buzzer leftover (different file). Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

configs/work_order.json open_tasks key only. Seed copy is a later leftover. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-work-order-open-tasks
- node src/cli.js patches --prove-after-apply --job dronehive-work-order-open-tasks
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-open-tasks-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-open-tasks.patch
- git apply /path/to/main/patches/dronehive-work-order-open-tasks.patch
- python3 -c "from pathlib import Path; import json; assert json.loads(Path('configs/work_order.json').read_text())['ai_laws']['rank_5']['open_tasks']=='host/continuous/OPEN_TASKS.json'"
- configs/work_order.json rank_5.open_tasks is host/continuous/OPEN_TASKS.json.

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

