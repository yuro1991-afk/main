# Point APP.md library root at host/library

- id: `dronehive-doc-app-library`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-doc-app-library.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

docs/APP.md Library row still pins F:\\GrokSelfLibrary. Applyable catalog patch is patches/dronehive-doc-app-library.patch on main#9. Independent of APP.md cd leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

docs/APP.md Library row only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-doc-app-library
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-doc-app-library-from-ops
- git apply --check /path/to/main/patches/dronehive-doc-app-library.patch
- git apply /path/to/main/patches/dronehive-doc-app-library.patch

## Verify

docs/APP.md Library row uses host/library

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
