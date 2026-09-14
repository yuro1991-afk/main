from __future__ import annotations

from typing import Any

from genesis_infra.contract import HUB_HEADS
from genesis_infra.wire import wire

from .contract import CONTRACT, PONG_UDP


HEAD_IDS = {row["id"] for row in HUB_HEADS}


def _score(left: str, right: str, seed: str) -> tuple[int, int]:
    raw = sum(ord(ch) for ch in f"{left}:{right}:{seed}")
    left_score = 10 + (raw % 7)
    right_score = 10 + ((raw // 7) % 7)
    if left_score == right_score:
        left_score += 1
    return left_score, right_score


def evaluate(left: str, right: str, *, seed: str = "round-1", opener=None) -> dict[str, Any]:
    if left not in HEAD_IDS or right not in HEAD_IDS:
        raise ValueError(f"arena only seats hub heads: {sorted(HEAD_IDS)}")
    if left == right:
        raise ValueError("arena match needs two different heads")
    handshake = wire(timeout_s=0.2, opener=opener)
    left_score, right_score = _score(left, right, seed)
    winner = left if left_score > right_score else right
    return {
        "contract": CONTRACT,
        "kind": "evaluation",
        "occupiesVillage": False,
        "mergesShards": False,
        "bindsUdp": [],
        "pongUdp": PONG_UDP,
        "handshake": handshake["contract"],
        "live": handshake["live"],
        "claimedLive": handshake["claimedLive"],
        "match": {
            "left": left,
            "right": right,
            "seed": seed,
            "scores": {left: left_score, right: right_score},
            "winner": winner,
        },
    }
