from __future__ import annotations

import json
import unittest
from io import StringIO

from genesis_arena.cli import main
from genesis_arena.contract import CONTRACT, PONG_UDP
from genesis_arena.evaluate import evaluate
from genesis_infra.contract import RESERVED_PORTS


class FakeTimeout:
    def __call__(self, url: str, timeout: float = 2.5):
        raise TimeoutError("timed out")


class ArenaTests(unittest.TestCase):
    def test_match_is_deterministic_and_dark(self) -> None:
        first = evaluate("genesis", "sentinel", seed="round-1", opener=FakeTimeout())
        second = evaluate("genesis", "sentinel", seed="round-1", opener=FakeTimeout())
        self.assertEqual(first["contract"], CONTRACT)
        self.assertEqual(first["match"], second["match"])
        self.assertFalse(first["occupiesVillage"])
        self.assertFalse(first["mergesShards"])
        self.assertEqual(first["bindsUdp"], [])
        self.assertEqual(first["pongUdp"], PONG_UDP)
        self.assertFalse(first["live"])
        self.assertNotEqual(first["match"]["left"], first["match"]["right"])
        self.assertIn(first["match"]["winner"], {"genesis", "sentinel"})

    def test_rejects_unknown_and_same_head(self) -> None:
        with self.assertRaises(ValueError):
            evaluate("genesis", "dronehive")
        with self.assertRaises(ValueError):
            evaluate("atlas", "atlas")

    def test_does_not_steal_world_ports(self) -> None:
        snapshot = evaluate("forge", "lumen", opener=FakeTimeout())
        self.assertNotIn(RESERVED_PORTS["unifier"], snapshot["bindsUdp"])
        self.assertNotIn(RESERVED_PORTS["world_pm"], snapshot["bindsUdp"])
        self.assertNotIn(RESERVED_PORTS["host"], snapshot["bindsUdp"])
        self.assertNotIn(PONG_UDP, snapshot["bindsUdp"])

    def test_cli_report(self) -> None:
        buf = StringIO()
        old = __import__("sys").stdout
        try:
            __import__("sys").stdout = buf
            code = main(["report"])
        finally:
            __import__("sys").stdout = old
        self.assertEqual(code, 0)
        payload = json.loads(buf.getvalue())
        self.assertEqual(payload["kind"], "evaluation")
        self.assertEqual(payload["match"]["left"], "genesis")


if __name__ == "__main__":
    unittest.main()
