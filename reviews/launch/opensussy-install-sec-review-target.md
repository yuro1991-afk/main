# Leftover unused — opensussy-install-sec-review-target

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `opensussy-install-sec-review-target`
- launch: `reviews/launch/opensussy-install-sec-review-target.md`
- GitHub: https://github.com/yuro1991-afk/opensussy

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply opensussy-install-sec-review-target

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/opensussy
- Relaunch: https://github.com/yuro1991-afk/opensussy
- Patch: `patches/opensussy-install-sec-review-target.patch`
- Job: `opensussy-install-sec-review-target` — Point install SEC_REVIEW Target at repo root
- Playbook: `playbooks/opensussy-install-sec-review-target.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job opensussy-install-sec-review-target`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job opensussy-install-sec-review-target` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('install/docs/SEC_REVIEW.md').read_text(); assert 'one host example' in t; assert r'G:\\AI-Home\\projects\\opensussy' in t"

## Notes

install/docs/SEC_REVIEW.md Target still pins G:\\AI-Home\\projects\\opensussy. Applyable catalog patch is patches/opensussy-install-sec-review-target.patch on main#9. Independent of reviews/SEC_REVIEW.md leftover. Do not copy PR #6 autofix. This token cannot push opensussy.

## Collision

install/docs/SEC_REVIEW.md Target line only.

## First moves

- node src/cli.js patches --prove --job opensussy-install-sec-review-target
- node src/cli.js patches --prove-after-apply --job opensussy-install-sec-review-target
- git clone https://github.com/yuro1991-afk/opensussy.git work && cd work
- git checkout -b cursor/opensussy-install-sec-review-target-from-ops
- git apply --check /path/to/main/patches/opensussy-install-sec-review-target.patch
- git apply /path/to/main/patches/opensussy-install-sec-review-target.patch
- python3 -c "from pathlib import Path; t=Path('install/docs/SEC_REVIEW.md').read_text(); assert 'one host example' in t; assert r'G:\\AI-Home\\projects\\opensussy' in t"
- install/docs/SEC_REVIEW.md Target is .

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/opensussy — apply there

## Related

- #9 patch-catalog — Applyable sibling diffs under patches/. node src/cli.js patches lists them. Not an autofix runner.

