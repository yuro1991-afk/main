# Fix dronehive python-smoke UnicodeEncodeError

- id: `dronehive-unicode-ci`
- kind: fix (Land a concrete bugfix in a named repo.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-pro-chat-cp1252.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

windows-latest CI dies printing ✓ via _chat in drone/pro/tool_agent.py (~367, 424, 464–506) under cp1252. Blocks dronehive PR #1 and stacked #2. Applyable catalog patch is patches/dronehive-pro-chat-cp1252.patch on main#9. Do not copy PR #6 autofix.

## Collision

Avoid rewriting drone/pro/tool_agent.py while this card is claimed. Stack ubuntu-smoke after this leftover.

## First commands

- node src/cli.js patches --prove --job dronehive-unicode-ci
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-unicode-ci-from-ops
- git apply --check /path/to/main/patches/dronehive-pro-chat-cp1252.patch
- git apply /path/to/main/patches/dronehive-pro-chat-cp1252.patch
- python -m drone app pro --goal "ci pro write ci_ok.txt" --rounds 3 --no-ollama

## Verify

python -m drone app pro --goal "ci pro write ci_ok.txt" --rounds 3 --no-ollama

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
