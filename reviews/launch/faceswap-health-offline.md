# Idle-agent relaunch — Automatic fixes

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Automatic fixes
- bcId: `bc-01a0a0da-ad32-75f7-a2a1-18a8602bab19`
- card: `faceswap-health-offline`
- launch: `reviews/launch/faceswap-health-offline.md`
- GitHub: https://github.com/yuro1991-afk/face-swap-ios

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

---

# Apply faceswap-health-offline

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/face-swap-ios
- Relaunch: https://github.com/yuro1991-afk/face-swap-ios
- Patch: `patches/faceswap-health-offline.patch`
- Job: `faceswap-health-offline` — Make face-swap health fail closed when the engine is down
- Playbook: `playbooks/faceswap-health-offline.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job faceswap-health-offline`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job faceswap-health-offline` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; g=Path('gateway.py').read_text(); line=next(x for x in g.splitlines() if 'if code == 200 else' in x and 'status' in x); assert 'red' in line; assert 'degraded' not in line; assert 'timeout=5.0' in g; t=Path('tests/test_health_offline.py').read_text(); assert 'engine port is closed' in t; assert 'false_green' in t"

## Notes

gateway.py engine_json already returns 502 {detail: engine unreachable}. PWA chip and prove_swap treat status!=ok as RED. Ensure GET /api/ios/health never reports ok/GREEN when FACESWAP_ENGINE is closed, and keep the health call on the existing 5s timeout (do not use the 180s swap default).
Yuri: forget Origin. Take this GitHub sibling. This pad token cannot push it — relaunch that repo. Applyable catalog patch is patches/faceswap-health-offline.patch on main#9. Do not copy PR #6 autofix.

## Collision

Do not change POST /api/ios/swap payload shape. Coordinate with faceswap-mock-engine-ci if both claimed.

## First moves

- node src/cli.js patches --prove --job faceswap-health-offline
- node src/cli.js patches --prove-after-apply --job faceswap-health-offline
- git clone https://github.com/yuro1991-afk/face-swap-ios.git work && cd work
- git checkout -b cursor/faceswap-health-offline-from-ops
- git apply --check /path/to/main/patches/faceswap-health-offline.patch
- git apply /path/to/main/patches/faceswap-health-offline.patch
- python3 -c "from pathlib import Path; g=Path('gateway.py').read_text(); line=next(x for x in g.splitlines() if 'if code == 200 else' in x and 'status' in x); assert 'red' in line; assert 'degraded' not in line; assert 'timeout=5.0' in g; t=Path('tests/test_health_offline.py').read_text(); assert 'engine port is closed' in t; assert 'false_green' in t"
- With FACESWAP_ENGINE=http://127.0.0.1:9 gateway health JSON is not status ok; prove_swap exits 2.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/face-swap-ios — apply there


