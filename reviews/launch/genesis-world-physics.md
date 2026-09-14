# Idle-agent relaunch — Add inventory tick command

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Add inventory tick command
- bcId: `bc-26e3762b-232c-54c8-847a-a9edb8d92bc1`
- card: `genesis-world-physics`
- launch: `reviews/launch/genesis-world-physics.md`
- Origin: https://cursor.com/codebase/yuri-afk/genesis

Paste the brief below into a new Origin cloud agent. Do not inventory this landing pad.

---

# Origin launch — genesis-world-physics

Work on Cursor Origin. This GitHub repo is the ops pad only.

- UI: https://cursor.com/codebase/yuri-afk/genesis
- Git: `origin.cursor.com/git/yuri-afk/genesis`
- Job: `genesis-world-physics` — Land Origin world-physics plane
- Packet: `reviews/handoff-genesis-world-physics.md`
- Playbook: `playbooks/genesis-world-physics.md`
- Priority: 38
- Verify: Slice lands on Origin only. CPU/local only; no GPU claim. GET /health stays live=dark until Superbrain probed.

## Notes

World-PM plane `physics`. Layer stack includes rigid + fluid. Not NVIDIA Genesis World. Not NVIDIA physics. Sound #104 is hearing, not this card. Notion PM https://app.notion.com/p/3db735da33f381b6ac1dc62b85b35f2d + layer https://app.notion.com/p/3db735da33f3817cb84fcf529384cb0a.

## Collision

World-host #87 does not run physics. Coordinate with layer #102 rigid/fluid ticks.

## First moves

- origin auth status
- If logged out: origin auth login --api-key "$CURSOR_API_KEY" (browser login is not available on this pad)
- origin repo clone yuri-afk/genesis genesis && cd genesis
- Do not reopen yuro1991-afk/main#1.
- Slice lands on Origin only. CPU/local only; no GPU claim. GET /health stays live=dark until Superbrain probed.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
- Do not open another landing-pad queue
- Do not mark Superbrain LIVE without a successful probe
- This pad token cannot push Origin — implement there


