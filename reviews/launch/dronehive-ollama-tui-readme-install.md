# Leftover unused — dronehive-ollama-tui-readme-install

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-ollama-tui-readme-install`
- launch: `reviews/launch/dronehive-ollama-tui-readme-install.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-ollama-tui-readme-install

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-ollama-tui-readme-install.patch`
- Job: `dronehive-ollama-tui-readme-install` — Point drone-ollama-tui README install path at host/ai-home
- Playbook: `playbooks/dronehive-ollama-tui-readme-install.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-ollama-tui-readme-install`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-ollama-tui-readme-install` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-tui/README.md').read_text(); assert r'host\\ai-home\\apps\\DroneOllama\\START_TUI.cmd' in t; assert r'G:\\AI-Home\\apps\\DroneOllama\\START_TUI.cmd' not in t"

## Notes

apps/drone-ollama-tui/README.md installed START_TUI.cmd still pins G:\\AI-Home\\apps\\DroneOllama. Applyable catalog patch is patches/dronehive-ollama-tui-readme-install.patch on main#9. Independent of ollama-tui-readme-cargo. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

apps/drone-ollama-tui/README.md installed START_TUI.cmd only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-ollama-tui-readme-install
- node src/cli.js patches --prove-after-apply --job dronehive-ollama-tui-readme-install
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-ollama-tui-readme-install-from-ops
- git apply --check /path/to/main/patches/dronehive-ollama-tui-readme-install.patch
- git apply /path/to/main/patches/dronehive-ollama-tui-readme-install.patch
- python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-tui/README.md').read_text(); assert r'host\\ai-home\\apps\\DroneOllama\\START_TUI.cmd' in t; assert r'G:\\AI-Home\\apps\\DroneOllama\\START_TUI.cmd' not in t"
- drone-ollama-tui README installed path uses host\\ai-home\\apps\\DroneOllama

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

