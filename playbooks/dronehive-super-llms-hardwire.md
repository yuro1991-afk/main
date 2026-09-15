# Point super_llms.json hardwire at repo data/

- id: `dronehive-super-llms-hardwire`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-super-llms-hardwire.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

configs/super_llms.json super_mesh.hardwire still pins G:\AI-Home\projects\ai-worker-drone-0.5b. That is this repo; use data/super_mesh/HARDWIRE.json. Independent of multi-hosts-hardwire (different file) and config-load-overlay (Python remap only). No seed copy.

## Collision

configs/super_llms.json super_mesh.hardwire key only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-super-llms-hardwire
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-super-llms-hardwire-from-ops
- git apply --check /path/to/main/patches/dronehive-super-llms-hardwire.patch
- git apply /path/to/main/patches/dronehive-super-llms-hardwire.patch
- python3 -c "from pathlib import Path; import json; d=json.loads(Path('configs/super_llms.json').read_text()); assert d['super_mesh']['hardwire']=='data/super_mesh/HARDWIRE.json'"

## Verify

configs/super_llms.json super_mesh.hardwire is data/super_mesh/HARDWIRE.json.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
