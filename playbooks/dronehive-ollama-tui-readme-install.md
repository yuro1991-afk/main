# Point drone-ollama-tui README install path at host/ai-home

- id: `dronehive-ollama-tui-readme-install`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-ollama-tui-readme-install.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

apps/drone-ollama-tui/README.md installed START_TUI.cmd still pins G:\AI-Home\apps\DroneOllama. Use host\ai-home\apps\DroneOllama. Independent of ollama-tui-readme-cargo.

## Collision

apps/drone-ollama-tui/README.md installed START_TUI.cmd only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-ollama-tui-readme-install
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-ollama-tui-readme-install-from-ops
- git apply --check /path/to/main/patches/dronehive-ollama-tui-readme-install.patch
- git apply /path/to/main/patches/dronehive-ollama-tui-readme-install.patch

## Verify

drone-ollama-tui README installed path uses host\ai-home\apps\DroneOllama

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
