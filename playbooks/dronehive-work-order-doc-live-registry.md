# Point docs/WORK_ORDER.md live-registry paths at host roots

- id: `dronehive-work-order-doc-live-registry`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-work-order-doc-live-registry.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

docs/WORK_ORDER.md live-registry table and $reg still pin G:\AI-Center and F:\GrokSelfLibrary. Use host/ai-center and host/library. Independent of the JSON live-registry leftover and other docs leftovers. Leave Events/HOT relative. Seed copy is a later leftover.

## Collision

docs/WORK_ORDER.md live-registry table + $reg only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-work-order-doc-live-registry
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-doc-live-registry-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-doc-live-registry.patch
- git apply /path/to/main/patches/dronehive-work-order-doc-live-registry.patch

## Verify

docs/WORK_ORDER.md live-registry Primary/Mirror/CLI and $reg use host/ai-center and host/library.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
