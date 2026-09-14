from __future__ import annotations

import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from typing import Any
from urllib.parse import urlparse

from genesis_infra.contract import PONG_UDP, RESERVED_PORTS

from .contract import CONTRACT, DEFAULT_PORT, KIND
from .head import AgentHead


def assert_bindable(port: int) -> None:
    if port == PONG_UDP:
        raise ValueError("UDP 2419 is the pong wire. genesis-head never binds it.")
    if port in RESERVED_PORTS.values():
        raise ValueError(f"port {port} is reserved by another Genesis plane")


class HeadHandler(BaseHTTPRequestHandler):
    head: AgentHead | None = None

    def log_message(self, format: str, *args: Any) -> None:  # noqa: A002
        return

    def _head(self) -> AgentHead:
        if self.head is None:
            self.head = AgentHead.seated()
        return self.head

    def _send(self, code: int, payload: dict[str, Any]) -> None:
        body = json.dumps(payload).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:
        path = urlparse(self.path).path
        cranium = self._head()
        if path == "/live":
            self._send(
                200,
                {
                    "contract": CONTRACT,
                    "kind": KIND,
                    "live": True,
                    "claimedLive": cranium.last_claimed_live,
                    "note": "process liveness, no peer I/O",
                },
            )
            return
        if path == "/health":
            self._send(
                200,
                {
                    "contract": CONTRACT,
                    "status": "ok",
                    "live": True,
                    "claimedLive": cranium.last_claimed_live,
                    "bindsUdp": [],
                },
            )
            return
        if path == "/api/head":
            self._send(200, cranium.snapshot())
            return
        self._send(404, {"error": "not found", "contract": CONTRACT})

    def do_POST(self) -> None:
        path = urlparse(self.path).path
        if path != "/think":
            self._send(404, {"error": "not found", "contract": CONTRACT})
            return
        length = int(self.headers.get("Content-Length", "0") or 0)
        raw = self.rfile.read(length) if length else b"{}"
        try:
            body = json.loads(raw.decode("utf-8") or "{}")
        except json.JSONDecodeError:
            self._send(400, {"error": "invalid json", "contract": CONTRACT})
            return
        thought = self._head().think(str(body.get("input", "")))
        self._send(
            200,
            {
                "speech": thought.speech,
                "act": thought.act,
                "observe": thought.observe,
                "claimedLive": thought.claimed_live,
                "bindsUdp": thought.binds_udp,
                "seat": thought.seat,
            },
        )


def make_server(host: str = "127.0.0.1", port: int = DEFAULT_PORT, head: AgentHead | None = None) -> ThreadingHTTPServer:
    assert_bindable(port)
    HeadHandler.head = head if head is not None else AgentHead.seated()
    return ThreadingHTTPServer((host, port), HeadHandler)
