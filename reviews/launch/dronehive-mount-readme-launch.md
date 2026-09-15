# Leftover unused — dronehive-mount-readme-launch

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-mount-readme-launch`
- launch: `reviews/launch/dronehive-mount-readme-launch.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-mount-readme-launch

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-mount-readme-launch.patch`
- Job: `dronehive-mount-readme-launch` — Point mount README Launch.ps1 at apps/drone-ollama-mount
- Playbook: `playbooks/dronehive-mount-readme-launch.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-mount-readme-launch`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-mount-readme-launch` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-mount/README.md').read_text(); assert r'File apps\\drone-ollama-mount\\Launch.ps1' in t; assert r'File G:\\AI-Home\\projects\\drone-ollama-mount\\Launch.ps1' not in t"

## Notes

apps/drone-ollama-mount/README.md Launch.ps1 still pins G:\\AI-Home\\projects\\drone-ollama-mount. Applyable catalog patch is patches/dronehive-mount-readme-launch.patch on main#9. Independent of cargo leftover and layout leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

apps/drone-ollama-mount/README.md Launch.ps1 line only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-mount-readme-launch
- node src/cli.js patches --prove-after-apply --job dronehive-mount-readme-launch
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-mount-readme-launch-from-ops
- git apply --check /path/to/main/patches/dronehive-mount-readme-launch.patch
- git apply /path/to/main/patches/dronehive-mount-readme-launch.patch
- python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-mount/README.md').read_text(); assert r'File apps\\drone-ollama-mount\\Launch.ps1' in t; assert r'File G:\\AI-Home\\projects\\drone-ollama-mount\\Launch.ps1' not in t"
- mount README Launch.ps1 uses apps\\drone-ollama-mount\\Launch.ps1

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

