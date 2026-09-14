from __future__ import annotations

import json
import unittest
from io import StringIO

from genesis_infra.contract import PONG_UDP, RESERVED_PORTS, SUPERBRAIN_HEALTH, SUPERBRAIN_LIVE
from genesis_ears.cli import main
from genesis_ears.hear import hear, health_payload
from genesis_ears.serve import assert_bindable


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


class EarsTests(unittest.TestCase):
    def test_text_hear_event(self) -> None:
        event = hear(text="origin, can you hear me")
        self.assertEqual(event.kind, "sense.hear")
        self.assertEqual(event.text, "origin, can you hear me")
        self.assertTrue(event.vad)
        self.assertEqual(event.energy, 1.0)
        self.assertEqual(event.as_dict()["bindsUdp"], [])

    def test_silent_pcm_is_not_speech(self) -> None:
        event = hear(pcm=bytes([128] * 32))
        self.assertFalse(event.vad)
        self.assertEqual(event.stt, "")

    def test_health_dark_until_both_superbrain_lanes(self) -> None:
        dark = health_payload(opener=opener_for({}))
        self.assertEqual(dark["live"], "dark")
        self.assertFalse(dark["claimedLive"])
        half = health_payload(opener=opener_for({SUPERBRAIN_HEALTH: 200}))
        self.assertEqual(half["live"], "dark")
        lit = health_payload(
            opener=opener_for({SUPERBRAIN_HEALTH: 200, SUPERBRAIN_LIVE: 200}),
        )
        self.assertTrue(lit["claimedLive"])
        self.assertEqual(lit["live"], "live")

    def test_cli_hear_and_forbidden_ports(self) -> None:
        buf = StringIO()
        old = __import__("sys").stdout
        try:
            __import__("sys").stdout = buf
            self.assertEqual(main(["hear", "--text", "origin, can you hear me"]), 0)
        finally:
            __import__("sys").stdout = old
        payload = json.loads(buf.getvalue())
        self.assertEqual(payload["kind"], "sense.hear")
        with self.assertRaises(ValueError):
            assert_bindable(PONG_UDP)
        with self.assertRaises(ValueError):
            assert_bindable(RESERVED_PORTS["world_pm"])
        self.assertEqual(main(["serve", "--port", "8793"]), 2)


if __name__ == "__main__":
    unittest.main()
