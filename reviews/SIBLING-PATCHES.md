# Sibling patch catalog (verified 2026-09-14T19:12Z)

**Yuri: forget Origin.** This pad token cannot push the public GitHub
siblings. These diffs apply clean (`git apply --check`) on current
`main` of each repo. List them with `node src/cli.js patches`.

This is **not** PR #6’s autofix runner. Do not copy `bin/autofix.js`.

| job | sibling @ base | patch | apply-check |
| --- | --- | --- | --- |
| `dronehive-unicode-ci` | dronehive `d538a89` | `patches/dronehive-pro-chat-cp1252.patch` | OK |
| `bloom-gitignore-vercel` | bloom `288a484` | `patches/bloom-gitignore-vercel.patch` | OK |
| `bloom-readme-honest-export` | bloom `288a484` | `patches/bloom-readme-honest-export.patch` | OK |
| `bloom-ci-typecheck` | bloom `288a484` | `patches/bloom-ci-typecheck.patch` | OK |
| `bloom-health-probe` | bloom `288a484` | `patches/bloom-health-probe.patch` | OK |
| `opensussy-ship-json-2-0-0` | opensussy `d4b2949` | `patches/opensussy-ship-json-2-0-0.patch` | OK |
| `opensussy-agama-honesty` | opensussy `d4b2949` | `patches/opensussy-agama-honesty.patch` | OK |
| `faceswap-honesty-env-paths` | face-swap-ios `bba7188` | `patches/faceswap-honesty-env-paths.patch` | OK |
| `faceswap-commit-pwa-icons` | face-swap-ios `bba7188` | `patches/faceswap-commit-pwa-icons.patch` | OK |
| `ova-pwsh-syntax-ci` | ollama-voice-access `074bad0` | `patches/ova-pwsh-syntax-ci.patch` | OK |
| `ova-api-host-override` | ollama-voice-access `074bad0` | `patches/ova-api-host-override.patch` | OK |

## After apply

- bloom gitignore: also `git rm -r --cached .vercel/output` (58 tracked files). Keep `package-lock.json`.
- face-swap icons: copies also live under `patches/faceswap-pwa-icons/` if `git apply --binary` is awkward.
- opensussy 2.0.0: leave CHANGELOG `## 1.3.0` and `docs/superpowers/**` historical. `usb_zip_bytes` / `utc` stay until a real v2 USB zip exists.
- dronehive: do not rebase dronehive#2 until #1 `python-smoke` is green.

## Relaunch

```bash
node src/cli.js patches --job "$JOB_ID"
git clone "https://github.com/yuro1991-afk/<sibling>.git" work && cd work
git apply --check /path/to/main/<patch>
git apply /path/to/main/<patch>
```

Do not steal a rostered card. A waking agent with write access to that
sibling takes the matching job. Leftover unused on the GitHub-first
board (#8) is still `review-landing-pad-prs`.
This catalog is [main#9](https://github.com/yuro1991-afk/main/pull/9).
