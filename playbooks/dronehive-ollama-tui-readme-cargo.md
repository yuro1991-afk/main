# Point drone-ollama-tui README build at host/ai-home

- id: `dronehive-ollama-tui-readme-cargo`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-ollama-tui-readme-cargo.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

apps/drone-ollama-tui/README.md build still pins G:\AI-Home cargo PATH and cd. Use host\ai-home and `cd apps\drone-ollama-tui`. Independent of START_TUI leftover.

## Collision

apps/drone-ollama-tui/README.md build block only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-ollama-tui-readme-cargo
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-ollama-tui-readme-cargo-from-ops
- git apply --check /path/to/main/patches/dronehive-ollama-tui-readme-cargo.patch
- git apply /path/to/main/patches/dronehive-ollama-tui-readme-cargo.patch
- python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-tui/README.md').read_text(); assert r'host\\ai-home\\tools\\cargo\\bin' in t; assert r'cd apps\\drone-ollama-tui' in t; assert r'G:\\AI-Home\\tools\\cargo\\bin' not in t"

## Verify

drone-ollama-tui README build PATH uses host\ai-home and cd apps\drone-ollama-tui

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
