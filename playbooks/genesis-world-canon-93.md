# Land Origin world-canon genesis#93

- id: `genesis-world-canon-93`
- kind: origin-slice (Work on origin.cursor.com/git/yuri-afk/genesis only.)
- scope: relaunch
- repo: origin.cursor.com/git/yuri-afk/genesis
- relaunch: https://cursor.com/codebase/yuri-afk/genesis
- why: This cloud environment cannot authenticate to Origin.

## Notes

Notion https://app.notion.com/p/3db735da33f381eda042d4b0ff79bc6f. Branch cursor/genesis-world-canon-50ed. packages/world-canon, serve :8794, claimedLive stays false. Do not steal :8792/:8793 or UDP 2419.

## Collision

Canon is not a unifier shard. Coordinate halls :8793 and unifier :8792.

## First commands

- origin auth status
- If logged out: origin auth login --api-key "$CURSOR_API_KEY" (browser login is not available on this pad)
- origin repo clone yuri-afk/genesis genesis && cd genesis
- Do not reopen yuro1991-afk/main#1.
- genesis-world-canon validate; /health reports claimedLive false.

## Verify

genesis-world-canon validate; /health reports claimedLive false.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
