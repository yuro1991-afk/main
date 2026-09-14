# Point seed knowledge_imprint.ai_smarts_packs at host/ai-home

- id: `dronehive-seed-work-order-ai-smarts-packs`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-seed-work-order-ai-smarts-packs.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

drone/app/seed/configs/work_order.json knowledge_imprint.ai_smarts_packs still pins G:\AI-Home. Use host/ai-home. Independent of the live leftover (different file).

## Collision

seed work_order.json knowledge_imprint.ai_smarts_packs only. -U1 trailing knowledge_pack_min. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-seed-work-order-ai-smarts-packs
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-seed-work-order-ai-smarts-packs-from-ops
- git apply --check /path/to/main/patches/dronehive-seed-work-order-ai-smarts-packs.patch
- git apply /path/to/main/patches/dronehive-seed-work-order-ai-smarts-packs.patch

## Verify

seed work_order.json knowledge_imprint.ai_smarts_packs is host/ai-home/docs/ai-smarts/packs.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
