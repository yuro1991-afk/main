# Leftover unused — dronehive-work-order-school-root

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-work-order-school-root`
- launch: `reviews/launch/dronehive-work-order-school-root.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-work-order-school-root

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-work-order-school-root.patch`
- Job: `dronehive-work-order-school-root` — Point work_order.json helper-school paths at host/ai-center
- Playbook: `playbooks/dronehive-work-order-school-root.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-work-order-school-root`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-work-order-school-root` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; import json; k=json.loads(Path('configs/work_order.json').read_text())['knowledge_imprint']; assert k['school_root']=='host/ai-center/helper-school' and k['school_lessons_md']=='host/ai-center/helper-school/library/lessons'"

## Notes

configs/work_order.json school_root / school_lessons_md still pin G:\\AI-Center\\helper-school. Applyable catalog patch is patches/dronehive-work-order-school-root.patch on main#9. Independent of portable-paths (codex_extra hunk) and live-registry. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

configs/work_order.json school_root / school_lessons_md only. Seed copy is a later leftover. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-work-order-school-root
- node src/cli.js patches --prove-after-apply --job dronehive-work-order-school-root
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-school-root-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-school-root.patch
- git apply /path/to/main/patches/dronehive-work-order-school-root.patch
- python3 -c "from pathlib import Path; import json; k=json.loads(Path('configs/work_order.json').read_text())['knowledge_imprint']; assert k['school_root']=='host/ai-center/helper-school' and k['school_lessons_md']=='host/ai-center/helper-school/library/lessons'"
- configs/work_order.json school_root is host/ai-center/helper-school and school_lessons_md is host/ai-center/helper-school/library/lessons.

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

