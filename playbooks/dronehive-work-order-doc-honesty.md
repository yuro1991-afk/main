# Point WORK_ORDER.md NEXT.json example at host/library

- id: `dronehive-work-order-doc-honesty`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-work-order-doc-honesty.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

docs/WORK_ORDER.md NEXT.json example still pins F:\GrokSelfLibrary\knowledge\codex\CODEX.min.json. Use host/library. Independent of hive-docstring-honesty.

## Collision

Docs only. Different file from hive.py. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-work-order-doc-honesty
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-doc-honesty-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-doc-honesty.patch
- git apply /path/to/main/patches/dronehive-work-order-doc-honesty.patch

## Verify

docs/WORK_ORDER.md NEXT.json example codex_ref is host/library/knowledge/codex/CODEX.min.json.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
