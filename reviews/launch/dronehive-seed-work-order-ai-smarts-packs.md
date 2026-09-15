# Leftover unused — dronehive-seed-work-order-ai-smarts-packs

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-seed-work-order-ai-smarts-packs`
- launch: `reviews/launch/dronehive-seed-work-order-ai-smarts-packs.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-seed-work-order-ai-smarts-packs

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-seed-work-order-ai-smarts-packs.patch`
- Job: `dronehive-seed-work-order-ai-smarts-packs` — Point seed knowledge_imprint.ai_smarts_packs at host/ai-home
- Playbook: `playbooks/dronehive-seed-work-order-ai-smarts-packs.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-seed-work-order-ai-smarts-packs`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-seed-work-order-ai-smarts-packs` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; import json; k=json.loads(Path('drone/app/seed/configs/work_order.json').read_text())['knowledge_imprint']; assert k['ai_smarts_packs']=='host/ai-home/docs/ai-smarts/packs'"

## Notes

drone/app/seed/configs/work_order.json still pins a host path. Applyable catalog patch is patches/dronehive-seed-work-order-ai-smarts-packs.patch on main#9. seed knowledge_imprint.ai_smarts_packs uses host/ai-home. -U1 trailing knowledge_pack_min. Independent of configs leftover (different file). Does not touch tool_agent.py. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

seed work_order.json knowledge_imprint.ai_smarts_packs only. -U1 trailing knowledge_pack_min. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-seed-work-order-ai-smarts-packs
- node src/cli.js patches --prove-after-apply --job dronehive-seed-work-order-ai-smarts-packs
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-seed-work-order-ai-smarts-packs-from-ops
- git apply --check /path/to/main/patches/dronehive-seed-work-order-ai-smarts-packs.patch
- git apply /path/to/main/patches/dronehive-seed-work-order-ai-smarts-packs.patch
- python3 -c "from pathlib import Path; import json; k=json.loads(Path('drone/app/seed/configs/work_order.json').read_text())['knowledge_imprint']; assert k['ai_smarts_packs']=='host/ai-home/docs/ai-smarts/packs'"
- seed work_order.json knowledge_imprint.ai_smarts_packs uses host/ai-home/docs/ai-smarts/packs

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

