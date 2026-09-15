# Point mount SMOKE_SEAL at apps/drone-ollama-mount/out

- id: `dronehive-mount-smoke-seal`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-mount-smoke-seal.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

mount main.rs SMOKE_SEAL still pins G:\\AI-Home. Applyable catalog patch is patches/dronehive-mount-smoke-seal.patch on main#9. Independent of swarm-seal leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

apps/drone-ollama-mount/src/main.rs SMOKE_SEAL only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-mount-smoke-seal
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-mount-smoke-seal-from-ops
- git apply --check /path/to/main/patches/dronehive-mount-smoke-seal.patch
- git apply /path/to/main/patches/dronehive-mount-smoke-seal.patch
- python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-mount/src/main.rs').read_text(); assert 'apps'+chr(92)+'drone-ollama-mount'+chr(92)+'out'+chr(92)+'SMOKE_SEAL.json' in t; assert 'G:'+chr(92)+'AI-Home'+chr(92)+'projects'+chr(92)+'drone-ollama-mount'+chr(92)+'out'+chr(92)+'SMOKE_SEAL.json' not in t"

## Verify

mount main.rs SMOKE_SEAL uses apps\\drone-ollama-mount\\out

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
