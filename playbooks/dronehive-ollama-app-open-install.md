# Point drone-ollama-app Open install folder at host/ai-home

- id: `dronehive-ollama-app-open-install`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-ollama-app-open-install.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

main.rs Open app install folder still pins G:\\AI-Home\\apps. Applyable catalog patch is patches/dronehive-ollama-app-open-install.patch on main#9. Independent of UI leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

apps/drone-ollama-app/src/main.rs Open app install folder only. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-ollama-app-open-install-from-ops
- git apply --check /path/to/main/patches/dronehive-ollama-app-open-install.patch
- git apply /path/to/main/patches/dronehive-ollama-app-open-install.patch

## Verify

main.rs Open install uses host\\ai-home

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
