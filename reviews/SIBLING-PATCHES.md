# Sibling patch catalog (verified 2026-09-14T23:16Z)

**Yuri: forget Origin.** This pad token cannot push the public GitHub
siblings. These diffs apply clean (`git apply --check`) on current
`main` of each repo. List them with `node src/cli.js patches`.

This is **not** PR #6’s autofix runner. Do not copy `bin/autofix.js`.

Leftover hunt is **closed** (2026-09-14T23:16Z). Isolated F:/G:/D:
source leftovers that apply vanilla **and** stacked without `-U0` are
exhausted. Do not invent leftovers. Do not recatalog CHANNEL_META,
`resolve_host_path` wraps, or sandwiched JSON keys. Value leftover is
applying these diffs on a sibling write checkout.

| job | sibling @ base | patch | apply-check |
| --- | --- | --- | --- |
| `dronehive-unicode-ci` | dronehive `d538a89` | `patches/dronehive-pro-chat-cp1252.patch` | OK |
| `bloom-gitignore-vercel` | bloom `288a484` | `patches/bloom-gitignore-vercel.patch` | OK |
| `bloom-readme-honest-export` | bloom `288a484` | `patches/bloom-readme-honest-export.patch` | OK |
| `bloom-ci-typecheck` | bloom `288a484` | `patches/bloom-ci-typecheck.patch` | OK |
| `bloom-health-probe` | bloom `288a484` | `patches/bloom-health-probe.patch` | OK |
| `opensussy-ship-json-2-0-0` | opensussy `d4b2949` | `patches/opensussy-ship-json-2-0-0.patch` | OK |
| `opensussy-agama-honesty` | opensussy `d4b2949` | `patches/opensussy-agama-honesty.patch` | OK |
| `faceswap-honesty-env-paths` | face-swap-ios `bba7188` | `patches/faceswap-honesty-env-paths.patch` | OK |
| `faceswap-commit-pwa-icons` | face-swap-ios `bba7188` | `patches/faceswap-commit-pwa-icons.patch` | OK |
| `ova-pwsh-syntax-ci` | ollama-voice-access `074bad0` | `patches/ova-pwsh-syntax-ci.patch` | OK |
| `ova-api-host-override` | ollama-voice-access `074bad0` | `patches/ova-api-host-override.patch` | OK |
| `opensussy-linux-syntax-ci` | opensussy `d4b2949` | `patches/opensussy-linux-syntax-ci.patch` | OK |
| `opensussy-sec-residuals-catalog` | opensussy `d4b2949` | `patches/opensussy-sec-residuals-catalog.patch` | OK |
| `faceswap-health-offline` | face-swap-ios `bba7188` | `patches/faceswap-health-offline.patch` | OK |
| `faceswap-mock-engine-ci` | face-swap-ios `bba7188` | `patches/faceswap-mock-engine-ci.patch` | OK |
| `ova-stop-noui-guard` | ollama-voice-access `074bad0` | `patches/ova-stop-noui-guard.patch` | OK |
| `ova-pester-qa-math` | ollama-voice-access `074bad0` | `patches/ova-pester-qa-math.patch` | OK |
| `dronehive-ubuntu-smoke` | dronehive `d538a89` | `patches/dronehive-ubuntu-smoke.patch` | OK |
| `dronehive-portable-paths` | dronehive `d538a89` | `patches/dronehive-portable-paths.patch` | OK |
| `dronehive-script-host-roots` | dronehive `d538a89` | `patches/dronehive-script-host-roots.patch` | OK |
| `faceswap-start-sh` | face-swap-ios `bba7188` | `patches/faceswap-start-sh.patch` | OK |
| `dronehive-runtime-host-paths` | dronehive `d538a89` | `patches/dronehive-runtime-host-paths.patch` | OK |
| `faceswap-design-honesty` | face-swap-ios `bba7188` | `patches/faceswap-design-honesty.patch` | OK |
| `dronehive-config-load-overlay` | dronehive `d538a89` | `patches/dronehive-config-load-overlay.patch` | OK |
| `ova-readme-linux-honesty` | ollama-voice-access `074bad0` | `patches/ova-readme-linux-honesty.patch` | OK |
| `dronehive-icons-manifest-relative` | dronehive `d538a89` | `patches/dronehive-icons-manifest-relative.patch` | OK |
| `dronehive-app-links-host-paths` | dronehive `d538a89` | `patches/dronehive-app-links-host-paths.patch` | OK |
| `bloom-ci-lint` | bloom `288a484` | `patches/bloom-ci-lint.patch` | OK |
| `ova-voice-card-linux-honesty` | ollama-voice-access `074bad0` | `patches/ova-voice-card-linux-honesty.patch` | OK |
| `faceswap-ios-readme-honesty` | face-swap-ios `bba7188` | `patches/faceswap-ios-readme-honesty.patch` | OK |
| `dronehive-hive-docstring-honesty` | dronehive `d538a89` | `patches/dronehive-hive-docstring-honesty.patch` | OK |
| `dronehive-work-order-doc-honesty` | dronehive `d538a89` | `patches/dronehive-work-order-doc-honesty.patch` | OK |
| `dronehive-seed-work-order-doc-honesty` | dronehive `d538a89` | `patches/dronehive-seed-work-order-doc-honesty.patch` | OK |
| `dronehive-bench-goal-honesty` | dronehive `d538a89` | `patches/dronehive-bench-goal-honesty.patch` | OK |
| `faceswap-readme-requirements-honesty` | face-swap-ios `bba7188` | `patches/faceswap-readme-requirements-honesty.patch` | OK |
| `faceswap-readme-install-sh` | face-swap-ios `bba7188` | `patches/faceswap-readme-install-sh.patch` | OK |
| `dronehive-buzzer-hive-library-honesty` | dronehive `d538a89` | `patches/dronehive-buzzer-hive-library-honesty.patch` | OK |
| `dronehive-seed-buzzer-hive-library-honesty` | dronehive `d538a89` | `patches/dronehive-seed-buzzer-hive-library-honesty.patch` | OK |
| `dronehive-work-order-fabric-root` | dronehive `d538a89` | `patches/dronehive-work-order-fabric-root.patch` | OK |
| `dronehive-seed-work-order-fabric-root` | dronehive `d538a89` | `patches/dronehive-seed-work-order-fabric-root.patch` | OK |
| `faceswap-readme-swift-honesty` | face-swap-ios `bba7188` | `patches/faceswap-readme-swift-honesty.patch` | OK |
| `faceswap-readme-firewall-honesty` | face-swap-ios `bba7188` | `patches/faceswap-readme-firewall-honesty.patch` | OK |
| `dronehive-future-seer-jane-honesty` | dronehive `d538a89` | `patches/dronehive-future-seer-jane-honesty.patch` | OK |
| `dronehive-multi-hosts-exe-honesty` | dronehive `d538a89` | `patches/dronehive-multi-hosts-exe-honesty.patch` | OK |
| `dronehive-work-order-live-registry` | dronehive `d538a89` | `patches/dronehive-work-order-live-registry.patch` | OK |
| `dronehive-seed-work-order-live-registry` | dronehive `d538a89` | `patches/dronehive-seed-work-order-live-registry.patch` | OK |
| `dronehive-work-order-school-root` | dronehive `d538a89` | `patches/dronehive-work-order-school-root.patch` | OK |
| `dronehive-seed-work-order-school-root` | dronehive `d538a89` | `patches/dronehive-seed-work-order-school-root.patch` | OK |
| `dronehive-work-order-reference-db` | dronehive `d538a89` | `patches/dronehive-work-order-reference-db.patch` | OK |
| `dronehive-seed-work-order-reference-db` | dronehive `d538a89` | `patches/dronehive-seed-work-order-reference-db.patch` | OK |
| `dronehive-work-order-knowledge-expand` | dronehive `d538a89` | `patches/dronehive-work-order-knowledge-expand.patch` | OK |
| `dronehive-seed-work-order-knowledge-expand` | dronehive `d538a89` | `patches/dronehive-seed-work-order-knowledge-expand.patch` | OK |
| `dronehive-work-order-curriculum-root` | dronehive `d538a89` | `patches/dronehive-work-order-curriculum-root.patch` | OK |
| `dronehive-seed-work-order-curriculum-root` | dronehive `d538a89` | `patches/dronehive-seed-work-order-curriculum-root.patch` | OK |
| `dronehive-multi-hosts-hardwire` | dronehive `d538a89` | `patches/dronehive-multi-hosts-hardwire.patch` | OK |
| `dronehive-super-llms-hardwire` | dronehive `d538a89` | `patches/dronehive-super-llms-hardwire.patch` | OK |
| `dronehive-work-order-open-tasks` | dronehive `d538a89` | `patches/dronehive-work-order-open-tasks.patch` | OK |
| `dronehive-seed-work-order-open-tasks` | dronehive `d538a89` | `patches/dronehive-seed-work-order-open-tasks.patch` | OK |
| `dronehive-work-order-codex-paths` | dronehive `d538a89` | `patches/dronehive-work-order-codex-paths.patch` | OK |
| `dronehive-seed-work-order-codex-paths` | dronehive `d538a89` | `patches/dronehive-seed-work-order-codex-paths.patch` | OK |
| `dronehive-work-order-law-truth` | dronehive `d538a89` | `patches/dronehive-work-order-law-truth.patch` | OK |
| `dronehive-seed-work-order-law-truth` | dronehive `d538a89` | `patches/dronehive-seed-work-order-law-truth.patch` | OK |
| `dronehive-work-order-doc-law-truth` | dronehive `d538a89` | `patches/dronehive-work-order-doc-law-truth.patch` | OK |
| `dronehive-seed-work-order-doc-law-truth` | dronehive `d538a89` | `patches/dronehive-seed-work-order-doc-law-truth.patch` | OK |
| `dronehive-work-order-doc-fabric-root` | dronehive `d538a89` | `patches/dronehive-work-order-doc-fabric-root.patch` | OK |
| `dronehive-seed-work-order-doc-fabric-root` | dronehive `d538a89` | `patches/dronehive-seed-work-order-doc-fabric-root.patch` | OK |
| `dronehive-work-order-doc-imprints` | dronehive `d538a89` | `patches/dronehive-work-order-doc-imprints.patch` | OK |
| `dronehive-work-order-doc-live-registry` | dronehive `d538a89` | `patches/dronehive-work-order-doc-live-registry.patch` | OK |
| `dronehive-seed-work-order-doc-live-registry` | dronehive `d538a89` | `patches/dronehive-seed-work-order-doc-live-registry.patch` | OK |
| `dronehive-work-order-doc-codex-paths` | dronehive `d538a89` | `patches/dronehive-work-order-doc-codex-paths.patch` | OK |
| `dronehive-seed-work-order-doc-codex-paths` | dronehive `d538a89` | `patches/dronehive-seed-work-order-doc-codex-paths.patch` | OK |
| `dronehive-work-order-doc-codex-cli` | dronehive `d538a89` | `patches/dronehive-work-order-doc-codex-cli.patch` | OK |
| `dronehive-seed-work-order-doc-codex-cli` | dronehive `d538a89` | `patches/dronehive-seed-work-order-doc-codex-cli.patch` | OK |
| `dronehive-work-order-doc-recall-router` | dronehive `d538a89` | `patches/dronehive-work-order-doc-recall-router.patch` | OK |
| `dronehive-seed-work-order-doc-recall-router` | dronehive `d538a89` | `patches/dronehive-seed-work-order-doc-recall-router.patch` | OK |
| `dronehive-work-order-doc-memory-recycle` | dronehive `d538a89` | `patches/dronehive-work-order-doc-memory-recycle.patch` | OK |
| `dronehive-seed-work-order-doc-memory-recycle` | dronehive `d538a89` | `patches/dronehive-seed-work-order-doc-memory-recycle.patch` | OK |
| `dronehive-work-order-doc-models` | dronehive `d538a89` | `patches/dronehive-work-order-doc-models.patch` | OK |
| `dronehive-seed-work-order-doc-models` | dronehive `d538a89` | `patches/dronehive-seed-work-order-doc-models.patch` | OK |
| `dronehive-work-order-doc-cd` | dronehive `d538a89` | `patches/dronehive-work-order-doc-cd.patch` | OK |
| `dronehive-seed-work-order-doc-cd` | dronehive `d538a89` | `patches/dronehive-seed-work-order-doc-cd.patch` | OK |
| `dronehive-spec-relative` | dronehive `d538a89` | `patches/dronehive-spec-relative.patch` | OK |
| `dronehive-start-super-mesh-cd` | dronehive `d538a89` | `patches/dronehive-start-super-mesh-cd.patch` | OK |
| `dronehive-start-multi-model-pythonpath` | dronehive `d538a89` | `patches/dronehive-start-multi-model-pythonpath.patch` | OK |
| `dronehive-start-seer-pythonpath` | dronehive `d538a89` | `patches/dronehive-start-seer-pythonpath.patch` | OK |
| `dronehive-enable-bridge-fallback` | dronehive `d538a89` | `patches/dronehive-enable-bridge-fallback.patch` | OK |
| `dronehive-truth-bind-paths` | dronehive `d538a89` | `patches/dronehive-truth-bind-paths.patch` | OK |
| `dronehive-package-release-v2-cargo` | dronehive `d538a89` | `patches/dronehive-package-release-v2-cargo.patch` | OK |
| `dronehive-mount-launch-cargo` | dronehive `d538a89` | `patches/dronehive-mount-launch-cargo.patch` | OK |
| `dronehive-install-ollama-app-cargo` | dronehive `d538a89` | `patches/dronehive-install-ollama-app-cargo.patch` | OK |
| `dronehive-start-tui-cargo-honesty` | dronehive `d538a89` | `patches/dronehive-start-tui-cargo-honesty.patch` | OK |
| `dronehive-ollama-tui-readme-cargo` | dronehive `d538a89` | `patches/dronehive-ollama-tui-readme-cargo.patch` | OK |
| `dronehive-mount-readme-cargo` | dronehive `d538a89` | `patches/dronehive-mount-readme-cargo.patch` | OK |
| `dronehive-tui-readme-cargo` | dronehive `d538a89` | `patches/dronehive-tui-readme-cargo.patch` | OK |
| `dronehive-apps-readme-cargo` | dronehive `d538a89` | `patches/dronehive-apps-readme-cargo.patch` | OK |
| `dronehive-install-ollama-app-root` | dronehive `d538a89` | `patches/dronehive-install-ollama-app-root.patch` | OK |
| `dronehive-install-ollama-app-mount` | dronehive `d538a89` | `patches/dronehive-install-ollama-app-mount.patch` | OK |
| `dronehive-install-ollama-app-manifest` | dronehive `d538a89` | `patches/dronehive-install-ollama-app-manifest.patch` | OK |
| `dronehive-install-ollama-uninstall-root` | dronehive `d538a89` | `patches/dronehive-install-ollama-uninstall-root.patch` | OK |
| `dronehive-tui-readme-root` | dronehive `d538a89` | `patches/dronehive-tui-readme-root.patch` | OK |
| `dronehive-ollama-tui-readme-install` | dronehive `d538a89` | `patches/dronehive-ollama-tui-readme-install.patch` | OK |
| `dronehive-mount-readme-layout` | dronehive `d538a89` | `patches/dronehive-mount-readme-layout.patch` | OK |
| `dronehive-mount-readme-launch` | dronehive `d538a89` | `patches/dronehive-mount-readme-launch.patch` | OK |
| `dronehive-mount-readme-related` | dronehive `d538a89` | `patches/dronehive-mount-readme-related.patch` | OK |
| `opensussy-sec-review-target` | opensussy `d4b2949` | `patches/opensussy-sec-review-target.patch` | OK |
| `opensussy-install-sec-review-target` | opensussy `d4b2949` | `patches/opensussy-install-sec-review-target.patch` | OK |
| `dronehive-readme-cd` | dronehive `d538a89` | `patches/dronehive-readme-cd.patch` | OK |
| `dronehive-doc-agent-loop-cd` | dronehive `d538a89` | `patches/dronehive-doc-agent-loop-cd.patch` | OK |
| `dronehive-doc-bridge-1080-cd` | dronehive `d538a89` | `patches/dronehive-doc-bridge-1080-cd.patch` | OK |
| `dronehive-doc-code-worker-cd` | dronehive `d538a89` | `patches/dronehive-doc-code-worker-cd.patch` | OK |
| `dronehive-doc-future-seer-cd` | dronehive `d538a89` | `patches/dronehive-doc-future-seer-cd.patch` | OK |
| `dronehive-doc-measured-diagnostics-cd` | dronehive `d538a89` | `patches/dronehive-doc-measured-diagnostics-cd.patch` | OK |
| `dronehive-doc-multi-face-cd` | dronehive `d538a89` | `patches/dronehive-doc-multi-face-cd.patch` | OK |
| `dronehive-doc-operational-cd` | dronehive `d538a89` | `patches/dronehive-doc-operational-cd.patch` | OK |
| `dronehive-seed-doc-operational-cd` | dronehive `d538a89` | `patches/dronehive-seed-doc-operational-cd.patch` | OK |
| `dronehive-doc-pro-cd` | dronehive `d538a89` | `patches/dronehive-doc-pro-cd.patch` | OK |
| `dronehive-doc-super-llms-cd` | dronehive `d538a89` | `patches/dronehive-doc-super-llms-cd.patch` | OK |
| `dronehive-doc-super-mesh-cd` | dronehive `d538a89` | `patches/dronehive-doc-super-mesh-cd.patch` | OK |
| `dronehive-doc-synaptic-loop-cd` | dronehive `d538a89` | `patches/dronehive-doc-synaptic-loop-cd.patch` | OK |
| `dronehive-doc-super-kernel-cd` | dronehive `d538a89` | `patches/dronehive-doc-super-kernel-cd.patch` | OK |
| `dronehive-doc-honesty-library` | dronehive `d538a89` | `patches/dronehive-doc-honesty-library.patch` | OK |
| `dronehive-seed-doc-honesty-library` | dronehive `d538a89` | `patches/dronehive-seed-doc-honesty-library.patch` | OK |
| `dronehive-doc-app-library` | dronehive `d538a89` | `patches/dronehive-doc-app-library.patch` | OK |
| `dronehive-seed-doc-app-library` | dronehive `d538a89` | `patches/dronehive-seed-doc-app-library.patch` | OK |
| `dronehive-doc-app-cd` | dronehive `d538a89` | `patches/dronehive-doc-app-cd.patch` | OK |
| `dronehive-seed-doc-app-cd` | dronehive `d538a89` | `patches/dronehive-seed-doc-app-cd.patch` | OK |
| `dronehive-doc-grok-handoff-root` | dronehive `d538a89` | `patches/dronehive-doc-grok-handoff-root.patch` | OK |
| `dronehive-doc-grok-handoff-cd` | dronehive `d538a89` | `patches/dronehive-doc-grok-handoff-cd.patch` | OK |
| `dronehive-truth-honesty-root` | dronehive `d538a89` | `patches/dronehive-truth-honesty-root.patch` | OK |
| `dronehive-truth-honesty-oath-inline` | dronehive `d538a89` | `patches/dronehive-truth-honesty-oath-inline.patch` | OK |
| `dronehive-ollama-app-readme-install` | dronehive `d538a89` | `patches/dronehive-ollama-app-readme-install.patch` | OK |
| `dronehive-ollama-app-readme-dest` | dronehive `d538a89` | `patches/dronehive-ollama-app-readme-dest.patch` | OK |
| `dronehive-ollama-app-crash-log` | dronehive `d538a89` | `patches/dronehive-ollama-app-crash-log.patch` | OK |
| `dronehive-ollama-app-ui-install-root` | dronehive `d538a89` | `patches/dronehive-ollama-app-ui-install-root.patch` | OK |
| `dronehive-ollama-app-open-out` | dronehive `d538a89` | `patches/dronehive-ollama-app-open-out.patch` | OK |
| `dronehive-ollama-app-open-benchmarks` | dronehive `d538a89` | `patches/dronehive-ollama-app-open-benchmarks.patch` | OK |
| `dronehive-ollama-app-open-workspace` | dronehive `d538a89` | `patches/dronehive-ollama-app-open-workspace.patch` | OK |
| `dronehive-ollama-app-open-install` | dronehive `d538a89` | `patches/dronehive-ollama-app-open-install.patch` | OK |
| `dronehive-ollama-app-open-seal` | dronehive `d538a89` | `patches/dronehive-ollama-app-open-seal.patch` | OK |
| `dronehive-mount-engine-out` | dronehive `d538a89` | `patches/dronehive-mount-engine-out.patch` | OK |
| `dronehive-mount-fabric-root` | dronehive `d538a89` | `patches/dronehive-mount-fabric-root.patch` | OK |
| `dronehive-mount-smoke-seal` | dronehive `d538a89` | `patches/dronehive-mount-smoke-seal.patch` | OK |
| `dronehive-mount-swarm-seal` | dronehive `d538a89` | `patches/dronehive-mount-swarm-seal.patch` | OK |
| `dronehive-truth-honesty-library-list` | dronehive `d538a89` | `patches/dronehive-truth-honesty-library-list.patch` | OK |
| `dronehive-ollama-app-bridge-paths` | dronehive `d538a89` | `patches/dronehive-ollama-app-bridge-paths.patch` | OK |
| `dronehive-work-order-doc-board` | dronehive `d538a89` | `patches/dronehive-work-order-doc-board.patch` | OK |
| `dronehive-seed-work-order-doc-board` | dronehive `d538a89` | `patches/dronehive-seed-work-order-doc-board.patch` | OK |
| `opensussy-superpowers-lab-plan` | opensussy `d4b2949` | `patches/opensussy-superpowers-lab-plan.patch` | OK |
| `opensussy-superpowers-lab-design` | opensussy `d4b2949` | `patches/opensussy-superpowers-lab-design.patch` | OK |
| `faceswap-honesty-located-paths` | face-swap-ios `bba7188` | `patches/faceswap-honesty-located-paths.patch` | OK |
| `dronehive-work-order-registry-cli` | dronehive `d538a89` | `patches/dronehive-work-order-registry-cli.patch` | OK |
| `dronehive-grok-handoff-clone-dest` | dronehive `d538a89` | `patches/dronehive-grok-handoff-clone-dest.patch` | OK |
| `dronehive-multi-face-pythonpath` | dronehive `d538a89` | `patches/dronehive-multi-face-pythonpath.patch` | OK |
| `dronehive-future-seer-pythonpath` | dronehive `d538a89` | `patches/dronehive-future-seer-pythonpath.patch` | OK |
| `dronehive-ai-bus-packs-root` | dronehive `d538a89` | `patches/dronehive-ai-bus-packs-root.patch` | OK |
| `dronehive-work-order-live-mirror` | dronehive `d538a89` | `patches/dronehive-work-order-live-mirror.patch` | OK |
| `dronehive-seed-work-order-live-mirror` | dronehive `d538a89` | `patches/dronehive-seed-work-order-live-mirror.patch` | OK |
| `dronehive-work-order-core-lessons` | dronehive `d538a89` | `patches/dronehive-work-order-core-lessons.patch` | OK |
| `dronehive-seed-work-order-core-lessons` | dronehive `d538a89` | `patches/dronehive-seed-work-order-core-lessons.patch` | OK |
| `dronehive-work-order-ai-smarts-packs` | dronehive `d538a89` | `patches/dronehive-work-order-ai-smarts-packs.patch` | OK |
| `dronehive-seed-work-order-ai-smarts-packs` | dronehive `d538a89` | `patches/dronehive-seed-work-order-ai-smarts-packs.patch` | OK |
| `bloom-grok-pwa-test-sync` | bloom `288a484` | `patches/bloom-grok-pwa-test-sync.patch` | OK |

