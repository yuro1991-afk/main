# Point buzzer_hive.json library paths at host/

- id: `dronehive-buzzer-hive-library-honesty`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-buzzer-hive-library-honesty.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

configs/buzzer_hive.json still pins F:\GrokSelfLibrary and D:\GrokCoreMemory. Use host/library and host/continuous. Independent of config-load-overlay (Python remap only). Seed copy is a later leftover.

## Collision

configs/buzzer_hive.json library keys only. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-buzzer-hive-library-honesty-from-ops
- git apply --check /path/to/main/patches/dronehive-buzzer-hive-library-honesty.patch
- git apply /path/to/main/patches/dronehive-buzzer-hive-library-honesty.patch

## Verify

configs/buzzer_hive.json library.root is host/library and continuous_tasks is host/continuous/OPEN_TASKS.json.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
