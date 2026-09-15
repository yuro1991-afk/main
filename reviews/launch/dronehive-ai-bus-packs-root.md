# Leftover unused — dronehive-ai-bus-packs-root

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-ai-bus-packs-root`
- launch: `reviews/launch/dronehive-ai-bus-packs-root.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-ai-bus-packs-root

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-ai-bus-packs-root.patch`
- Job: `dronehive-ai-bus-packs-root` — Point ai_bus packs_root at host/ai-home
- Playbook: `playbooks/dronehive-ai-bus-packs-root.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-ai-bus-packs-root`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-ai-bus-packs-root` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('drone/ai_bus.py').read_text(); line=next(x for x in t.splitlines() if 'packs_root' in x); assert 'host/ai-home/docs/ai-smarts/packs' in line; assert r'G:\\AI-Home' not in line"

## Notes

ai_bus.py _write_ai_smarts packs_root still pins G:\\AI-Home. Applyable catalog patch is patches/dronehive-ai-bus-packs-root.patch on main#9. Independent of portable-paths g_mirror wrap. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

drone/ai_bus.py _write_ai_smarts packs_root only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-ai-bus-packs-root
- node src/cli.js patches --prove-after-apply --job dronehive-ai-bus-packs-root
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-ai-bus-packs-root-from-ops
- git apply --check /path/to/main/patches/dronehive-ai-bus-packs-root.patch
- git apply /path/to/main/patches/dronehive-ai-bus-packs-root.patch
- python3 -c "from pathlib import Path; t=Path('drone/ai_bus.py').read_text(); line=next(x for x in t.splitlines() if 'packs_root' in x); assert 'host/ai-home/docs/ai-smarts/packs' in line; assert r'G:\\AI-Home' not in line"
- ai_bus.py packs_root uses host/ai-home/docs/ai-smarts/packs

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

