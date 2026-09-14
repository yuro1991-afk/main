# Point multi_face PYTHONPATH fallbacks at host/ai-center

- id: `dronehive-multi-face-pythonpath`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-multi-face-pythonpath.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

drone/multi_face.py PYTHONPATH still pins G:\AI-Center. Use host/ai-center. Two sites are one leftover. Independent of config-load-overlay JSON remap.

## Collision

drone/multi_face.py PYTHONPATH assignments only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-multi-face-pythonpath
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-multi-face-pythonpath-from-ops
- git apply --check /path/to/main/patches/dronehive-multi-face-pythonpath.patch
- git apply /path/to/main/patches/dronehive-multi-face-pythonpath.patch

## Verify

multi_face.py PYTHONPATH fallbacks use host/ai-center.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
