# Commit the PWA icons face-swap already names

- id: `faceswap-commit-pwa-icons`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/face-swap-ios
- relaunch: https://github.com/yuro1991-afk/face-swap-ios
- why: Relaunch against the named repo. This landing-pad token cannot push it.

## Notes

manifest/index.html/sw.js require icon-192.png, icon-512.png, apple-touch-icon.png. make_icons.py exists; PNGs were never committed.

## Collision

Same as keep-busy commit-pwa-homescreen-icons. Do not fight faceswap-mock-engine-ci if both touch sw.js.

## First commands

- git clone https://github.com/yuro1991-afk/face-swap-ios.git work && cd work
- git checkout -b cursor/faceswap-commit-pwa-icons-from-ops
- edit: pwa/icon-192.png, pwa/icon-512.png, pwa/apple-touch-icon.png, make_icons.py
- Those three PNGs exist under pwa/ and return HTTP 200 when served.

## Verify

Those three PNGs exist under pwa/ and return HTTP 200 when served.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
