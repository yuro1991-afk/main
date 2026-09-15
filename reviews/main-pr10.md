# Local review — main#10

[Draft PR](https://github.com/yuro1991-afk/main/pull/10) · branch
`cursor/python-arena-infra-dca0` · base `cursor/agent-dispatch-board-108b`
(not `main`) · MERGEABLE · fork `bc-84d93b47`.

Reviewed from `18c952b`…`82161d8` on 2026-09-14. Findings stay here.
Do not comment on GitHub unless Yuri asked. Do not implement leftover
organs on this pad.

## What landed

| package | contract | bind | role |
| --- | --- | --- | --- |
| `python-infra` | `genesis.python-infra.v1` | `:8800` | handshake / wire / lane probe |
| `python-suit` | `genesis.python-suit.v1` | `:8802` | six-head roster + `POST /v1/run` |
| `python-mind` | `genesis.python-mind.v1` | `:8803` | think-act-observe + in-memory hippocampus |
| `python-head` | `genesis.python-head.v1` | `:45011` | genesis seat + anatomy sockets |
| `python-ears` | `sense.hear` | `:8804` | energy VAD + stub STT |
| `python-arena` | `genesis.python-arena.v1` | (cli) | evaluation only |

UDP **2419** is never bound (`bindsUdp: []`, CLI refuses `--port 2419`).
`claimedLive` is true only when Superbrain `/live` is HTTP 200. Mind
`GET /live` is process liveness, not a peer probe. Head `GET /live`
has no peer I/O. Ears `/health` stays dark until Superbrain `/health`
and `/live` both succeed.

**Head and ears are already in this PR** (`82161d8`). Do not steal
them. Fork leftover slices: **eyes → vision → bridge**.

## Findings

1. **Default probe still hits `:45001` / `:8791`.** Suit `run` / mind
   `think` / head `think` call `probe_known_lanes` when the utterance
   contains `"probe"` and `opener` is unset. Tests inject a fake
   opener. `python3 -m genesis_head think "probe all lanes"` (README
   example) is a live Superbrain GET. Pad rule is **Yuri: no more
   Superbrain** — do not add more probe paths here. The fork owns
   whether those call sites refuse.

2. **Arena scores are a stable hash**, not a contest. `evaluate()`
   sums `ord` of `left:right:seed`. Fine for the evaluation-only
   contract (`occupiesVillage` / `mergesShards` are false). Do not
   treat a winner as a world-state merge.

3. **Ears VAD is a stub.** Any non-empty `--text` is energy `1.0` /
   `vad=true`. PCM RMS is byte-wise, not 16-bit samples. Expected for
   `sense.hear` until a real STT organ lands. Do not invent one here.

4. **Base is the dispatch-board branch, not `main`.** Merging #10 onto
   `main` would skip #8/#9. Keep this draft until Yuri retargets or
   merges the base. Do not rebase it onto this catalog branch.

5. **No `python-eyes` / `python-vision` / `python-bridge` packages.**
   Those are the fork's next body slices. Anatomy already has a
   `route` socket; leave eyes/vision/bridge unplugged.

## Verify (read-only)

```bash
git fetch origin cursor/python-arena-infra-dca0
# optional, on a throwaway worktree of that branch:
# ./scripts/install-python.sh
# python3 -m unittest discover -s packages/python-infra/tests -v
# python3 -m unittest discover -s packages/python-head/tests -v
# python3 -m unittest discover -s packages/python-ears/tests -v
```

Do not run Superbrain probes. Do not implement eyes / vision / bridge.
Do not steal the fork's branch.
