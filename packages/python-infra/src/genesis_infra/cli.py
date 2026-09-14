from __future__ import annotations

import argparse
import json
import sys

from .contract import PONG_UDP, RESERVED_PORTS
from .serve import make_server
from .wire import wire


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(prog="genesis-infra")
    sub = parser.add_subparsers(dest="command", required=True)
    sub.add_parser("wire", help="print the handshake snapshot")
    serve = sub.add_parser("serve", help="serve GET /health on :8800")
    serve.add_argument("--host", default="127.0.0.1")
    serve.add_argument("--port", type=int, default=RESERVED_PORTS["infra"])
    args = parser.parse_args(argv)

    if args.command == "wire":
        sys.stdout.write(f"{json.dumps(wire(), indent=2)}\n")
        return 0
    if args.command == "serve":
        if args.port == PONG_UDP:
            sys.stderr.write("UDP 2419 is the pong wire. genesis-infra never binds it.\n")
            return 2
        server = make_server(host=args.host, port=args.port)
        sys.stdout.write(f"genesis-infra {args.host}:{args.port} /health\n")
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
