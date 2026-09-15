# Point docs/WORK_ORDER.md recall and router examples at host roots

- id: `dronehive-work-order-doc-recall-router`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-work-order-doc-recall-router.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

docs/WORK_ORDER.md recall.py and ai_smarts_router.py examples still pin F:\GrokSelfLibrary and G:\AI-Home. Use host/library and host/ai-home. Independent of CLI leftover and models leftover.

## Collision

docs/WORK_ORDER.md section 2.6 examples only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-work-order-doc-recall-router
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-doc-recall-router-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-doc-recall-router.patch
- git apply /path/to/main/patches/dronehive-work-order-doc-recall-router.patch
- python3 -c "from pathlib import Path; t=Path('docs/WORK_ORDER.md').read_text(); assert 'host/library/bin/recall.py get knowledge_pack' in t; assert 'host/ai-home/docs/ai-smarts/runtime/ai_smarts_router.py route' in t"

## Verify

docs/WORK_ORDER.md recall.py uses host/library/bin and ai_smarts_router.py uses host/ai-home.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
