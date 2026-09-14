# Point docs/WORK_ORDER.md swarm entry cd at repo root

- id: `dronehive-work-order-doc-cd`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-work-order-doc-cd.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

docs/WORK_ORDER.md swarm entry still cds to G:\AI-Home\projects\ai-worker-drone-0.5b. Use repo-relative `.`. Independent of NEXT.json leftover and header fabric leftover.

## Collision

docs/WORK_ORDER.md section 8 cd line only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-work-order-doc-cd
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-doc-cd-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-doc-cd.patch
- git apply /path/to/main/patches/dronehive-work-order-doc-cd.patch

## Verify

docs/WORK_ORDER.md swarm entry is cd .

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
