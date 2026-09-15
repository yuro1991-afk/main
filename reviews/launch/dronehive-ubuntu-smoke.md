# Idle-agent relaunch — Genesis probe handoff

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Genesis probe handoff
- bcId: `bc-49564fc3-2875-51aa-b240-02e9b43bebc3`
- card: `dronehive-ubuntu-smoke`
- launch: `reviews/launch/dronehive-ubuntu-smoke.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

---

# Apply dronehive-ubuntu-smoke

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-ubuntu-smoke.patch`
- Requires (apply first): `patches/dronehive-pro-chat-cp1252.patch`
- Job: `dronehive-ubuntu-smoke` — Add ubuntu-latest python-smoke to dronehive CI
- Playbook: `playbooks/dronehive-ubuntu-smoke.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-ubuntu-smoke`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-ubuntu-smoke` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('.github/workflows/ci.yml').read_text(); assert 'python-smoke-ubuntu:' in t; assert 'actions/checkout@v5' in t; assert 'actions/setup-python@v6' in t; assert 'Pro agent (no ollama)' in t; assert 'ci pro write ci_ok.txt' in t; assert 'Work order show' in t"

## Notes

Keep windows-latest. Do not add packaging steps that overlap scripts/package_release.sh on PR #2.
Yuri: forget Origin. Take this GitHub sibling. This pad token cannot push it — relaunch that repo. Applyable catalog patch is patches/dronehive-pro-chat-cp1252.patch then patches/dronehive-ubuntu-smoke.patch on main#9. Do not copy PR #6 autofix.

## Collision

After unicode-ci; do not fight PR #2 packaging.

## First moves

- node src/cli.js patches --prove --job dronehive-ubuntu-smoke
- node src/cli.js patches --prove-after-apply --job dronehive-ubuntu-smoke
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-ubuntu-smoke-from-ops
- git apply --check /path/to/main/patches/dronehive-pro-chat-cp1252.patch
- git apply /path/to/main/patches/dronehive-pro-chat-cp1252.patch
- git apply --check /path/to/main/patches/dronehive-ubuntu-smoke.patch
- git apply /path/to/main/patches/dronehive-ubuntu-smoke.patch
- python3 -c "from pathlib import Path; t=Path('.github/workflows/ci.yml').read_text(); assert 'python-smoke-ubuntu:' in t; assert 'actions/checkout@v5' in t; assert 'actions/setup-python@v6' in t; assert 'Pro agent (no ollama)' in t; assert 'ci pro write ci_ok.txt' in t; assert 'Work order show' in t"
- ci.yml has python-smoke-ubuntu:. Do not run the smoke.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/dronehive — apply there


