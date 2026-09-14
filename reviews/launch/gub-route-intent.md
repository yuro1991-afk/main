# Leftover unused — gub-route-intent

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `gub-route-intent`
- launch: `reviews/launch/gub-route-intent.md`
- Origin: https://cursor.com/codebase/yuri-afk/genesis

Paste the brief below into a new Origin cloud agent. Do not inventory this landing pad.

---

# Origin launch — gub-route-intent

Work on Cursor Origin. This GitHub repo is the ops pad only.

- UI: https://cursor.com/codebase/yuri-afk/genesis
- Git: `origin.cursor.com/git/yuri-afk/genesis`
- Job: `gub-route-intent` — Implement GUB route-intent playbook
- Packet: `reviews/handoff-gub-route-intent.md`
- Playbook: `playbooks/gub-route-intent.md`
- Priority: 10
- Verify: POST /v1/route persists a Genesis run. Playbooks score above skills. Do not invent LIVE lanes.

## Notes

Notion playbook/gub-route-intent https://app.notion.com/p/3db735da33f3819db32ecfc122a40c70 Status active. Route a free-text intent through the Genesis engine to a playbook, skill, tools, and optional subagent. Implement on origin.cursor.com/git/yuri-afk/genesis only.

## Collision

Same GUB process as gub-inventory-tick and genesis-auto-runner-41 (:8787 / :8788).

## First moves

- origin auth status
- If logged out: origin auth login --api-key "$CURSOR_API_KEY" (browser login is not available on this pad)
- origin repo clone yuri-afk/genesis genesis && cd genesis
- Do not reopen yuro1991-afk/main#1.
- POST /v1/route persists a Genesis run. Playbooks score above skills. Do not invent LIVE lanes.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
- Do not open another landing-pad queue
- Do not mark Superbrain LIVE without a successful probe
- This pad token cannot push Origin — implement there


