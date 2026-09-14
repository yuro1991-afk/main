# Point drone-ollama-app Open benchmarks at repo out/benchmarks

- id: `dronehive-ollama-app-open-benchmarks`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-ollama-app-open-benchmarks.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

main.rs Open benchmarks still pins G:\\AI-Home. Applyable catalog patch is patches/dronehive-ollama-app-open-benchmarks.patch on main#9. Independent of out leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

apps/drone-ollama-app/src/main.rs Open benchmarks only. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-ollama-app-open-benchmarks-from-ops
- git apply --check /path/to/main/patches/dronehive-ollama-app-open-benchmarks.patch
- git apply /path/to/main/patches/dronehive-ollama-app-open-benchmarks.patch

## Verify

main.rs Open benchmarks uses out\\benchmarks

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
