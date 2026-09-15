# Leftover unused — dronehive-install-ollama-app-root

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-install-ollama-app-root`
- launch: `reviews/launch/dronehive-install-ollama-app-root.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-install-ollama-app-root

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-install-ollama-app-root.patch`
- Job: `dronehive-install-ollama-app-root` — Point Install-DroneOllamaApp InstallRoot at host/ai-home
- Playbook: `playbooks/dronehive-install-ollama-app-root.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-install-ollama-app-root`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-install-ollama-app-root` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-app/installer/Install-DroneOllamaApp.ps1').read_text(); assert r\"InstallRoot = 'host\\ai-home\\apps\\DroneOllama'\" in t"

## Notes

Install-DroneOllamaApp.ps1 $InstallRoot still pins G:\\AI-Home\\apps\\DroneOllama. Applyable catalog patch is patches/dronehive-install-ollama-app-root.patch on main#9. -U1 skips the cargo leftover. Leaves uninstall here-string. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

Install-DroneOllamaApp.ps1 $InstallRoot line only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-install-ollama-app-root
- node src/cli.js patches --prove-after-apply --job dronehive-install-ollama-app-root
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-install-ollama-app-root-from-ops
- git apply --check /path/to/main/patches/dronehive-install-ollama-app-root.patch
- git apply /path/to/main/patches/dronehive-install-ollama-app-root.patch
- python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-app/installer/Install-DroneOllamaApp.ps1').read_text(); assert r\"InstallRoot = 'host\\ai-home\\apps\\DroneOllama'\" in t"
- Install-DroneOllamaApp.ps1 InstallRoot uses host\\ai-home\\apps\\DroneOllama

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

