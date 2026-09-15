# Idle-agent relaunch — Mine Genesis Notion backlog

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Mine Genesis Notion backlog
- bcId: `bc-c024f316-123a-5563-b56e-219042e6642b`
- card: `bloom-readme-honest-export`
- launch: `reviews/launch/bloom-readme-honest-export.md`
- GitHub: https://github.com/yuro1991-afk/bloom-fair-yellow-charm

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

---

# Apply bloom-readme-honest-export

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/bloom-fair-yellow-charm
- Relaunch: https://github.com/yuro1991-afk/bloom-fair-yellow-charm
- Patch: `patches/bloom-readme-honest-export.patch`
- Job: `bloom-readme-honest-export` — Add an honest README for bloom-fair-yellow-charm
- Playbook: `playbooks/bloom-readme-honest-export.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job bloom-readme-honest-export`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job bloom-readme-honest-export` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('README.md').read_text(); assert 'Grok Build' in t; assert 'Cursor Origin Genesis' in t; assert 'yuro1991-afk/main' in t; assert 'OMNI-FORGE' in t"

## Notes

Single commit 'Export from Grok' (2026-08-19). No README, no open issues/PRs. Package is app-builder-workspace (Vite 8080, TanStack Start). UI is OMNI-FORGE (src/routes/docs.tsx HTTP API). README must say Grok Build export, npm run dev/typecheck/test, and this is not Origin genesis / not yuro1991-afk/main.
Yuri: forget Origin. Take this GitHub sibling. This pad token cannot push it — relaunch that repo. Applyable catalog patch is patches/bloom-readme-honest-export.patch on main#9. Do not copy PR #6 autofix.

## Collision

Docs only. Do not copy Genesis onto this tree. Do not reopen main#1.

## First moves

- node src/cli.js patches --prove --job bloom-readme-honest-export
- node src/cli.js patches --prove-after-apply --job bloom-readme-honest-export
- git clone https://github.com/yuro1991-afk/bloom-fair-yellow-charm.git work && cd work
- git checkout -b cursor/bloom-readme-honest-export-from-ops
- git apply --check /path/to/main/patches/bloom-readme-honest-export.patch
- git apply /path/to/main/patches/bloom-readme-honest-export.patch
- python3 -c "from pathlib import Path; t=Path('README.md').read_text(); assert 'Grok Build' in t; assert 'Cursor Origin Genesis' in t; assert 'yuro1991-afk/main' in t; assert 'OMNI-FORGE' in t"
- README.md exists; does not claim Superbrain LIVE or duplicate sibling stubs.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/bloom-fair-yellow-charm — apply there


