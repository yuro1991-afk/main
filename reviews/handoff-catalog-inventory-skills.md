# Origin relaunch packet — catalog-inventory-skills

This landing-pad token cannot authenticate to Origin. Implement on Origin.

## Job

- id: `catalog-inventory-skills`
- title: Inventory Cursor skills into the Origin catalog
- kind: catalog
- priority: 36
- repo: `origin.cursor.com/git/yuri-afk/genesis`
- UI: https://cursor.com/codebase/yuri-afk/genesis
- Notion: https://app.notion.com/p/3db735da33f381bb9bafca916c22169f
- Entry ID: `playbook/inventory-skills`

## Steps (on Origin)

1. Run `scripts/inventory.py`
2. Review `catalog/stats.json`
3. Commit catalog updates (`data/skills` + `catalog.jsonl`)
4. Optionally sync highlights to Notion

Coordinate with `gub-inventory-tick` (same allowlisted inventory script).
Do not claim Superbrain LIVE from a catalog rebuild.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not open another landing-pad queue
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
