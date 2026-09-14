from __future__ import annotations

from typing import Any

from genesis_infra.contract import HUB_HEADS, PONG_UDP
from genesis_infra.probe import probe_known_lanes


def roster() -> list[dict[str, str]]:
    return [dict(row) for row in HUB_HEADS]


def dress(head_id: str) -> dict[str, str]:
    for row in HUB_HEADS:
        if row["id"] == head_id:
            return {"id": row["id"], "title": row["title"], "lane": row["lane"], "worn": "true"}
    raise ValueError(f"unknown head: {head_id}")


def run_intent(intent: str, *, opener=None) -> dict[str, Any]:
    if "probe" in intent.lower():
        lanes = probe_known_lanes(timeout_s=0.2, opener=opener)
        return {"intent": intent, "lanes": lanes, "bindsUdp": [], "pongUdp": PONG_UDP}
    wearer = dress("genesis")
    return {"intent": intent, "wearer": wearer, "bindsUdp": [], "pongUdp": PONG_UDP}
