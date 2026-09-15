# Commit the PWA icons face-swap already names

- id: `faceswap-commit-pwa-icons`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/face-swap-ios
- relaunch: https://github.com/yuro1991-afk/face-swap-ios
- why: This token cannot push face-swap-ios. Apply `patches/faceswap-commit-pwa-icons.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

manifest/index.html/sw.js require icon-192.png, icon-512.png, apple-touch-icon.png. make_icons.py exists; PNGs were never committed.

## Collision

Same as keep-busy commit-pwa-homescreen-icons. Do not fight faceswap-mock-engine-ci if both touch sw.js.

## First commands

- node src/cli.js patches --prove --job faceswap-commit-pwa-icons
- git clone https://github.com/yuro1991-afk/face-swap-ios.git work && cd work
- git checkout -b cursor/faceswap-commit-pwa-icons-from-ops
- git apply --check /path/to/main/patches/faceswap-commit-pwa-icons.patch
- git apply /path/to/main/patches/faceswap-commit-pwa-icons.patch
- python3 -c "from pathlib import Path; files=['pwa/apple-touch-icon.png','pwa/icon-192.png','pwa/icon-512.png']; assert all(Path(p).is_file() and Path(p).stat().st_size>0 and Path(p).read_bytes()[:8]==bytes([137,80,78,71,13,10,26,10]) for p in files)"

## Verify

Those three PNGs exist under pwa/ and return HTTP 200 when served.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
