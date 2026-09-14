# Land Origin world-atmosphere plane

- id: `genesis-world-atmosphere`
- kind: origin-slice (Work on origin.cursor.com/git/yuri-afk/genesis only.)
- scope: relaunch
- repo: origin.cursor.com/git/yuri-afk/genesis
- relaunch: https://cursor.com/codebase/yuri-afk/genesis
- why: This cloud environment cannot authenticate to Origin.

## Notes

World-PM plane `atmosphere`. Layer stack: terrain → occupancy → rigid → fluid → atmosphere → agents → sensors → memory. Notion PM https://app.notion.com/p/3db735da33f381b6ac1dc62b85b35f2d + layer https://app.notion.com/p/3db735da33f3817cb84fcf529384cb0a.

## Collision

Coordinate with world-layer #102 and world-physics. Not NVIDIA weather.

## First commands

- origin auth status
- If logged out: origin auth login --api-key "$CURSOR_API_KEY" (browser login is not available on this pad)
- origin repo clone yuri-afk/genesis genesis && cd genesis
- Do not reopen yuro1991-afk/main#1.
- Atmosphere plane lands on Origin. Do not steal layer #102 coupler ticks.

## Verify

Atmosphere plane lands on Origin. Do not steal layer #102 coupler ticks.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
