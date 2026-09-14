# Point ICONS_MANIFEST icon_root at repo assets/icons

- id: `dronehive-icons-manifest-relative`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-icons-manifest-relative.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

assets/icons/ICONS_MANIFEST.json still pins G:\AI-Home\projects\ai-worker-drone-0.5b\assets\icons. Desktop C: paths stay as one host example.

## Collision

Manifest only. Independent of portable-paths and config-load-overlay. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-icons-manifest-relative-from-ops
- git apply --check /path/to/main/patches/dronehive-icons-manifest-relative.patch
- git apply /path/to/main/patches/dronehive-icons-manifest-relative.patch

## Verify

ICONS_MANIFEST icon_root is assets/icons.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
