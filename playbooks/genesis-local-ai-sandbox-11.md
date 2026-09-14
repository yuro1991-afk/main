# Land Origin local AI sandbox genesis#11

- id: `genesis-local-ai-sandbox-11`
- kind: origin-slice (Work on origin.cursor.com/git/yuri-afk/genesis only.)
- scope: relaunch
- repo: origin.cursor.com/git/yuri-afk/genesis
- relaunch: https://cursor.com/codebase/yuri-afk/genesis
- why: This cloud environment cannot authenticate to Origin.

## Notes

Notion https://app.notion.com/p/3db735da33f381708d56f2abec3626d9. Branch cursor/local-ai-sandbox-3931. Origin PR genesis#11. Path packages/sandbox. Isolated Python jail + OpenAI-compatible chat on http://127.0.0.1:8788. Stub provider by default (no GPU). MCP HTTP :8787.

## Collision

Port :8788 is also auto-runner #41 and python-bridge #57. :8787 is inventory. Do not steal those binds.

## First commands

- Attach to origin.cursor.com/git/yuri-afk/genesis — not this GitHub repo.
- Do not reopen yuro1991-afk/main#1.
- cd packages/sandbox && pytest && genesis-sandbox serve. Stub provider; no LIVE without a probe.

## Verify

cd packages/sandbox && pytest && genesis-sandbox serve. Stub provider; no LIVE without a probe.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
