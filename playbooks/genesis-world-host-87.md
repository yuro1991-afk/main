# Land Origin Python world host genesis#87

- id: `genesis-world-host-87`
- kind: origin-slice (Work on origin.cursor.com/git/yuri-afk/genesis only.)
- scope: relaunch
- repo: origin.cursor.com/git/yuri-afk/genesis
- relaunch: https://cursor.com/codebase/yuri-afk/genesis
- why: This cloud environment cannot authenticate to Origin.

## Notes

Notion https://app.notion.com/p/3db735da33f38166aebfc5ed8ace53a9. Branch cursor/genesis-world-host-1a8f. Origin PR genesis#87. Path packages/python-world-host, import genesis_world_host, contract genesis.python-world-host.v1. HTTP 127.0.0.1:8794. Binds occupancy and ticks the world clock. Does not merge shards, spawn brains, generate maps, or run physics.

## Collision

Port :8794 is also world-canon #93, sentient #96, and sound #104. Coordinate; do not steal :8792/:8793.

## First commands

- origin auth status
- If logged out: origin auth login --api-key "$CURSOR_API_KEY" (browser login is not available on this pad)
- origin repo clone yuri-afk/genesis genesis && cd genesis
- Do not reopen yuro1991-afk/main#1.
- cd packages/python-world-host && pytest && genesis-world-host serve. GET /health stays live=dark. Never bind UDP 2419.

## Verify

cd packages/python-world-host && pytest && genesis-world-host serve. GET /health stays live=dark. Never bind UDP 2419.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
