# Leftover unused — dronehive-seed-work-order-doc-fabric-root

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-seed-work-order-doc-fabric-root`
- launch: `reviews/launch/dronehive-seed-work-order-doc-fabric-root.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-seed-work-order-doc-fabric-root

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-seed-work-order-doc-fabric-root.patch`
- Job: `dronehive-seed-work-order-doc-fabric-root` — Point seed WORK_ORDER.md header fabric at repo root
- Playbook: `playbooks/dronehive-seed-work-order-doc-fabric-root.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-seed-work-order-doc-fabric-root`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-seed-work-order-doc-fabric-root` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('drone/app/seed/docs/WORK_ORDER.md').read_text(); line=next(x for x in t.splitlines() if x.startswith('**Host:**')); assert 'fabric' in line; assert 'AI-Home' not in line"

## Notes

drone/app/seed/docs/WORK_ORDER.md header fabric still pins G:\\AI-Home\\projects\\ai-worker-drone-0.5b. Applyable catalog patch is patches/dronehive-seed-work-order-doc-fabric-root.patch on main#9. Independent of live leftover (different file) and seed-work-order-doc-honesty (NEXT.json). Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

Seed WORK_ORDER.md header fabric line only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-seed-work-order-doc-fabric-root
- node src/cli.js patches --prove-after-apply --job dronehive-seed-work-order-doc-fabric-root
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-seed-work-order-doc-fabric-root-from-ops
- git apply --check /path/to/main/patches/dronehive-seed-work-order-doc-fabric-root.patch
- git apply /path/to/main/patches/dronehive-seed-work-order-doc-fabric-root.patch
- python3 -c "from pathlib import Path; t=Path('drone/app/seed/docs/WORK_ORDER.md').read_text(); line=next(x for x in t.splitlines() if x.startswith('**Host:**')); assert 'fabric' in line; assert 'AI-Home' not in line"
- drone/app/seed/docs/WORK_ORDER.md Host fabric line has no AI-Home.

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

