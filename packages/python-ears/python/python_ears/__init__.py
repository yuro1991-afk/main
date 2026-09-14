"""Genesis Python agent ears — in-repo sibling slice."""

ID = "python-ears"
CONTRACT = "genesis.python-ears.v1"
TITLE = "Genesis Python agent ears"


def handshake() -> dict:
    return {"protocol": CONTRACT, "slice": ID, "version": 1}


def health() -> dict:
    return {"status": "ok", "slice": ID, "contract": CONTRACT}


def main() -> None:
    import json
    print(json.dumps(health()))


if __name__ == "__main__":
    main()
