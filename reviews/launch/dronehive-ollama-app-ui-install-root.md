# Leftover unused — dronehive-ollama-app-ui-install-root

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-ollama-app-ui-install-root`
- launch: `reviews/launch/dronehive-ollama-app-ui-install-root.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-ollama-app-ui-install-root

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-ollama-app-ui-install-root.patch`
- Job: `dronehive-ollama-app-ui-install-root` — Point drone-ollama-app UI install root at host/ai-home
- Playbook: `playbooks/dronehive-ollama-app-ui-install-root.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-ollama-app-ui-install-root`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-ollama-app-ui-install-root` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-app/src/main.rs').read_text(); line=next(x for x in t.splitlines() if x.strip().startswith('ui.small') and 'DroneOllama' in x); assert r'host\\ai-home' in line; assert r'G:\\AI-Home' not in line"

## Notes

main.rs UI install root still pins G:\\AI-Home\\apps. Applyable catalog patch is patches/dronehive-ollama-app-ui-install-root.patch on main#9. Independent of crash-log leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

apps/drone-ollama-app/src/main.rs UI install-root small() only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-ollama-app-ui-install-root
- node src/cli.js patches --prove-after-apply --job dronehive-ollama-app-ui-install-root
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-ollama-app-ui-install-root-from-ops
- git apply --check /path/to/main/patches/dronehive-ollama-app-ui-install-root.patch
- git apply /path/to/main/patches/dronehive-ollama-app-ui-install-root.patch
- python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-app/src/main.rs').read_text(); line=next(x for x in t.splitlines() if x.strip().startswith('ui.small') and 'DroneOllama' in x); assert r'host\\ai-home' in line; assert r'G:\\AI-Home' not in line"
- main.rs UI install root uses host\\ai-home

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

