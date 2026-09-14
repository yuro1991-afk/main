# Idle-agent relaunch — Automatic fixes

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Automatic fixes
- bcId: `bc-01a0a0da-ad32-75f7-a2a1-18a8602bab19`
- card: `faceswap-health-offline`
- launch: `reviews/launch/faceswap-health-offline.md`
- GitHub: https://github.com/yuro1991-afk/face-swap-ios

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

---

# GitHub launch — faceswap-health-offline

Work on the named GitHub repo. Forget Origin.

- UI: https://github.com/yuro1991-afk/face-swap-ios
- Git: `github.com/yuro1991-afk/face-swap-ios`
- Job: `faceswap-health-offline` — Make face-swap health fail closed when the engine is down
- Packet: `reviews/handoff-faceswap-health-offline.md`
- Playbook: `playbooks/faceswap-health-offline.md`
- Priority: 14
- Verify: With FACESWAP_ENGINE=http://127.0.0.1:9 gateway health JSON is not status ok; prove_swap exits 2.

## Notes

gateway.py engine_json already returns 502 {detail: engine unreachable}. PWA chip and prove_swap treat status!=ok as RED. Ensure GET /api/ios/health never reports ok/GREEN when FACESWAP_ENGINE is closed, and keep the health call on the existing 5s timeout (do not use the 180s swap default).
Yuri: forget Origin. Take this GitHub sibling. This pad token cannot push it — relaunch that repo.

## Collision

Do not change POST /api/ios/swap payload shape. Coordinate with faceswap-mock-engine-ci if both claimed.

## First moves

- git clone https://github.com/yuro1991-afk/face-swap-ios.git work && cd work
- git checkout -b cursor/faceswap-health-offline-from-ops
- edit: gateway.py, pwa/index.html, prove_swap.py
- With FACESWAP_ENGINE=http://127.0.0.1:9 gateway health JSON is not status ok; prove_swap exits 2.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not open another landing-pad queue
- Do not mark Superbrain LIVE without a successful probe
- This pad token cannot push sibling GitHub repos — relaunch there or apply a verified patch


