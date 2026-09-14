# Point mount SWARM_SMOKE_SEAL at apps/drone-ollama-mount/out

- id: `dronehive-mount-swarm-seal`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-mount-swarm-seal.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

mount main.rs SWARM_SMOKE_SEAL still pins G:\\AI-Home. Applyable catalog patch is patches/dronehive-mount-swarm-seal.patch on main#9. Independent of smoke-seal leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

apps/drone-ollama-mount/src/main.rs SWARM_SMOKE_SEAL only. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-mount-swarm-seal-from-ops
- git apply --check /path/to/main/patches/dronehive-mount-swarm-seal.patch
- git apply /path/to/main/patches/dronehive-mount-swarm-seal.patch

## Verify

mount main.rs SWARM_SMOKE_SEAL uses apps\\drone-ollama-mount\\out

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
