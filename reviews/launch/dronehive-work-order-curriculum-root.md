# Leftover unused — dronehive-work-order-curriculum-root

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-work-order-curriculum-root`
- launch: `reviews/launch/dronehive-work-order-curriculum-root.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-work-order-curriculum-root

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-work-order-curriculum-root.patch`
- Job: `dronehive-work-order-curriculum-root` — Point work_order.json curriculum keys at host/ai-center
- Playbook: `playbooks/dronehive-work-order-curriculum-root.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-work-order-curriculum-root`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-work-order-curriculum-root` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; import json; k=json.loads(Path('configs/work_order.json').read_text())['knowledge_imprint']; assert k['curriculum_root']=='host/ai-center/learning-curriculum' and k['curriculum_json']=='host/ai-center/learning-curriculum/CURRICULUM.json'"

## Notes

configs/work_order.json curriculum_root / curriculum_json still pin G:\\AI-Center. Applyable catalog patch is patches/dronehive-work-order-curriculum-root.patch on main#9. -U1 so context is codex_root / curriculum_fts and skips school leftover. Independent of portable-paths, school-root, and knowledge-expand. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

configs/work_order.json curriculum_root / curriculum_json only. Seed copy is a later leftover. Do not edit curriculum_fts. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-work-order-curriculum-root
- node src/cli.js patches --prove-after-apply --job dronehive-work-order-curriculum-root
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-curriculum-root-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-curriculum-root.patch
- git apply /path/to/main/patches/dronehive-work-order-curriculum-root.patch
- python3 -c "from pathlib import Path; import json; k=json.loads(Path('configs/work_order.json').read_text())['knowledge_imprint']; assert k['curriculum_root']=='host/ai-center/learning-curriculum' and k['curriculum_json']=='host/ai-center/learning-curriculum/CURRICULUM.json'"
- configs/work_order.json curriculum_root is host/ai-center/learning-curriculum and curriculum_json is host/ai-center/learning-curriculum/CURRICULUM.json.

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

