# Idle-agent relaunch — Summarize review transcripts

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Summarize review transcripts
- bcId: `bc-f9dc3a77-bb20-5c80-bd26-90ca64c8051c`
- card: `bloom-health-probe`
- launch: `reviews/launch/bloom-health-probe.md`
- GitHub: https://github.com/yuro1991-afk/bloom-fair-yellow-charm

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

---

# Apply bloom-health-probe

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/bloom-fair-yellow-charm
- Relaunch: https://github.com/yuro1991-afk/bloom-fair-yellow-charm
- Patch: `patches/bloom-health-probe.patch`
- Job: `bloom-health-probe` — Probe OMNI-FORGE /api/v1/health without claiming LIVE
- Playbook: `playbooks/bloom-health-probe.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job bloom-health-probe`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job bloom-health-probe` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('scripts/probe-health.mjs').read_text(); assert 'unreachable' in t; assert 'live: false' in t; assert '45001' in t"

## Notes

src/routes/api/v1/health.ts plus docs: GET /api/v1/health (liveness, catalog size, agent flag). After npm run dev -- --host 0.0.0.0 --port 8080, GET health with a short timeout. Timeouts/connection errors are unreachable, never live. This is not BOSS Superbrain :45001 and not GOOSE-PC :8791.
Yuri: forget Origin. Take this GitHub sibling. This pad token cannot push it — relaunch that repo. Applyable catalog patch is patches/bloom-health-probe.patch on main#9. Do not copy PR #6 autofix.

## Collision

Do not probe or relabel Superbrain from this card. Do not bind :8787/:8788 Origin auto-runner ports.

## First moves

- node src/cli.js patches --prove --job bloom-health-probe
- node src/cli.js patches --prove-after-apply --job bloom-health-probe
- git clone https://github.com/yuro1991-afk/bloom-fair-yellow-charm.git work && cd work
- git checkout -b cursor/bloom-health-probe-from-ops
- git apply --check /path/to/main/patches/bloom-health-probe.patch
- git apply /path/to/main/patches/bloom-health-probe.patch
- python3 -c "from pathlib import Path; t=Path('scripts/probe-health.mjs').read_text(); assert 'unreachable' in t; assert 'live: false' in t; assert '45001' in t"
- Write a small evidence JSON (status ok | unreachable). Never upgrade a timeout to LIVE. Optional: npm run preview if build already exists.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/bloom-fair-yellow-charm — apply there


