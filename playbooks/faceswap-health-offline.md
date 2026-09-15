# Make face-swap health fail closed when the engine is down

- id: `faceswap-health-offline`
- kind: fix (Land a concrete bugfix in a named repo.)
- scope: relaunch
- repo: github.com/yuro1991-afk/face-swap-ios
- relaunch: https://github.com/yuro1991-afk/face-swap-ios
- why: This token cannot push face-swap-ios. Apply `patches/faceswap-health-offline.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

gateway.py engine_json already returns 502 {detail: engine unreachable}. PWA chip and prove_swap treat status!=ok as RED. Ensure GET /api/ios/health never reports ok/GREEN when FACESWAP_ENGINE is closed, and keep the health call on the existing 5s timeout (do not use the 180s swap default).

## Collision

Do not change POST /api/ios/swap payload shape. Coordinate with faceswap-mock-engine-ci if both claimed.

## First commands

- node src/cli.js patches --prove --job faceswap-health-offline
- git clone https://github.com/yuro1991-afk/face-swap-ios.git work && cd work
- git checkout -b cursor/faceswap-health-offline-from-ops
- git apply --check /path/to/main/patches/faceswap-health-offline.patch
- git apply /path/to/main/patches/faceswap-health-offline.patch
- python3 -c "from pathlib import Path; g=Path('gateway.py').read_text(); line=next(x for x in g.splitlines() if 'if code == 200 else' in x and 'status' in x); assert 'red' in line; assert 'degraded' not in line; assert 'timeout=5.0' in g; t=Path('tests/test_health_offline.py').read_text(); assert 'engine port is closed' in t; assert 'false_green' in t"

## Verify

With FACESWAP_ENGINE=http://127.0.0.1:9 gateway health JSON is not status ok; prove_swap exits 2.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
