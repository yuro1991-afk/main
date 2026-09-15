# Leftover unused — dronehive-seed-work-order-reference-db

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-seed-work-order-reference-db`
- launch: `reviews/launch/dronehive-seed-work-order-reference-db.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-seed-work-order-reference-db

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-seed-work-order-reference-db.patch`
- Job: `dronehive-seed-work-order-reference-db` — Point seed work_order.json reference_db at host/ai-center
- Playbook: `playbooks/dronehive-seed-work-order-reference-db.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-seed-work-order-reference-db`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-seed-work-order-reference-db` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; import json; k=json.loads(Path('drone/app/seed/configs/work_order.json').read_text())['knowledge_imprint']; assert k['reference_db']=='host/ai-center/databases/ai_center_reference.db'"

## Notes

drone/app/seed/configs/work_order.json reference_db still pins G:\\AI-Center\\databases. Applyable catalog patch is patches/dronehive-seed-work-order-reference-db.patch on main#9. -U1 so context skips school leftover. Independent of live leftover (different file). Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

Seed reference_db key only. Different file from configs/work_order.json. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-seed-work-order-reference-db
- node src/cli.js patches --prove-after-apply --job dronehive-seed-work-order-reference-db
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-seed-work-order-reference-db-from-ops
- git apply --check /path/to/main/patches/dronehive-seed-work-order-reference-db.patch
- git apply /path/to/main/patches/dronehive-seed-work-order-reference-db.patch
- python3 -c "from pathlib import Path; import json; k=json.loads(Path('drone/app/seed/configs/work_order.json').read_text())['knowledge_imprint']; assert k['reference_db']=='host/ai-center/databases/ai_center_reference.db'"
- drone/app/seed/configs/work_order.json reference_db is host/ai-center/databases/ai_center_reference.db.

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

