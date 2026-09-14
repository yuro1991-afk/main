"""Encoding-safe CHAT| printer for Windows cp1252 consoles.

Drop-in replacement for dronehive `drone.pro.tool_agent._chat`.
GitHub Actions windows-latest uses cp1252; printing ✓ / → raises
UnicodeEncodeError and fails `python-smoke`.
"""

from __future__ import annotations

import sys
from typing import TextIO


def safe_print(message: str, stream: TextIO | None = None) -> str:
    """Write ``message`` plus newline. Never raise UnicodeEncodeError."""
    out = sys.stdout if stream is None else stream
    try:
        print(message, flush=True, file=out)
        return "ok"
    except UnicodeEncodeError:
        encoding = getattr(out, "encoding", None) or "ascii"
        payload = (message + "\n").encode(encoding, errors="replace")
        buffer = getattr(out, "buffer", None)
        if buffer is not None:
            buffer.write(payload)
            buffer.flush()
            return "replaced"
        out.write(payload.decode(encoding, errors="replace"))
        out.flush()
        return "replaced"


def chat(role: str, text: str, stream: TextIO | None = None) -> str:
    """Stream one TUI chat line (`CHAT|{role}|{text}`)."""
    line = (text or "").replace("\n", " ").strip()
    if not line:
        return "empty"
    return safe_print(f"CHAT|{role}|{line[:500]}", stream)
