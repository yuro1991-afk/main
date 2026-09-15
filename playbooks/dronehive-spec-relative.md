# Point DroneHive.spec at repo-relative desktop.py

- id: `dronehive-spec-relative`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-spec-relative.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

DroneHive.spec Analysis still pins G:/AI-Home/projects/ai-worker-drone-0.5b. Use `drone/app/desktop.py` and pathex `.`. Independent of portable-paths and start-script leftovers (different file).

## Collision

DroneHive.spec Analysis script/pathex only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-spec-relative
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-spec-relative-from-ops
- git apply --check /path/to/main/patches/dronehive-spec-relative.patch
- git apply /path/to/main/patches/dronehive-spec-relative.patch
- python3 -c "from pathlib import Path; t=Path('DroneHive.spec').read_text(); assert \"['drone/app/desktop.py']\" in t; assert \"pathex=['.']\" in t"

## Verify

DroneHive.spec Analysis uses drone/app/desktop.py and pathex `.`

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
