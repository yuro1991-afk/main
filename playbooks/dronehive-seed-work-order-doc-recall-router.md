# Point seed WORK_ORDER.md recall and router examples at host roots

- id: `dronehive-seed-work-order-doc-recall-router`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-seed-work-order-doc-recall-router.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

drone/app/seed/docs/WORK_ORDER.md recall.py and ai_smarts_router.py examples still pin F: and G: hosts. Use host/library and host/ai-home. Independent of live leftover (different file).

## Collision

Seed WORK_ORDER.md section 2.6 examples only. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-seed-work-order-doc-recall-router-from-ops
- git apply --check /path/to/main/patches/dronehive-seed-work-order-doc-recall-router.patch
- git apply /path/to/main/patches/dronehive-seed-work-order-doc-recall-router.patch

## Verify

drone/app/seed/docs/WORK_ORDER.md recall.py uses host/library/bin and ai_smarts_router.py uses host/ai-home.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
