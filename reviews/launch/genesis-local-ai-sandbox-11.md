# Idle-agent relaunch — Summarize auto-review transcript

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Summarize auto-review transcript
- bcId: `bc-a0676248-ac40-5a63-83ac-c5a867f0ad96`
- card: `genesis-local-ai-sandbox-11`
- launch: `reviews/launch/genesis-local-ai-sandbox-11.md`
- Origin: https://cursor.com/codebase/yuri-afk/genesis

Paste the brief below into a new Origin cloud agent. Do not inventory this landing pad.

---

# Origin launch — genesis-local-ai-sandbox-11

Work on Cursor Origin. This GitHub repo is the ops pad only.

- UI: https://cursor.com/codebase/yuri-afk/genesis
- Git: `origin.cursor.com/git/yuri-afk/genesis`
- Job: `genesis-local-ai-sandbox-11` — Land Origin local AI sandbox genesis#11
- Packet: `reviews/handoff-genesis-local-ai-sandbox-11.md`
- Playbook: `playbooks/genesis-local-ai-sandbox-11.md`
- Priority: 14
- Verify: cd packages/sandbox && pytest && genesis-sandbox serve. Stub provider; no LIVE without a probe.

## Notes

Notion https://app.notion.com/p/3db735da33f381708d56f2abec3626d9. Branch cursor/local-ai-sandbox-3931. Origin PR genesis#11. Path packages/sandbox. Isolated Python jail + OpenAI-compatible chat on http://127.0.0.1:8788. Stub provider by default (no GPU). MCP HTTP :8787.

## Collision

Port :8788 is also auto-runner #41 and python-bridge #57. :8787 is inventory. Do not steal those binds.

## First moves

- Attach to origin.cursor.com/git/yuri-afk/genesis — not this GitHub repo.
- Do not reopen yuro1991-afk/main#1.
- cd packages/sandbox && pytest && genesis-sandbox serve. Stub provider; no LIVE without a probe.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
- Do not open another landing-pad queue
- Do not mark Superbrain LIVE without a successful probe
- This pad token cannot push Origin — implement there


