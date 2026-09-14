# Point package_release_v2.ps1 cargo homes at host/ai-home

- id: `dronehive-package-release-v2-cargo`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-package-release-v2-cargo.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

scripts/package_release_v2.ps1 still pins G:\AI-Home\tools cargo/rustup. Use Join-Path $Root host/ai-home/tools. Independent of start-script leftovers.

## Collision

scripts/package_release_v2.ps1 cargo/rustup env only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-package-release-v2-cargo
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-package-release-v2-cargo-from-ops
- git apply --check /path/to/main/patches/dronehive-package-release-v2-cargo.patch
- git apply /path/to/main/patches/dronehive-package-release-v2-cargo.patch

## Verify

package_release_v2.ps1 cargo/rustup env uses Join-Path $Root host/ai-home/tools

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
