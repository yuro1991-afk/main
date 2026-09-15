# Point docs/WORK_ORDER.md header fabric at repo root

- id: `dronehive-work-order-doc-fabric-root`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-work-order-doc-fabric-root.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

docs/WORK_ORDER.md header fabric still pins G:\AI-Home\projects\ai-worker-drone-0.5b. Use repo-relative `.` to match the JSON fabric_root leftover. Independent of work-order-doc-honesty (NEXT.json example) and work-order-doc-law-truth (Library law line). Seed copy is a later leftover.

## Collision

docs/WORK_ORDER.md header fabric line only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-work-order-doc-fabric-root
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-doc-fabric-root-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-doc-fabric-root.patch
- git apply /path/to/main/patches/dronehive-work-order-doc-fabric-root.patch
- python3 -c "from pathlib import Path; t=Path('docs/WORK_ORDER.md').read_text(); assert '**Host:** BOSS (Windows) · fabric `.`' in t"

## Verify

docs/WORK_ORDER.md header fabric is `.`.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
