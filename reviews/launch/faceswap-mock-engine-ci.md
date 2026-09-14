# Idle-agent relaunch — Review sibling PRs 4-6

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Review sibling PRs 4-6
- bcId: `bc-059889f4-2b79-5473-a64e-f5c990ed531a`
- card: `faceswap-mock-engine-ci`
- launch: `reviews/launch/faceswap-mock-engine-ci.md`
- GitHub: https://github.com/yuro1991-afk/face-swap-ios

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

---

# GitHub launch — faceswap-mock-engine-ci

Work on the named GitHub repo. Forget Origin.

- UI: https://github.com/yuro1991-afk/face-swap-ios
- Git: `github.com/yuro1991-afk/face-swap-ios`
- Job: `faceswap-mock-engine-ci` — CI for face-swap-ios gateway with a mock MultoModa engine
- Packet: `reviews/handoff-faceswap-mock-engine-ci.md`
- Playbook: `playbooks/faceswap-mock-engine-ci.md`
- Priority: 13
- Verify: Workflow GREEN without MultoModa. prove_swap.py --gateway http://127.0.0.1:8860 against the mock writes out/PROVE.json with false_green 0.

## Notes

No open issues/PRs, no .github. prove_swap.py requires live :8855 + :8860. Add a stdlib mock that serves GET /api/health and POST swap JSON, point FACESWAP_ENGINE at it, run gateway.py, curl GET /api/ios/health and a fixture POST /api/ios/swap. Do not start InsightFace, CUDA, or Jane.
Yuri: forget Origin. Take this GitHub sibling. This pad token cannot push it — relaunch that repo.

## Collision

Do not bind or rewrite MultoModa on :8855. Do not commit G:\AI-Home host paths. Avoid dronehive CI.

## First moves

- git clone https://github.com/yuro1991-afk/face-swap-ios.git work && cd work
- git checkout -b cursor/faceswap-mock-engine-ci-from-ops
- edit: gateway.py, prove_swap.py, fixtures/portrait-a.jpg, fixtures/portrait-b.jpg, .github/workflows/gateway-smoke.yml
- Workflow GREEN without MultoModa. prove_swap.py --gateway http://127.0.0.1:8860 against the mock writes out/PROVE.json with false_green 0.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not open another landing-pad queue
- Do not mark Superbrain LIVE without a successful probe
- This pad token cannot push sibling GitHub repos — relaunch there or apply a verified patch


