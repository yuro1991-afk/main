# Idle-agent relaunch — Genesis probe handoff

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Genesis probe handoff
- bcId: `bc-49564fc3-2875-51aa-b240-02e9b43bebc3`
- card: `dronehive-ubuntu-smoke`
- launch: `reviews/launch/dronehive-ubuntu-smoke.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

---

# GitHub launch — dronehive-ubuntu-smoke

Work on the named GitHub repo. Forget Origin.

- UI: https://github.com/yuro1991-afk/dronehive
- Git: `github.com/yuro1991-afk/dronehive`
- Job: `dronehive-ubuntu-smoke` — Add ubuntu-latest python-smoke to dronehive CI
- Packet: `reviews/handoff-dronehive-ubuntu-smoke.md`
- Playbook: `playbooks/dronehive-ubuntu-smoke.md`
- Priority: 5
- Verify: Same four python-smoke commands on ubuntu-latest.

## Notes

Keep windows-latest. Do not add packaging steps that overlap scripts/package_release.sh on PR #2.
Yuri: forget Origin. Take this GitHub sibling. This pad token cannot push it — relaunch that repo.

## Collision

After unicode-ci; do not fight PR #2 packaging.

## First moves

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-ubuntu-smoke-from-ops
- edit: .github/workflows/ci.yml
- Same four python-smoke commands on ubuntu-latest.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not open another landing-pad queue
- Do not mark Superbrain LIVE without a successful probe
- This pad token cannot push sibling GitHub repos — relaunch there or apply a verified patch


