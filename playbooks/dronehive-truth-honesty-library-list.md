# Point TRUTH_AND_HONESTY library list at host/library

- id: `dronehive-truth-honesty-library-list`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-truth-honesty-library-list.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

TRUTH_AND_HONESTY.md Universal/Oath/Coder list still pins F:\\GrokSelfLibrary. Applyable catalog patch is patches/dronehive-truth-honesty-library-list.patch on main#9. Adjacent list lines are one leftover (cannot -U1-split). Independent of system-root and inline oath leftovers. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

TRUTH_AND_HONESTY.md Universal/Oath/Coder list only. Leave C:\\Users hardwire. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-truth-honesty-library-list-from-ops
- git apply --check /path/to/main/patches/dronehive-truth-honesty-library-list.patch
- git apply /path/to/main/patches/dronehive-truth-honesty-library-list.patch

## Verify

TRUTH_AND_HONESTY.md list Universal/Oath/Coder use host/library

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
