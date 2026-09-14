# Point drone-ollama-app crash log at host/ai-home

- id: `dronehive-ollama-app-crash-log`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-ollama-app-crash-log.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

main.rs crash_log_path still pins G:\\AI-Home\\apps. Applyable catalog patch is patches/dronehive-ollama-app-crash-log.patch on main#9. Independent of UI install-root leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

apps/drone-ollama-app/src/main.rs crash_log_path only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-ollama-app-crash-log
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-ollama-app-crash-log-from-ops
- git apply --check /path/to/main/patches/dronehive-ollama-app-crash-log.patch
- git apply /path/to/main/patches/dronehive-ollama-app-crash-log.patch

## Verify

main.rs crash log uses host\\ai-home\\apps\\DroneOllama

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
