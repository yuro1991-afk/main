# Leftover unused — dronehive-ollama-app-readme-install

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-ollama-app-readme-install`
- launch: `reviews/launch/dronehive-ollama-app-readme-install.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-ollama-app-readme-install

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-ollama-app-readme-install.patch`
- Job: `dronehive-ollama-app-readme-install` — Point drone-ollama-app README installer at repo-relative path
- Playbook: `playbooks/dronehive-ollama-app-readme-install.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-ollama-app-readme-install`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-ollama-app-readme-install` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-app/README.md').read_text(); assert r'File apps\\drone-ollama-app\\installer\\Install-DroneOllamaApp.ps1' in t; assert r'File G:\\AI-Home\\projects\\drone-ollama-app\\installer\\Install-DroneOllamaApp.ps1' not in t"

## Notes

apps/drone-ollama-app/README.md installer still pins G:\\AI-Home. Applyable catalog patch is patches/dronehive-ollama-app-readme-install.patch on main#9. Independent of dest leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

apps/drone-ollama-app/README.md installer line only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-ollama-app-readme-install
- node src/cli.js patches --prove-after-apply --job dronehive-ollama-app-readme-install
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-ollama-app-readme-install-from-ops
- git apply --check /path/to/main/patches/dronehive-ollama-app-readme-install.patch
- git apply /path/to/main/patches/dronehive-ollama-app-readme-install.patch
- python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-app/README.md').read_text(); assert r'File apps\\drone-ollama-app\\installer\\Install-DroneOllamaApp.ps1' in t; assert r'File G:\\AI-Home\\projects\\drone-ollama-app\\installer\\Install-DroneOllamaApp.ps1' not in t"
- drone-ollama-app README installer uses apps\\drone-ollama-app

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

