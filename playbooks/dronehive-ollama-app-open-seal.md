# Point drone-ollama-app Open OPERATIONAL_SEAL at repo out/

- id: `dronehive-ollama-app-open-seal`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-ollama-app-open-seal.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

main.rs Open OPERATIONAL_SEAL still pins G:\\AI-Home. Applyable catalog patch is patches/dronehive-ollama-app-open-seal.patch on main#9. Independent of out leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

apps/drone-ollama-app/src/main.rs Open OPERATIONAL_SEAL only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-ollama-app-open-seal
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-ollama-app-open-seal-from-ops
- git apply --check /path/to/main/patches/dronehive-ollama-app-open-seal.patch
- git apply /path/to/main/patches/dronehive-ollama-app-open-seal.patch
- python3 -c "from pathlib import Path; t=Path('apps/drone-ollama-app/src/main.rs').read_text(); assert any(x.strip() == 'r'+chr(34)+'out'+chr(92)+'OPERATIONAL_SEAL.json'+chr(34)+',' for x in t.splitlines()); assert '0.5b'+chr(92)+'out'+chr(92)+'OPERATIONAL_SEAL.json' not in t"

## Verify

main.rs Open OPERATIONAL_SEAL uses out\\OPERATIONAL_SEAL.json

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
