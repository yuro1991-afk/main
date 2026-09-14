# Point apps README Rust path at host/ai-home

- id: `dronehive-apps-readme-cargo`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-apps-readme-cargo.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

apps/README.md still pins G:\AI-Home\tools\cargo as the required Rust path. Use host/ai-home/tools/cargo; G:\ is one host example. Independent of per-app README leftovers.

## Collision

apps/README.md build line only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-apps-readme-cargo
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-apps-readme-cargo-from-ops
- git apply --check /path/to/main/patches/dronehive-apps-readme-cargo.patch
- git apply /path/to/main/patches/dronehive-apps-readme-cargo.patch

## Verify

apps/README.md build line uses host/ai-home/tools/cargo

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
