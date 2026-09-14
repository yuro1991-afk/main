# Point docs/WORK_ORDER.md Library law at host/library

- id: `dronehive-work-order-doc-law-truth`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/dronehive
- relaunch: https://github.com/yuro1991-afk/dronehive
- why: This token cannot push dronehive. Apply `patches/dronehive-work-order-doc-law-truth.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

docs/WORK_ORDER.md Library law still pins F:\GrokSelfLibrary\LAW_TRUTH.md. Use host/library. Independent of work-order-doc-honesty (NEXT.json example) and the JSON law-truth leftover (different file). Leave the C:\ grok rules host-law line. Seed copy is a later leftover.

## Collision

docs/WORK_ORDER.md Library law line only. Do not edit the C:\ host-law line. Do not edit drone/pro/tool_agent.py.

## First commands

- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-work-order-doc-law-truth-from-ops
- git apply --check /path/to/main/patches/dronehive-work-order-doc-law-truth.patch
- git apply /path/to/main/patches/dronehive-work-order-doc-law-truth.patch

## Verify

docs/WORK_ORDER.md Library law is host/library/LAW_TRUTH.md.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
