# Add non-nuclear Linux syntax CI for OpenSussy packs

- id: `opensussy-linux-syntax-ci`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/opensussy
- relaunch: https://github.com/yuro1991-afk/opensussy
- why: This token cannot push opensussy. Apply `patches/opensussy-linux-syntax-ci.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

No open issues/PRs. Repo has no .github/workflows. Add ubuntu-latest bash -n (and optional shellcheck) on install/linux/OpenSussy-light.sh, OpenSussy-deep.sh, and leap/tumbleweed copies. Never apply AutoYaST, never run deep wipe, never touch /dev/nvme0n1. Residual R2: confirm=false + initialize=true is nuclear.

## Collision

Do not edit Windows WPF / LinuxPayload.cs wipe path. Do not collide dronehive CI files. Do not reopen yuro1991-afk/main#1.

## First commands

- git clone https://github.com/yuro1991-afk/opensussy.git work && cd work
- git checkout -b cursor/opensussy-linux-syntax-ci-from-ops
- git apply --check /path/to/main/patches/opensussy-linux-syntax-ci.patch
- git apply /path/to/main/patches/opensussy-linux-syntax-ci.patch
- Workflow parses the six shell wrappers; job must not execute autoinst-deep.xml or format disks.

## Verify

Workflow parses the six shell wrappers; job must not execute autoinst-deep.xml or format disks.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
