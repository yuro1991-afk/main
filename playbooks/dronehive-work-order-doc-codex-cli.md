# Point docs/WORK_ORDER.md query_llm_codex examples at host/library

- id: `dronehive-work-order-doc-codex-cli`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-work-order-doc-codex-cli.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

docs/WORK_ORDER.md & $py query_llm_codex.py examples still pin F:\GrokSelfLibrary\bin. Use host/library/bin. Independent of the table leftover (does not touch the Query CLI row). Leave recall.py leftovers. Seed copy is a later leftover.

## Collision

docs/WORK_ORDER.md & $py query_llm_codex.py examples only. Do not edit the table Query CLI row. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-work-order-doc-codex-cli
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-doc-codex-cli-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-doc-codex-cli.patch
- git apply /path/to/main/patches/dronehive-work-order-doc-codex-cli.patch
- python3 -c "from pathlib import Path; t=Path('docs/WORK_ORDER.md').read_text(); assert 'host/library/bin/query_llm_codex.py stats' in t; assert 'host/library/bin/query_llm_codex.py use coding' in t; assert 'host/library/bin/query_llm_codex.py vram' in t"

## Verify

docs/WORK_ORDER.md & $py query_llm_codex.py examples use host/library/bin.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
