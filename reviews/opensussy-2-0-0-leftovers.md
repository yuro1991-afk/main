# opensussy-ship-json-2-0-0 leftovers

Read-only scan of `https://github.com/yuro1991-afk/opensussy.git` cloned to `/tmp/opensussy` (do not edit that clone). HEAD `d4b2949` `main` — `feat: OpenSussy v2.0 Leap and Tumbleweed first-class packs`.

Apply on that repo later: bump user-facing **1.3.0** strings to **2.0.0** / `v2.0.0` so ship metadata matches the already-bumped product files. Keep historical changelog / design-spec mentions of 1.3.0 unless you are rewriting history.

## Already 2.0.0 — do not “fix”

| File | Evidence |
|------|----------|
| `VERSION` | L1 `OpenSussy 2.0.0` |
| `PRODUCT.json` | L5 `"version": "2.0.0"` |
| `install/PRODUCT.json` | L5 `"version": "2.0.0"` |
| `src/OpenSussy.Installer/OpenSussy.Installer.csproj` | L11–13 `<Version>2.0.0</Version>` / Assembly/File `2.0.0.0` |
| `install/VERSION.txt` | L1 `OpenSussy 2.0.0` |
| `src/OpenSussy.Installer/Engine/Product.cs` | L7 `Version = "2.0.0"` |

## Punch list (requested paths still on 1.3.0)

1. **`SHIP.json`** — release URLs + version still v1.3.0:
   - L8 `"usb_zip": ".../releases/download/v1.3.0/OpenSussy-USB.zip"`
   - L9 `"version": "1.3.0"`
   - L11 `"release": ".../releases/tag/v1.3.0"`
   - Also refresh `usb_zip_bytes` / `utc` when a v2.0.0 USB zip exists.

2. **`install/SHIP.json`** — installer ship seal:
   - L5 `"version": "1.3.0"`
   - L10 `"desktop": "...\\OpenSussy\\v1.3.0"`
   - Align `install_folder` / machine paths if you re-seal; do not invent a new zip URL here (this file has none).

3. **`docs/USER_GUIDE.md`** L3 `**Yuri Livarchuk · 23 Productions · v1.3.0**` → `v2.0.0`

4. **`install/docs/USER_GUIDE.md`** L3 same string as (3). Keep copies in sync.

5. **`SETUP-DESKTOP.cmd`**
   - L13 `set DEST=%DESK%\v1.3.0` → `v2.0.0`
   - L19 `...Description='OpenSussy OS Upgrade 1.3.0 — Yuri Livarchuk / 23 Productions'...`

6. **`INSTALL.cmd`** L39 `echo OpenSussy OS Upgrade 1.3.0` (writes `install/README.txt`).

## Extra leftovers (same grep; not invented)

- `install/README.txt` L1 `OpenSussy OS Upgrade 1.3.0` (stale output of INSTALL.cmd)
- `docs/ENGINEER_PASS.md` L1, L77 — title / `product:` 1.3.0
- `install/docs/ENGINEER_PASS.md` L1, L77 — same
- `LICENSE` L40 `Product: OpenSussy OS Upgrade 1.3.0`
- `install/LICENSE.txt` L40 same (linux copy already `OpenSussy 2.0.0`)
- `NOTICE` L1 `OpenSussy 1.3.0 — ...`
- `install/NOTICE.txt` L1 same
- `CHANGELOG.md` / `install/CHANGELOG.md` L15 `## 1.3.0 — 2026-08-16` — **keep** as prior release; L5 already `## 2.0.0`
- `docs/superpowers/specs/2026-08-16-opensussy-lab-design.md` L9, L163, L242 — historical “base 1.3.0”; leave unless the spec is restated for 2.0.0

## Verify after edits

`rg -n '1\.3\.0' --glob '!CHANGELOG.md' --glob '!**/CHANGELOG.md' --glob '!docs/superpowers/**'` should be empty except any paths you deliberately keep.
