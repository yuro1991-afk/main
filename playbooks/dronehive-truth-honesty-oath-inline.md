# Point TRUTH_AND_HONESTY inline oath at host/library

- id: `dronehive-truth-honesty-oath-inline`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-truth-honesty-oath-inline.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

TRUTH_AND_HONESTY.md inline oath still pins F:\\GrokSelfLibrary. Applyable catalog patch is patches/dronehive-truth-honesty-oath-inline.patch on main#9. Independent of system-root leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

TRUTH_AND_HONESTY.md inline Oath line only. Leave C:\\Users hardwire. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-truth-honesty-oath-inline
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-truth-honesty-oath-inline-from-ops
- git apply --check /path/to/main/patches/dronehive-truth-honesty-oath-inline.patch
- git apply /path/to/main/patches/dronehive-truth-honesty-oath-inline.patch
- python3 -c "from pathlib import Path; t=Path('TRUTH_AND_HONESTY.md').read_text(); line=next(x for x in t.splitlines() if x.startswith('Oath: python')); assert 'host/library' in line; assert r'F:\\GrokSelfLibrary' not in line"

## Verify

TRUTH_AND_HONESTY.md inline oath uses host/library

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
