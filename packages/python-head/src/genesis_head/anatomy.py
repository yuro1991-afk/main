from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Protocol

from .contract import PARTS


class EarsPort(Protocol):
    def hear(self, text: str = "") -> dict[str, Any]:
        ...


class EyesPort(Protocol):
    def look(self, target: str) -> dict[str, Any]:
        ...


class MindPort(Protocol):
    def think(self, text: str) -> Any:
        ...


@dataclass
class Anatomy:
    eyes: Any = None
    ears: Any = None
    mouth: Any = None
    hands: Any = None
    mind: Any = None
    body: Any = None

    def plugged(self) -> dict[str, bool]:
        return {name: getattr(self, name) is not None for name in PARTS}

    def route(self, name: str) -> Any:
        if name not in PARTS:
            raise ValueError(f"unknown part: {name}")
        return getattr(self, name)
