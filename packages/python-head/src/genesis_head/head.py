from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any

from genesis_infra.contract import PONG_UDP
from genesis_infra.probe import probe_known_lanes
from genesis_infra.wire import live_claim
from genesis_mind import AgentMind

from .anatomy import Anatomy
from .contract import AGENT_ID, CAPS, CONTRACT, KIND, LANE, SEAT


@dataclass
class HeadThought:
    speech: str
    act: str
    observe: dict[str, Any]
    claimed_live: bool
    binds_udp: list[int]
    seat: str = SEAT


@dataclass
class AgentHead:
    anatomy: Anatomy = field(default_factory=Anatomy)
    opener: Any = None
    last_claimed_live: bool = False

    @classmethod
    def seated(cls, opener=None) -> AgentHead:
        mind = AgentMind.in_memory(opener=opener)
        return cls(anatomy=Anatomy(mind=mind), opener=opener)

    def think(self, text: str) -> HeadThought:
        utterance = text.strip()
        parts = self.anatomy.plugged()
        if utterance.lower().startswith("route "):
            part = utterance.split(None, 1)[1].strip().split()[0]
            socket = self.anatomy.route(part)
            return self._speak(
                act="route",
                speech=f"routed to {part}; plugged={socket is not None}",
                observe={"part": part, "plugged": socket is not None, "parts": parts},
            )
        if parts["ears"] and utterance.lower().startswith("hear "):
            heard = self.anatomy.ears.hear(utterance[5:].strip())
            return self._speak(
                act="hear",
                speech=f"heard: {heard.get('text', '')}",
                observe={"hear": heard, "parts": parts},
            )
        if parts["mind"]:
            inner = self.anatomy.mind.think(utterance)
            self.last_claimed_live = bool(inner.claimed_live)
            return self._speak(
                act=inner.act,
                speech=inner.speech,
                observe={"inner": {"act": inner.act, "observe": inner.observe}, "parts": parts},
                claimed_live=inner.claimed_live,
            )
        if "probe" in utterance.lower():
            lanes = probe_known_lanes(timeout_s=0.2, opener=self.opener)
            claimed = live_claim(lanes)
            self.last_claimed_live = claimed
            dark = "dark" if not claimed else "live"
            return self._speak(
                act="probe",
                speech=f"lanes {dark}; claimed_live={str(claimed).lower()}",
                observe={"lanes": lanes, "parts": parts},
                claimed_live=claimed,
            )
        return self._speak(
            act="idle",
            speech=f"genesis seat heard: {utterance}",
            observe={"parts": parts},
        )

    def snapshot(self) -> dict[str, Any]:
        return {
            "contract": CONTRACT,
            "id": AGENT_ID,
            "seat": SEAT,
            "kind": KIND,
            "lane": LANE,
            "caps": list(CAPS),
            "parts": self.anatomy.plugged(),
            "claimedLive": self.last_claimed_live,
            "bindsUdp": [],
            "pongUdp": PONG_UDP,
        }

    def _speak(
        self,
        *,
        act: str,
        speech: str,
        observe: dict[str, Any],
        claimed_live: bool = False,
    ) -> HeadThought:
        observe = {**observe, "seat": SEAT}
        return HeadThought(
            speech=speech,
            act=act,
            observe=observe,
            claimed_live=claimed_live,
            binds_udp=[],
            seat=SEAT,
        )
