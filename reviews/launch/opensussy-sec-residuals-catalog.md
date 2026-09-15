# Idle-agent relaunch — Verify dronehive patch applies

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Verify dronehive patch applies
- bcId: `bc-9191e2c4-7d89-5574-818f-d3f07aefdc97`
- card: `opensussy-sec-residuals-catalog`
- launch: `reviews/launch/opensussy-sec-residuals-catalog.md`
- GitHub: https://github.com/yuro1991-afk/opensussy

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

---

# Apply opensussy-sec-residuals-catalog

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/opensussy
- Relaunch: https://github.com/yuro1991-afk/opensussy
- Patch: `patches/opensussy-sec-residuals-catalog.patch`
- Job: `opensussy-sec-residuals-catalog` — Catalog OpenSussy SEC_REVIEW residuals against 2.0.0 tree
- Playbook: `playbooks/opensussy-sec-residuals-catalog.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job opensussy-sec-residuals-catalog`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job opensussy-sec-residuals-catalog` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('reviews/SEC_REVIEW_2_0_0.md').read_text(); assert 'SEC_REVIEW residuals vs current tree' in t; assert 'false_green: 0' in t; assert 'LinuxPayload.cs' in t; assert 'Sanitizer.cs' in t; assert 'Do not implement nuclear AutoYaST or LUKS' in t"

## Notes

reviews/SEC_REVIEW.md is labeled 1.1 PARTIAL (R1–R10). PRODUCT.json is 2.0.0 with Leap 15.6 + Tumbleweed packs. Inventory which residuals still apply to src/OpenSussy.Installer/Engine/LinuxPayload.cs and Sanitizer.cs. Write a short residuals table in-repo; do not invent CVEs or wipe procedures.
Yuri: forget Origin. Take this GitHub sibling. This pad token cannot push it — relaunch that repo. Applyable catalog patch is patches/opensussy-sec-residuals-catalog.patch on main#9. Do not copy PR #6 autofix.

## Collision

Read-only review of wipe/sanitize behavior. Do not implement nuclear AutoYaST or LUKS in this card.

## First moves

- node src/cli.js patches --prove --job opensussy-sec-residuals-catalog
- node src/cli.js patches --prove-after-apply --job opensussy-sec-residuals-catalog
- git clone https://github.com/yuro1991-afk/opensussy.git work && cd work
- git checkout -b cursor/opensussy-sec-residuals-catalog-from-ops
- git apply --check /path/to/main/patches/opensussy-sec-residuals-catalog.patch
- git apply /path/to/main/patches/opensussy-sec-residuals-catalog.patch
- python3 -c "from pathlib import Path; t=Path('reviews/SEC_REVIEW_2_0_0.md').read_text(); assert 'SEC_REVIEW residuals vs current tree' in t; assert 'false_green: 0' in t; assert 'LinuxPayload.cs' in t; assert 'Sanitizer.cs' in t; assert 'Do not implement nuclear AutoYaST or LUKS' in t"
- Each residual cites a current path or is marked closed with a file pin. false_green stays 0.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/opensussy — apply there


