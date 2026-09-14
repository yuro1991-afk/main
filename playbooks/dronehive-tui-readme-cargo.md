# Point dronehive-tui README cargo PATH at host/ai-home

- id: `dronehive-tui-readme-cargo`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-tui-readme-cargo.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

apps/dronehive-tui/README.md build still pins G:\AI-Home\tools\cargo\bin. Use host\ai-home\tools\cargo\bin. Independent of ollama-tui README leftover.

## Collision

apps/dronehive-tui/README.md PATH line only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-tui-readme-cargo
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-tui-readme-cargo-from-ops
- git apply --check /path/to/main/patches/dronehive-tui-readme-cargo.patch
- git apply /path/to/main/patches/dronehive-tui-readme-cargo.patch

## Verify

dronehive-tui README build PATH uses host\ai-home\tools\cargo\bin

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
