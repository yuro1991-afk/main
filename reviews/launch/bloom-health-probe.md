# Idle-agent relaunch — Summarize review transcripts

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Summarize review transcripts
- bcId: `bc-f9dc3a77-bb20-5c80-bd26-90ca64c8051c`
- card: `bloom-health-probe`
- launch: `reviews/launch/bloom-health-probe.md`
- GitHub: https://github.com/yuro1991-afk/bloom-fair-yellow-charm

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

---

# GitHub launch — bloom-health-probe

Work on the named GitHub repo. Forget Origin.

- UI: https://github.com/yuro1991-afk/bloom-fair-yellow-charm
- Git: `github.com/yuro1991-afk/bloom-fair-yellow-charm`
- Job: `bloom-health-probe` — Probe OMNI-FORGE /api/v1/health without claiming LIVE
- Packet: `reviews/handoff-bloom-health-probe.md`
- Playbook: `playbooks/bloom-health-probe.md`
- Priority: 21
- Verify: Write a small evidence JSON (status ok | unreachable). Never upgrade a timeout to LIVE. Optional: npm run preview if build already exists.

## Notes

src/routes/api/v1/health.ts plus docs: GET /api/v1/health (liveness, catalog size, agent flag). After npm run dev -- --host 0.0.0.0 --port 8080, GET health with a short timeout. Timeouts/connection errors are unreachable, never live. This is not BOSS Superbrain :45001 and not GOOSE-PC :8791.
Yuri: forget Origin. Take this GitHub sibling. This pad token cannot push it — relaunch that repo.

## Collision

Do not probe or relabel Superbrain from this card. Do not bind :8787/:8788 Origin auto-runner ports.

## First moves

- node src/cli.js probe
- Timeouts and non-2xx stay unreachable. Never write live.
- Write a small evidence JSON (status ok | unreachable). Never upgrade a timeout to LIVE. Optional: npm run preview if build already exists.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not open another landing-pad queue
- Do not mark Superbrain LIVE without a successful probe
- This pad token cannot push sibling GitHub repos — relaunch there or apply a verified patch


