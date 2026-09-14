# Point multi_hosts.json hardwire at repo data/

- id: `dronehive-multi-hosts-hardwire`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-multi-hosts-hardwire.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

configs/multi_hosts.json super_mesh.hardwire still pins G:\AI-Home\projects\ai-worker-drone-0.5b. That is this repo; use data/super_mesh/HARDWIRE.json (same as fabric_root → "."). Independent of multi-hosts-exe-honesty (exe keys) and super-llms-hardwire (different file). No seed copy.

## Collision

configs/multi_hosts.json super_mesh.hardwire key only. Do not edit C:\ AppData exe leftovers. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-multi-hosts-hardwire
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-multi-hosts-hardwire-from-ops
- git apply --check /path/to/main/patches/dronehive-multi-hosts-hardwire.patch
- git apply /path/to/main/patches/dronehive-multi-hosts-hardwire.patch

## Verify

configs/multi_hosts.json super_mesh.hardwire is data/super_mesh/HARDWIRE.json.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
