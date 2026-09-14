# Point mount README related UI at host/ai-home

- id: `dronehive-mount-readme-related`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-mount-readme-related.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

apps/drone-ollama-mount/README.md related still pins G:\AI-Home\projects\ollama-rust-ui. Use host/ai-home. Independent of layout and launch leftovers.

## Collision

apps/drone-ollama-mount/README.md related line only. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-mount-readme-related-from-ops
- git apply --check /path/to/main/patches/dronehive-mount-readme-related.patch
- git apply /path/to/main/patches/dronehive-mount-readme-related.patch

## Verify

mount README related uses host/ai-home/projects/ollama-rust-ui

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
