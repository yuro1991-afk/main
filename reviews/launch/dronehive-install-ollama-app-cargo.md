# Leftover unused — dronehive-install-ollama-app-cargo

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-install-ollama-app-cargo`
- launch: `reviews/launch/dronehive-install-ollama-app-cargo.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-install-ollama-app-cargo

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-install-ollama-app-cargo.patch`
- Job: `dronehive-install-ollama-app-cargo` — Point Install-DroneOllamaApp cargo homes at host/ai-home
- Playbook: `playbooks/dronehive-install-ollama-app-cargo.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-install-ollama-app-cargo`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-install-ollama-app-cargo` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-app/installer/Install-DroneOllamaApp.ps1').read_text(); assert r'host\\ai-home\\tools\\cargo' in t; assert r'G:\\AI-Home\\tools\\cargo' not in t"

## Notes

Install-DroneOllamaApp.ps1 still pins G:\\AI-Home\\tools cargo/rustup. Applyable catalog patch is patches/dronehive-install-ollama-app-cargo.patch on main#9. Leaves InstallRoot / mountSrc / manifest G: leftovers. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

Install-DroneOllamaApp.ps1 cargo env only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-install-ollama-app-cargo
- node src/cli.js patches --prove-after-apply --job dronehive-install-ollama-app-cargo
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-install-ollama-app-cargo-from-ops
- git apply --check /path/to/main/patches/dronehive-install-ollama-app-cargo.patch
- git apply /path/to/main/patches/dronehive-install-ollama-app-cargo.patch
- python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-app/installer/Install-DroneOllamaApp.ps1').read_text(); assert r'host\\ai-home\\tools\\cargo' in t; assert r'G:\\AI-Home\\tools\\cargo' not in t"
- Install-DroneOllamaApp.ps1 cargo/rustup env uses host\\ai-home\\tools

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

