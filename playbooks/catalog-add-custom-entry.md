# Add a schema-valid custom Genesis catalog entry

- id: `catalog-add-custom-entry`
- kind: catalog (Expand or sync inventory; do not duplicate Origin genesis.)
- scope: relaunch
- repo: origin.cursor.com/git/yuri-afk/genesis
- relaunch: https://cursor.com/codebase/yuri-afk/genesis
- why: This cloud environment cannot authenticate to Origin.

## Notes

Notion playbook/add-custom-entry https://app.notion.com/p/3db735da33f38189907ef132836d95bf. Copy schema/entry.example.yaml, place under data/<type>s/, run scripts/build_catalog.py, validate schema/entry.schema.json.

## Collision

Coordinate with catalog-expand-domain. Seeded-first catalog stays the map.

## First commands

- Work Notion + Origin catalog. Do not invent URLs.
- New entry validates. Do not invent URLs or LIVE lanes.

## Verify

New entry validates. Do not invent URLs or LIVE lanes.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
