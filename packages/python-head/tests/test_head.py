from __future__ import annotations

import json
import socket
import threading
import unittest
import urllib.request

from genesis_ears import hear as ears_hear
from genesis_head.anatomy import Anatomy
from genesis_head.cli import main
from genesis_head.head import AgentHead
from genesis_head.serve import assert_bindable, make_server
from genesis_infra.contract import PONG_UDP, RESERVED_PORTS


class RaisingOpener:
    def __call__(self, url: str, timeout: float = 2.5):
        raise AssertionError(f"peer I/O is forbidden: {url}")


class TimeoutOpener:
    def __call__(self, url: str, timeout: float = 2.5):
        raise TimeoutError("timed out")


class FakeEars:
    def hear(self, text: str = "") -> dict[str, object]:
        return ears_hear(text=text).as_dict()


class HeadTests(unittest.TestCase):
    def test_seat_and_mind_loop(self) -> None:
        head = AgentHead.seated()
        thought = head.think("remember the origin protocol is local-first")
        self.assertEqual(thought.seat, "genesis")
        self.assertEqual(thought.act, "remember")
        recalled = head.think("what do you know about the origin protocol")
        self.assertIn("local-first", recalled.speech)
        self.assertTrue(thought.observe["parts"]["mind"])

    def test_probe_stays_dark(self) -> None:
        head = AgentHead.seated(opener=TimeoutOpener())
        thought = head.think("probe all lanes")
        self.assertEqual(thought.act, "probe")
        self.assertFalse(thought.claimed_live)
        self.assertEqual(thought.binds_udp, [])

    def test_route_and_ears_socket(self) -> None:
        head = AgentHead.seated()
        routed = head.think("route mouth")
        self.assertEqual(routed.act, "route")
        self.assertFalse(routed.observe["plugged"])
        head.anatomy.ears = FakeEars()
        heard = head.think("hear origin, can you hear me")
        self.assertEqual(heard.act, "hear")
        self.assertIn("origin", heard.speech)

    def test_refuses_reserved_and_pong(self) -> None:
        with self.assertRaises(ValueError):
            assert_bindable(PONG_UDP)
        with self.assertRaises(ValueError):
            assert_bindable(RESERVED_PORTS["world_pm"])
        self.assertEqual(main(["serve", "--port", str(PONG_UDP)]), 2)

    def test_live_and_snapshot_do_not_probe(self) -> None:
        sock = socket.socket()
        sock.bind(("127.0.0.1", 0))
        port = sock.getsockname()[1]
        sock.close()
        head = AgentHead(anatomy=Anatomy(), opener=RaisingOpener())
        server = make_server(port=port, head=head)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            with urllib.request.urlopen(f"http://127.0.0.1:{port}/live", timeout=2) as response:
                live = json.loads(response.read().decode("utf-8"))
            self.assertTrue(live["live"])
            self.assertFalse(live["claimedLive"])
            with urllib.request.urlopen(f"http://127.0.0.1:{port}/api/head", timeout=2) as response:
                snap = json.loads(response.read().decode("utf-8"))
            self.assertEqual(snap["seat"], "genesis")
            self.assertFalse(snap["parts"]["mind"])
        finally:
            server.shutdown()
            server.server_close()


if __name__ == "__main__":
    unittest.main()
