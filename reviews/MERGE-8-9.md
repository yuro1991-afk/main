# Merge #8 then #9

Catalog bases still match sibling `main` (re-proof 2026-09-14T23:16Z:
162/162 vanilla + stacked `git apply --check`, no `-U0`). Leftover hunt
is closed. Do not invent leftovers.

| sibling | base |
| --- | --- |
| dronehive | `d538a89` |
| bloom-fair-yellow-charm | `288a484` |
| face-swap-ios | `bba7188` |
| ollama-voice-access | `074bad0` |
| opensussy | `d4b2949` |

Do not invent leftovers. Do not copy PR #6 autofix.

## Conflict

`ledger/siblings.json` will conflict. #8 lists PRs **2–8**. #9 lists
**2–6, 9, 10**. Take the union: **2–10**.

| number | role after merge | owns |
| --- | --- | --- |
| 2 | `pointers` | `do-not-reopen-main-pr1` |
| 3 | `ops-board` | `agent-ops-board` |
| 4 | `keep-busy-queue` | keep-busy cards (CONFLICTING PR) |
| 5 | `attention-and-dronehive-patch` | `dronehive-unicode-ci` |
| 6 | `autofix-runner` | `dronehive-unicode-ci` (do not copy) |
| 7 | `pointers` | (wake table; stale after #8) |
| 8 | `ops-board` | `review-main-pr8`, `review-landing-pad-prs` |
| 9 | `patch-catalog` | catalog apply cards |
| 10 | `python-arena` | `review-main-pr10` |

Keep #9’s `describeRole` cases. After merge, `ops-board` is the landing-pad
CLI (#3 merged, #8 GitHub-first) — not “this PR”.

`src/brief.js`, `src/cli.js`, `src/dispatch.js`, `src/handoff.js`,
`src/helpers.js`, `src/patches.js`, `src/playbook.js`, `src/prompt.js`,
`src/routing.js`, `AGENTS.md`, `README.md`, and `reviews/NEXT.md` will
also conflict. Prefer **#8’s GitHub-first defaults**, then keep #9’s
catalog, Superbrain refuse, prove/`applyNext` apply path (including
`applyNext` on `brief` / `helpers` / `handoff` / `relaunch` / `busy` /
`status --job` / `list --job` / `slots --job`, `busy --job` / `next --job` peek, named-id `route` apply, `dronehive-unicode-ci` / `bloom-grok-pwa-test-sync` / `faceswap-start-sh` / `dronehive-script-host-roots` / `faceswap-design-honesty` / `dronehive-runtime-host-paths` / `dronehive-config-load-overlay` / `dronehive-app-links-host-paths` / `ova-readme-linux-honesty` / `ova-voice-card-linux-honesty` / `faceswap-ios-readme-honesty` / `faceswap-readme-requirements-honesty` / `faceswap-readme-install-sh` / `faceswap-readme-swift-honesty` / `faceswap-readme-firewall-honesty` / `dronehive-hive-docstring-honesty` / `dronehive-work-order-doc-honesty` / `dronehive-seed-work-order-doc-honesty` / `dronehive-bench-goal-honesty` / `dronehive-buzzer-hive-library-honesty` / `dronehive-seed-buzzer-hive-library-honesty` / `dronehive-work-order-fabric-root` / `dronehive-seed-work-order-fabric-root` / `dronehive-future-seer-jane-honesty` / `dronehive-multi-hosts-exe-honesty` / `dronehive-work-order-live-registry` / `dronehive-seed-work-order-live-registry` / `dronehive-work-order-school-root` / `dronehive-seed-work-order-school-root` / `dronehive-work-order-reference-db` / `dronehive-seed-work-order-reference-db` / `dronehive-work-order-knowledge-expand` / `dronehive-seed-work-order-knowledge-expand` / `dronehive-work-order-curriculum-root` / `dronehive-seed-work-order-curriculum-root` / `dronehive-multi-hosts-hardwire` / `dronehive-super-llms-hardwire` / `dronehive-work-order-open-tasks` / `dronehive-seed-work-order-open-tasks` / `dronehive-work-order-codex-paths` / `dronehive-seed-work-order-codex-paths` / `dronehive-work-order-law-truth` / `dronehive-seed-work-order-law-truth` / `dronehive-work-order-doc-law-truth` / `dronehive-seed-work-order-doc-law-truth` / `dronehive-work-order-doc-fabric-root` / `dronehive-seed-work-order-doc-fabric-root` / `dronehive-work-order-doc-imprints` / `dronehive-work-order-doc-live-registry` / `dronehive-seed-work-order-doc-live-registry` / `dronehive-work-order-doc-codex-paths` / `dronehive-seed-work-order-doc-codex-paths` / `dronehive-work-order-doc-codex-cli` / `dronehive-seed-work-order-doc-codex-cli` / `dronehive-work-order-doc-recall-router` / `dronehive-seed-work-order-doc-recall-router` / `dronehive-work-order-doc-memory-recycle` / `dronehive-seed-work-order-doc-memory-recycle` / `dronehive-work-order-doc-models` / `dronehive-seed-work-order-doc-models` / `dronehive-work-order-doc-cd` / `dronehive-seed-work-order-doc-cd` / `dronehive-spec-relative` / `dronehive-start-super-mesh-cd` / `dronehive-start-multi-model-pythonpath` / `dronehive-start-seer-pythonpath` / `dronehive-enable-bridge-fallback` / `dronehive-truth-bind-paths` / `dronehive-package-release-v2-cargo` / `dronehive-mount-launch-cargo` / `dronehive-install-ollama-app-cargo` / `dronehive-start-tui-cargo-honesty` afterApply, stacked `requires`),
`displayNotes` / `jobForDisplay`, and review files (`reviews/main-pr10.md`,
`reviews/landing-pad-prs.md`).

## After merge

Leftover unused review is done locally. First parked apply:
`dronehive-unicode-ci` on a dronehive write checkout. Repeat the catalog
proof with `node src/cli.js patches --prove --siblings-root /tmp/siblings`.
Fork leftover organs: eyes → vision → bridge.
