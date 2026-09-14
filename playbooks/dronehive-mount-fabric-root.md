# Point mount fabric default_drone_root at repo root

- id: `dronehive-mount-fabric-root`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-mount-fabric-root.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

fabric.rs default_drone_root still pins G:\\AI-Home. Applyable catalog patch is patches/dronehive-mount-fabric-root.patch on main#9. Independent of engine-out leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

apps/drone-ollama-mount/src/fabric.rs default_drone_root only. Leave C:\\Python candidates. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-mount-fabric-root-from-ops
- git apply --check /path/to/main/patches/dronehive-mount-fabric-root.patch
- git apply /path/to/main/patches/dronehive-mount-fabric-root.patch

## Verify

fabric.rs default_drone_root is .

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
