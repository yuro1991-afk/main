# Leftover unused — dronehive-seed-work-order-doc-board

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-seed-work-order-doc-board`
- launch: `reviews/launch/dronehive-seed-work-order-doc-board.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-seed-work-order-doc-board

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-seed-work-order-doc-board.patch`
- Job: `dronehive-seed-work-order-doc-board` — Point seed WORK_ORDER.md Board at host/continuous
- Playbook: `playbooks/dronehive-seed-work-order-doc-board.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-seed-work-order-doc-board`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-seed-work-order-doc-board` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('drone/app/seed/docs/WORK_ORDER.md').read_text(); line=next(x for x in t.splitlines() if x.startswith('- Board:')); assert 'host/continuous' in line; assert r'D:\\GrokCoreMemory' not in line"

## Notes

seed WORK_ORDER.md Board still pins D:\\GrokCoreMemory\\continuous\\OPEN_TASKS.json. Applyable catalog patch is patches/dronehive-seed-work-order-doc-board.patch on main#9. Independent of live leftover (different file). Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

seed WORK_ORDER.md Board line only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-seed-work-order-doc-board
- node src/cli.js patches --prove-after-apply --job dronehive-seed-work-order-doc-board
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-seed-work-order-doc-board-from-ops
- git apply --check /path/to/main/patches/dronehive-seed-work-order-doc-board.patch
- git apply /path/to/main/patches/dronehive-seed-work-order-doc-board.patch
- python3 -c "from pathlib import Path; t=Path('drone/app/seed/docs/WORK_ORDER.md').read_text(); line=next(x for x in t.splitlines() if x.startswith('- Board:')); assert 'host/continuous' in line; assert r'D:\\GrokCoreMemory' not in line"
- drone/app/seed/docs/WORK_ORDER.md Board is host/continuous/OPEN_TASKS.json

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

