# Point drone-ollama-app README installer at repo-relative path

- id: `dronehive-ollama-app-readme-install`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-ollama-app-readme-install.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

apps/drone-ollama-app/README.md installer still pins G:\\AI-Home. Applyable catalog patch is patches/dronehive-ollama-app-readme-install.patch on main#9. Independent of dest leftover. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

apps/drone-ollama-app/README.md installer line only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-ollama-app-readme-install
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-ollama-app-readme-install-from-ops
- git apply --check /path/to/main/patches/dronehive-ollama-app-readme-install.patch
- git apply /path/to/main/patches/dronehive-ollama-app-readme-install.patch

## Verify

drone-ollama-app README installer uses apps\\drone-ollama-app

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
