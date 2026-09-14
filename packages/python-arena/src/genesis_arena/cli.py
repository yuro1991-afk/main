from __future__ import annotations

import argparse
import json
import sys

from .contract import PONG_UDP
from .evaluate import evaluate


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(prog="genesis-arena")
    sub = parser.add_subparsers(dest="command", required=True)
    ev = sub.add_parser("evaluate", help="run one evaluation match")
    ev.add_argument("left")
    ev.add_argument("right")
    ev.add_argument("--seed", default="round-1")
    sub.add_parser("report", help="print last-style dry run for genesis vs sentinel")
    args = parser.parse_args(argv)

    if args.command == "evaluate":
        payload = evaluate(args.left, args.right, seed=args.seed)
    elif args.command == "report":
        payload = evaluate("genesis", "sentinel", seed="standup")
    else:
        return 2
    if PONG_UDP in payload["bindsUdp"]:
        sys.stderr.write("arena must never bind UDP 2419\n")
        return 2
    sys.stdout.write(f"{json.dumps(payload, indent=2)}\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
