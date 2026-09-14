# Add ubuntu-latest python-smoke to dronehive CI

- id: `dronehive-ubuntu-smoke`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-ubuntu-smoke.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

Keep windows-latest. Do not add packaging steps that overlap scripts/package_release.sh on PR #2.

## Collision

After unicode-ci; do not fight PR #2 packaging.

## First commands

- node src/cli.js patches --prove --job dronehive-ubuntu-smoke
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-ubuntu-smoke-from-ops
- git apply --check /path/to/main/patches/dronehive-ubuntu-smoke.patch
- git apply /path/to/main/patches/dronehive-ubuntu-smoke.patch
- Same four python-smoke commands on ubuntu-latest.

## Verify

Same four python-smoke commands on ubuntu-latest.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
