from __future__ import annotations

from dataclasses import dataclass, field


@dataclass
class Hippocampus:
    facts: list[str] = field(default_factory=list)

    def remember(self, fact: str) -> str:
        cleaned = fact.strip()
        if not cleaned:
            raise ValueError("nothing to remember")
        if cleaned not in self.facts:
            self.facts.append(cleaned)
        return cleaned

    def recall(self, query: str) -> list[str]:
        tokens = [token for token in query.lower().split() if token]
        if not tokens:
            return list(self.facts)
        hits = [fact for fact in self.facts if all(token in fact.lower() for token in tokens)]
        return hits or [fact for fact in self.facts if any(token in fact.lower() for token in tokens)]
