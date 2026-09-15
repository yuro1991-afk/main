# Leftover unused — dronehive-start-super-mesh-cd

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-start-super-mesh-cd`
- launch: `reviews/launch/dronehive-start-super-mesh-cd.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-start-super-mesh-cd

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-start-super-mesh-cd.patch`
- Job: `dronehive-start-super-mesh-cd` — Point START_SUPER_MESH.bat cd at the script directory
- Playbook: `playbooks/dronehive-start-super-mesh-cd.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-start-super-mesh-cd`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-start-super-mesh-cd` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('START_SUPER_MESH.bat').read_text(); assert 'cd /d \"%~dp0\"' in t; assert r'cd /d G:\\AI-Home\\projects\\ai-worker-drone-0.5b' not in t"

## Notes

START_SUPER_MESH.bat still cds to G:\\AI-Home\\projects\\ai-worker-drone-0.5b. Applyable catalog patch is patches/dronehive-start-super-mesh-cd.patch on main#9. Independent of spec leftover and PYTHONPATH leftovers. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

START_SUPER_MESH.bat cd line only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-start-super-mesh-cd
- node src/cli.js patches --prove-after-apply --job dronehive-start-super-mesh-cd
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-start-super-mesh-cd-from-ops
- git apply --check /path/to/main/patches/dronehive-start-super-mesh-cd.patch
- git apply /path/to/main/patches/dronehive-start-super-mesh-cd.patch
- python3 -c "from pathlib import Path; t=Path('START_SUPER_MESH.bat').read_text(); assert 'cd /d \"%~dp0\"' in t; assert r'cd /d G:\\AI-Home\\projects\\ai-worker-drone-0.5b' not in t"
- START_SUPER_MESH.bat cds to %~dp0

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

