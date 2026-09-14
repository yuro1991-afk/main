# Origin relaunch packet — catalog-add-custom-entry

This landing-pad token cannot authenticate to Origin. Implement on Origin.

## Job

- id: `catalog-add-custom-entry`
- title: Add a schema-valid custom Genesis catalog entry
- kind: catalog
- priority: 37
- repo: `origin.cursor.com/git/yuri-afk/genesis`
- UI: https://cursor.com/codebase/yuri-afk/genesis
- Notion: https://app.notion.com/p/3db735da33f38189907ef132836d95bf
- Entry ID: `playbook/add-custom-entry`

## Steps (on Origin)

1. Choose type: skill | tool | playbook | resource
2. Copy `schema/entry.example.yaml`
3. Fill required fields
4. Place under `data/<type>s/` as JSON
5. Run `scripts/build_catalog.py`
6. Validate against `schema/entry.schema.json`

Do not invent URLs or LIVE lanes.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not open another landing-pad queue
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
