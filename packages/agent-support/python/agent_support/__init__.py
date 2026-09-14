"""Genesis agent support — in-repo sibling slice."""

ID = "agent-support"
CONTRACT = "genesis.agent-support.v1"
TITLE = "Genesis agent support"


def handshake() -> dict:
    return {"protocol": CONTRACT, "slice": ID, "version": 1}


def health() -> dict:
    return {"status": "ok", "slice": ID, "contract": CONTRACT}


def main() -> None:
    import json
    print(json.dumps(health()))


if __name__ == "__main__":
    main()
