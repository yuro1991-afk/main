from __future__ import annotations

import json
import socket
import threading
import unittest
import urllib.request

from genesis_infra.contract import PONG_UDP, RESERVED_PORTS
from genesis_mind.cli import main
from genesis_mind.mind import AgentMind
from genesis_mind.serve import assert_bindable, make_server


class MindTests(unittest.TestCase):
    def test_remember_and_recall(self) -> None:
        mind = AgentMind.in_memory()
        stored = mind.think("remember the origin protocol is local-first")
        self.assertEqual(stored.act, "remember")
        self.assertIn("local-first", stored.speech)
        recalled = mind.think("what do you know about the origin protocol")
        self.assertEqual(recalled.act, "recall")
        self.assertIn("local-first", recalled.speech)

    def test_probe_stays_dark(self) -> None:
        def opener(url: str, timeout: float = 2.5):
            raise TimeoutError("timed out")

        mind = AgentMind.in_memory(opener=opener)
        thought = mind.think("probe all lanes")
        self.assertEqual(thought.act, "probe")
        self.assertFalse(thought.claimed_live)
        self.assertEqual(thought.binds_udp, [])
        self.assertTrue(all(lane["status"] == "unreachable" for lane in thought.observe["lanes"]))

    def test_refuses_unifier_and_pong(self) -> None:
        with self.assertRaises(ValueError):
            assert_bindable(PONG_UDP)
        with self.assertRaises(ValueError):
            assert_bindable(RESERVED_PORTS["unifier"])
        self.assertEqual(main(["serve", "--port", str(PONG_UDP)]), 2)

    def test_live_is_process_not_superbrain(self) -> None:
        def opener(url: str, timeout: float = 2.5):
            raise TimeoutError("timed out")

        sock = socket.socket()
        sock.bind(("127.0.0.1", 0))
        port = sock.getsockname()[1]
        sock.close()
        mind = AgentMind.in_memory(opener=opener)
        server = make_server(port=port, mind=mind)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            with urllib.request.urlopen(f"http://127.0.0.1:{port}/live", timeout=2) as response:
                payload = json.loads(response.read().decode("utf-8"))
            self.assertTrue(payload["live"])
            self.assertFalse(payload["claimedLive"])
            request = urllib.request.Request(
                f"http://127.0.0.1:{port}/think",
                data=json.dumps({"input": "remember the origin protocol is local-first"}).encode("utf-8"),
                headers={"Content-Type": "application/json"},
                method="POST",
            )
            with urllib.request.urlopen(request, timeout=2) as response:
                thought = json.loads(response.read().decode("utf-8"))
            self.assertEqual(thought["act"], "remember")
        finally:
            server.shutdown()
            server.server_close()


if __name__ == "__main__":
    unittest.main()
