# Point SUPER_KERNEL.md Set-Location at repo root

- id: `dronehive-doc-super-kernel-cd`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-doc-super-kernel-cd.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

docs/SUPER_KERNEL.md still pins G:\\AI-Home Set-Location. Applyable catalog patch is patches/dronehive-doc-super-kernel-cd.patch on main#9. Independent of work-order-doc-cd. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

docs/SUPER_KERNEL.md Set-Location line only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-doc-super-kernel-cd
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-doc-super-kernel-cd-from-ops
- git apply --check /path/to/main/patches/dronehive-doc-super-kernel-cd.patch
- git apply /path/to/main/patches/dronehive-doc-super-kernel-cd.patch
- python3 -c "from pathlib import Path; t=Path('docs/SUPER_KERNEL.md').read_text(); assert '\nSet-Location .\n' in t; assert r'Set-Location G:\\AI-Home\\projects\\ai-worker-drone-0.5b' not in t"

## Verify

docs/SUPER_KERNEL.md Set-Location is a standalone Set-Location . line

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
