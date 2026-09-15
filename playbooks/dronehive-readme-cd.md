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

- node src/cli.js patches --prove --job dronehive-readme-cd
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-readme-cd-from-ops
- git apply --check /path/to/main/patches/dronehive-readme-cd.patch
- git apply /path/to/main/patches/dronehive-readme-cd.patch
- python3 -c "from pathlib import Path; t=Path('README.md').read_text(); assert 'cd .   # or your clone path' in t; assert r'cd G:\\AI-Home\\projects\\ai-worker-drone-0.5b' not in t"

## Verify

README.md quick-start cd is `cd .   # or your clone path`

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
