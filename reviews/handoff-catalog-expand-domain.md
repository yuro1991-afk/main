# Origin relaunch packet — catalog-expand-domain

This landing-pad token cannot authenticate to Origin. Implement on Origin.

## Job

- id: `catalog-expand-domain`
- title: Expand the Origin catalog domain-by-domain
- kind: catalog
- priority: 35
- repo: `origin.cursor.com/git/yuri-afk/genesis`
- UI: https://cursor.com/codebase/yuri-afk/genesis
- Notion: https://app.notion.com/p/3db735da33f38155b7d9e11df17ddea4
- Entry ID: `playbook/expand-by-domain` (Status: active)

## Steps (on Origin)

1. Pick a domain/category from `catalog/stats.json`
2. Inventory related skills and tools already present
3. Author missing playbooks for common workflows
4. Add external resource links
5. Rebuild and commit

Do not invent Notion URLs. Coordinate with `catalog-notion-sync`.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not open another landing-pad queue
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
