# Fail-fast Agama vs AutoYaST honesty in OpenSussy HOW_TO

- id: `opensussy-agama-honesty`
- kind: implement (Ship a scoped feature without crossing sibling slices.)
- scope: relaunch
- repo: github.com/yuro1991-afk/opensussy
- relaunch: https://github.com/yuro1991-afk/opensussy
- why: This token cannot push opensussy. Apply `patches/opensussy-agama-honesty.patch` from [main#9](https://github.com/yuro1991-afk/main/pull/9). Do not copy PR #6 autofix.

## Notes

SEC_REVIEW residual R4: AutoYaST 1.0 XML is not Agama JSON; Leap 16 / Agama-first media will not eat autoinst-*.xml silently. HOW_TO_RUN.txt already mentions classic AutoYaST vs Agama — add a one-screen warning in install/linux/HOW_TO_RUN.txt plus flavor HOW_TOs that Leap 15.6 XML is export-only. Do not invent Agama JSON profiles.

## Collision

Docs/honesty only. Do not change default --linux-disk or unattended wipe flags.

## First commands

- node src/cli.js patches --prove --job opensussy-agama-honesty
- git clone https://github.com/yuro1991-afk/opensussy.git work && cd work
- git checkout -b cursor/opensussy-agama-honesty-from-ops
- git apply --check /path/to/main/patches/opensussy-agama-honesty.patch
- git apply /path/to/main/patches/opensussy-agama-honesty.patch
- HOW_TO files state Agama is unsupported; no new autoinst that claims Leap 16 GREEN.

## Verify

HOW_TO files state Agama is unsupported; no new autoinst that claims Leap 16 GREEN.

Do not reopen https://github.com/yuro1991-afk/main/pull/1.
Do not open another landing-pad queue.
