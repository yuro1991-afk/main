# Point seed HONESTY.md library root at host/library

- id: `dronehive-seed-doc-honesty-library`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-seed-doc-honesty-library.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

seed HONESTY.md library row still pins F:\\GrokSelfLibrary. Applyable catalog patch is patches/dronehive-seed-doc-honesty-library.patch on main#9. Independent of live docs leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

drone/app/seed/docs/HONESTY.md library row only. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-seed-doc-honesty-library-from-ops
- git apply --check /path/to/main/patches/dronehive-seed-doc-honesty-library.patch
- git apply /path/to/main/patches/dronehive-seed-doc-honesty-library.patch

## Verify

seed HONESTY.md library row uses host/library

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
