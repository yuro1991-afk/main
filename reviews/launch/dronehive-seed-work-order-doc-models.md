# Leftover unused — dronehive-seed-work-order-doc-models

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-seed-work-order-doc-models`
- launch: `reviews/launch/dronehive-seed-work-order-doc-models.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-seed-work-order-doc-models

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-seed-work-order-doc-models.patch`
- Job: `dronehive-seed-work-order-doc-models` — Point seed WORK_ORDER.md models install-proof path at host/ai-home
- Playbook: `playbooks/dronehive-seed-work-order-doc-models.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-seed-work-order-doc-models`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-seed-work-order-doc-models` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('drone/app/seed/docs/WORK_ORDER.md').read_text(); assert 'host/ai-home/models' in t"

## Notes

drone/app/seed/docs/WORK_ORDER.md install-proof line still pins G:\\AI-Home\\models. Applyable catalog patch is patches/dronehive-seed-work-order-doc-models.patch on main#9. Independent of live leftover (different file). Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

Seed WORK_ORDER.md section 2.4 item 6 only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-seed-work-order-doc-models
- node src/cli.js patches --prove-after-apply --job dronehive-seed-work-order-doc-models
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-seed-work-order-doc-models-from-ops
- git apply --check /path/to/main/patches/dronehive-seed-work-order-doc-models.patch
- git apply /path/to/main/patches/dronehive-seed-work-order-doc-models.patch
- python3 -c "from pathlib import Path; t=Path('drone/app/seed/docs/WORK_ORDER.md').read_text(); assert 'host/ai-home/models' in t"
- drone/app/seed/docs/WORK_ORDER.md install-proof line uses host/ai-home/models.

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

