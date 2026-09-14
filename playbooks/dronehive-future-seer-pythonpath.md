# Point future_seer PYTHONPATH jane fallbacks at host/ai-center

- id: `dronehive-future-seer-pythonpath`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-future-seer-pythonpath.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

drone/future_seer.py PYTHONPATH jane fallback still pins G:\AI-Center. Use host/ai-center. Three sites are one leftover. Independent of the jane JSON leftover and the runtime outbox wrap.

## Collision

drone/future_seer.py PYTHONPATH jane fallbacks only. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-future-seer-pythonpath-from-ops
- git apply --check /path/to/main/patches/dronehive-future-seer-pythonpath.patch
- git apply /path/to/main/patches/dronehive-future-seer-pythonpath.patch

## Verify

future_seer.py PYTHONPATH jane fallbacks use host/ai-center.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
