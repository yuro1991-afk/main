from __future__ import annotations

import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from typing import Any
from urllib.parse import urlparse

from genesis_infra.contract import PONG_UDP, RESERVED_PORTS
from genesis_infra.wire import wire

from .dress import dress, roster, run_intent

CONTRACT = "genesis.python-suit.v1"
DEFAULT_PORT = 8802


def assert_bindable(port: int) -> None:
    if port == PONG_UDP:
        raise ValueError("UDP 2419 is the pong wire. genesis-suit never binds it.")
    if port in RESERVED_PORTS.values():
        raise ValueError(f"port {port} is reserved by another Genesis plane")


class SuitHandler(BaseHTTPRequestHandler):
    opener = None

    def log_message(self, format: str, *args: Any) -> None:  # noqa: A002
        return

    def _send(self, code: int, payload: dict[str, Any]) -> None:
        body = json.dumps(payload).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:
        path = urlparse(self.path).path
        handshake = wire(timeout_s=0.2, opener=self.opener)
        if path == "/":
            self._send(
                200,
                {
                    "contract": CONTRACT,
                    "kind": "console",
                    "roster": roster(),
                    "wearer": dress("genesis"),
                    "bindsUdp": [],
                    "live": handshake["live"],
                    "claimedLive": handshake["claimedLive"],
                },
            )
            return
        if path == "/health":
            self._send(
                200,
                {
                    "contract": CONTRACT,
                    "status": "ok",
                    "live": handshake["live"],
                    "claimedLive": handshake["claimedLive"],
                    "bindsUdp": [],
                },
            )
            return
        self._send(404, {"error": "not found", "contract": CONTRACT})

    def do_POST(self) -> None:
        path = urlparse(self.path).path
        if path != "/v1/run":
            self._send(404, {"error": "not found", "contract": CONTRACT})
            return
        length = int(self.headers.get("Content-Length", "0") or 0)
        raw = self.rfile.read(length) if length else b"{}"
        try:
            body = json.loads(raw.decode("utf-8") or "{}")
        except json.JSONDecodeError:
            self._send(400, {"error": "invalid json", "contract": CONTRACT})
            return
        intent = str(body.get("intent", ""))
        self._send(200, run_intent(intent, opener=self.opener))


def make_server(host: str = "127.0.0.1", port: int = DEFAULT_PORT, opener=None) -> ThreadingHTTPServer:
    assert_bindable(port)
    SuitHandler.opener = opener
    return ThreadingHTTPServer((host, port), SuitHandler)
