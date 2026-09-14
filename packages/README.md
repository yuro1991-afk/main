# Genesis Python packages

Handshake first, then the six-head suit, then the evaluation arena. Superbrain stays dark until a probe succeeds. UDP 2419 is never bound. Suit HTTP defaults to `:8802` because `:8793` is the world project manager.

```bash
./scripts/install-python.sh
python3 -m unittest discover -s packages/python-infra/tests -v
python3 -m unittest discover -s packages/python-arena/tests -v
python3 -m unittest discover -s packages/python-suit/tests -v
python3 -m genesis_infra wire
python3 -m genesis_arena evaluate genesis sentinel
python3 -m genesis_suit roster
python3 -m genesis_suit run "probe the wire"
python3 -m genesis_suit serve --port 8802
```

- `python-infra` — `genesis.python-infra.v1`, control plane `127.0.0.1:8800/health`
- `python-suit` — `genesis.python-suit.v1`, `GET /` `GET /health` `POST /v1/run` on `:8802`
- `python-arena` — `genesis.python-arena.v1`, evaluation only (no village, no shard merge)
