# Point BRIDGE_1080.md swarm cd at repo root

- id: `dronehive-doc-bridge-1080-cd`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-doc-bridge-1080-cd.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

docs/BRIDGE_1080.md still pins G:\\AI-Home cd. Applyable catalog patch is patches/dronehive-doc-bridge-1080-cd.patch on main#9. Independent of work-order-doc-cd. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

docs/BRIDGE_1080.md cd line only. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-doc-bridge-1080-cd-from-ops
- git apply --check /path/to/main/patches/dronehive-doc-bridge-1080-cd.patch
- git apply /path/to/main/patches/dronehive-doc-bridge-1080-cd.patch

## Verify

docs/BRIDGE_1080.md cd is .

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
