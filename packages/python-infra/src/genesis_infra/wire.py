from __future__ import annotations

import os
from typing import Any

from .contract import CONTRACT, HUB_HEADS, PONG_UDP, RESERVED_PORTS
from .probe import probe_known_lanes


def env_handshake() -> dict[str, str | None]:
    return {
        "GENESIS_INFRA_URL": os.environ.get("GENESIS_INFRA_URL", "http://127.0.0.1:8800"),
        "GENESIS_WORLD_PM_URL": os.environ.get("GENESIS_WORLD_PM_URL", "http://127.0.0.1:8793"),
        "GENESIS_SUIT_URL": os.environ.get("GENESIS_SUIT_URL"),
    }


def roster() -> list[dict[str, str]]:
    return [dict(row) for row in HUB_HEADS]


def mailboxes() -> dict[str, list[dict[str, str]]]:
    return {"inbox": [], "outbox": []}


def dispatch_hooks() -> dict[str, str]:
    return {
        "env": "genesis_infra.wire.env_handshake",
        "roster": "genesis_infra.wire.roster",
        "mail": "genesis_infra.wire.mailboxes",
        "ports": "genesis_infra.contract.RESERVED_PORTS",
        "probes": "genesis_infra.probe.probe_known_lanes",
    }


def live_claim(lanes: list[dict[str, Any]]) -> bool:
    live = next((lane for lane in lanes if lane.get("id") == "boss-superbrain-live"), None)
    return bool(live and live.get("status") == "live" and live.get("error") is None)


def wire(*, timeout_s: float = 2.5, opener=None) -> dict[str, Any]:
    lanes = probe_known_lanes(timeout_s=timeout_s, opener=opener)
    claimed = live_claim(lanes)
    return {
        "contract": CONTRACT,
        "env": env_handshake(),
        "roster": roster(),
        "mail": mailboxes(),
        "dispatch": dispatch_hooks(),
        "ports": dict(RESERVED_PORTS),
        "pongUdp": PONG_UDP,
        "bindsUdp": [],
        "lanes": lanes,
        "live": claimed,
        "claimedLive": claimed,
    }
