from __future__ import annotations

from dataclasses import dataclass
from typing import Any

from genesis_infra.contract import PONG_UDP
from genesis_infra.probe import probe_known_lanes
from genesis_infra.wire import live_claim

from .contract import CAPS, CONTRACT, KIND, LANE, SERVICE
from .memory import Hippocampus


@dataclass
class Thought:
    speech: str
    act: str
    observe: dict[str, Any]
    claimed_live: bool
    binds_udp: list[int]


class AgentMind:
    def __init__(self, store: Hippocampus | None = None, opener=None) -> None:
        self.store = store if store is not None else Hippocampus()
        self.opener = opener
        self.workspace: list[str] = []

    @classmethod
    def in_memory(cls, opener=None) -> AgentMind:
        return cls(store=Hippocampus(), opener=opener)

    def think(self, text: str) -> Thought:
        utterance = text.strip()
        self.workspace.append(utterance)
        if utterance.lower().startswith("remember "):
            fact = self.store.remember(utterance[9:])
            return self._thought(
                act="remember",
                speech=f"remembered: {fact}",
                observe={"fact": fact, "facts": list(self.store.facts)},
            )
        if utterance.lower().startswith("what do you know"):
            about = utterance.split("about", 1)[1].strip() if "about" in utterance.lower() else ""
            hits = self.store.recall(about)
            speech = hits[0] if hits else "i do not know that yet"
            return self._thought(
                act="recall",
                speech=speech,
                observe={"query": about, "hits": hits},
            )
        if "probe" in utterance.lower():
            lanes = probe_known_lanes(timeout_s=0.2, opener=self.opener)
            claimed = live_claim(lanes)
            dark = "dark" if not claimed else "live"
            return self._thought(
                act="probe",
                speech=f"lanes {dark}; claimed_live={str(claimed).lower()}",
                observe={"lanes": lanes},
                claimed_live=claimed,
            )
        return self._thought(
            act="idle",
            speech=f"heard: {utterance}",
            observe={"workspace": list(self.workspace)},
        )

    def snapshot(self) -> dict[str, Any]:
        return {
            "contract": CONTRACT,
            "service": SERVICE,
            "kind": KIND,
            "lane": LANE,
            "caps": list(CAPS),
            "facts": list(self.store.facts),
            "workspace": list(self.workspace),
            "bindsUdp": [],
            "pongUdp": PONG_UDP,
        }

    def _thought(
        self,
        *,
        act: str,
        speech: str,
        observe: dict[str, Any],
        claimed_live: bool = False,
    ) -> Thought:
        return Thought(
            speech=speech,
            act=act,
            observe=observe,
            claimed_live=claimed_live,
            binds_udp=[],
        )
