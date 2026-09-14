# Idle-agent relaunch — Write review-agent playbook

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Write review-agent playbook
- bcId: `bc-c4f43f97-1d35-5934-b905-814766efe507`
- card: `faceswap-commit-pwa-icons`
- launch: `reviews/launch/faceswap-commit-pwa-icons.md`
- GitHub: https://github.com/yuro1991-afk/face-swap-ios

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

---

# GitHub launch — faceswap-commit-pwa-icons

Work on the named GitHub repo. Forget Origin.

- UI: https://github.com/yuro1991-afk/face-swap-ios
- Git: `github.com/yuro1991-afk/face-swap-ios`
- Job: `faceswap-commit-pwa-icons` — Commit the PWA icons face-swap already names
- Packet: `reviews/handoff-faceswap-commit-pwa-icons.md`
- Playbook: `playbooks/faceswap-commit-pwa-icons.md`
- Priority: 13
- Verify: Those three PNGs exist under pwa/ and return HTTP 200 when served.

## Notes

manifest/index.html/sw.js require icon-192.png, icon-512.png, apple-touch-icon.png. make_icons.py exists; PNGs were never committed.
Yuri: forget Origin. Take this GitHub sibling. This pad token cannot push it — relaunch that repo.

## Collision

Same as keep-busy commit-pwa-homescreen-icons. Do not fight faceswap-mock-engine-ci if both touch sw.js.

## First moves

- git clone https://github.com/yuro1991-afk/face-swap-ios.git work && cd work
- git checkout -b cursor/faceswap-commit-pwa-icons-from-ops
- edit: pwa/icon-192.png, pwa/icon-512.png, pwa/apple-touch-icon.png, make_icons.py
- Those three PNGs exist under pwa/ and return HTTP 200 when served.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not open another landing-pad queue
- Do not mark Superbrain LIVE without a successful probe
- This pad token cannot push sibling GitHub repos — relaunch there or apply a verified patch


