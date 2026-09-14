# Idle-agent relaunch — Summarize Genesis transcript

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Summarize Genesis transcript
- bcId: `bc-6b25900f-2fad-5f5b-8806-b3208a5af369`
- card: `genesis-data-logger-20`
- launch: `reviews/launch/genesis-data-logger-20.md`
- Origin: https://cursor.com/codebase/yuri-afk/genesis

Paste the brief below into a new Origin cloud agent. Do not inventory this landing pad.

---

# Origin launch — genesis-data-logger-20

Work on Cursor Origin. This GitHub repo is the ops pad only.

- UI: https://cursor.com/codebase/yuri-afk/genesis
- Git: `origin.cursor.com/git/yuri-afk/genesis`
- Job: `genesis-data-logger-20` — Land Origin data-logger genesis#20
- Packet: `reviews/handoff-genesis-data-logger-20.md`
- Playbook: `playbooks/genesis-data-logger-20.md`
- Priority: 15
- Verify: cd packages/data-logger && npm test. POST /v1/events works. Do not bind UDP 2419.

## Notes

Notion https://app.notion.com/p/3db735da33f381bbb3a7da19798da61e. Branch cursor/genesis-data-logger-9c7b. Origin PR genesis#20. Path packages/data-logger. Append-only JSONL event plane. UI http://127.0.0.1:7430. UDP ingest 2420. Mail pong stays on 2419.

## Collision

UDP 2419 is pong only. Ingest is 2420. Do not steal organizer :7432.

## First moves

- origin auth status
- If logged out: origin auth login --api-key "$CURSOR_API_KEY" (browser login is not available on this pad)
- origin repo clone yuri-afk/genesis genesis && cd genesis
- Do not reopen yuro1991-afk/main#1.
- cd packages/data-logger && npm test. POST /v1/events works. Do not bind UDP 2419.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
- Do not open another landing-pad queue
- Do not mark Superbrain LIVE without a successful probe
- This pad token cannot push Origin — implement there


