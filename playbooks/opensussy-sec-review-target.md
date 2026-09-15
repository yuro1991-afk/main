# Point OpenSussy SEC_REVIEW Target at repo root

- id: `opensussy-sec-review-target`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/opensussy
- relaunch: https://github.com/yuro1991-afk/opensussy
- why: This token cannot push opensussy. Apply `patches/opensussy-sec-review-target.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

reviews/SEC_REVIEW.md Target still pins G:\AI-Home\projects\opensussy. Use `.`. Independent of ship-json-2-0-0 and sec-residuals-catalog.

## Collision

reviews/SEC_REVIEW.md Target line only.

## First commands

- node src/cli.js patches --prove --job opensussy-sec-review-target
- git clone https://github.com/yuro1991-afk/opensussy.git work && cd work
- git checkout -b cursor/opensussy-sec-review-target-from-ops
- git apply --check /path/to/main/patches/opensussy-sec-review-target.patch
- git apply /path/to/main/patches/opensussy-sec-review-target.patch
- python3 -c "from pathlib import Path; t=Path('reviews/SEC_REVIEW.md').read_text(); assert 'one host example' in t; assert r'G:\\AI-Home\\projects\\opensussy' in t"

## Verify

reviews/SEC_REVIEW.md Target is .

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
