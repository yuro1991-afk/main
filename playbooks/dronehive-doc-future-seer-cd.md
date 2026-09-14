# Point FUTURE_SEER.md swarm cd at repo root

- id: `dronehive-doc-future-seer-cd`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-doc-future-seer-cd.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

docs/FUTURE_SEER.md still pins G:\\AI-Home cd. Applyable catalog patch is patches/dronehive-doc-future-seer-cd.patch on main#9. Independent of work-order-doc-cd. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

docs/FUTURE_SEER.md cd line only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-doc-future-seer-cd
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-doc-future-seer-cd-from-ops
- git apply --check /path/to/main/patches/dronehive-doc-future-seer-cd.patch
- git apply /path/to/main/patches/dronehive-doc-future-seer-cd.patch

## Verify

docs/FUTURE_SEER.md cd is .

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
