# Idle-agent relaunch — Genesis auto review

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Genesis auto review
- bcId: `bc-01a0a0c7-861a-7cd1-b552-28ddfc9841e0`
- card: `genesis-online-portal-26`
- launch: `reviews/launch/genesis-online-portal-26.md`
- Origin: https://cursor.com/codebase/yuri-afk/genesis

Paste the brief below into a new Origin cloud agent. Do not inventory this landing pad.

---

# Origin launch — genesis-online-portal-26

Work on Cursor Origin. This GitHub repo is the ops pad only.

- UI: https://cursor.com/codebase/yuri-afk/genesis
- Git: `origin.cursor.com/git/yuri-afk/genesis`
- Job: `genesis-online-portal-26` — Land Origin online portal genesis#26
- Packet: `reviews/handoff-genesis-online-portal-26.md`
- Playbook: `playbooks/genesis-online-portal-26.md`
- Priority: 16
- Verify: cd apps/online-portal && npm test && npm run dev. Probe Superbrain before LIVE.

## Notes

Notion https://app.notion.com/p/3db735da33f38116b915ccfa7fb74bc1. Branch cursor/genesis-online-portal-0eeb. Origin PR genesis#26. Path apps/online-portal. Surfaces: / /status /roster /lanes /catalog /directory /shelf /operator. Local hub stays the operator console.

## Collision

Public gateway work stays on Origin. Do not fork the hub onto this pad.

## First moves

- origin auth status
- If logged out: origin auth login --api-key "$CURSOR_API_KEY" (browser login is not available on this pad)
- origin repo clone yuri-afk/genesis genesis && cd genesis
- Do not reopen yuro1991-afk/main#1.
- cd apps/online-portal && npm test && npm run dev. Probe Superbrain before LIVE.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
- Do not open another landing-pad queue
- Do not mark Superbrain LIVE without a successful probe
- This pad token cannot push Origin — implement there


