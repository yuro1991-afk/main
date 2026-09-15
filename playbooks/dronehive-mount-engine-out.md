# Point mount engine out_dir at apps/drone-ollama-mount/out

- id: `dronehive-mount-engine-out`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-mount-engine-out.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

engine.rs out_dir still pins G:\\AI-Home. Applyable catalog patch is patches/dronehive-mount-engine-out.patch on main#9. Independent of fabric-root leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

apps/drone-ollama-mount/src/engine.rs out_dir only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-mount-engine-out
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-mount-engine-out-from-ops
- git apply --check /path/to/main/patches/dronehive-mount-engine-out.patch
- git apply /path/to/main/patches/dronehive-mount-engine-out.patch
- python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-mount/src/engine.rs').read_text(); assert 'apps'+chr(92)+'drone-ollama-mount'+chr(92)+'out' in t; assert 'G:'+chr(92)+'AI-Home'+chr(92)+'projects'+chr(92)+'drone-ollama-mount'+chr(92)+'out' not in t"

## Verify

engine.rs out_dir uses apps\\drone-ollama-mount\\out

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
