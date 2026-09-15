# Leftover unused — dronehive-seed-work-order-doc-live-registry

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-seed-work-order-doc-live-registry`
- launch: `reviews/launch/dronehive-seed-work-order-doc-live-registry.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-seed-work-order-doc-live-registry

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-seed-work-order-doc-live-registry.patch`
- Job: `dronehive-seed-work-order-doc-live-registry` — Point seed WORK_ORDER.md live-registry paths at host roots
- Playbook: `playbooks/dronehive-seed-work-order-doc-live-registry.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-seed-work-order-doc-live-registry`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-seed-work-order-doc-live-registry` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('drone/app/seed/docs/WORK_ORDER.md').read_text(); assert 'host/ai-center/agents/super-cell-4/registry/' in t; assert 'host/library/registry/' in t; assert 'host/ai-center/agents/super-cell-4/bridges/live_registry.py' in t"

## Notes

drone/app/seed/docs/WORK_ORDER.md live-registry table and $reg still pin G:\\AI-Center and F:\\GrokSelfLibrary. Applyable catalog patch is patches/dronehive-seed-work-order-doc-live-registry.patch on main#9. Independent of live leftover (different file). Leave Events/HOT relative. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

Seed WORK_ORDER.md live-registry table + $reg only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-seed-work-order-doc-live-registry
- node src/cli.js patches --prove-after-apply --job dronehive-seed-work-order-doc-live-registry
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-seed-work-order-doc-live-registry-from-ops
- git apply --check /path/to/main/patches/dronehive-seed-work-order-doc-live-registry.patch
- git apply /path/to/main/patches/dronehive-seed-work-order-doc-live-registry.patch
- python3 -c "from pathlib import Path; t=Path('drone/app/seed/docs/WORK_ORDER.md').read_text(); assert 'host/ai-center/agents/super-cell-4/registry/' in t; assert 'host/library/registry/' in t; assert 'host/ai-center/agents/super-cell-4/bridges/live_registry.py' in t"
- drone/app/seed/docs/WORK_ORDER.md live-registry Primary/Mirror/CLI and registry CLI paths use host/ai-center and host/library.

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

