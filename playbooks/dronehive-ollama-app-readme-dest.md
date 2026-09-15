# Point drone-ollama-app README install dest at host/ai-home

- id: `dronehive-ollama-app-readme-dest`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-ollama-app-readme-dest.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

apps/drone-ollama-app/README.md install dest still pins G:\\AI-Home\\apps. Applyable catalog patch is patches/dronehive-ollama-app-readme-dest.patch on main#9. Independent of installer leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

apps/drone-ollama-app/README.md dest line only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-ollama-app-readme-dest
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-ollama-app-readme-dest-from-ops
- git apply --check /path/to/main/patches/dronehive-ollama-app-readme-dest.patch
- git apply /path/to/main/patches/dronehive-ollama-app-readme-dest.patch
- python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-app/README.md').read_text(); assert r'host\\ai-home\\apps\\DroneOllama' in t; assert r'G:\\AI-Home\\apps\\DroneOllama' not in t"

## Verify

drone-ollama-app README dest uses host\\ai-home\\apps\\DroneOllama

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