## After apply

- dronehive-unicode-ci (2026-09-14T23:57Z): after `git apply`, force cp1252 stdout and `_chat('sys', 'ok ✓')`. Unpatched print raises; patched replace path writes to buffer. Then the full python-smoke gate on a dronehive write checkout.
- bloom gitignore: also `git rm -r --cached .vercel/output` (58 tracked files). Keep `package-lock.json`.
- face-swap icons: copies also live under `patches/faceswap-pwa-icons/` if `git apply --binary` is awkward.
- opensussy 2.0.0: leave CHANGELOG `## 1.3.0` historical. Isolated superpowers honesty leftovers remap the lab plan save-path and design base codebase to repo-relative `docs/...` / `.` (G: is one host example). `usb_zip_bytes` / `utc` stay until a real v2 USB zip exists.
- dronehive: do not rebase dronehive#2 until #1 `python-smoke` is green. Ubuntu smoke, portable-paths, script-host-roots, runtime-host-paths, config-load-overlay, icons-manifest-relative, app-links-host-paths, hive-docstring-honesty, work-order-doc-honesty, seed-work-order-doc-honesty, bench-goal-honesty, buzzer-hive-library-honesty, seed-buzzer-hive-library-honesty, work-order-fabric-root, seed-work-order-fabric-root, future-seer-jane-honesty, multi-hosts-exe-honesty, work-order-live-registry, seed-work-order-live-registry, work-order-school-root, seed-work-order-school-root, work-order-reference-db, seed-work-order-reference-db, work-order-knowledge-expand, seed-work-order-knowledge-expand, work-order-curriculum-root, seed-work-order-curriculum-root, multi-hosts-hardwire, super-llms-hardwire, work-order-open-tasks, seed-work-order-open-tasks, work-order-codex-paths, seed-work-order-codex-paths, work-order-law-truth, seed-work-order-law-truth, work-order-doc-law-truth, seed-work-order-doc-law-truth, work-order-doc-fabric-root, seed-work-order-doc-fabric-root, work-order-doc-imprints, work-order-doc-live-registry, seed-work-order-doc-live-registry, work-order-doc-codex-paths, seed-work-order-doc-codex-paths, work-order-doc-codex-cli, seed-work-order-doc-codex-cli, work-order-doc-recall-router, seed-work-order-doc-recall-router, work-order-doc-memory-recycle, seed-work-order-doc-memory-recycle, work-order-doc-models, seed-work-order-doc-models, work-order-doc-cd, seed-work-order-doc-cd, spec-relative, start-super-mesh-cd, start-multi-model-pythonpath, start-seer-pythonpath, enable-bridge-fallback, truth-bind-paths, package-release-v2-cargo, mount-launch-cargo, install-ollama-app-cargo, start-tui-cargo-honesty, ollama-tui-readme-cargo, mount-readme-cargo, tui-readme-cargo, apps-readme-cargo, install-ollama-app-root, install-ollama-app-mount, install-ollama-app-manifest, install-ollama-uninstall-root, tui-readme-root, ollama-tui-readme-install, mount-readme-layout, mount-readme-launch, mount-readme-related, readme-cd, doc-agent-loop-cd, doc-bridge-1080-cd, doc-code-worker-cd, doc-future-seer-cd, doc-measured-diagnostics-cd, doc-multi-face-cd, doc-operational-cd, seed-doc-operational-cd, doc-pro-cd, doc-super-llms-cd, doc-super-mesh-cd, doc-synaptic-loop-cd, doc-super-kernel-cd, doc-honesty-library, seed-doc-honesty-library, doc-app-library, seed-doc-app-library, doc-app-cd, seed-doc-app-cd, doc-grok-handoff-root, doc-grok-handoff-cd, truth-honesty-root, truth-honesty-oath-inline, truth-honesty-library-list, ollama-app-readme-install, ollama-app-readme-dest, ollama-app-bridge-paths, ollama-app-crash-log, ollama-app-ui-install-root, ollama-app-open-out, ollama-app-open-benchmarks, ollama-app-open-workspace, ollama-app-open-install, ollama-app-open-seal, mount-engine-out, mount-fabric-root, mount-smoke-seal, mount-swarm-seal, work-order-doc-board, seed-work-order-doc-board, work-order-registry-cli, grok-handoff-clone-dest, multi-face-pythonpath, future-seer-pythonpath, ai-bus-packs-root, work-order-live-mirror, seed-work-order-live-mirror, work-order-core-lessons, seed-work-order-core-lessons, work-order-ai-smarts-packs, and seed-work-order-ai-smarts-packs stack on the unicode patch. Apply `dronehive-runtime-host-paths`, `dronehive-config-load-overlay`, and `dronehive-app-links-host-paths` **after** portable-paths (they are independent of each other). `dronehive-icons-manifest-relative`, `dronehive-hive-docstring-honesty`, `dronehive-work-order-doc-honesty`, `dronehive-seed-work-order-doc-honesty`, `dronehive-bench-goal-honesty`, `dronehive-buzzer-hive-library-honesty`, `dronehive-seed-buzzer-hive-library-honesty`, `dronehive-work-order-fabric-root`, `dronehive-seed-work-order-fabric-root`, `dronehive-future-seer-jane-honesty`, `dronehive-multi-hosts-exe-honesty`, `dronehive-work-order-live-registry`, `dronehive-seed-work-order-live-registry`, `dronehive-work-order-school-root`, `dronehive-seed-work-order-school-root`, `dronehive-work-order-reference-db`, `dronehive-seed-work-order-reference-db`, `dronehive-work-order-knowledge-expand`, `dronehive-seed-work-order-knowledge-expand`, `dronehive-work-order-curriculum-root`, `dronehive-seed-work-order-curriculum-root`, `dronehive-multi-hosts-hardwire`, `dronehive-super-llms-hardwire`, `dronehive-work-order-open-tasks`, `dronehive-seed-work-order-open-tasks`, `dronehive-work-order-codex-paths`, `dronehive-seed-work-order-codex-paths`, `dronehive-work-order-law-truth`, `dronehive-seed-work-order-law-truth`, `dronehive-work-order-doc-law-truth`, `dronehive-seed-work-order-doc-law-truth`, `dronehive-work-order-doc-fabric-root`, `dronehive-seed-work-order-doc-fabric-root`, `dronehive-work-order-doc-imprints`, `dronehive-work-order-doc-live-registry`, `dronehive-seed-work-order-doc-live-registry`, `dronehive-work-order-doc-codex-paths`, `dronehive-seed-work-order-doc-codex-paths`, `dronehive-work-order-doc-codex-cli`, `dronehive-seed-work-order-doc-codex-cli`, `dronehive-work-order-doc-recall-router`, `dronehive-seed-work-order-doc-recall-router`, `dronehive-work-order-doc-memory-recycle`, `dronehive-seed-work-order-doc-memory-recycle`, `dronehive-work-order-doc-models`, `dronehive-seed-work-order-doc-models`, `dronehive-work-order-doc-cd`, `dronehive-seed-work-order-doc-cd`, `dronehive-spec-relative`, `dronehive-start-super-mesh-cd`, `dronehive-start-multi-model-pythonpath`, `dronehive-start-seer-pythonpath`, `dronehive-enable-bridge-fallback`, `dronehive-truth-bind-paths`, `dronehive-package-release-v2-cargo`, `dronehive-mount-launch-cargo`, `dronehive-install-ollama-app-cargo`, `dronehive-start-tui-cargo-honesty`, `dronehive-ollama-tui-readme-cargo`, `dronehive-mount-readme-cargo`, `dronehive-tui-readme-cargo`, `dronehive-apps-readme-cargo`, `dronehive-install-ollama-app-root`, `dronehive-install-ollama-app-mount`, `dronehive-install-ollama-app-manifest`, `dronehive-install-ollama-uninstall-root`, `dronehive-tui-readme-root`, `dronehive-ollama-tui-readme-install`, `dronehive-mount-readme-layout`, `dronehive-mount-readme-launch`, `dronehive-mount-readme-related`, `dronehive-readme-cd`, `dronehive-doc-agent-loop-cd`, `dronehive-doc-bridge-1080-cd`, `dronehive-doc-code-worker-cd`, `dronehive-doc-future-seer-cd`, `dronehive-doc-measured-diagnostics-cd`, `dronehive-doc-multi-face-cd`, `dronehive-doc-operational-cd`, `dronehive-seed-doc-operational-cd`, `dronehive-doc-pro-cd`, `dronehive-doc-super-llms-cd`, `dronehive-doc-super-mesh-cd`, `dronehive-doc-synaptic-loop-cd`, `dronehive-doc-super-kernel-cd`, `dronehive-doc-honesty-library`, `dronehive-seed-doc-honesty-library`, `dronehive-doc-app-library`, `dronehive-seed-doc-app-library`, `dronehive-doc-app-cd`, `dronehive-seed-doc-app-cd`, `dronehive-doc-grok-handoff-root`, `dronehive-doc-grok-handoff-cd`, `dronehive-truth-honesty-root`, `dronehive-truth-honesty-oath-inline`, `dronehive-truth-honesty-library-list`, `dronehive-ollama-app-readme-install`, `dronehive-ollama-app-readme-dest`, `dronehive-ollama-app-bridge-paths`, `dronehive-ollama-app-crash-log`, `dronehive-ollama-app-ui-install-root`, `dronehive-ollama-app-open-out`, `dronehive-ollama-app-open-benchmarks`, `dronehive-ollama-app-open-workspace`, `dronehive-ollama-app-open-install`, `dronehive-ollama-app-open-seal`, `dronehive-mount-engine-out`, `dronehive-mount-fabric-root`, `dronehive-mount-smoke-seal`, `dronehive-mount-swarm-seal`, `dronehive-work-order-doc-board`, `dronehive-seed-work-order-doc-board`, `dronehive-work-order-registry-cli`, `dronehive-grok-handoff-clone-dest`, `dronehive-multi-face-pythonpath`, `dronehive-future-seer-pythonpath`, `dronehive-ai-bus-packs-root`, `dronehive-work-order-live-mirror`, `dronehive-seed-work-order-live-mirror`, `dronehive-work-order-core-lessons`, `dronehive-seed-work-order-core-lessons`, `dronehive-work-order-ai-smarts-packs`, and `dronehive-seed-work-order-ai-smarts-packs` are independent of portable-paths (JSON law-truth applies on vanilla; if stacking, apply portable-paths first). live-mirror / core-lessons / ai-smarts-packs use `-U1` trailing unleftovered context so they stack after live-registry / knowledge-expand / reference-db. Skip sandwiched keys that have leftovered neighbors on both sides (`curriculum_fts`, `instai_lessons`, `knowledge_pack_min`, `knowledge_imprint.codex_root`, OpenSussy `install_folder`, TRUTH_BIND `core_imprint`) — those cannot apply vanilla and stacked without `-U0`. Do not edit `drone/pro/tool_agent.py` in the path patches.
- face-swap `START.sh`: fail-closed like `START.cmd`. New file; apply on vanilla `main`. After apply (2026-09-15T00:09Z): `FACESWAP_ENGINE=http://127.0.0.1:9 ./START.sh` exits 1 and prints RED. Unpatched has no `START.sh`.
- dronehive script-host-roots (2026-09-15T00:10Z): after apply, `py_compile` the three scripts and assert `ROOT = Path(__file__).resolve().parents[1]` with no `G:\AI-Home`. Unpatched assert fails. Independent of portable-paths. Do not edit `drone/pro/tool_agent.py`.
- dronehive runtime-host-paths (2026-09-15T00:13Z): apply `dronehive-portable-paths` first (`requires`). After apply: `from drone.grok_handoff import DEFAULT_ROOT` succeeds. Runtime-only apply imports fail (`drone.host_paths` missing). Do not edit `drone/pro/tool_agent.py`.
- dronehive config-load-overlay (2026-09-15T00:15Z): apply `dronehive-portable-paths` first (`requires`). After apply: `from drone.config_overlay import remap_host_strings` succeeds. Overlay-only apply imports fail (`drone.host_paths` missing). `py_compile` is syntax-only and is not a sufficient gate. Independent of runtime-host-paths. Do not edit `drone/pro/tool_agent.py`.
- dronehive app-links-host-paths (2026-09-15T00:20Z): apply `dronehive-portable-paths` first (`requires`). After apply: `from drone.app.links import LinkRegistry` succeeds. Links-only apply imports fail (`drone.host_paths` missing). `py_compile` is syntax-only and is not a sufficient gate. Independent of runtime-host-paths and config-load-overlay. Last leftover that imports `host_paths`. Do not edit `drone/pro/tool_agent.py`.
- dronehive hive-docstring-honesty (2026-09-15T00:31Z): after apply, assert `one host example` and `the library + continuous OPEN_TASKS overlay`. Unpatched hive.py still says `Connected to F:\\GrokSelfLibrary`. Independent of config-load-overlay. Do not edit `drone/pro/tool_agent.py`.
- dronehive work-order-doc-honesty (2026-09-15T00:33Z): after apply, assert `host/library/knowledge/codex/CODEX.min.json` and `host/library`. Unpatched docs/WORK_ORDER.md still says `F:\\GrokSelfLibrary\\knowledge\\codex\\CODEX.min.json`. Independent of hive-docstring-honesty. Do not edit `drone/pro/tool_agent.py`.
- dronehive seed-work-order-doc-honesty (2026-09-15T00:34Z): after apply, assert `host/library/knowledge/codex/CODEX.min.json` and `host/library`. Unpatched seed WORK_ORDER.md still says `F:\\GrokSelfLibrary\\knowledge\\codex\\CODEX.min.json`. Independent of docs/WORK_ORDER.md leftover. Do not edit `drone/pro/tool_agent.py`.
- dronehive bench-goal-honesty (2026-09-15T00:35Z): after apply, assert `under host/` and `one host example`. Unpatched GOAL still says `paths under G:\\AI-Home`. Independent of script-host-roots. Do not edit `drone/pro/tool_agent.py`.
- dronehive buzzer-hive-library-honesty (2026-09-15T00:37Z): after apply, assert `host/library` and `host/continuous/OPEN_TASKS.json`. Unpatched buzzer_hive.json still pins F:\\GrokSelfLibrary and D:\\GrokCoreMemory. Independent of config-load-overlay. Do not edit `drone/pro/tool_agent.py`.
- dronehive seed-buzzer-hive-library-honesty (2026-09-15T00:38Z): after apply, assert `host/library` and `host/continuous/OPEN_TASKS.json`. Unpatched seed buzzer_hive.json still pins F:\\GrokSelfLibrary and D:\\GrokCoreMemory. Independent of the live leftover. Do not edit `drone/pro/tool_agent.py`.
- dronehive work-order-fabric-root (2026-09-15T00:40Z): after apply, assert `fabric_root` is `.`. Unpatched work_order.json still pins `G:\\AI-Home\\projects\\ai-worker-drone-0.5b`. Independent of portable-paths. Do not edit `drone/pro/tool_agent.py`.
- dronehive seed-work-order-fabric-root (2026-09-15T00:41Z): after apply, assert seed `fabric_root` is `.`. Unpatched seed work_order.json still pins `G:\\AI-Home\\projects\\ai-worker-drone-0.5b`. Independent of the live leftover. Do not edit `drone/pro/tool_agent.py`.
- dronehive future-seer-jane-honesty (2026-09-15T00:43Z): after apply, assert jane.super_cell is `host/ai-center/agents/super-cell-4` and pythonpath_ai_center is `host/ai-center`. Unpatched still pins G:\\AI-Center. Independent of config-load-overlay and runtime-host-paths. Do not edit `drone/pro/tool_agent.py`.
- dronehive multi-hosts-exe-honesty (2026-09-15T00:44Z): after apply, assert supercell_muscle.exe and everest.exe use host/ai-center. Unpatched still pins G:\\AI-Center. Independent of future-seer-jane-honesty. Do not edit `drone/pro/tool_agent.py`.
- dronehive work-order-live-registry (2026-09-15T00:47Z): after apply, assert live_registry.cli/primary/events use host/ai-center. Unpatched still pins G:\\AI-Center. Independent of portable-paths and fabric-root. F:\\ mirror leftover stays later. Do not edit `drone/pro/tool_agent.py`.
- dronehive seed-work-order-live-registry (2026-09-15T00:49Z): after apply, assert seed live_registry.cli/primary/events use host/ai-center. Unpatched still pins G:\\AI-Center. Independent of the live leftover. F:\\ mirror leftover stays later. Do not edit `drone/pro/tool_agent.py`.
- dronehive work-order-school-root (2026-09-15T00:50Z): after apply, assert knowledge_imprint.school_root and school_lessons_md use host/ai-center/helper-school. Unpatched still pins G:\\AI-Center. Independent of portable-paths and live-registry. Do not edit `drone/pro/tool_agent.py`.
- dronehive seed-work-order-school-root (2026-09-15T00:51Z): after apply, assert seed knowledge_imprint.school_root and school_lessons_md use host/ai-center/helper-school. Unpatched still pins G:\\AI-Center. Independent of the live leftover. Do not edit `drone/pro/tool_agent.py`.
- dronehive work-order-reference-db (2026-09-15T00:53Z): after apply, assert knowledge_imprint.reference_db is host/ai-center/databases/ai_center_reference.db. Unpatched still pins G:\\AI-Center. Independent of school-root. Do not edit `drone/pro/tool_agent.py`.
- dronehive seed-work-order-reference-db (2026-09-15T00:54Z): after apply, assert seed knowledge_imprint.reference_db is host/ai-center/databases/ai_center_reference.db. Unpatched still pins G:\\AI-Center. Independent of the live leftover. Do not edit `drone/pro/tool_agent.py`.
- dronehive work-order-knowledge-expand (2026-09-15T00:56Z): after apply, assert knowledge_imprint.knowledge_expand is host/library/knowledge/expand. Unpatched still pins F:\\GrokSelfLibrary. Independent of reference-db. Do not edit `drone/pro/tool_agent.py`.
- dronehive seed-work-order-knowledge-expand (2026-09-15T00:57Z): after apply, assert seed knowledge_imprint.knowledge_expand is host/library/knowledge/expand. Unpatched still pins F:\\GrokSelfLibrary. Independent of the live leftover. Do not edit `drone/pro/tool_agent.py`.
- dronehive work-order-curriculum-root (2026-09-15T00:58Z): after apply, assert knowledge_imprint.curriculum_root and curriculum_json use host/ai-center/learning-curriculum. Unpatched still pins G:\\AI-Center. Independent of school-root. Do not edit `drone/pro/tool_agent.py`.
- dronehive seed-work-order-curriculum-root (2026-09-15T01:00Z): after apply, assert seed knowledge_imprint.curriculum_root and curriculum_json use host/ai-center/learning-curriculum. Unpatched still pins G:\\AI-Center. Independent of the live leftover. Do not edit `drone/pro/tool_agent.py`.
- dronehive multi-hosts-hardwire (2026-09-15T01:03Z): after apply, assert super_mesh.hardwire is data/super_mesh/HARDWIRE.json. Unpatched still pins G:\\AI-Home\\projects\\ai-worker-drone-0.5b. Independent of multi-hosts-exe-honesty. Do not edit `drone/pro/tool_agent.py`.
- dronehive super-llms-hardwire (2026-09-15T01:04Z): after apply, assert super_llms.json super_mesh.hardwire is data/super_mesh/HARDWIRE.json. Unpatched still pins G:\\AI-Home\\projects\\ai-worker-drone-0.5b. Independent of multi-hosts-hardwire. Do not edit `drone/pro/tool_agent.py`.
- dronehive work-order-open-tasks (2026-09-15T01:05Z): after apply, assert ai_laws.rank_5.open_tasks is host/continuous/OPEN_TASKS.json. Unpatched still pins D:\\GrokCoreMemory. Independent of portable-paths, fabric-root, and buzzer leftover. Do not edit `drone/pro/tool_agent.py`.
- dronehive seed-work-order-open-tasks (2026-09-15T01:06Z): after apply, assert seed ai_laws.rank_5.open_tasks is host/continuous/OPEN_TASKS.json. Unpatched still pins D:\\GrokCoreMemory. Independent of the live leftover. Do not edit `drone/pro/tool_agent.py`.
- dronehive work-order-codex-paths (2026-09-15T01:08Z): after apply, assert codex.root / master_min / master_md / query_cli use host/library. Unpatched still pins F:\\GrokSelfLibrary. Independent of portable-paths and curriculum leftover. Do not edit `drone/pro/tool_agent.py`.
- dronehive seed-work-order-codex-paths (2026-09-15T01:09Z): after apply, assert seed codex.root / master_min / master_md / query_cli use host/library. Unpatched still pins F:\\GrokSelfLibrary. Independent of the live leftover. Do not edit `drone/pro/tool_agent.py`.
- face-swap `DESIGN.md`: `FACESWAP_ENGINE` is the contract; G: is one host example. After apply (2026-09-15T00:12Z): assert `FACESWAP_ENGINE`, `one host example`, and `not the contract`. Unpatched DESIGN.md has none of those. Independent of `faceswap-honesty-env-paths`.
- OVA README (2026-09-15T00:21Z): Voice Access is Windows-only; Linux `pwsh` is syntax/math CI. After apply: assert `Windows 11 Voice Access`, `syntax/math CI only`, and `not** a Voice Access install`. Unpatched README has none of those. Independent of `ova-api-host-override`.
- bloom lint: new-file `.github/workflows/lint.yml`. Independent of `bloom-ci-typecheck` (`ci.yml`). `eslint .` is 0 errors / 2 warnings on `288a484`. Do not fold lint into typecheck.
- bloom grok-pwa tests: `scripts/grok-pwa-plugin.test.mjs` only. Call `GrokHeadContext`. Independent of `bloom-ci-typecheck`. Apply before relying on `npm test` in that CI. After apply (2026-09-15T00:06Z): `node --test scripts/grok-pwa-plugin.test.mjs scripts/brand-check.test.mjs` is 43/43; unpatched is 7 fail.
- OVA voice card (2026-09-15T00:23Z): Voice Access / Start Menu stay Windows-only. After apply: assert `Windows Voice Access / Start Menu only`, `install/QA scripts`, and `not** a Voice Access install`. Unpatched VOICE-ACCESS.md has none of those. Independent of `ova-readme-linux-honesty`.
- face-swap `ios/README.md` (2026-09-15T00:24Z): gateway URL comes from `START.cmd` or `START.sh` (`FACESWAP_ENGINE`). After apply: assert `FACESWAP_ENGINE`, `START.sh`, and `one example, not the contract`. Unpatched ios/README.md has none of those. Independent of `faceswap-design-honesty`.
- face-swap README Requirements (2026-09-15T00:26Z): engine is `FACESWAP_ENGINE`. After apply: assert `Engine healthy at`, `FACESWAP_ENGINE`, and `one example, not the contract`. Unpatched README has none of those. Independent of `faceswap-honesty-env-paths` (footer) and `faceswap-ios-readme-honesty`.
- face-swap README install (2026-09-15T00:27Z): documents `bash START.sh`. After apply: assert `bash START.sh`, `Linux / this pad`, and `fail-closed contract`. Unpatched README has none of those. Independent of `faceswap-start-sh` (new file) and `faceswap-readme-requirements-honesty`.
- face-swap README Swift (2026-09-15T00:28Z): IPA is Mac/Xcode only. After apply: assert `Windows, Linux, or this pad` and `only on a Mac with Xcode`. Unpatched README still says `this Windows host`. Independent of Requirements, install, and honesty-env-paths footer.
- face-swap README firewall (2026-09-15T00:29Z): inbound TCP 8860. After apply: assert `inbound TCP` and `Windows Firewall is one host example`. Unpatched README still says `allow Windows Firewall`. Independent of install, Requirements, and Swift.
- face-swap HONESTY Located Path/Models: G: is one host example; contract is `FACESWAP_ENGINE`. Independent of `faceswap-honesty-env-paths` (footer).

## Relaunch

```bash
node src/cli.js patches --prove --job "$JOB_ID" --siblings-root /tmp/siblings
# JSON applyNext is the write-checkout apply. --prove itself resets.
git clone "https://github.com/yuro1991-afk/<sibling>.git" work && cd work
git apply --check /path/to/main/<patch>
git apply /path/to/main/<patch>
```

Do not steal a rostered card. A waking agent with write access to that
sibling takes the matching job. Leftover unused on the GitHub-first
board (#8) is `review-main-pr10`, then `review-landing-pad-prs`.
This catalog is [main#9](https://github.com/yuro1991-afk/main/pull/9).
