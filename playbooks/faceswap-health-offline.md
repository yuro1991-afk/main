# Make face-swap health fail closed when the engine is down

- id: `faceswap-health-offline`
- kind: fix (Land a concrete bugfix in a named repo.)
- scope: relaunch
- repo: github.com/yuro1991-afk/face-swap-ios
- relaunch: https://github.com/yuro1991-afk/face-swap-ios
- why: Relaunch against the named repo. This landing-pad token cannot push it.

## Notes

gateway.py engine_json already returns 502 {detail: engine unreachable}. PWA chip and prove_swap treat status!=ok as RED. Ensure GET /api/ios/health never reports ok/GREEN when FACESWAP_ENGINE is closed, and keep the health call on the existing 5s timeout (do not use the 180s swap default).

## Collision

Do not change POST /api/ios/swap payload shape. Coordinate with faceswap-mock-engine-ci if both claimed.

## First commands

- git clone https://github.com/yuro1991-afk/face-swap-ios.git work && cd work
- git checkout -b cursor/faceswap-health-offline-from-ops
- edit: gateway.py, pwa/index.html, prove_swap.py
- With FACESWAP_ENGINE=http://127.0.0.1:9 gateway health JSON is not status ok; prove_swap exits 2.

## Verify

With FACESWAP_ENGINE=http://127.0.0.1:9 gateway health JSON is not status ok; prove_swap exits 2.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
