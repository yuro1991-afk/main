# Point seed APP.md library root at host/library

- id: `dronehive-seed-doc-app-library`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-seed-doc-app-library.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

seed APP.md Library row still pins F:\\GrokSelfLibrary. Applyable catalog patch is patches/dronehive-seed-doc-app-library.patch on main#9. Independent of live docs leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

drone/app/seed/docs/APP.md Library row only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-seed-doc-app-library
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-seed-doc-app-library-from-ops
- git apply --check /path/to/main/patches/dronehive-seed-doc-app-library.patch
- git apply /path/to/main/patches/dronehive-seed-doc-app-library.patch
- python3 -c "from pathlib import Path; t=Path('drone/app/seed/docs/APP.md').read_text(); assert 'host/library' in t; assert r'F:\\GrokSelfLibrary' not in t"

## Verify

seed APP.md Library row uses host/library and F: GrokSelfLibrary is gone

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
