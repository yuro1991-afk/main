# Leftover unused — dronehive-doc-super-mesh-cd

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-doc-super-mesh-cd`
- launch: `reviews/launch/dronehive-doc-super-mesh-cd.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-doc-super-mesh-cd

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-doc-super-mesh-cd.patch`
- Job: `dronehive-doc-super-mesh-cd` — Point SUPER_MESH.md swarm cd at repo root
- Playbook: `playbooks/dronehive-doc-super-mesh-cd.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-doc-super-mesh-cd`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-doc-super-mesh-cd` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('docs/SUPER_MESH.md').read_text(); assert '\ncd .\n' in t; assert r'cd G:\\AI-Home\\projects\\ai-worker-drone-0.5b' not in t"

## Notes

docs/SUPER_MESH.md still pins G:\\AI-Home cd. Applyable catalog patch is patches/dronehive-doc-super-mesh-cd.patch on main#9. Independent of start-super-mesh-cd. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

docs/SUPER_MESH.md cd line only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-doc-super-mesh-cd
- node src/cli.js patches --prove-after-apply --job dronehive-doc-super-mesh-cd
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-doc-super-mesh-cd-from-ops
- git apply --check /path/to/main/patches/dronehive-doc-super-mesh-cd.patch
- git apply /path/to/main/patches/dronehive-doc-super-mesh-cd.patch
- python3 -c "from pathlib import Path; t=Path('docs/SUPER_MESH.md').read_text(); assert '\ncd .\n' in t; assert r'cd G:\\AI-Home\\projects\\ai-worker-drone-0.5b' not in t"
- docs/SUPER_MESH.md cd is .

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

