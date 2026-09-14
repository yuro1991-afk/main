import io
import os
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from safe_chat import chat, safe_print


class SafeChatTests(unittest.TestCase):
    def test_utf8_stream_ok(self) -> None:
        buf = io.BytesIO()
        stream = io.TextIOWrapper(buf, encoding="utf-8", newline="\n")
        status = chat("tool", "✓ write_text → ci_ok.txt", stream)
        stream.flush()
        self.assertEqual(status, "ok")
        self.assertIn("CHAT|tool|✓ write_text → ci_ok.txt", buf.getvalue().decode("utf-8"))

    def test_cp1252_does_not_raise(self) -> None:
        buf = io.BytesIO()
        stream = io.TextIOWrapper(buf, encoding="cp1252", newline="\n")
        status = chat("tool", "✓ write_text → ci_ok.txt", stream)
        stream.flush()
        self.assertEqual(status, "replaced")
        text = buf.getvalue().decode("cp1252")
        self.assertTrue(text.startswith("CHAT|tool|"))
        self.assertIn("write_text", text)
        self.assertNotIn("✓", text)

    def test_empty_skipped(self) -> None:
        buf = io.StringIO()
        self.assertEqual(chat("tool", "  \n", buf), "empty")
        self.assertEqual(buf.getvalue(), "")

    def test_safe_print_ascii_ok(self) -> None:
        buf = io.StringIO()
        self.assertEqual(safe_print("hello", buf), "ok")
        self.assertEqual(buf.getvalue(), "hello\n")


class PatchPresenceTests(unittest.TestCase):
    def test_patch_mentions_the_crash_site(self) -> None:
        patch = (ROOT / "patches" / "dronehive-pro-chat-cp1252.patch").read_text(
            encoding="utf-8"
        )
        self.assertIn("drone/pro/tool_agent.py", patch)
        self.assertIn("UnicodeEncodeError", patch)
        self.assertIn("PYTHONIOENCODING", patch)
        self.assertIn("PYTHONUTF8", patch)


if __name__ == "__main__":
    os.chdir(ROOT)
    unittest.main()
