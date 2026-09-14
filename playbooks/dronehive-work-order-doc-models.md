# Point docs/WORK_ORDER.md models install-proof path at host/ai-home

- id: `dronehive-work-order-doc-models`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-work-order-doc-models.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

docs/WORK_ORDER.md install-proof line still pins G:\AI-Home\models. Use host/ai-home/models. Independent of CLI leftover and recall leftover.

## Collision

docs/WORK_ORDER.md section 2.4 item 6 only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-work-order-doc-models
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-doc-models-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-doc-models.patch
- git apply /path/to/main/patches/dronehive-work-order-doc-models.patch

## Verify

docs/WORK_ORDER.md install-proof line uses host/ai-home/models.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
