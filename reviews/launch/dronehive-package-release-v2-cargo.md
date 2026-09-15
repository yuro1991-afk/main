# Leftover unused — dronehive-package-release-v2-cargo

No parked pad agent owns this card yet. The next unassigned idle agent takes it.

- card: `dronehive-package-release-v2-cargo`
- launch: `reviews/launch/dronehive-package-release-v2-cargo.md`
- GitHub: https://github.com/yuro1991-afk/dronehive

Relaunch the named GitHub repo. This pad token cannot push siblings. Forget Origin.

---

# Apply dronehive-package-release-v2-cargo

Yuri: forget Origin for this card. Apply the catalog patch on a sibling write checkout.

- Sibling: https://github.com/yuro1991-afk/dronehive
- Relaunch: https://github.com/yuro1991-afk/dronehive
- Patch: `patches/dronehive-package-release-v2-cargo.patch`
- Job: `dronehive-package-release-v2-cargo` — Point package_release_v2.ps1 cargo homes at host/ai-home
- Playbook: `playbooks/dronehive-package-release-v2-cargo.md` (First commands may omit --prove-after-apply; prefer brief)
- Prove: `node src/cli.js patches --prove --job dronehive-package-release-v2-cargo`
- Prove afterApply: `node src/cli.js patches --prove-after-apply --job dronehive-package-release-v2-cargo` (throwaways; never write /tmp/siblings)
- After apply: python3 -c "from pathlib import Path; t=Path('scripts/package_release_v2.ps1').read_text(); assert r'host\\ai-home\\tools\\cargo' in t; assert r'G:\\AI-Home\\tools\\cargo' not in t"

## Notes

scripts/package_release_v2.ps1 still pins G:\\AI-Home\\tools cargo/rustup. Applyable catalog patch is patches/dronehive-package-release-v2-cargo.patch on main#9. Independent of start-script leftovers. Do not copy PR #6 autofix. This token cannot push dronehive.

## Collision

scripts/package_release_v2.ps1 cargo/rustup env only. Do not edit drone/pro/tool_agent.py.

## First moves

- node src/cli.js patches --prove --job dronehive-package-release-v2-cargo
- node src/cli.js patches --prove-after-apply --job dronehive-package-release-v2-cargo
- git clone https://github.com/yuro1991-afk/dronehive.git work && cd work
- git checkout -b cursor/dronehive-package-release-v2-cargo-from-ops
- git apply --check /path/to/main/patches/dronehive-package-release-v2-cargo.patch
- git apply /path/to/main/patches/dronehive-package-release-v2-cargo.patch
- python3 -c "from pathlib import Path; t=Path('scripts/package_release_v2.ps1').read_text(); assert r'host\\ai-home\\tools\\cargo' in t; assert r'G:\\AI-Home\\tools\\cargo' not in t"
- package_release_v2.ps1 cargo/rustup env uses Join-Path Root host/ai-home/tools

## Do not

- Do not reopen https://github.com/yuro1991-afk/main/pull/1
- Do not copy PR #6 autofix
- Do not invent a new leftover
- Do not run writePlaybooks over playbooks/
- Do not probe :45001 / :8791
- Do not run node src/cli.js probe
- This pad token cannot push github.com/yuro1991-afk/dronehive — apply there

## Related

- #9 patch-catalog — Applyable sibling diffs under patches/. node src/cli.js patches lists them. Not an autofix runner.

