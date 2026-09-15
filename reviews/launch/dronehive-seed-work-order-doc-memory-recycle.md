# Leftover unused — dronehive-seed-work-order-doc-memory-recycle

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-seed-work-order-doc-memory-recycle`
- launch: `reviews/launch/dronehive-seed-work-order-doc-memory-recycle.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-seed-work-order-doc-memory-recycle

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-seed-work-order-doc-memory-recycle.patch`
- Job: `dronehive-seed-work-order-doc-memory-recycle` — Point seed WORK_ORDER.md memory_recycle at repo data/
- Playbook: `playbooks/dronehive-seed-work-order-doc-memory-recycle.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-seed-work-order-doc-memory-recycle`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-seed-work-order-doc-memory-recycle` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('drone/app/seed/docs/WORK_ORDER.md').read_text(); assert 'data/hive/memory_recycle/' in t; assert r'G:\\AI-Home\\projects\\ai-worker-drone-0.5b\\data\\hive\\memory_recycle' not in t"

## Notes

drone/app/seed/docs/WORK_ORDER.md memory_recycle still pins G:\\AI-Home\\projects\\ai-worker-drone-0.5b. Applyable catalog patch is patches/dronehive-seed-work-order-doc-memory-recycle.patch on main#9. Independent of live leftover (different file). Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

Seed WORK_ORDER.md section 6.2 path only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-seed-work-order-doc-memory-recycle
- node src/cli.js patches --prove-after-apply --job dronehive-seed-work-order-doc-memory-recycle
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-seed-work-order-doc-memory-recycle-from-ops
- git apply --check /path/to/main/patches/dronehive-seed-work-order-doc-memory-recycle.patch
- git apply /path/to/main/patches/dronehive-seed-work-order-doc-memory-recycle.patch
- python3 -c "from pathlib import Path; t=Path('drone/app/seed/docs/WORK_ORDER.md').read_text(); assert 'data/hive/memory_recycle/' in t; assert r'G:\\AI-Home\\projects\\ai-worker-drone-0.5b\\data\\hive\\memory_recycle' not in t"
- drone/app/seed/docs/WORK_ORDER.md memory_recycle path is data/hive/memory_recycle/.

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

