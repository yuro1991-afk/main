# faceswap-commit-pwa-icons — evidence punch list

Clone: `https://github.com/yuro1991-afk/face-swap-ios.git` → `/tmp/face-swap-ios` (read-only; not modified).
HEAD: `bba7188` `feat: Swift shell, service worker, iOS Info.plist`

## Files named in the job

| Path | Present in working tree? | Tracked (`git ls-files`)? |
| --- | --- | --- |
| `pwa/icon-192.png` | **no** | no |
| `pwa/icon-512.png` | **no** | no |
| `pwa/apple-touch-icon.png` | **no** | no |
| `make_icons.py` | **yes** (repo root, 911 bytes) | yes |

`pwa/` contains only `index.html`, `manifest.webmanifest`, `sw.js`. No `*.png` anywhere in the clone (`find` / glob). `.gitignore` does not list those PNGs.

## Quotes that name the icons

`pwa/manifest.webmanifest` 12–14:

```
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" },
    { "src": "/apple-touch-icon.png", "sizes": "180x180", "type": "image/png" }
```

`pwa/index.html` line 13:

```
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

`index.html` does not mention `icon-192.png` or `icon-512.png`.

`pwa/sw.js` line 2:

```
const PRECACHE = ["/", "/index.html", "/manifest.webmanifest", "/apple-touch-icon.png", "/icon-192.png", "/icon-512.png"];
```

Those refs are root URLs (`/icon-….png`), not `pwa/icon-….png`.

## `make_icons.py` (exists; generator only)

Lines 9–18 write into `pwa/` if Pillow imports:

```
root = Path(__file__).resolve().parent / "pwa"
...
for size, name in [(180, "apple-touch-icon.png"), (512, "icon-512.png"), (192, "icon-192.png")]:
    ...
    im.save(root / name, "PNG")
```

On missing Pillow it exits: `Pillow not installed; icons are optional. App still runs.`

## Punch list

- [ ] PNG assets are referenced but **not in the repo**.
- [ ] `make_icons.py` is present at root; it is not run as part of this clone (no generated files).
- [ ] Manifest + SW expect `/icon-192.png`, `/icon-512.png`, `/apple-touch-icon.png`.
- [ ] `index.html` only links `/apple-touch-icon.png`.
- [ ] Home-screen / precache icons cannot be served from committed files at HEAD `bba7188`.
