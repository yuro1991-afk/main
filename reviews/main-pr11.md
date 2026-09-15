# Review main#11 (merge #8 then #9)

Written for leftover `review-landing-pad-prs`. Merge stays with Yuri.
Do not steal #7. Do not steal the fork’s eyes → vision → bridge on #10.

**PR:** https://github.com/yuro1991-afk/main/pull/11  
**Branch:** `cursor/merge-8-then-9-108b`  
**Branch HEAD** is this checkout (`cursor/merge-8-then-9-108b`).

## What it is

The resolved merge of GitHub-first dispatch (#8) and the sibling patch
catalog (#9). It does not copy #8 onto PR #9.

- Default leftover `next` / keep-busy / assign / sync stay on GitHub
  sibling cards (`review-landing-pad-prs`).
- Catalog apply, `siblings --job`, throwaway `--prove` /
  `--prove-after-apply` stay from #9.
- Superbrain take-instead stays on `--job gub-superbrain-probe`.
- `--origin` leftover is the first unused world card
  (`genesis-world-layer-102`) because the GitHub roster does not consume
  Origin cards.

## Check

- `ledger/siblings.json` lists PRs 2–10. #9 owns `dronehive-unicode-ci`
  first.
- On-disk `reviews/launch/dronehive-unicode-ci.md` is an **Apply** brief
  (not PR #5 / `npm run autofix`).
- Local `node --test test/*.test.js` was 370/370 on the merge commit.

## Do not

- Do not copy PR #6 autofix.
- Do not reopen #1.
- Do not invent leftover 163+.
- Do not merge #7 after this without rewrite.
