# Origin relaunch packet — genesis-world-spawner

This landing-pad token cannot authenticate to Origin. Yuri scoped this
pad to Genesis only. Do not implement here.

## Job

- id: `genesis-world-spawner`
- title: Land Origin world-spawner plane
- kind: origin-slice
- priority: 37
- repo: `origin.cursor.com/git/yuri-afk/genesis`
- UI: https://cursor.com/codebase/yuri-afk/genesis
- playbook: `playbooks/genesis-world-spawner.md`

## Why relaunch

This cloud environment cannot authenticate to Origin.

## Notes

World-PM plane `spawner` — occupancy inside the map. World-layer #102 does not spawn subprocesses. World-PM does not occupy the village. Notion PM https://app.notion.com/p/3db735da33f381b6ac1dc62b85b35f2d + layer https://app.notion.com/p/3db735da33f3817cb84fcf529384cb0a.

## Collision

Coordinate with world-host #87 (binds occupancy) and world-map. Do not spawn from world-PM.

## Verify

Spawner stays on Origin. Never bind UDP 2419. Do not steal host occupancy on :8794.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not open another landing-pad queue
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
