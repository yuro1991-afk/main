# Point seed WORK_ORDER.md query_llm_codex examples at host/library

- id: `dronehive-seed-work-order-doc-codex-cli`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-seed-work-order-doc-codex-cli.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

drone/app/seed/docs/WORK_ORDER.md & $py query_llm_codex.py examples still pin F:\GrokSelfLibrary\bin. Use host/library/bin. Independent of live leftover (different file) and seed table leftover.

## Collision

Seed WORK_ORDER.md & $py query_llm_codex.py examples only. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-seed-work-order-doc-codex-cli-from-ops
- git apply --check /path/to/main/patches/dronehive-seed-work-order-doc-codex-cli.patch
- git apply /path/to/main/patches/dronehive-seed-work-order-doc-codex-cli.patch

## Verify

drone/app/seed/docs/WORK_ORDER.md & $py query_llm_codex.py examples use host/library/bin.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
