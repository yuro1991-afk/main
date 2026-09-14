# Point TRUTH_BIND.json host paths at repo overlays

- id: `dronehive-truth-bind-paths`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-truth-bind-paths.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

TRUTH_BIND.json root/universal/oath_gate/agreement still pin G:\AI-Home and F:\GrokSelfLibrary. Use `.` and host/library. Independent of work_order JSON leftovers (different file). Leaves core_imprint F:/C: text and the C:\ grok hardwire.

## Collision

TRUTH_BIND.json remappable keys only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-truth-bind-paths
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-truth-bind-paths-from-ops
- git apply --check /path/to/main/patches/dronehive-truth-bind-paths.patch
- git apply /path/to/main/patches/dronehive-truth-bind-paths.patch

## Verify

TRUTH_BIND.json root is `.` and universal/oath_gate/agreement use host/library

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
