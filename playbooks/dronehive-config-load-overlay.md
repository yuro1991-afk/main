# Remap F:/D:/G: strings when dronehive JSON configs load

- id: `dronehive-config-load-overlay`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-portable-paths.patch` then `patches/dronehive-config-load-overlay.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

After Path() wraps, hive / future_seer / multi_hosts / work_order / super_llms JSON still leak F:/D:/G: on load. Apply portable-paths first so `drone/host_paths.py` exists. New file `drone/config_overlay.py` walks loaded JSON.

## Collision

Apply after dronehive-portable-paths. Independent of runtime-host-paths. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-config-load-overlay-from-ops
- git apply /path/to/main/patches/dronehive-portable-paths.patch
- git apply --check /path/to/main/patches/dronehive-config-load-overlay.patch
- git apply /path/to/main/patches/dronehive-config-load-overlay.patch
- python3 -m py_compile drone/config_overlay.py drone/hive.py drone/future_seer.py drone/multi_face.py drone/model_clones.py drone/super_mesh.py drone/super_llms.py drone/work_order.py drone/knowledge_imprint.py drone/__main__.py

## Verify

python3 -m py_compile drone/config_overlay.py drone/hive.py drone/future_seer.py drone/multi_face.py drone/model_clones.py drone/super_mesh.py drone/super_llms.py drone/work_order.py drone/knowledge_imprint.py drone/__main__.py

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
