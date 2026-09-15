# Idle-agent relaunch — Write review-agent playbook

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Write review-agent playbook
- bcId: `bc-c4f43f97-1d35-5934-b905-814766efe507`
- card: `faceswap-commit-pwa-icons`
- launch: `reviews/launch/faceswap-commit-pwa-icons.md`
- GitHub: https://github.com/yuro1991-afk/face-swap-ios

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

---

# Apply faceswap-commit-pwa-icons

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/face-swap-ios
- Relaunch: https://github.com/yuro1991-afk/face-swap-ios
- Patch: `patches/faceswap-commit-pwa-icons.patch`
- Job: `faceswap-commit-pwa-icons` — Commit the PWA icons face-swap already names
- Playbook: `playbooks/faceswap-commit-pwa-icons.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job faceswap-commit-pwa-icons`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job faceswap-commit-pwa-icons` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; files=['pwa/apple-touch-icon.png','pwa/icon-192.png','pwa/icon-512.png']; assert all(Path(p).is_file() and Path(p).stat().st_size>0 and Path(p).read_bytes()[:8]==bytes([137,80,78,71,13,10,26,10]) for p in files)"

## Notes

manifest/index.html/sw.js require icon-192.png, icon-512.png, apple-touch-icon.png. make_icons.py exists; PNGs were never committed.
Yuri: forget Origin. Take this GitHub sibling. This pad token cannot push it — relaunch that repo. Applyable catalog patch is patches/faceswap-commit-pwa-icons.patch on main#9. Do not copy PR #6 autofix.

## Collision

Same as keep-busy commit-pwa-homescreen-icons. Do not fight faceswap-mock-engine-ci if both touch sw.js.

## First moves

- node src/cli.js patches --prove --job faceswap-commit-pwa-icons
- node src/cli.js patches --prove-after-apply --job faceswap-commit-pwa-icons
- git clone https://github.com/yuro1991-afk/face-swap-ios.git work && cd work
- git checkout -b cursor/faceswap-commit-pwa-icons-from-ops
- git apply --check /path/to/main/patches/faceswap-commit-pwa-icons.patch
- git apply /path/to/main/patches/faceswap-commit-pwa-icons.patch
- python3 -c "from pathlib import Path; files=['pwa/apple-touch-icon.png','pwa/icon-192.png','pwa/icon-512.png']; assert all(Path(p).is_file() and Path(p).stat().st_size>0 and Path(p).read_bytes()[:8]==bytes([137,80,78,71,13,10,26,10]) for p in files)"
- Those three PNGs exist under pwa/ and return HTTP 200 when served.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/face-swap-ios — apply there


