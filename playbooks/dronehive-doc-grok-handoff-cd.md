# Point GROK_HANDOFF.md swarm cd at repo root

- id: `dronehive-doc-grok-handoff-cd`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-doc-grok-handoff-cd.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

docs/GROK_HANDOFF.md CLI still pins G:\\AI-Home cd. Applyable catalog patch is patches/dronehive-doc-grok-handoff-cd.patch on main#9. Independent of project-root leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

docs/GROK_HANDOFF.md cd line only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-doc-grok-handoff-cd
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-doc-grok-handoff-cd-from-ops
- git apply --check /path/to/main/patches/dronehive-doc-grok-handoff-cd.patch
- git apply /path/to/main/patches/dronehive-doc-grok-handoff-cd.patch
- python3 -c "from pathlib import Path; t=Path('docs/GROK_HANDOFF.md').read_text(); assert '\ncd .\n' in t; assert r'cd G:\\AI-Home\\projects\\ai-worker-drone-0.5b' not in t"

## Verify

docs/GROK_HANDOFF.md CLI cd is a standalone cd . line

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
