# Mark bench GOAL G: path as one host example

- id: `dronehive-bench-goal-honesty`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-bench-goal-honesty.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

scripts/bench_vs_helpers.py GOAL still says “paths under G:\AI-Home”. G:\AI-Home is one host example. Independent of script-host-roots (ROOT/MUSCLE/out_dir hunks only).

## Collision

GOAL string only. Same file as script-host-roots but different hunks. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-bench-goal-honesty-from-ops
- git apply --check /path/to/main/patches/dronehive-bench-goal-honesty.patch
- git apply /path/to/main/patches/dronehive-bench-goal-honesty.patch

## Verify

scripts/bench_vs_helpers.py GOAL mentions host/ and that G:\AI-Home is one host example.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
