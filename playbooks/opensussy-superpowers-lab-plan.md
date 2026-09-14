# Point OpenSussy lab plan save-path at repo-relative docs

- id: `opensussy-superpowers-lab-plan`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/opensussy
- relaunch: https://github.com/yuro1991-afk/opensussy
- why: This token cannot push opensussy. Apply `patches/opensussy-superpowers-lab-plan.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

docs/superpowers/plans/2026-08-16-opensussy-lab.md still pins G:\AI-Home\projects\opensussy. Use the repo-relative plan path. G: is one host example. Independent of SEC_REVIEW leftovers and ship-json-2-0-0.

## Collision

Historical lab plan save-path line only. Leave CHANGELOG 1.3.0.

## First commands

- git clone https://github.com/yuro1991-afk/opensussy.git work && cd work
- git checkout -b cursor/opensussy-superpowers-lab-plan-from-ops
- git apply --check /path/to/main/patches/opensussy-superpowers-lab-plan.patch
- git apply /path/to/main/patches/opensussy-superpowers-lab-plan.patch

## Verify

lab plan save-path is docs/superpowers/plans/2026-08-16-opensussy-lab.md.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
