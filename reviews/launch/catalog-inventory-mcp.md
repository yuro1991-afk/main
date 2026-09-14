# Leftover unused — catalog-inventory-mcp

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `catalog-inventory-mcp`
- launch: `reviews/launch/catalog-inventory-mcp.md`
- Origin: https://cursor.com/codebase/yuri-afk/genesis

Paste the brief below into a new Origin cloud agent. Do not inventory this landing pad.

---

# Origin launch — catalog-inventory-mcp

Work on Cursor Origin. This GitHub repo is the ops pad only.

- UI: https://cursor.com/codebase/yuri-afk/genesis
- Git: `origin.cursor.com/git/yuri-afk/genesis`
- Job: `catalog-inventory-mcp` — Inventory MCP tools into the Origin catalog
- Packet: `reviews/handoff-catalog-inventory-mcp.md`
- Playbook: `playbooks/catalog-inventory-mcp.md`
- Priority: 54
- Verify: scripts/inventory.py writes data/tools + catalog/stats.json. Do not invent Superbrain LIVE.

## Notes

Notion playbook/inventory-mcp-tools https://app.notion.com/p/3db735da33f381d9805fc1058440faf2 Status active. Enumerate dynamic MCP namespaces and tools, normalize into data/tools, and update the master catalog. Implement on origin.cursor.com/git/yuri-afk/genesis only.

## Collision

Coordinate with catalog-inventory-skills (same inventory.py) and gub-inventory-tick.

## First moves

- Work Notion + Origin catalog. Do not invent URLs.
- scripts/inventory.py writes data/tools + catalog/stats.json. Do not invent Superbrain LIVE.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
- Do not open another landing-pad queue
- Do not mark Superbrain LIVE without a successful probe
- This pad token cannot push Origin — implement there


