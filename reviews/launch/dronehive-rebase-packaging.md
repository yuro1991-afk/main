# Idle-agent relaunch — Genesis routing handoff

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Genesis routing handoff
- bcId: `bc-0d442773-0df2-5780-92da-605c3f4ac598`
- card: `dronehive-rebase-packaging`
- launch: `reviews/launch/dronehive-rebase-packaging.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

---

# GitHub launch — dronehive-rebase-packaging

Work on the named GitHub repo. Forget Origin.

- UI: https://github.com/yuro1991-afk/dronehive
- Git: `github.com/yuro1991-afk/dronehive`
- Job: `dronehive-rebase-packaging` — Rebase dronehive PR #2 after #1 is green
- Packet: `reviews/handoff-dronehive-rebase-packaging.md`
- Playbook: `playbooks/dronehive-rebase-packaging.md`
- Priority: 2
- Verify: Confirm python-smoke on the rebased head.

## Notes

Stacked on #1. Rebase cursor/package-install-cli-2e0b after Unicode CI is green. Do not re-edit drone/app/service.py.
Yuri: forget Origin. Take this GitHub sibling. This pad token cannot push it — relaunch that repo.

## Collision

Blocked until dronehive-unicode-ci is done.

## First moves

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-rebase-packaging-from-ops
- edit: (see notes)
- Confirm python-smoke on the rebased head.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not open another landing-pad queue
- Do not mark Superbrain LIVE without a successful probe
- This pad token cannot push sibling GitHub repos — relaunch there or apply a verified patch


