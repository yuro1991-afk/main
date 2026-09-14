# Idle-agent relaunch — Genesis catalog handoff

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Genesis catalog handoff
- bcId: `bc-7ea3a99b-a561-5188-a4ed-451f761a979b`
- card: `genesis-world-layer-102`
- launch: `reviews/launch/genesis-world-layer-102.md`
- Origin: https://cursor.com/codebase/yuri-afk/genesis

Paste the brief below into a new Origin cloud agent. Do not inventory this landing pad.

---

# Origin launch — genesis-world-layer-102

Work on Cursor Origin. This GitHub repo is the ops pad only.

- UI: https://cursor.com/codebase/yuri-afk/genesis
- Git: `origin.cursor.com/git/yuri-afk/genesis`
- Job: `genesis-world-layer-102` — Implement Origin world-layer genesis#102
- Packet: `reviews/handoff-genesis-world-layer-102.md`
- Playbook: `playbooks/genesis-world-layer-102.md`
- Priority: 12
- Verify: cd packages/world-layer-engine && pip install -e ".[dev]" && pytest && python -m genesis_world_layer demo --steps 48. GET /health stays live=dark.

## Notes

Notion https://app.notion.com/p/3db735da33f3817cb84fcf529384cb0a. Origin PR genesis#102, branch cursor/genesis-world-layer-engine-232b. Path packages/world-layer-engine, import genesis_world_layer. Stack: terrain → occupancy → rigid → fluid → atmosphere → agents → sensors → memory. Sibling planes (do not steal): world-map, unifier :8792, spawner. HTTP 127.0.0.1:8793 — coordinate with world-PM. Do not invent a GitHub world clone.

## Collision

Does not generate map shards, merge unifier logs, or spawn subprocesses. Coordinate halls :8793 and unifier :8792.

## First moves

- origin auth status
- If logged out: origin auth login --api-key "$CURSOR_API_KEY" (browser login is not available on this pad)
- origin repo clone yuri-afk/genesis genesis && cd genesis
- Do not reopen yuro1991-afk/main#1.
- cd packages/world-layer-engine && pip install -e ".[dev]" && pytest && python -m genesis_world_layer demo --steps 48. GET /health stays live=dark.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
- Do not open another landing-pad queue
- Do not mark Superbrain LIVE without a successful probe
- This pad token cannot push Origin — implement there


