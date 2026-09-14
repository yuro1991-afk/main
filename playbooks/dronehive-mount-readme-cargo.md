# Point drone-ollama-mount README build at host/ai-home

- id: `dronehive-mount-readme-cargo`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-mount-readme-cargo.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

apps/drone-ollama-mount/README.md build still pins G:\AI-Home cargo env and cd. Use host\ai-home and `cd apps\drone-ollama-mount`. Independent of Launch leftover.

## Collision

apps/drone-ollama-mount/README.md build block only. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-mount-readme-cargo-from-ops
- git apply --check /path/to/main/patches/dronehive-mount-readme-cargo.patch
- git apply /path/to/main/patches/dronehive-mount-readme-cargo.patch

## Verify

mount README build cargo env uses host\ai-home and cd apps\drone-ollama-mount

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
