# Point seed WORK_ORDER.md Library law at host/library

- id: `dronehive-seed-work-order-doc-law-truth`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-seed-work-order-doc-law-truth.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

drone/app/seed/docs/WORK_ORDER.md Library law still pins F:\GrokSelfLibrary\LAW_TRUTH.md. Use host/library. Independent of live leftover (different file) and seed-work-order-doc-honesty (NEXT.json example). Leave the C:\ grok rules host-law line.

## Collision

Seed WORK_ORDER.md Library law line only. Do not edit drone/pro/tool_agent.py.

## First commands

- node src/cli.js patches --prove --job dronehive-seed-work-order-doc-law-truth
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-seed-work-order-doc-law-truth-from-ops
- git apply --check /path/to/main/patches/dronehive-seed-work-order-doc-law-truth.patch
- git apply /path/to/main/patches/dronehive-seed-work-order-doc-law-truth.patch
- python3 -c "from pathlib import Path; t=Path('drone/app/seed/docs/WORK_ORDER.md').read_text(); line=next(x for x in t.splitlines() if x.startswith('Library law:')); assert 'host/library/LAW_TRUTH.md' in line; assert 'GrokSelfLibrary' not in line"

## Verify

drone/app/seed/docs/WORK_ORDER.md Library law is host/library/LAW_TRUTH.md.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
