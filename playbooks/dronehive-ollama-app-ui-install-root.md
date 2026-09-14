# Point drone-ollama-app UI install root at host/ai-home

- id: `dronehive-ollama-app-ui-install-root`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-ollama-app-ui-install-root.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

main.rs UI install root still pins G:\\AI-Home\\apps. Applyable catalog patch is patches/dronehive-ollama-app-ui-install-root.patch on main#9. Independent of crash-log leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

apps/drone-ollama-app/src/main.rs UI install-root small() only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-ollama-app-ui-install-root
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-ollama-app-ui-install-root-from-ops
- git apply --check /path/to/main/patches/dronehive-ollama-app-ui-install-root.patch
- git apply /path/to/main/patches/dronehive-ollama-app-ui-install-root.patch

## Verify

main.rs UI install root uses host\\ai-home

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
