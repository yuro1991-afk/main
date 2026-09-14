# Point knowledge_imprint.ai_smarts_packs at host/ai-home

- id: `dronehive-work-order-ai-smarts-packs`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-work-order-ai-smarts-packs.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

configs/work_order.json knowledge_imprint.ai_smarts_packs still pins G:\AI-Home. Use host/ai-home. -U1 trailing knowledge_pack_min so it stacks after the reference-db leftover.

## Collision

configs/work_order.json knowledge_imprint.ai_smarts_packs only. -U1 trailing knowledge_pack_min. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-work-order-ai-smarts-packs
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-ai-smarts-packs-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-ai-smarts-packs.patch
- git apply /path/to/main/patches/dronehive-work-order-ai-smarts-packs.patch

## Verify

configs/work_order.json knowledge_imprint.ai_smarts_packs is host/ai-home/docs/ai-smarts/packs.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
