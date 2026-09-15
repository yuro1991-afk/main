# Leftover unused — dronehive-install-ollama-uninstall-root

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-install-ollama-uninstall-root`
- launch: `reviews/launch/dronehive-install-ollama-uninstall-root.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-install-ollama-uninstall-root

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-install-ollama-uninstall-root.patch`
- Job: `dronehive-install-ollama-uninstall-root` — Point Install-DroneOllamaApp uninstall root at host/ai-home
- Playbook: `playbooks/dronehive-install-ollama-uninstall-root.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-install-ollama-uninstall-root`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-install-ollama-uninstall-root` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-app/installer/Install-DroneOllamaApp.ps1').read_text(); assert r'InstallRoot = \"host\\ai-home\\apps\\DroneOllama\"' in t"

## Notes

Install-DroneOllamaApp.ps1 uninstall here-string still pins G:\\AI-Home\\apps\\DroneOllama. Applyable catalog patch is patches/dronehive-install-ollama-uninstall-root.patch on main#9. Independent of live $InstallRoot leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

Install-DroneOllamaApp.ps1 uninstall here-string $InstallRoot only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-install-ollama-uninstall-root
- node src/cli.js patches --prove-after-apply --job dronehive-install-ollama-uninstall-root
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-install-ollama-uninstall-root-from-ops
- git apply --check /path/to/main/patches/dronehive-install-ollama-uninstall-root.patch
- git apply /path/to/main/patches/dronehive-install-ollama-uninstall-root.patch
- python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-app/installer/Install-DroneOllamaApp.ps1').read_text(); assert r'InstallRoot = \"host\\ai-home\\apps\\DroneOllama\"' in t"
- uninstall here-string InstallRoot uses host\\ai-home\\apps\\DroneOllama

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

