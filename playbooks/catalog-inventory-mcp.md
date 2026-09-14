# Inventory MCP tools into the Origin catalog

- id: `catalog-inventory-mcp`
- kind: catalog (Expand or sync inventory; do not duplicate Origin genesis.)
- scope: relaunch
- repo: origin.cursor.com/git/yuri-afk/genesis
- relaunch: https://cursor.com/codebase/yuri-afk/genesis
- why: This cloud environment cannot authenticate to Origin.

## Notes

Notion playbook/inventory-mcp-tools https://app.notion.com/p/3db735da33f381d9805fc1058440faf2 Status active. Enumerate dynamic MCP namespaces and tools, normalize into data/tools, and update the master catalog. Implement on origin.cursor.com/git/yuri-afk/genesis only.

## Collision

Coordinate with catalog-inventory-skills (same inventory.py) and gub-inventory-tick.

## First commands

- Work Notion + Origin catalog. Do not invent URLs.
- scripts/inventory.py writes data/tools + catalog/stats.json. Do not invent Superbrain LIVE.

## Verify

scripts/inventory.py writes data/tools + catalog/stats.json. Do not invent Superbrain LIVE.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
