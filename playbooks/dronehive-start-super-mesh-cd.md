# Point START_SUPER_MESH.bat cd at the script directory

- id: `dronehive-start-super-mesh-cd`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-start-super-mesh-cd.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

START_SUPER_MESH.bat still cds to G:\AI-Home\projects\ai-worker-drone-0.5b. Use `%~dp0` like the other start scripts. Independent of spec leftover and PYTHONPATH leftovers.

## Collision

START_SUPER_MESH.bat cd line only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-start-super-mesh-cd
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-start-super-mesh-cd-from-ops
- git apply --check /path/to/main/patches/dronehive-start-super-mesh-cd.patch
- git apply /path/to/main/patches/dronehive-start-super-mesh-cd.patch

## Verify

START_SUPER_MESH.bat cds to `%~dp0`

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
