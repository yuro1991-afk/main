# CI for face-swap-ios gateway with a mock MultoModa engine

- id: `faceswap-mock-engine-ci`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/face-swap-ios
- relaunch: https://github.com/yuro1991-afk/face-swap-ios
- why: Relaunch against the named repo. This landing-pad token cannot push it.

## Notes

No open issues/PRs, no .github. prove_swap.py requires live :8855 + :8860. Add a stdlib mock that serves GET /api/health and POST swap JSON, point FACESWAP_ENGINE at it, run gateway.py, curl GET /api/ios/health and a fixture POST /api/ios/swap. Do not start InsightFace, CUDA, or Jane.

## Collision

Do not bind or rewrite MultoModa on :8855. Do not commit G:\AI-Home host paths. Avoid dronehive CI.

## First commands

- git clone https://github.com/yuro1991-afk/face-swap-ios.git work && cd work
- git checkout -b cursor/faceswap-mock-engine-ci-from-ops
- edit: gateway.py, prove_swap.py, fixtures/portrait-a.jpg, fixtures/portrait-b.jpg, .github/workflows/gateway-smoke.yml
- Workflow GREEN without MultoModa. prove_swap.py --gateway http://127.0.0.1:8860 against the mock writes out/PROVE.json with false_green 0.

## Verify

Workflow GREEN without MultoModa. prove_swap.py --gateway http://127.0.0.1:8860 against the mock writes out/PROVE.json with false_green 0.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
