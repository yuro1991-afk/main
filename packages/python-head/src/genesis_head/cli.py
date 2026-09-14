from __future__ import annotations

import argparse
import json
import sys

from .contract import DEFAULT_PORT
from .head import AgentHead
from .serve import assert_bindable, make_server


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(prog="genesis-head")
    sub = parser.add_subparsers(dest="command", required=True)
    think = sub.add_parser("think")
    think.add_argument("input")
    sub.add_parser("parts")
    serve = sub.add_parser("serve")
    serve.add_argument("--host", default="127.0.0.1")
    serve.add_argument("--port", type=int, default=DEFAULT_PORT)
    args = parser.parse_args(argv)
    head = AgentHead.seated()
    if args.command == "think":
        thought = head.think(args.input)
        sys.stdout.write(
            f"{json.dumps({'speech': thought.speech, 'act': thought.act, 'seat': thought.seat, 'claimedLive': thought.claimed_live, 'bindsUdp': thought.binds_udp}, indent=2)}\n"
        )
        return 0
    if args.command == "parts":
        sys.stdout.write(f"{json.dumps(head.snapshot(), indent=2)}\n")
        return 0
    if args.command == "serve":
        try:
            assert_bindable(args.port)
        except ValueError as error:
            sys.stderr.write(f"{error}\n")
            return 2
        server = make_server(host=args.host, port=args.port, head=head)
        sys.stdout.write(f"genesis-head {args.host}:{args.port} /live\n")
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            return 0
        finally:
            server.server_close()
        return 0
    return 2


if __name__ == "__main__":
    raise SystemExit(main())
