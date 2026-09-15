# Idle-agent relaunch — Review sibling PRs 4-6

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Review sibling PRs 4-6
- bcId: `bc-059889f4-2b79-5473-a64e-f5c990ed531a`
- card: `faceswap-mock-engine-ci`
- launch: `reviews/launch/faceswap-mock-engine-ci.md`
- GitHub: https://github.com/yuro1991-afk/face-swap-ios

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

---

# Apply faceswap-mock-engine-ci

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/face-swap-ios
- Relaunch: https://github.com/yuro1991-afk/face-swap-ios
- Patch: `patches/faceswap-mock-engine-ci.patch`
- Job: `faceswap-mock-engine-ci` — CI for face-swap-ios gateway with a mock MultoModa engine
- Playbook: `playbooks/faceswap-mock-engine-ci.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job faceswap-mock-engine-ci`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job faceswap-mock-engine-ci` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; w=Path('.github/workflows/gateway-smoke.yml').read_text(); assert 'name: gateway-smoke' in w; assert 'actions/checkout@v5' in w; assert 'actions/setup-python@v6' in w; assert 'Mock engine + gateway health (no InsightFace)' in w; assert 'false_green' in w; m=Path('mock_engine.py').read_text(); assert 'No InsightFace, CUDA, or Jane' in m; assert 'local_only' in m"

## Notes

No open issues/PRs, no .github. prove_swap.py requires live :8855 + :8860. Add a stdlib mock that serves GET /api/health and POST swap JSON, point FACESWAP_ENGINE at it, run gateway.py, curl GET /api/ios/health and a fixture POST /api/ios/swap. Do not start InsightFace, CUDA, or Jane.
Yuri: forget Origin. Take this GitHub sibling. This pad token cannot push it — relaunch that repo. Applyable catalog patch is patches/faceswap-mock-engine-ci.patch on main#9. Do not copy PR #6 autofix.

## Collision

Do not bind or rewrite MultoModa on :8855. Do not commit G:\AI-Home host paths. Avoid dronehive CI.

## First moves

- node src/cli.js patches --prove --job faceswap-mock-engine-ci
- node src/cli.js patches --prove-after-apply --job faceswap-mock-engine-ci
- git clone https://github.com/yuro1991-afk/face-swap-ios.git work && cd work
- git checkout -b cursor/faceswap-mock-engine-ci-from-ops
- git apply --check /path/to/main/patches/faceswap-mock-engine-ci.patch
- git apply /path/to/main/patches/faceswap-mock-engine-ci.patch
- python3 -c "from pathlib import Path; w=Path('.github/workflows/gateway-smoke.yml').read_text(); assert 'name: gateway-smoke' in w; assert 'actions/checkout@v5' in w; assert 'actions/setup-python@v6' in w; assert 'Mock engine + gateway health (no InsightFace)' in w; assert 'false_green' in w; m=Path('mock_engine.py').read_text(); assert 'No InsightFace, CUDA, or Jane' in m; assert 'local_only' in m"
- Workflow GREEN without MultoModa. prove_swap.py --gateway http://127.0.0.1:8860 against the mock writes out/PROVE.json with false_green 0.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/face-swap-ios — apply there


