# Genesis Python packages

Handshake first, then suit, mind, head, ears, then the evaluation arena. Superbrain stays dark until a probe succeeds. UDP 2419 is never bound. Suit `:8802` (world-PM owns `:8793`). Mind `:8803` (unifier/vision own `:8792`). Head `:45011`. Ears `:8804`.

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
python3 - <<'PY'
from genesis_mind import AgentMind
mind = AgentMind.in_memory()
print(mind.think("remember the origin protocol is local-first").speech)
print(mind.think("what do you know about the origin protocol").speech)
PY
python3 -m unittest discover -s packages/python-head/tests -v
python3 -m unittest discover -s packages/python-ears/tests -v
python3 -m genesis_head think "probe all lanes"
python3 -m genesis_ears hear --text "origin, can you hear me"
```

- `python-infra` — `genesis.python-infra.v1`, control plane `127.0.0.1:8800/health`
- `python-suit` — `genesis.python-suit.v1`, `GET /` `GET /health` `POST /v1/run` on `:8802`
- `python-mind` — `genesis.python-mind.v1`, think-act-observe + hippocampus. HTTP `:8803` (`GET /live` is process liveness). Does not steal unifier `:8792`.
- `python-head` — `genesis.python-head.v1`, genesis seat, anatomy sockets, `GET /live` has no peer I/O. HTTP `:45011`.
- `python-ears` — `sense.hear` + energy VAD + stub STT. HTTP `:8804`. `/health` stays dark until Superbrain `/health` and `/live` both succeed. Does not steal world-PM `:8793`.
- `python-arena` — `genesis.python-arena.v1`, evaluation only (no village, no shard merge)
