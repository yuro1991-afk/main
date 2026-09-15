# Leftover unused — dronehive-doc-bridge-1080-cd

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-doc-bridge-1080-cd`
- launch: `reviews/launch/dronehive-doc-bridge-1080-cd.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-doc-bridge-1080-cd

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-doc-bridge-1080-cd.patch`
- Job: `dronehive-doc-bridge-1080-cd` — Point BRIDGE_1080.md swarm cd at repo root
- Playbook: `playbooks/dronehive-doc-bridge-1080-cd.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-doc-bridge-1080-cd`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-doc-bridge-1080-cd` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('docs/BRIDGE_1080.md').read_text(); assert '\ncd .\n' in t; assert r'cd G:\\AI-Home\\projects\\ai-worker-drone-0.5b' not in t"

## Notes

docs/BRIDGE_1080.md still pins G:\\AI-Home cd. Applyable catalog patch is patches/dronehive-doc-bridge-1080-cd.patch on main#9. Independent of work-order-doc-cd. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

docs/BRIDGE_1080.md cd line only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-doc-bridge-1080-cd
- node src/cli.js patches --prove-after-apply --job dronehive-doc-bridge-1080-cd
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-doc-bridge-1080-cd-from-ops
- git apply --check /path/to/main/patches/dronehive-doc-bridge-1080-cd.patch
- git apply /path/to/main/patches/dronehive-doc-bridge-1080-cd.patch
- python3 -c "from pathlib import Path; t=Path('docs/BRIDGE_1080.md').read_text(); assert '\ncd .\n' in t; assert r'cd G:\\AI-Home\\projects\\ai-worker-drone-0.5b' not in t"
- docs/BRIDGE_1080.md cd is .

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

