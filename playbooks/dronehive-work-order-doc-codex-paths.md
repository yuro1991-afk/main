# Point docs/WORK_ORDER.md codex table at host/library

- id: `dronehive-work-order-doc-codex-paths`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-work-order-doc-codex-paths.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

docs/WORK_ORDER.md codex table still pins F:\GrokSelfLibrary\knowledge\codex. Use host/library. Independent of the JSON codex-paths leftover and the & $py CLI-example leftover. Seed copy is a later leftover.

## Collision

docs/WORK_ORDER.md codex table only. Do not edit the & $py CLI examples. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-doc-codex-paths-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-doc-codex-paths.patch
- git apply /path/to/main/patches/dronehive-work-order-doc-codex-paths.patch

## Verify

docs/WORK_ORDER.md codex table rows use host/library.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
