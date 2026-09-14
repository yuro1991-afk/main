# Point install SEC_REVIEW Target at repo root

- id: `opensussy-install-sec-review-target`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/opensussy
- relaunch: https://github.com/yuro1991-afk/opensussy
- why: This token cannot push opensussy. Apply `patches/opensussy-install-sec-review-target.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

install/docs/SEC_REVIEW.md Target still pins G:\AI-Home\projects\opensussy. Use `.`. Independent of reviews/SEC_REVIEW.md leftover.

## Collision

install/docs/SEC_REVIEW.md Target line only.

## First commands

- node src/cli.js patches --prove --job opensussy-install-sec-review-target
- git clone https://github.com/yuro1991-afk/opensussy.git work && cd work
- git checkout -b cursor/opensussy-install-sec-review-target-from-ops
- git apply --check /path/to/main/patches/opensussy-install-sec-review-target.patch
- git apply /path/to/main/patches/opensussy-install-sec-review-target.patch

## Verify

install/docs/SEC_REVIEW.md Target is .

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
