# Probe OMNI-FORGE /api/v1/health without claiming LIVE

- id: `bloom-health-probe`
- kind: probe (Probe a lane. Timeouts are unreachable, never live.)
- scope: relaunch
- repo: github.com/yuro1991-afk/bloom-fair-yellow-charm
- relaunch: https://github.com/yuro1991-afk/bloom-fair-yellow-charm
- why: This token cannot push bloom-fair-yellow-charm. Apply `patches/bloom-health-probe.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix. Do not probe Superbrain.

## Notes

src/routes/api/v1/health.ts plus docs: GET /api/v1/health (liveness, catalog size, agent flag). After npm run dev -- --host 0.0.0.0 --port 8080, GET health with a short timeout. Timeouts/connection errors are unreachable, never live. This is not BOSS Superbrain :45001 and not GOOSE-PC :8791.
Blocked: Yuri scoped this landing pad to Genesis only.

## Collision

Do not probe or relabel Superbrain from this card. Do not bind :8787/:8788 Origin auto-runner ports.

## First commands

- git clone https://github.com/yuro1991-afk/bloom-fair-yellow-charm.git work && cd work
- git checkout -b cursor/bloom-health-probe-from-ops
- git apply --check /path/to/main/patches/bloom-health-probe.patch
- git apply /path/to/main/patches/bloom-health-probe.patch
- Write a small evidence JSON (status ok | unreachable). Never upgrade a timeout to LIVE. Optional: npm run preview if build already exists.

## Verify

Write a small evidence JSON (status ok | unreachable). Never upgrade a timeout to LIVE. Optional: npm run preview if build already exists.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
