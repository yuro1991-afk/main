"""Reproduce the dronehive windows-latest CHAT| UnicodeEncodeError.

Unpatched `_chat` matches `drone/pro/tool_agent.py` on dronehive main.
Patched mode uses `safe_chat.chat`. `--tree` extracts `_chat` from a
real checkout (after `autofix apply`) and proves it no longer raises.
"""

from __future__ import annotations

import argparse
import ast
import io
import json
import sys
from pathlib import Path
from typing import Any, Callable

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT / "src") not in sys.path:
    sys.path.insert(0, str(ROOT / "src"))

from safe_chat import chat as patched_chat

CRASH_TEXT = "✓ write_text → ci_ok.txt"
MODES = ("unpatched", "patched", "tree")


def unpatched_chat(role: str, text: str, stream: Any) -> None:
    """Exact dronehive `_chat` body before the cp1252 fix."""
    line = (text or "").replace("\n", " ").strip()
    if not line:
        return
    print(f"CHAT|{role}|{line[:500]}", flush=True, file=stream)


def cp1252_stream() -> io.TextIOWrapper:
    return io.TextIOWrapper(io.BytesIO(), encoding="cp1252", newline="\n")


def run_chat(fn: Callable[..., Any], stream: io.TextIOWrapper) -> dict[str, Any]:
    try:
        status = fn("tool", CRASH_TEXT, stream)
        stream.flush()
        return {"raised": False, "status": status}
    except UnicodeEncodeError as exc:
        return {
            "raised": True,
            "error": str(exc),
            "character": "\\u2713",
        }


def extract_chat(tool_agent: Path) -> Callable[..., Any]:
    """Load `_chat` from a dronehive `tool_agent.py` without importing drone."""
    source = tool_agent.read_text(encoding="utf-8")
    module = ast.parse(source, filename=str(tool_agent))
    func_node: ast.FunctionDef | None = None
    for node in module.body:
        if isinstance(node, ast.FunctionDef) and node.name == "_chat":
            func_node = node
            break
    if func_node is None:
        raise ValueError(f"_chat not found in {tool_agent}")

    namespace: dict[str, Any] = {"sys": sys}
    exec(compile(ast.Module(body=[func_node], type_ignores=[]), str(tool_agent), "exec"), namespace)
    extracted = namespace["_chat"]

    def bound(role: str, text: str, stream: Any) -> None:
        stdout = sys.stdout
        sys.stdout = stream
        try:
            extracted(role, text)
        finally:
            sys.stdout = stdout

    return bound


def diagnose() -> dict[str, Any]:
    return {
        "id": "dronehive-unicode-ci",
        "repo": "github.com/yuro1991-afk/dronehive",
        "prs": [1, 2],
        "crash": "UnicodeEncodeError printing \\u2713 via _chat on windows-latest cp1252",
        "file": "drone/pro/tool_agent.py",
        "patch": "patches/dronehive-pro-chat-cp1252.patch",
        "push": "blocked — this token cannot write yuro1991-afk/dronehive",
        "apply": "npm run autofix -- apply /path/to/dronehive",
    }


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--mode", choices=MODES, default="patched")
    parser.add_argument("--tree", type=Path, default=None)
    parser.add_argument("--json", action="store_true")
    args = parser.parse_args(argv)

    if args.tree is not None:
        args.mode = "tree"

    match args.mode:
        case "unpatched":
            result = run_chat(unpatched_chat, cp1252_stream())
            result["mode"] = "unpatched"
            ok = result["raised"]
        case "patched":
            result = run_chat(patched_chat, cp1252_stream())
            result["mode"] = "patched"
            ok = not result["raised"]
        case "tree":
            if args.tree is None:
                raise SystemExit("--tree is required for mode=tree")
            tool_agent = args.tree / "drone" / "pro" / "tool_agent.py"
            result = run_chat(extract_chat(tool_agent), cp1252_stream())
            result["mode"] = "tree"
            result["file"] = str(tool_agent)
            ok = not result["raised"]
        case _ as unseen:
            raise SystemExit(f"unhandled reproduce mode: {unseen}")

    if args.json:
        print(json.dumps(result, indent=2))
    else:
        print(json.dumps(result))

    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
