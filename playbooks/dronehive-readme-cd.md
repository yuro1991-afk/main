# Point dronehive README quick-start cd at repo root

- id: `dronehive-readme-cd`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-readme-cd.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

README.md quick-start still pins G:\\AI-Home cd. Applyable catalog patch is patches/dronehive-readme-cd.patch on main#9. Independent of existing catalog leftovers. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

README.md quick-start cd line only. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-readme-cd-from-ops
- git apply --check /path/to/main/patches/dronehive-readme-cd.patch
- git apply /path/to/main/patches/dronehive-readme-cd.patch

## Verify

README.md quick-start cd is .

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
