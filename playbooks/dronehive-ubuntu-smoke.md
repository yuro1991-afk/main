# Add ubuntu-latest python-smoke to dronehive CI

- id: `dronehive-ubuntu-smoke`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply PR #6: npm run autofix -- apply <checkout>.

## Notes

Keep windows-latest. Do not add packaging steps that overlap scripts/package_release.sh on PR #2.

## Collision

After unicode-ci; do not fight PR #2 packaging.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-ubuntu-smoke-from-ops
- edit: .github/workflows/ci.yml
- Same four python-smoke commands on ubuntu-latest.

## Verify

Same four python-smoke commands on ubuntu-latest.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
