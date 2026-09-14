# Point drone-ollama-app Open drone out at repo out/

- id: `dronehive-ollama-app-open-out`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-ollama-app-open-out.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

main.rs Open drone out still pins G:\\AI-Home. Applyable catalog patch is patches/dronehive-ollama-app-open-out.patch on main#9. Independent of benchmarks leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

apps/drone-ollama-app/src/main.rs Open drone out only. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-ollama-app-open-out-from-ops
- git apply --check /path/to/main/patches/dronehive-ollama-app-open-out.patch
- git apply /path/to/main/patches/dronehive-ollama-app-open-out.patch

## Verify

main.rs Open drone out uses out

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
