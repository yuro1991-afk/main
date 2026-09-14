# Point seed APP.md swarm cd at repo root

- id: `dronehive-seed-doc-app-cd`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-seed-doc-app-cd.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

seed APP.md still pins G:\\AI-Home cd. Applyable catalog patch is patches/dronehive-seed-doc-app-cd.patch on main#9. Independent of live docs leftover and seed Library leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

drone/app/seed/docs/APP.md cd line only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-seed-doc-app-cd
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-seed-doc-app-cd-from-ops
- git apply --check /path/to/main/patches/dronehive-seed-doc-app-cd.patch
- git apply /path/to/main/patches/dronehive-seed-doc-app-cd.patch

## Verify

seed APP.md cd is .

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
