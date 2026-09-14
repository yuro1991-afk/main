# Point seed buzzer_hive.json library paths at host/

- id: `dronehive-seed-buzzer-hive-library-honesty`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-seed-buzzer-hive-library-honesty.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

drone/app/seed/configs/buzzer_hive.json still pins F:\GrokSelfLibrary and D:\GrokCoreMemory. Use host/library and host/continuous. Independent of the live configs/buzzer_hive.json leftover (different file).

## Collision

Seed JSON only. Different file from configs/buzzer_hive.json. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-seed-buzzer-hive-library-honesty-from-ops
- git apply --check /path/to/main/patches/dronehive-seed-buzzer-hive-library-honesty.patch
- git apply /path/to/main/patches/dronehive-seed-buzzer-hive-library-honesty.patch

## Verify

drone/app/seed/configs/buzzer_hive.json library.root is host/library and continuous_tasks is host/continuous/OPEN_TASKS.json.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
