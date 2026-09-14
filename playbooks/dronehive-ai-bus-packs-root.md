# Point ai_bus packs_root at host/ai-home

- id: `dronehive-ai-bus-packs-root`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-ai-bus-packs-root.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

drone/ai_bus.py `_write_ai_smarts` packs_root still pins G:\AI-Home. Use host/ai-home. Independent of portable-paths (that leftover wraps the g_mirror Path, not this JSON field).

## Collision

drone/ai_bus.py `_write_ai_smarts` packs_root only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-ai-bus-packs-root
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-ai-bus-packs-root-from-ops
- git apply --check /path/to/main/patches/dronehive-ai-bus-packs-root.patch
- git apply /path/to/main/patches/dronehive-ai-bus-packs-root.patch

## Verify

ai_bus.py packs_root uses host/ai-home/docs/ai-smarts/packs.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
