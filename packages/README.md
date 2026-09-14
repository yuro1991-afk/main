# Genesis Python packages

Handshake first, then the six-head suit, then the mind loop, then the evaluation arena. Superbrain stays dark until a probe succeeds. UDP 2419 is never bound. Suit HTTP defaults to `:8802` (world-PM owns `:8793`). Mind HTTP defaults to `:8803` (unifier/vision own `:8792`).

```bash
./scripts/install-python.sh
python3 -m unittest discover -s packages/python-infra/tests -v
python3 -m unittest discover -s packages/python-arena/tests -v
python3 -m unittest discover -s packages/python-suit/tests -v
python3 -m unittest discover -s packages/python-mind/tests -v
python3 -m genesis_infra wire
python3 -m genesis_arena evaluate genesis sentinel
python3 -m genesis_suit roster
python3 -m genesis_suit run "probe the wire"
python3 -m genesis_suit serve --port 8802
python3 -m genesis_mind think "remember the origin protocol is local-first"
python3 -m genesis_mind think "what do you know about the origin protocol"
```

- `python-infra` — `genesis.python-infra.v1`, control plane `127.0.0.1:8800/health`
- `python-suit` — `genesis.python-suit.v1`, `GET /` `GET /health` `POST /v1/run` on `:8802`
- `python-mind` — `genesis.python-mind.v1`, think-act-observe + hippocampus. HTTP `:8803` (`GET /live` is process liveness). Does not steal unifier `:8792`.
- `python-arena` — `genesis.python-arena.v1`, evaluation only (no village, no shard merge)
