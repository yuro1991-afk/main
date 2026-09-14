# Point mount README layout at repo-relative paths

- id: `dronehive-mount-readme-layout`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-mount-readme-layout.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

apps/drone-ollama-mount/README.md layout still pins G:\AI-Home projects. Use apps\drone-ollama-mount and `.`. Independent of mount-readme-cargo.

## Collision

apps/drone-ollama-mount/README.md layout block only. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-mount-readme-layout-from-ops
- git apply --check /path/to/main/patches/dronehive-mount-readme-layout.patch
- git apply /path/to/main/patches/dronehive-mount-readme-layout.patch

## Verify

mount README layout uses apps\drone-ollama-mount and .

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
