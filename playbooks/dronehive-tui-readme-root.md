# Point dronehive-tui README --root at repo root

- id: `dronehive-tui-readme-root`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-tui-readme-root.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

apps/dronehive-tui/README.md run example still pins G:\AI-Home --root. Use `.`. Independent of tui-readme-cargo.

## Collision

apps/dronehive-tui/README.md --root line only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-tui-readme-root
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-tui-readme-root-from-ops
- git apply --check /path/to/main/patches/dronehive-tui-readme-root.patch
- git apply /path/to/main/patches/dronehive-tui-readme-root.patch

## Verify

dronehive-tui README --root is .

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
