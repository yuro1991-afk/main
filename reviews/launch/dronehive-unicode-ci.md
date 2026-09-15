# Idle-agent relaunch — Genesis catalog handoff

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Genesis catalog handoff
- bcId: `bc-7ea3a99b-a561-5188-a4ed-451f761a979b`
- card: `dronehive-unicode-ci`
- launch: `reviews/launch/dronehive-unicode-ci.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

---

# Apply dronehive-unicode-ci

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-pro-chat-cp1252.patch`
- Job: `dronehive-unicode-ci` — Fix dronehive python-smoke UnicodeEncodeError
- Playbook: `playbooks/dronehive-unicode-ci.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-unicode-ci`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-unicode-ci` (throwaways; never write /tmp/siblings)
- After apply: PYTHONPATH=. python3 -c "import io,sys; from drone.pro.tool_agent import _chat; sys.stdout=type('S',(),{'encoding':'cp1252','buffer':io.BytesIO(),'write':lambda self,s:s.encode('cp1252'),'flush':lambda self:None})(); _chat('sys','ok ✓')"; python3 -c "from pathlib import Path; t=Path('.github/workflows/ci.yml').read_text(); assert 'PYTHONUTF8' in t; assert 'actions/checkout@v5' in t; assert 'actions/setup-python@v6' in t"

## Notes

windows-latest CI dies printing ✓ via _chat in drone/pro/tool_agent.py (~367, 424, 464–506) under cp1252. Blocks dronehive PR #1 and stacked #2. Applyable catalog patch is patches/dronehive-pro-chat-cp1252.patch on main#9. Do not copy PR #6 autofix. This token cannot push dronehive.
Yuri: forget Origin. Take this GitHub sibling. This pad token cannot push it — relaunch that repo.

## Collision

Avoid rewriting drone/pro/tool_agent.py while this card is claimed. Stack ubuntu-smoke after this leftover. Do not copy PR #6 autofix.

## First moves

- node src/cli.js patches --prove --job dronehive-unicode-ci
- node src/cli.js patches --prove-after-apply --job dronehive-unicode-ci
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-unicode-ci-from-ops
- git apply --check /path/to/main/patches/dronehive-pro-chat-cp1252.patch
- git apply /path/to/main/patches/dronehive-pro-chat-cp1252.patch
- PYTHONPATH=. python3 -c "import io,sys; from drone.pro.tool_agent import _chat; sys.stdout=type('S',(),{'encoding':'cp1252','buffer':io.BytesIO(),'write':lambda self,s:s.encode('cp1252'),'flush':lambda self:None})(); _chat('sys','ok ✓')"
- python3 -c "from pathlib import Path; t=Path('.github/workflows/ci.yml').read_text(); assert 'PYTHONUTF8' in t; assert 'actions/checkout@v5' in t; assert 'actions/setup-python@v6' in t"
- python -m drone app pro --goal "ci pro write ci_ok.txt" --rounds 3 --no-ollama

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/dronehive — apply there


