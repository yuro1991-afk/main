# Point TRUTH_AND_HONESTY system root at repo root

- id: `dronehive-truth-honesty-root`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-truth-honesty-root.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

TRUTH_AND_HONESTY.md system root still pins G:\\AI-Home. Applyable catalog patch is patches/dronehive-truth-honesty-root.patch on main#9. Independent of truth-bind-paths JSON leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

TRUTH_AND_HONESTY.md system root line only. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-truth-honesty-root-from-ops
- git apply --check /path/to/main/patches/dronehive-truth-honesty-root.patch
- git apply /path/to/main/patches/dronehive-truth-honesty-root.patch

## Verify

TRUTH_AND_HONESTY.md system root is .

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
