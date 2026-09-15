# Point OpenSussy lab design base codebase at repo root

- id: `opensussy-superpowers-lab-design`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/opensussy
- relaunch: https://github.com/yuro1991-afk/opensussy
- why: This token cannot push opensussy. Apply `patches/opensussy-superpowers-lab-design.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

docs/superpowers/specs/2026-08-16-opensussy-lab-design.md still pins G:\AI-Home\projects\opensussy. Use `.`. G: is one host example. Independent of the plan leftover (different file) and SEC_REVIEW leftovers.

## Collision

Historical lab design Base codebase line only. Leave CHANGELOG 1.3.0.

## First commands

- node src/cli.js patches --prove --job opensussy-superpowers-lab-design
- git clone https://github.com/yuro1991-afk/opensussy.git work && cd work
- git checkout -b cursor/opensussy-superpowers-lab-design-from-ops
- git apply --check /path/to/main/patches/opensussy-superpowers-lab-design.patch
- git apply /path/to/main/patches/opensussy-superpowers-lab-design.patch
- python3 -c "from pathlib import Path; t=Path('docs/superpowers/specs/2026-08-16-opensussy-lab-design.md').read_text(); line=next(x for x in t.splitlines() if x.startswith('**Base codebase:**')); assert 'one host example' in line; assert 'OpenSussy 1.3.0' in line"

## Verify

lab design base codebase is `.`.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
