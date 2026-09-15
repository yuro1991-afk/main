# Leftover unused — dronehive-work-order-registry-cli

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-work-order-registry-cli`
- launch: `reviews/launch/dronehive-work-order-registry-cli.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-work-order-registry-cli

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-work-order-registry-cli.patch`
- Job: `dronehive-work-order-registry-cli` — Point work_order live_registry CLI fallback at host/ai-center
- Playbook: `playbooks/dronehive-work-order-registry-cli.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-work-order-registry-cli`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-work-order-registry-cli` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('drone/work_order.py').read_text(); line=next(x for x in t.splitlines() if 'or r' in x and 'live_registry.py' in x); assert 'host/ai-center' in line; assert r'G:\\AI-Center' not in line"

## Notes

work_order.py live_registry CLI fallback still pins G:\\AI-Center. Applyable catalog patch is patches/dronehive-work-order-registry-cli.patch on main#9. Independent of portable-paths query_codex wraps and JSON live-registry leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

drone/work_order.py write_live_registry CLI fallback only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-work-order-registry-cli
- node src/cli.js patches --prove-after-apply --job dronehive-work-order-registry-cli
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-registry-cli-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-registry-cli.patch
- git apply /path/to/main/patches/dronehive-work-order-registry-cli.patch
- python3 -c "from pathlib import Path; t=Path('drone/work_order.py').read_text(); line=next(x for x in t.splitlines() if 'or r' in x and 'live_registry.py' in x); assert 'host/ai-center' in line; assert r'G:\\AI-Center' not in line"
- work_order.py live_registry CLI fallback uses host/ai-center

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

