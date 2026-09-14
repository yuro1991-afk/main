# Point drone-ollama-app bridge constants at repo-relative paths

- id: `dronehive-ollama-app-bridge-paths`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-ollama-app-bridge-paths.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

drone_bridge.rs DRONE_ROOT and MOUNT_EXE still pin G:\\AI-Home. Applyable catalog patch is patches/dronehive-ollama-app-bridge-paths.patch on main#9. Adjacent consts are one leftover. Independent of main.rs leftovers. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

apps/drone-ollama-app/src/drone_bridge.rs DRONE_ROOT + MOUNT_EXE only. Leave C:\\Python. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-ollama-app-bridge-paths
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-ollama-app-bridge-paths-from-ops
- git apply --check /path/to/main/patches/dronehive-ollama-app-bridge-paths.patch
- git apply /path/to/main/patches/dronehive-ollama-app-bridge-paths.patch

## Verify

drone_bridge.rs DRONE_ROOT is . and MOUNT_EXE uses apps\\drone-ollama-mount

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
