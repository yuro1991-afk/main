# Leftover unused — dronehive-work-order-doc-memory-recycle

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-work-order-doc-memory-recycle`
- launch: `reviews/launch/dronehive-work-order-doc-memory-recycle.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-work-order-doc-memory-recycle

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-work-order-doc-memory-recycle.patch`
- Job: `dronehive-work-order-doc-memory-recycle` — Point docs/WORK_ORDER.md memory_recycle at repo data/
- Playbook: `playbooks/dronehive-work-order-doc-memory-recycle.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-work-order-doc-memory-recycle`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-work-order-doc-memory-recycle` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('docs/WORK_ORDER.md').read_text(); assert 'data/hive/memory_recycle/' in t; assert r'G:\\AI-Home\\projects\\ai-worker-drone-0.5b\\data\\hive\\memory_recycle' not in t"

## Notes

docs/WORK_ORDER.md memory_recycle still pins G:\\AI-Home\\projects\\ai-worker-drone-0.5b\\data\\hive\\memory_recycle. Applyable catalog patch is patches/dronehive-work-order-doc-memory-recycle.patch on main#9. Use repo-relative data/hive/memory_recycle/. Independent of header fabric leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

docs/WORK_ORDER.md section 6.2 path only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-work-order-doc-memory-recycle
- node src/cli.js patches --prove-after-apply --job dronehive-work-order-doc-memory-recycle
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-doc-memory-recycle-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-doc-memory-recycle.patch
- git apply /path/to/main/patches/dronehive-work-order-doc-memory-recycle.patch
- python3 -c "from pathlib import Path; t=Path('docs/WORK_ORDER.md').read_text(); assert 'data/hive/memory_recycle/' in t; assert r'G:\\AI-Home\\projects\\ai-worker-drone-0.5b\\data\\hive\\memory_recycle' not in t"
- docs/WORK_ORDER.md memory_recycle path is data/hive/memory_recycle/.

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

