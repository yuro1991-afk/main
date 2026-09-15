# Leftover unused — dronehive-ollama-app-crash-log

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-ollama-app-crash-log`
- launch: `reviews/launch/dronehive-ollama-app-crash-log.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-ollama-app-crash-log

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-ollama-app-crash-log.patch`
- Job: `dronehive-ollama-app-crash-log` — Point drone-ollama-app crash log at host/ai-home
- Playbook: `playbooks/dronehive-ollama-app-crash-log.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-ollama-app-crash-log`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-ollama-app-crash-log` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-app/src/main.rs').read_text(); assert r'host\\ai-home\\apps\\DroneOllama\\logs\\crash.log' in t; assert r'G:\\AI-Home\\apps\\DroneOllama\\logs\\crash.log' not in t"

## Notes

main.rs crash_log_path still pins G:\\AI-Home\\apps. Applyable catalog patch is patches/dronehive-ollama-app-crash-log.patch on main#9. Independent of UI install-root leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

apps/drone-ollama-app/src/main.rs crash_log_path only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-ollama-app-crash-log
- node src/cli.js patches --prove-after-apply --job dronehive-ollama-app-crash-log
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-ollama-app-crash-log-from-ops
- git apply --check /path/to/main/patches/dronehive-ollama-app-crash-log.patch
- git apply /path/to/main/patches/dronehive-ollama-app-crash-log.patch
- python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-app/src/main.rs').read_text(); assert r'host\\ai-home\\apps\\DroneOllama\\logs\\crash.log' in t; assert r'G:\\AI-Home\\apps\\DroneOllama\\logs\\crash.log' not in t"
- main.rs crash log uses host\\ai-home\\apps\\DroneOllama

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

