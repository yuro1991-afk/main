from __future__ import annotations

import io
import json
import socket
import threading
import unittest
import urllib.request

from genesis_infra.cli import main
from genesis_infra.contract import CONTRACT, HUB_HEADS, PONG_UDP, RESERVED_PORTS
from genesis_infra.probe import probe_lane
from genesis_infra.serve import make_server
from genesis_infra.wire import live_claim, wire


class FakeLive:
    def __init__(self, status: int = 200) -> None:
        self.status = status

    def getcode(self) -> int:
        return self.status

    def __enter__(self) -> FakeLive:
        return self

    def __exit__(self, *args: object) -> None:
        return None


def opener_for(mapping: dict[str, int]):
    def open_url(url: str, timeout: float = 2.5):
        if url not in mapping:
            raise TimeoutError("timed out")
        return FakeLive(mapping[url])

    return open_url


class WireTests(unittest.TestCase):
    def test_contract_and_roster(self) -> None:
        snapshot = wire(timeout_s=0.05, opener=opener_for({}))
        self.assertEqual(snapshot["contract"], CONTRACT)
        self.assertEqual([row["id"] for row in snapshot["roster"]], [row["id"] for row in HUB_HEADS])
        self.assertEqual(snapshot["ports"]["infra"], 8800)
        self.assertEqual(snapshot["pongUdp"], PONG_UDP)
        self.assertEqual(snapshot["bindsUdp"], [])
        self.assertFalse(snapshot["live"])
        self.assertFalse(snapshot["claimedLive"])

    def test_timeout_never_live(self) -> None:
        lane = probe_lane("http://169.254.124.8:45001/live", timeout_s=0.05, opener=opener_for({}))
        self.assertEqual(lane["status"], "unreachable")
        self.assertEqual(lane["error"], "timeout")
        self.assertNotEqual(lane["status"], "live")

    def test_live_only_when_superbrain_live_ok(self) -> None:
        dark = wire(timeout_s=0.05, opener=opener_for({}))
        self.assertFalse(live_claim(dark["lanes"]))
        lit = wire(
            timeout_s=0.05,
            opener=opener_for({"http://169.254.124.8:45001/live": 200}),
        )
        self.assertTrue(lit["live"])
        self.assertTrue(lit["claimedLive"])


class ServeTests(unittest.TestCase):
    def test_health_stays_dark_without_probe(self) -> None:
        sock = socket.socket()
        sock.bind(("127.0.0.1", 0))
        port = sock.getsockname()[1]
        sock.close()
        server = make_server(port=port, opener=opener_for({}))
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            with urllib.request.urlopen(f"http://127.0.0.1:{port}/health", timeout=2) as response:
                payload = json.loads(response.read().decode("utf-8"))
            self.assertEqual(payload["contract"], CONTRACT)
            self.assertFalse(payload["live"])
            self.assertFalse(payload["claimedLive"])
        finally:
            server.shutdown()
            server.server_close()

    def test_cli_refuses_pong_port(self) -> None:
        code = main(["serve", "--port", str(PONG_UDP)])
        self.assertEqual(code, 2)

    def test_wire_cli(self) -> None:
        buf = io.StringIO()
        old = __import__("sys").stdout
        try:
            __import__("sys").stdout = buf
            code = main(["wire"])
        finally:
            __import__("sys").stdout = old
        self.assertEqual(code, 0)
        payload = json.loads(buf.getvalue())
        self.assertEqual(payload["contract"], CONTRACT)


if __name__ == "__main__":
    unittest.main()
