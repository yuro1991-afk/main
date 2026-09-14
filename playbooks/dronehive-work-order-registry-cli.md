# Point work_order live_registry CLI fallback at host/ai-center

- id: `dronehive-work-order-registry-cli`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-work-order-registry-cli.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

drone/work_order.py write_live_registry CLI fallback still pins G:\AI-Center. Use host/ai-center. Independent of portable-paths query_codex wraps and the JSON live-registry leftover.

## Collision

drone/work_order.py write_live_registry CLI fallback only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-work-order-registry-cli
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-registry-cli-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-registry-cli.patch
- git apply /path/to/main/patches/dronehive-work-order-registry-cli.patch

## Verify

work_order.py live_registry CLI fallback uses host/ai-center.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
