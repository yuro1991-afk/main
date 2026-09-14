import json
import os
import subprocess
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPRODUCE = ROOT / "src" / "reproduce.py"


def run_mode(mode: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        [sys.executable, str(REPRODUCE), "--mode", mode, "--json"],
        cwd=ROOT,
        check=False,
        capture_output=True,
        text=True,
    )


class ReproduceTests(unittest.TestCase):
    def test_unpatched_raises_on_cp1252(self) -> None:
        result = run_mode("unpatched")
        self.assertEqual(result.returncode, 0, result.stderr)
        payload = json.loads(result.stdout)
        self.assertTrue(payload["raised"])
        self.assertIn("charmap", payload["error"])

    def test_patched_does_not_raise(self) -> None:
        result = run_mode("patched")
        self.assertEqual(result.returncode, 0, result.stderr)
        payload = json.loads(result.stdout)
        self.assertFalse(payload["raised"])
        self.assertEqual(payload["status"], "replaced")


if __name__ == "__main__":
    os.chdir(ROOT)
    unittest.main()
