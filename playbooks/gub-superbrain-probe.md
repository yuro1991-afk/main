# Implement GUB Superbrain probe playbook

- id: `gub-superbrain-probe`
- kind: origin-slice (Work on origin.cursor.com/git/yuri-afk/genesis only.)
- scope: relaunch
- repo: origin.cursor.com/git/yuri-afk/genesis
- relaunch: https://cursor.com/codebase/yuri-afk/genesis
- why: This cloud environment cannot authenticate to Origin.

## Notes

Notion draft https://app.notion.com/p/3db735da33f381a58f19ceffc771ecdd — short-timeout GET http://169.254.124.8:45001/health, write .genesis/last-superbrain.json, never mark LIVE on timeout. Catalog resource https://app.notion.com/p/3db735da33f3810faa09de097a086e8e (Entry ID resource/boss-superbrain, Status cataloged). Pad probe 2026-09-14T18:16:45Z: boss-superbrain-health/live timeout=unreachable. GOOSE-PC :8791 fetch failed=unreachable. Origin CLI logged-out. Origin implement still required.

## Collision

Origin genesis only. Do not reopen github.com/yuro1991-afk/main/pull/1.

## First commands

- origin auth status
- If logged out: origin auth login --api-key "$CURSOR_API_KEY" (browser login is not available on this pad)
- origin repo clone yuri-afk/genesis genesis && cd genesis
- Do not reopen yuro1991-afk/main#1.
- Failed probe stays unreachable. GOOSE-PC :8791 is not the BOSS peer.

## Verify

Failed probe stays unreachable. GOOSE-PC :8791 is not the BOSS peer.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
