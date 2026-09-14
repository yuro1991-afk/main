# Point grok_handoff clone dest defaults at host/ai-home

- id: `dronehive-grok-handoff-clone-dest`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-grok-handoff-clone-dest.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

drone/grok_handoff.py clone dest still pins G:\AI-Home. Use host/ai-home. Two dest assignments are one leftover. Independent of runtime-host-paths DEFAULT_ROOT wrap. Leave the G: goal regex (it parses host examples from the goal text).

## Collision

drone/grok_handoff.py clone dest defaults only. Leave the G: goal regex. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-grok-handoff-clone-dest
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-grok-handoff-clone-dest-from-ops
- git apply --check /path/to/main/patches/dronehive-grok-handoff-clone-dest.patch
- git apply /path/to/main/patches/dronehive-grok-handoff-clone-dest.patch

## Verify

grok_handoff.py clone dest defaults use host/ai-home/projects/dronehive-clone-test.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
