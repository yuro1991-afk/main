# Land Origin world-generator plane

- id: `genesis-world-generator`
- kind: origin-slice (Work on origin.cursor.com/git/yuri-afk/genesis only.)
- scope: relaunch
- repo: origin.cursor.com/git/yuri-afk/genesis
- relaunch: https://cursor.com/codebase/yuri-afk/genesis
- why: This cloud environment cannot authenticate to Origin.

## Notes

World-PM plane `generator`. World-layer #102 does not generate map shards; this plane authors them. Map plane stores the atlas. Notion PM https://app.notion.com/p/3db735da33f381b6ac1dc62b85b35f2d + layer https://app.notion.com/p/3db735da33f3817cb84fcf529384cb0a.

## Collision

Coordinate with world-map and world-layer #102. Host #87 does not generate maps.

## First commands

- origin auth status
- If logged out: origin auth login --api-key "$CURSOR_API_KEY" (browser login is not available on this pad)
- origin repo clone yuri-afk/genesis genesis && cd genesis
- Do not reopen yuro1991-afk/main#1.
- Generator stays on Origin. Do not occupy the village or merge unifier logs.

## Verify

Generator stays on Origin. Do not occupy the village or merge unifier logs.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
