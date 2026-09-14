# Leftover unused — gub-run-playbook

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `gub-run-playbook`
- launch: `reviews/launch/gub-run-playbook.md`
- Origin: https://cursor.com/codebase/yuri-afk/genesis

Paste the brief below into a new Origin cloud agent. Do not inventory this landing pad.

---

# Origin launch — gub-run-playbook

Work on Cursor Origin. This GitHub repo is the ops pad only.

- UI: https://cursor.com/codebase/yuri-afk/genesis
- Git: `origin.cursor.com/git/yuri-afk/genesis`
- Job: `gub-run-playbook` — Implement GUB run-playbook playbook
- Packet: `reviews/handoff-gub-run-playbook.md`
- Playbook: `playbooks/gub-run-playbook.md`
- Priority: 11
- Verify: Dry-run writes plan + step results under .genesis/. Allowlisted gub.* operators only.

## Notes

Notion playbook/gub-run-playbook https://app.notion.com/p/3db735da33f381edbc43e852d28dee37 Status active. Compile a Genesis playbook into an executable plan and record the run. Implement on origin.cursor.com/git/yuri-afk/genesis only.

## Collision

Coordinate with gub-route-intent and gub-inventory-tick. Do not execute unallowlisted operators.

## First moves

- origin auth status
- If logged out: origin auth login --api-key "$CURSOR_API_KEY" (browser login is not available on this pad)
- origin repo clone yuri-afk/genesis genesis && cd genesis
- Do not reopen yuro1991-afk/main#1.
- Dry-run writes plan + step results under .genesis/. Allowlisted gub.* operators only.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not work dronehive / opensussy / bloom / face-swap / ollama-voice
- Do not open another landing-pad queue
- Do not mark Superbrain LIVE without a successful probe
- This pad token cannot push Origin — implement there


