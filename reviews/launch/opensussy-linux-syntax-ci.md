# Idle-agent relaunch — Evidence face-swap PWA icons

You are parked on github.com/yuro1991-afk/main. Leave this pad.

- agent: Evidence face-swap PWA icons
- bcId: `bc-8d94d815-8646-5a3f-9a4e-f4011f197a28`
- card: `opensussy-linux-syntax-ci`
- launch: `reviews/launch/opensussy-linux-syntax-ci.md`
- GitHub: https://github.com/yuro1991-afk/opensussy

Relaunch the named GitHub repo. Forget Origin. Do not inventory this pad for another queue.

---

# Apply opensussy-linux-syntax-ci

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/opensussy
- Relaunch: https://github.com/yuro1991-afk/opensussy
- Patch: `patches/opensussy-linux-syntax-ci.patch`
- Job: `opensussy-linux-syntax-ci` — Add non-nuclear Linux syntax CI for OpenSussy packs
- Playbook: `playbooks/opensussy-linux-syntax-ci.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job opensussy-linux-syntax-ci`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job opensussy-linux-syntax-ci` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('.github/workflows/linux-syntax.yml').read_text(); assert 'name: linux-syntax' in t; assert 'actions/checkout@v5' in t; assert 'Syntax-check OpenSussy shell wrappers only' in t; assert 'install/linux/tumbleweed/OpenSussy-deep.sh' in t; assert 'OK syntax. Did not execute AutoYaST' in t"

## Notes

No open issues/PRs. Repo has no .github/workflows. Add ubuntu-latest bash -n (and optional shellcheck) on install/linux/OpenSussy-light.sh, OpenSussy-deep.sh, and leap/tumbleweed copies. Never apply AutoYaST, never run deep wipe, never touch /dev/nvme0n1. Residual R2: confirm=false + initialize=true is nuclear.
Yuri: forget Origin. Take this GitHub sibling. This pad token cannot push it — relaunch that repo. Applyable catalog patch is patches/opensussy-linux-syntax-ci.patch on main#9. Do not copy PR #6 autofix.

## Collision

Do not edit Windows WPF / LinuxPayload.cs wipe path. Do not collide dronehive CI files. Do not reopen yuro1991-afk/main#1.

## First moves

- node src/cli.js patches --prove --job opensussy-linux-syntax-ci
- node src/cli.js patches --prove-after-apply --job opensussy-linux-syntax-ci
- git clone https://github.com/yuro1991-afk/opensussy.git work && cd work
- git checkout -b cursor/opensussy-linux-syntax-ci-from-ops
- git apply --check /path/to/main/patches/opensussy-linux-syntax-ci.patch
- git apply /path/to/main/patches/opensussy-linux-syntax-ci.patch
- python3 -c "from pathlib import Path; t=Path('.github/workflows/linux-syntax.yml').read_text(); assert 'name: linux-syntax' in t; assert 'actions/checkout@v5' in t; assert 'Syntax-check OpenSussy shell wrappers only' in t; assert 'install/linux/tumbleweed/OpenSussy-deep.sh' in t; assert 'OK syntax. Did not execute AutoYaST' in t"
- Workflow parses the six shell wrappers; job must not execute autoinst-deep.xml or format disks.

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/opensussy — apply there


