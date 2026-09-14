# Point work_order.json codex paths at host/library

- id: `dronehive-work-order-codex-paths`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-work-order-codex-paths.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

configs/work_order.json codex.root / master_min / master_md / query_cli still pin F:\GrokSelfLibrary. Use host/library. Independent of portable-paths, curriculum leftover (codex_root is a different key), and doc-honesty (docs only). Leave python_default. Seed copy is a later leftover.

## Collision

configs/work_order.json codex path keys only. Do not edit python_default. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-codex-paths-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-codex-paths.patch
- git apply /path/to/main/patches/dronehive-work-order-codex-paths.patch

## Verify

configs/work_order.json codex.root is host/library/knowledge/codex and query_cli is host/library/bin/query_llm_codex.py.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
