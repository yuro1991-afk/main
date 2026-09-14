# Inventory Cursor skills into the Origin catalog

- id: `catalog-inventory-skills`
- kind: catalog (Expand or sync inventory; do not duplicate Origin genesis.)
- scope: relaunch
- repo: origin.cursor.com/git/yuri-afk/genesis
- relaunch: https://cursor.com/codebase/yuri-afk/genesis
- why: This cloud environment cannot authenticate to Origin.

## Notes

Notion playbook/inventory-skills https://app.notion.com/p/3db735da33f381bb9bafca916c22169f. Run scripts/inventory.py, review catalog/stats.json, commit catalog updates, optionally sync highlights to Notion.

## Collision

Coordinate with gub-inventory-tick (same inventory.py allowlist) and catalog-expand-domain.

## First commands

- Work Notion + Origin catalog. Do not invent URLs.
- scripts/inventory.py writes data/skills + catalog.jsonl. Do not invent Superbrain LIVE.

## Verify

scripts/inventory.py writes data/skills + catalog.jsonl. Do not invent Superbrain LIVE.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
