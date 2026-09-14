# Point mount README Launch.ps1 at apps/drone-ollama-mount

- id: `dronehive-mount-readme-launch`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-mount-readme-launch.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

apps/drone-ollama-mount/README.md Launch.ps1 still pins G:\AI-Home\projects\drone-ollama-mount. Use apps\drone-ollama-mount\Launch.ps1. Independent of cargo leftover and layout leftover.

## Collision

apps/drone-ollama-mount/README.md Launch.ps1 line only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-mount-readme-launch
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-mount-readme-launch-from-ops
- git apply --check /path/to/main/patches/dronehive-mount-readme-launch.patch
- git apply /path/to/main/patches/dronehive-mount-readme-launch.patch

## Verify

mount README Launch.ps1 uses apps\drone-ollama-mount\Launch.ps1

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
