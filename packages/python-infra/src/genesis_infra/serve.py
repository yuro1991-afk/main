from __future__ import annotations

import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from typing import Any

from .contract import CONTRACT, RESERVED_PORTS
from .wire import wire


class HealthHandler(BaseHTTPRequestHandler):
    timeout_s = 2.5
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
        snapshot = wire(timeout_s=self.timeout_s, opener=self.opener)
        if self.path in {"/", "/health"}:
            self._send(
                200,
                {
                    "contract": CONTRACT,
                    "status": "ok",
                    "live": snapshot["live"],
                    "claimedLive": snapshot["claimedLive"],
                    "port": RESERVED_PORTS["infra"],
                    "lanes": snapshot["lanes"],
                },
            )
            return
        if self.path == "/wire":
            self._send(200, snapshot)
            return
        self._send(404, {"error": "not found", "contract": CONTRACT})


def make_server(host: str = "127.0.0.1", port: int | None = None, opener=None) -> ThreadingHTTPServer:
    bind = port if port is not None else RESERVED_PORTS["infra"]
    HealthHandler.opener = opener
    return ThreadingHTTPServer((host, bind), HealthHandler)
