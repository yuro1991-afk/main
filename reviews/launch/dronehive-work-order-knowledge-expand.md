# Leftover unused — dronehive-work-order-knowledge-expand

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-work-order-knowledge-expand`
- launch: `reviews/launch/dronehive-work-order-knowledge-expand.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-work-order-knowledge-expand

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-work-order-knowledge-expand.patch`
- Job: `dronehive-work-order-knowledge-expand` — Point work_order.json knowledge_expand at host/library
- Playbook: `playbooks/dronehive-work-order-knowledge-expand.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-work-order-knowledge-expand`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-work-order-knowledge-expand` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; import json; k=json.loads(Path('configs/work_order.json').read_text())['knowledge_imprint']; assert k['knowledge_expand']=='host/library/knowledge/expand'"

## Notes

configs/work_order.json knowledge_expand still pins F:\\GrokSelfLibrary. Applyable catalog patch is patches/dronehive-work-order-knowledge-expand.patch on main#9. -U1 so context skips reference_db leftover. Independent of portable-paths, school-root, and reference-db. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

configs/work_order.json knowledge_expand key only. Seed copy is a later leftover. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-work-order-knowledge-expand
- node src/cli.js patches --prove-after-apply --job dronehive-work-order-knowledge-expand
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-knowledge-expand-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-knowledge-expand.patch
- git apply /path/to/main/patches/dronehive-work-order-knowledge-expand.patch
- python3 -c "from pathlib import Path; import json; k=json.loads(Path('configs/work_order.json').read_text())['knowledge_imprint']; assert k['knowledge_expand']=='host/library/knowledge/expand'"
- configs/work_order.json knowledge_expand is host/library/knowledge/expand.

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

