from __future__ import annotations

import math
from dataclasses import dataclass
from typing import Any

from genesis_infra.contract import PONG_UDP, SUPERBRAIN_HEALTH, SUPERBRAIN_LIVE
from genesis_infra.probe import probe_lane

from .contract import CONTRACT, KIND, VAD_THRESHOLD


@dataclass
class HearEvent:
    kind: str
    text: str
    energy: float
    vad: bool
    stt: str

    def as_dict(self) -> dict[str, Any]:
        return {
            "kind": self.kind,
            "text": self.text,
            "energy": self.energy,
            "vad": self.vad,
            "stt": self.stt,
            "bindsUdp": [],
            "pongUdp": PONG_UDP,
        }


def energy_vad(pcm: bytes | None, *, text: str = "") -> tuple[float, bool]:
    if text.strip():
        return 1.0, True
    if not pcm:
        return 0.0, False
    samples = pcm if pcm else b""
    if not samples:
        return 0.0, False
    mean = sum(samples) / len(samples)
    rms = math.sqrt(sum((byte - mean) ** 2 for byte in samples) / len(samples) / (255.0**2))
    return round(rms, 4), rms >= VAD_THRESHOLD


def stub_stt(text: str = "", pcm: bytes | None = None) -> str:
    if text.strip():
        return text.strip()
    if pcm:
        return ""
    return ""


def hear(text: str = "", pcm: bytes | None = None) -> HearEvent:
    energy, vad = energy_vad(pcm, text=text)
    spoken = stub_stt(text=text, pcm=pcm)
    return HearEvent(kind=KIND, text=spoken, energy=energy, vad=vad, stt=spoken)


def superbrain_both_live(*, opener=None, timeout_s: float = 0.2) -> bool:
    health = probe_lane(SUPERBRAIN_HEALTH, timeout_s=timeout_s, opener=opener)
    live = probe_lane(SUPERBRAIN_LIVE, timeout_s=timeout_s, opener=opener)
    return health.get("status") == "live" and live.get("status") == "live"


def health_payload(*, opener=None) -> dict[str, Any]:
    claimed = superbrain_both_live(opener=opener)
    return {
        "contract": CONTRACT,
        "status": "ok",
        "live": "live" if claimed else "dark",
        "claimedLive": claimed,
        "bindsUdp": [],
        "pongUdp": PONG_UDP,
    }
