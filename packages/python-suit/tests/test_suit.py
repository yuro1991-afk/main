from __future__ import annotations

import json
import socket
import threading
import unittest
import urllib.request
from io import StringIO

from genesis_infra.contract import PONG_UDP, RESERVED_PORTS
from genesis_suit.cli import main
from genesis_suit.dress import dress, roster, run_intent
from genesis_suit.serve import assert_bindable, make_server


class SuitTests(unittest.TestCase):
    def test_six_heads(self) -> None:
        ids = [row["id"] for row in roster()]
        self.assertEqual(ids, ["genesis", "sentinel", "mnemosyne", "forge", "atlas", "lumen"])
        self.assertEqual(dress("lumen")["lane"], "Lens")

    def test_probe_intent_stays_dark(self) -> None:
        def opener(url: str, timeout: float = 2.5):
            raise TimeoutError("timed out")

        result = run_intent("probe all lanes", opener=opener)
        self.assertEqual(result["bindsUdp"], [])
        self.assertTrue(all(lane["status"] == "unreachable" for lane in result["lanes"]))

    def test_cli_roster(self) -> None:
        buf = StringIO()
        old = __import__("sys").stdout
        try:
            __import__("sys").stdout = buf
            self.assertEqual(main(["roster"]), 0)
        finally:
            __import__("sys").stdout = old
        self.assertEqual(len(json.loads(buf.getvalue())), 6)

    def test_refuses_reserved_and_pong_ports(self) -> None:
        with self.assertRaises(ValueError):
            assert_bindable(PONG_UDP)
        with self.assertRaises(ValueError):
            assert_bindable(RESERVED_PORTS["world_pm"])
        self.assertEqual(main(["serve", "--port", str(PONG_UDP)]), 2)
        self.assertEqual(main(["serve", "--port", str(RESERVED_PORTS["world_pm"])]), 2)

    def test_health_and_run_stay_dark(self) -> None:
        def opener(url: str, timeout: float = 2.5):
            raise TimeoutError("timed out")

        sock = socket.socket()
        sock.bind(("127.0.0.1", 0))
        port = sock.getsockname()[1]
        sock.close()
        server = make_server(port=port, opener=opener)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            with urllib.request.urlopen(f"http://127.0.0.1:{port}/health", timeout=2) as response:
                health = json.loads(response.read().decode("utf-8"))
            self.assertFalse(health["live"])
            self.assertFalse(health["claimedLive"])
            request = urllib.request.Request(
                f"http://127.0.0.1:{port}/v1/run",
                data=json.dumps({"intent": "probe the wire"}).encode("utf-8"),
                headers={"Content-Type": "application/json"},
                method="POST",
            )
            with urllib.request.urlopen(request, timeout=2) as response:
                payload = json.loads(response.read().decode("utf-8"))
            self.assertEqual(payload["bindsUdp"], [])
            self.assertTrue(all(lane["status"] == "unreachable" for lane in payload["lanes"]))
        finally:
            server.shutdown()
            server.server_close()


if __name__ == "__main__":
    unittest.main()
