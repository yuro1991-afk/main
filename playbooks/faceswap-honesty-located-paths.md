# Mark HONESTY.md Located G: paths as one host example

- id: `faceswap-honesty-located-paths`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/face-swap-ios
- relaunch: https://github.com/yuro1991-afk/face-swap-ios
- why: This token cannot push face-swap-ios. Apply `patches/faceswap-honesty-located-paths.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

HONESTY.md Located Path/Models still list G:\AI-Home as the canonical host. Contract is FACESWAP_ENGINE. Adjacent Located lines are one leftover. Independent of honesty-env-paths footer.

## Collision

HONESTY.md Located Path/Models only. Different hunk from honesty-env-paths footer. Do not vendor InsightFace weights.

## First commands

- node src/cli.js patches --prove --job faceswap-honesty-located-paths
- git clone https://github.com/yuro1991-afk/face-swap-ios.git work && cd work
- git checkout -b cursor/faceswap-honesty-located-paths-from-ops
- git apply --check /path/to/main/patches/faceswap-honesty-located-paths.patch
- git apply /path/to/main/patches/faceswap-honesty-located-paths.patch
- python3 -c "from pathlib import Path; t=Path('HONESTY.md').read_text(); path=next(x for x in t.splitlines() if x.startswith('- Path:')); models=next(x for x in t.splitlines() if x.startswith('- Models:')); assert 'one host example' in path; assert 'FACESWAP_ENGINE' in path; assert 'one host example' in models; assert 'weights stay off git' in models"

## Verify

HONESTY.md Located Path/Models say G: is one host example and FACESWAP_ENGINE is the contract.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
