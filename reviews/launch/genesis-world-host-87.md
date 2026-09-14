# Idle-agent relaunch — Genesis inventory handoff

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Genesis inventory handoff
- bcId: `bc-3a1e5eed-7d37-5cfc-bdd8-939ebc0b84aa`
- card: `genesis-world-host-87`
- launch: `reviews/launch/genesis-world-host-87.md`
- Origin: https://cursor.com/codebase/yuri-afk/genesis

Paste the brief below into a new Origin cloud agent. Do not inventory this landing pad.

---

# Origin launch — genesis-world-host-87

Work on Cursor Origin. This GitHub repo is the ops pad only.

- UI: https://cursor.com/codebase/yuri-afk/genesis
- Git: `origin.cursor.com/git/yuri-afk/genesis`
- Job: `genesis-world-host-87` — Land Origin Python world host genesis#87
- Packet: `reviews/handoff-genesis-world-host-87.md`
- Playbook: `playbooks/genesis-world-host-87.md`
- Priority: 23
- Verify: cd packages/python-world-host && pytest && genesis-world-host serve. GET /health stays live=dark. Never bind UDP 2419.

## Notes

Notion https://app.notion.com/p/3db735da33f38166aebfc5ed8ace53a9. Branch cursor/genesis-world-host-1a8f. Origin PR genesis#87. Path packages/python-world-host, import genesis_world_host, contract genesis.python-world-host.v1. HTTP 127.0.0.1:8794. Binds occupancy and ticks the world clock. Does not merge shards, spawn brains, generate maps, or run physics.

## Collision

Port :8794 is also world-canon #93, sentient #96, and sound #104. Coordinate; do not steal :8792/:8793.

## First moves

- Attach to origin.cursor.com/git/yuri-afk/genesis — not this GitHub repo.
- Do not reopen yuro1991-afk/main#1.
- cd packages/python-world-host && pytest && genesis-world-host serve. GET /health stays live=dark. Never bind UDP 2419.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
- Do not open another landing-pad queue
- Do not mark Superbrain LIVE without a successful probe
- This pad token cannot push Origin — implement there


