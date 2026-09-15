# Point mount Launch.ps1 cargo homes at host/ai-home

- id: `dronehive-mount-launch-cargo`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-mount-launch-cargo.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

apps/drone-ollama-mount/Launch.ps1 still pins G:\AI-Home\tools cargo/rustup. Use host\ai-home\tools. Independent of mount README leftover.

## Collision

apps/drone-ollama-mount/Launch.ps1 cargo env only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-mount-launch-cargo
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-mount-launch-cargo-from-ops
- git apply --check /path/to/main/patches/dronehive-mount-launch-cargo.patch
- git apply /path/to/main/patches/dronehive-mount-launch-cargo.patch
- python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-mount/Launch.ps1').read_text(); assert r'host\\ai-home\\tools\\cargo' in t; assert r'G:\\AI-Home\\tools\\cargo' not in t"

## Verify

Launch.ps1 cargo/rustup env uses host\ai-home\tools

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
