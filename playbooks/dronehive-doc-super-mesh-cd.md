# Point SUPER_MESH.md swarm cd at repo root

- id: `dronehive-doc-super-mesh-cd`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-doc-super-mesh-cd.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

docs/SUPER_MESH.md still pins G:\\AI-Home cd. Applyable catalog patch is patches/dronehive-doc-super-mesh-cd.patch on main#9. Independent of start-super-mesh-cd. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

docs/SUPER_MESH.md cd line only. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-doc-super-mesh-cd-from-ops
- git apply --check /path/to/main/patches/dronehive-doc-super-mesh-cd.patch
- git apply /path/to/main/patches/dronehive-doc-super-mesh-cd.patch

## Verify

docs/SUPER_MESH.md cd is .

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
