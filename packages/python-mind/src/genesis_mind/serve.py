from __future__ import annotations

import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from typing import Any
from urllib.parse import urlparse

from genesis_infra.contract import PONG_UDP, RESERVED_PORTS
from genesis_infra.wire import live_claim, wire

from .contract import CONTRACT, DEFAULT_PORT, KIND, SERVICE
from .mind import AgentMind


def assert_bindable(port: int) -> None:
    if port == PONG_UDP:
        raise ValueError("UDP 2419 is the pong wire. genesis-python-mind never binds it.")
    if port in RESERVED_PORTS.values():
        raise ValueError(f"port {port} is reserved by another Genesis plane")


class MindHandler(BaseHTTPRequestHandler):
    mind: AgentMind | None = None

    def log_message(self, format: str, *args: Any) -> None:  # noqa: A002
        return

    def _mind(self) -> AgentMind:
        if self.mind is None:
            self.mind = AgentMind.in_memory()
        return self.mind

    def _send(self, code: int, payload: dict[str, Any]) -> None:
        body = json.dumps(payload).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:
        path = urlparse(self.path).path
        handshake = wire(timeout_s=0.2, opener=self._mind().opener)
        claimed = live_claim(handshake["lanes"])
        if path == "/live":
            self._send(
                200,
                {
                    "contract": CONTRACT,
                    "service": SERVICE,
                    "kind": KIND,
                    "live": True,
                    "claimedLive": claimed,
                    "note": "process liveness, not a Superbrain claim",
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
                    "claimedLive": claimed,
                    "bindsUdp": [],
                },
            )
            return
        if path == "/":
            self._send(200, self._mind().snapshot())
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
        thought = self._mind().think(str(body.get("input", body.get("intent", ""))))
        self._send(
            200,
            {
                "speech": thought.speech,
                "act": thought.act,
                "observe": thought.observe,
                "claimedLive": thought.claimed_live,
                "bindsUdp": thought.binds_udp,
            },
        )


def make_server(host: str = "127.0.0.1", port: int = DEFAULT_PORT, mind: AgentMind | None = None) -> ThreadingHTTPServer:
    assert_bindable(port)
    handler_mind = mind if mind is not None else AgentMind.in_memory()
    MindHandler.mind = handler_mind
    return ThreadingHTTPServer((host, port), MindHandler)
