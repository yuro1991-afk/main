# Implement GUB continuous inventory tick

- id: `gub-inventory-tick`
- kind: origin-slice (Work on origin.cursor.com/git/yuri-afk/genesis only.)
- scope: relaunch
- repo: origin.cursor.com/git/yuri-afk/genesis
- relaunch: https://cursor.com/codebase/yuri-afk/genesis
- why: This cloud environment cannot authenticate to Origin.

## Notes

Notion draft https://app.notion.com/p/3db735da33f38109a568ed3d589253b6 — Wave 4 rebuild/stats, .genesis/last-inventory.json. GUB engine https://app.notion.com/p/3db735da33f3819ba589fd969cefe4a3 — `python3 -m gub serve --port 8787`, POST /v1/schedule/tick. Related Origin PR genesis#22.

## Collision

Port :8787 is also auto-runner dispatch. Coordinate with genesis#41.

## First commands

- Attach to origin.cursor.com/git/yuri-afk/genesis — not this GitHub repo.
- Do not reopen yuro1991-afk/main#1.
- Inventory tick writes last-inventory.json without claiming Superbrain LIVE.

## Verify

Inventory tick writes last-inventory.json without claiming Superbrain LIVE.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
