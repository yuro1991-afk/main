# Mark hive.py F: library path as one host example

- id: `dronehive-hive-docstring-honesty`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-hive-docstring-honesty.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

drone/hive.py module docstring still says Connected to F:\GrokSelfLibrary. That path is one host example. Independent of config-load-overlay (that patch only touches the import and `_load_cfg`).

## Collision

Docstring only. Independent of portable-paths and config-load-overlay. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-hive-docstring-honesty-from-ops
- git apply --check /path/to/main/patches/dronehive-hive-docstring-honesty.patch
- git apply /path/to/main/patches/dronehive-hive-docstring-honesty.patch
- python3 -m py_compile drone/hive.py

## Verify

python3 -m py_compile drone/hive.py

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
