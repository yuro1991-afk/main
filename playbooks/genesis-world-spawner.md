# Land Origin world-spawner plane

- id: `genesis-world-spawner`
- kind: origin-slice (Work on origin.cursor.com/git/yuri-afk/genesis only.)
- scope: relaunch
- repo: origin.cursor.com/git/yuri-afk/genesis
- relaunch: https://cursor.com/codebase/yuri-afk/genesis
- why: This cloud environment cannot authenticate to Origin.

## Notes

World-PM plane `spawner` — occupancy inside the map. World-layer #102 does not spawn subprocesses. World-PM does not occupy the village. Notion PM https://app.notion.com/p/3db735da33f381b6ac1dc62b85b35f2d + layer https://app.notion.com/p/3db735da33f3817cb84fcf529384cb0a.

## Collision

Coordinate with world-host #87 (binds occupancy) and world-map. Do not spawn from world-PM.

## First commands

- Attach to origin.cursor.com/git/yuri-afk/genesis — not this GitHub repo.
- Do not reopen yuro1991-afk/main#1.
- Spawner stays on Origin. Never bind UDP 2419. Do not steal host occupancy on :8794.

## Verify

Spawner stays on Origin. Never bind UDP 2419. Do not steal host occupancy on :8794.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
