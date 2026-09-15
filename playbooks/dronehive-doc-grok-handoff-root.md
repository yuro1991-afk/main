# Point GROK_HANDOFF.md project root at repo root

- id: `dronehive-doc-grok-handoff-root`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-doc-grok-handoff-root.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

docs/GROK_HANDOFF.md project root still pins G:\\AI-Home. Applyable catalog patch is patches/dronehive-doc-grok-handoff-root.patch on main#9. Independent of CLI cd leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

docs/GROK_HANDOFF.md project root line only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-doc-grok-handoff-root
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-doc-grok-handoff-root-from-ops
- git apply --check /path/to/main/patches/dronehive-doc-grok-handoff-root.patch
- git apply /path/to/main/patches/dronehive-doc-grok-handoff-root.patch
- python3 -c "from pathlib import Path; t=Path('docs/GROK_HANDOFF.md').read_text(); root=t.split('## Project root',1)[1].split('##',1)[0]; assert r'G:\\AI-Home' not in root; assert '0.5b' not in root"

## Verify

docs/GROK_HANDOFF.md Project root section has no G: path or 0.5b

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
