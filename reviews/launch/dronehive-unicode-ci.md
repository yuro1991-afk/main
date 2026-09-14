# Idle-agent relaunch — Genesis catalog handoff

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Genesis catalog handoff
- bcId: `bc-7ea3a99b-a561-5188-a4ed-451f761a979b`
- card: `dronehive-unicode-ci`
- launch: `reviews/launch/dronehive-unicode-ci.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

---

# GitHub launch — dronehive-unicode-ci

Work on the named GitHub repo. Forget Origin.

- UI: https://github.com/yuro1991-afk/dronehive
- Git: `github.com/yuro1991-afk/dronehive`
- Job: `dronehive-unicode-ci` — Fix dronehive python-smoke UnicodeEncodeError
- Packet: `reviews/handoff-dronehive-unicode-ci.md`
- Playbook: `playbooks/dronehive-unicode-ci.md`
- Priority: 1
- Verify: python -m drone app pro --goal "ci pro write ci_ok.txt" --rounds 3 --no-ollama

## Notes

windows-latest CI dies printing ✓ via _chat in drone/pro/tool_agent.py (~367, 424, 464–506) under cp1252. Blocks dronehive PR #1 and stacked #2. Patch is on landing-pad PR #5; verified apply runner is PR #6 (`npm run autofix -- apply <checkout>`). This token cannot push dronehive — relaunch there.
Yuri: forget Origin. Take this GitHub sibling. This pad token cannot push it — relaunch that repo.

## Collision

Do not rewrite the patch on this repo. Checkout dronehive, apply github.com/yuro1991-afk/main/pull/5 patch, push on cursor/setup-dev-environment-2e0b.

## First moves

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-unicode-ci-from-ops
- edit: drone/pro/tool_agent.py, .github/workflows/ci.yml
- python -m drone app pro --goal "ci pro write ci_ok.txt" --rounds 3 --no-ollama

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not open another landing-pad queue
- Do not mark Superbrain LIVE without a successful probe
- This pad token cannot push sibling GitHub repos — relaunch there or apply a verified patch


