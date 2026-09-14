# Leftover unused — catalog-inventory-skills

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `catalog-inventory-skills`
- launch: `reviews/launch/catalog-inventory-skills.md`
- Origin: https://cursor.com/codebase/yuri-afk/genesis

Paste the brief below into a new Origin cloud agent. Do not inventory this landing pad.

---

# Origin launch — catalog-inventory-skills

Work on Cursor Origin. This GitHub repo is the ops pad only.

- UI: https://cursor.com/codebase/yuri-afk/genesis
- Git: `origin.cursor.com/git/yuri-afk/genesis`
- Job: `catalog-inventory-skills` — Inventory Cursor skills into the Origin catalog
- Packet: `reviews/handoff-catalog-inventory-skills.md`
- Playbook: `playbooks/catalog-inventory-skills.md`
- Priority: 51
- Verify: scripts/inventory.py writes data/skills + catalog.jsonl. Do not invent Superbrain LIVE.

## Notes

Notion playbook/inventory-skills https://app.notion.com/p/3db735da33f381bb9bafca916c22169f. Run scripts/inventory.py, review catalog/stats.json, commit catalog updates, optionally sync highlights to Notion.

## Collision

Coordinate with gub-inventory-tick (same inventory.py allowlist) and catalog-expand-domain.

## First moves

- Work Notion + Origin catalog. Do not invent URLs.
- scripts/inventory.py writes data/skills + catalog.jsonl. Do not invent Superbrain LIVE.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
- Do not open another landing-pad queue
- Do not mark Superbrain LIVE without a successful probe
- This pad token cannot push Origin — implement there


