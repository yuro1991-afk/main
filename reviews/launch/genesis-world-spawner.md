# Idle-agent relaunch — Automatic fixes

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Automatic fixes
- bcId: `bc-01a0a0da-ad32-75f7-a2a1-18a8602bab19`
- card: `genesis-world-spawner`
- launch: `reviews/launch/genesis-world-spawner.md`
- Origin: https://cursor.com/codebase/yuri-afk/genesis

Paste the brief below into a new Origin cloud agent. Do not inventory this landing pad.

---

# Origin launch — genesis-world-spawner

Work on Cursor Origin. This GitHub repo is the ops pad only.

- UI: https://cursor.com/codebase/yuri-afk/genesis
- Git: `origin.cursor.com/git/yuri-afk/genesis`
- Job: `genesis-world-spawner` — Land Origin world-spawner plane
- Packet: `reviews/handoff-genesis-world-spawner.md`
- Playbook: `playbooks/genesis-world-spawner.md`
- Priority: 37
- Verify: Spawner stays on Origin. Never bind UDP 2419. Do not steal host occupancy on :8794.

## Notes

World-PM plane `spawner` — occupancy inside the map. World-layer #102 does not spawn subprocesses. World-PM does not occupy the village. Notion PM https://app.notion.com/p/3db735da33f381b6ac1dc62b85b35f2d + layer https://app.notion.com/p/3db735da33f3817cb84fcf529384cb0a.

## Collision

Coordinate with world-host #87 (binds occupancy) and world-map. Do not spawn from world-PM.

## First moves

- origin auth status
- If logged out: origin auth login --api-key "$CURSOR_API_KEY" (browser login is not available on this pad)
- origin repo clone yuri-afk/genesis genesis && cd genesis
- Do not reopen yuro1991-afk/main#1.
- Spawner stays on Origin. Never bind UDP 2419. Do not steal host occupancy on :8794.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
- Do not open another landing-pad queue
- Do not mark Superbrain LIVE without a successful probe
- This pad token cannot push Origin — implement there


