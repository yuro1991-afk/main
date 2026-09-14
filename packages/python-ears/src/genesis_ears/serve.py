from __future__ import annotations

import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from typing import Any
from urllib.parse import urlparse

from genesis_infra.contract import PONG_UDP, RESERVED_PORTS

from .contract import CONTRACT, DEFAULT_PORT
from .hear import health_payload, hear


def assert_bindable(port: int) -> None:
    if port == PONG_UDP:
        raise ValueError("UDP 2419 is the pong wire. genesis-ears never binds it.")
    if port in RESERVED_PORTS.values():
        raise ValueError(f"port {port} is reserved by another Genesis plane")


class EarsHandler(BaseHTTPRequestHandler):
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
        if path == "/health":
            self._send(200, health_payload(opener=self.opener))
            return
        self._send(404, {"error": "not found", "contract": CONTRACT})

    def do_POST(self) -> None:
        path = urlparse(self.path).path
        if path != "/hear":
            self._send(404, {"error": "not found", "contract": CONTRACT})
            return
        length = int(self.headers.get("Content-Length", "0") or 0)
        raw = self.rfile.read(length) if length else b"{}"
        try:
            body = json.loads(raw.decode("utf-8") or "{}")
        except json.JSONDecodeError:
            self._send(400, {"error": "invalid json", "contract": CONTRACT})
            return
        event = hear(text=str(body.get("text", "")))
        self._send(200, event.as_dict())


def make_server(host: str = "127.0.0.1", port: int = DEFAULT_PORT, opener=None) -> ThreadingHTTPServer:
    assert_bindable(port)
    EarsHandler.opener = opener
    return ThreadingHTTPServer((host, port), EarsHandler)
