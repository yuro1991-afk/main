# Leftover unused — bloom-ci-lint

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `bloom-ci-lint`
- launch: `reviews/launch/bloom-ci-lint.md`
- GitHub: https://github.com/yuro1991-afk/bloom-fair-yellow-charm

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply bloom-ci-lint

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/bloom-fair-yellow-charm
- Relaunch: https://github.com/yuro1991-afk/bloom-fair-yellow-charm
- Patch: `patches/bloom-ci-lint.patch`
- Job: `bloom-ci-lint` — Add a lint-only GitHub Actions workflow for bloom
- Playbook: `playbooks/bloom-ci-lint.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job bloom-ci-lint`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job bloom-ci-lint` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('.github/workflows/lint.yml').read_text(); assert 'name: lint' in t; assert 'actions/checkout@v5' in t; assert 'actions/setup-node@v5' in t; assert 'npm ci' in t; assert 'npm run lint' in t"

## Notes

package.json already has lint (eslint .). bloom-ci-typecheck only runs test + typecheck. Applyable catalog patch is patches/bloom-ci-lint.patch on main#9 (new-file lint.yml). Proven 0 errors / 2 warnings on 288a484. Independent of typecheck. Do not copy PR #6 autofix. This token cannot push bloom-fair-yellow-charm.

## Collision

New file. Independent of bloom-ci-typecheck (ci.yml). Do not fold lint into typecheck. Do not require --max-warnings 0.

## First moves

- node src/cli.js patches --prove --job bloom-ci-lint
- node src/cli.js patches --prove-after-apply --job bloom-ci-lint
- git clone https://github.com/yuro1991-afk/bloom-fair-yellow-charm.git work && cd work
- git checkout -b cursor/bloom-ci-lint-from-ops
- git apply --check /path/to/main/patches/bloom-ci-lint.patch
- git apply /path/to/main/patches/bloom-ci-lint.patch
- python3 -c "from pathlib import Path; t=Path('.github/workflows/lint.yml').read_text(); assert 'name: lint' in t; assert 'actions/checkout@v5' in t; assert 'actions/setup-node@v5' in t; assert 'npm ci' in t; assert 'npm run lint' in t"
- .github/workflows/lint.yml has npm run lint. Do not run npm.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/bloom-fair-yellow-charm — apply there


