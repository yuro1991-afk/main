# Implement Origin world-layer genesis#102

- id: `genesis-world-layer-102`
- kind: origin-slice (Work on origin.cursor.com/git/yuri-afk/genesis only.)
- scope: relaunch
- repo: origin.cursor.com/git/yuri-afk/genesis
- relaunch: https://cursor.com/codebase/yuri-afk/genesis
- why: This cloud environment cannot authenticate to Origin.

## Notes

Notion https://app.notion.com/p/3db735da33f3817cb84fcf529384cb0a. Origin PR genesis#102, branch cursor/genesis-world-layer-engine-232b. Path packages/world-layer-engine, import genesis_world_layer. Stack: terrain → occupancy → rigid → fluid → atmosphere → agents → sensors → memory. Sibling planes (do not steal): world-map, unifier :8792, spawner. HTTP 127.0.0.1:8793 — coordinate with world-PM. Do not invent a GitHub world clone.

## Collision

Does not generate map shards, merge unifier logs, or spawn subprocesses. Coordinate halls :8793 and unifier :8792.

## First commands

- Attach to origin.cursor.com/git/yuri-afk/genesis — not this GitHub repo.
- Do not reopen yuro1991-afk/main#1.
- cd packages/world-layer-engine && pip install -e ".[dev]" && pytest && python -m genesis_world_layer demo --steps 48. GET /health stays live=dark.

## Verify

cd packages/world-layer-engine && pip install -e ".[dev]" && pytest && python -m genesis_world_layer demo --steps 48. GET /health stays live=dark.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
