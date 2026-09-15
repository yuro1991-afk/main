# Point MEASURED_DIAGNOSTICS.md swarm cd at repo root

- id: `dronehive-doc-measured-diagnostics-cd`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-doc-measured-diagnostics-cd.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

docs/MEASURED_DIAGNOSTICS.md still pins G:\\AI-Home cd. Applyable catalog patch is patches/dronehive-doc-measured-diagnostics-cd.patch on main#9. Independent of work-order-doc-cd. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

docs/MEASURED_DIAGNOSTICS.md cd line only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-doc-measured-diagnostics-cd
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-doc-measured-diagnostics-cd-from-ops
- git apply --check /path/to/main/patches/dronehive-doc-measured-diagnostics-cd.patch
- git apply /path/to/main/patches/dronehive-doc-measured-diagnostics-cd.patch
- python3 -c "from pathlib import Path; t=Path('docs/MEASURED_DIAGNOSTICS.md').read_text(); assert '\ncd .\n' in t; assert r'cd G:\\AI-Home\\projects\\ai-worker-drone-0.5b' not in t"

## Verify

docs/MEASURED_DIAGNOSTICS.md Smoke cd is a standalone cd . line

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
