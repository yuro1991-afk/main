# Leftover unused — dronehive-mount-readme-layout

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-mount-readme-layout`
- launch: `reviews/launch/dronehive-mount-readme-layout.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-mount-readme-layout

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-mount-readme-layout.patch`
- Job: `dronehive-mount-readme-layout` — Point mount README layout at repo-relative paths
- Playbook: `playbooks/dronehive-mount-readme-layout.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-mount-readme-layout`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-mount-readme-layout` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-mount/README.md').read_text(); assert r'apps\\drone-ollama-mount\\                      ← this engine' in t; assert r'.\\                                            ← 24 drones' in t; assert r'G:\\AI-Home\\projects\\ai-worker-drone-0.5b' not in t"

## Notes

apps/drone-ollama-mount/README.md layout still pins G:\\AI-Home projects. Applyable catalog patch is patches/dronehive-mount-readme-layout.patch on main#9. Independent of mount-readme-cargo. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

apps/drone-ollama-mount/README.md layout block only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-mount-readme-layout
- node src/cli.js patches --prove-after-apply --job dronehive-mount-readme-layout
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-mount-readme-layout-from-ops
- git apply --check /path/to/main/patches/dronehive-mount-readme-layout.patch
- git apply /path/to/main/patches/dronehive-mount-readme-layout.patch
- python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-mount/README.md').read_text(); assert r'apps\\drone-ollama-mount\\                      ← this engine' in t; assert r'.\\                                            ← 24 drones' in t; assert r'G:\\AI-Home\\projects\\ai-worker-drone-0.5b' not in t"
- mount README layout uses apps\\drone-ollama-mount and .

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

