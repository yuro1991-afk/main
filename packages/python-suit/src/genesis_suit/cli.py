from __future__ import annotations

import argparse
import json
import sys

from genesis_infra.contract import PONG_UDP

from .dress import dress, roster, run_intent
from .serve import DEFAULT_PORT, assert_bindable, make_server


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(prog="genesis-suit")
    sub = parser.add_subparsers(dest="command", required=True)
    sub.add_parser("roster")
    run = sub.add_parser("run")
    run.add_argument("intent")
    sub.add_parser("demo")
    serve = sub.add_parser("serve")
    serve.add_argument("--host", default="127.0.0.1")
    serve.add_argument("--port", type=int, default=DEFAULT_PORT)
    args = parser.parse_args(argv)
    if args.command == "roster":
        payload = roster()
    elif args.command == "run":
        payload = run_intent(args.intent)
    elif args.command == "demo":
        payload = {"wearer": dress("genesis"), "roster": roster(), "bindsUdp": []}
    elif args.command == "serve":
        try:
            assert_bindable(args.port)
        except ValueError as error:
            sys.stderr.write(f"{error}\n")
            return 2
        server = make_server(host=args.host, port=args.port)
        sys.stdout.write(f"genesis-suit {args.host}:{args.port} /\n")
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            return 0
        finally:
            server.server_close()
        return 0
    else:
        return 2
    if isinstance(payload, dict) and PONG_UDP in payload.get("bindsUdp", []):
        sys.stderr.write("suit never binds UDP 2419\n")
        return 2
    sys.stdout.write(f"{json.dumps(payload, indent=2)}\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
