# Fix dronehive python-smoke UnicodeEncodeError

- id: `dronehive-unicode-ci`
- kind: fix (Land a concrete bugfix in a named repo.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply PR #6: npm run autofix -- apply <checkout>.

## Notes

windows-latest CI dies printing ✓ via _chat in drone/pro/tool_agent.py (~367, 424, 464–506) under cp1252. Blocks dronehive PR #1 and stacked #2. Patch is on landing-pad PR #5; verified apply runner is PR #6 (`npm run autofix -- apply <checkout>`). This token cannot push dronehive — relaunch there.

## Collision

Do not rewrite the patch on this repo. Checkout dronehive, apply github.com/yuro1991-afk/main/pull/5 patch, push on cursor/setup-dev-environment-2e0b.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-unicode-ci-from-ops
- edit: drone/pro/tool_agent.py, .github/workflows/ci.yml
- python -m drone app pro --goal "ci pro write ci_ok.txt" --rounds 3 --no-ollama

## Verify

python -m drone app pro --goal "ci pro write ci_ok.txt" --rounds 3 --no-ollama

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
