# Point START_MULTI_MODEL.bat PYTHONPATH at host/ai-center

- id: `dronehive-start-multi-model-pythonpath`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-start-multi-model-pythonpath.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

START_MULTI_MODEL.bat PYTHONPATH still appends G:\AI-Center. Use `%ROOT%\host\ai-center`. Independent of START_SEER leftover (different file).

## Collision

START_MULTI_MODEL.bat PYTHONPATH line only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-start-multi-model-pythonpath
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-start-multi-model-pythonpath-from-ops
- git apply --check /path/to/main/patches/dronehive-start-multi-model-pythonpath.patch
- git apply /path/to/main/patches/dronehive-start-multi-model-pythonpath.patch
- python3 -c "from pathlib import Path; t=Path('START_MULTI_MODEL.bat').read_text(); assert r'%ROOT%\\host\\ai-center' in t; assert r'PYTHONPATH=%ROOT%;G:\\AI-Center' not in t"

## Verify

START_MULTI_MODEL.bat PYTHONPATH uses `%ROOT%\host\ai-center`

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
