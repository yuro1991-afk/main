# Idle-agent relaunch — Evidence opensussy 2.0 leftovers

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Evidence opensussy 2.0 leftovers
- bcId: `bc-96706468-d670-57cf-a55d-61275942914f`
- card: `opensussy-agama-honesty`
- launch: `reviews/launch/opensussy-agama-honesty.md`
- GitHub: https://github.com/yuro1991-afk/opensussy

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

---

# Apply opensussy-agama-honesty

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/opensussy
- Relaunch: https://github.com/yuro1991-afk/opensussy
- Patch: `patches/opensussy-agama-honesty.patch`
- Job: `opensussy-agama-honesty` — Fail-fast Agama vs AutoYaST honesty in OpenSussy HOW_TO
- Playbook: `playbooks/opensussy-agama-honesty.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job opensussy-agama-honesty`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job opensussy-agama-honesty` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; files=['install/linux/HOW_TO_RUN.txt','install/linux/leap/HOW_TO_RUN.txt','install/linux/tumbleweed/HOW_TO_RUN.txt']; assert all('AGAMA / Leap 16 HONESTY' in Path(p).read_text() and 'Agama JSON is unsupported' in Path(p).read_text() and 'export-only' in Path(p).read_text() for p in files)"

## Notes

SEC_REVIEW residual R4: AutoYaST 1.0 XML is not Agama JSON; Leap 16 / Agama-first media will not eat autoinst-*.xml silently. HOW_TO_RUN.txt already mentions classic AutoYaST vs Agama — add a one-screen warning in install/linux/HOW_TO_RUN.txt plus flavor HOW_TOs that Leap 15.6 XML is export-only. Do not invent Agama JSON profiles.
Yuri: forget Origin. Take this GitHub sibling. This pad token cannot push it — relaunch that repo. Applyable catalog patch is patches/opensussy-agama-honesty.patch on main#9. Do not copy PR #6 autofix.

## Collision

Docs/honesty only. Do not change default --linux-disk or unattended wipe flags.

## First moves

- node src/cli.js patches --prove --job opensussy-agama-honesty
- node src/cli.js patches --prove-after-apply --job opensussy-agama-honesty
- git clone https://github.com/yuro1991-afk/opensussy.git work && cd work
- git checkout -b cursor/opensussy-agama-honesty-from-ops
- git apply --check /path/to/main/patches/opensussy-agama-honesty.patch
- git apply /path/to/main/patches/opensussy-agama-honesty.patch
- python3 -c "from pathlib import Path; files=['install/linux/HOW_TO_RUN.txt','install/linux/leap/HOW_TO_RUN.txt','install/linux/tumbleweed/HOW_TO_RUN.txt']; assert all('AGAMA / Leap 16 HONESTY' in Path(p).read_text() and 'Agama JSON is unsupported' in Path(p).read_text() and 'export-only' in Path(p).read_text() for p in files)"
- HOW_TO files state Agama is unsupported; no new autoinst that claims Leap 16 GREEN.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/opensussy — apply there


