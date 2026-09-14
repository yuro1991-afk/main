# Point START_TUI_OLLAMA.bat cargo PATH at host/ai-home

- id: `dronehive-start-tui-cargo-honesty`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-start-tui-cargo-honesty.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

START_TUI_OLLAMA.bat Build echo still pins G:\AI-Home\tools\cargo\bin. Use %ROOT%\host\ai-home\tools\cargo\bin. Independent of START_SUPER_MESH leftover.

## Collision

START_TUI_OLLAMA.bat Build echo line only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-start-tui-cargo-honesty
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-start-tui-cargo-honesty-from-ops
- git apply --check /path/to/main/patches/dronehive-start-tui-cargo-honesty.patch
- git apply /path/to/main/patches/dronehive-start-tui-cargo-honesty.patch

## Verify

START_TUI_OLLAMA.bat Build echo uses %ROOT%\host\ai-home\tools\cargo\bin

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
