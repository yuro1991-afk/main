# Catalog OpenSussy SEC_REVIEW residuals against 2.0.0 tree

- id: `opensussy-sec-residuals-catalog`
- kind: catalog (Expand or sync inventory; do not duplicate Origin genesis.)
- scope: relaunch
- repo: github.com/yuro1991-afk/opensussy
- relaunch: https://github.com/yuro1991-afk/opensussy
- why: This token cannot push opensussy. Apply `patches/opensussy-sec-residuals-catalog.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

reviews/SEC_REVIEW.md is labeled 1.1 PARTIAL (R1–R10). PRODUCT.json is 2.0.0 with Leap 15.6 + Tumbleweed packs. Inventory which residuals still apply to src/OpenSussy.Installer/Engine/LinuxPayload.cs and Sanitizer.cs. Write a short residuals table in-repo; do not invent CVEs or wipe procedures.

## Collision

Read-only review of wipe/sanitize behavior. Do not implement nuclear AutoYaST or LUKS in this card.

## First commands

- node src/cli.js patches --prove --job opensussy-sec-residuals-catalog
- git clone https://github.com/yuro1991-afk/opensussy.git work && cd work
- git checkout -b cursor/opensussy-sec-residuals-catalog-from-ops
- git apply --check /path/to/main/patches/opensussy-sec-residuals-catalog.patch
- git apply /path/to/main/patches/opensussy-sec-residuals-catalog.patch
- Each residual cites a current path or is marked closed with a file pin. false_green stays 0.

## Verify

Each residual cites a current path or is marked closed with a file pin. false_green stays 0.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
