# Origin relaunch packet — catalog-inventory-mcp

This landing-pad token cannot authenticate to Origin. Yuri scoped this
pad to Genesis only. Do not implement here.

## Job

- id: `catalog-inventory-mcp`
- title: Inventory MCP tools into the Origin catalog
- kind: catalog
- priority: 54
- repo: `origin.cursor.com/git/yuri-afk/genesis`
- UI: https://cursor.com/codebase/yuri-afk/genesis
- playbook: `playbooks/catalog-inventory-mcp.md`

## Why relaunch

This cloud environment cannot authenticate to Origin.

## Notes

Notion playbook/inventory-mcp-tools https://app.notion.com/p/3db735da33f381d9805fc1058440faf2 Status active. Enumerate dynamic MCP namespaces and tools, normalize into data/tools, and update the master catalog. Implement on origin.cursor.com/git/yuri-afk/genesis only.

## Collision

Coordinate with catalog-inventory-skills (same inventory.py) and gub-inventory-tick.

## Verify

scripts/inventory.py writes data/tools + catalog/stats.json. Do not invent Superbrain LIVE.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not open another landing-pad queue
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
