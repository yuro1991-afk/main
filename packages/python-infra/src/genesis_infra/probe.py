from __future__ import annotations

import json
import urllib.error
import urllib.request
from typing import Any

from .contract import GOOSE_PC_CORE, SUPERBRAIN_HEALTH, SUPERBRAIN_LIVE


DEFAULT_TIMEOUT_S = 2.5


def probe_lane(url: str, *, timeout_s: float = DEFAULT_TIMEOUT_S, opener=None) -> dict[str, Any]:
    """Failed probes are unreachable. Timeouts never become live."""
    open_url = opener if opener is not None else urllib.request.urlopen
    try:
        with open_url(url, timeout=timeout_s) as response:
            status_code = getattr(response, "status", None) or response.getcode()
            if 200 <= int(status_code) < 300:
                return {
                    "url": url,
                    "status": "live",
                    "statusCode": int(status_code),
                    "error": None,
                }
            return {
                "url": url,
                "status": "unreachable",
                "statusCode": int(status_code),
                "error": f"HTTP {status_code}",
            }
    except TimeoutError:
        return {"url": url, "status": "unreachable", "statusCode": None, "error": "timeout"}
    except urllib.error.HTTPError as error:
        return {
            "url": url,
            "status": "unreachable",
            "statusCode": error.code,
            "error": f"HTTP {error.code}",
        }
    except Exception as error:
        detail = str(error) or error.__class__.__name__
        if "timed out" in detail.lower() or "timeout" in detail.lower():
            detail = "timeout"
        return {"url": url, "status": "unreachable", "statusCode": None, "error": detail}


def probe_known_lanes(*, timeout_s: float = DEFAULT_TIMEOUT_S, opener=None) -> list[dict[str, Any]]:
    return [
        {"id": "boss-superbrain-health", **probe_lane(SUPERBRAIN_HEALTH, timeout_s=timeout_s, opener=opener)},
        {"id": "boss-superbrain-live", **probe_lane(SUPERBRAIN_LIVE, timeout_s=timeout_s, opener=opener)},
        {"id": "goose-pc-core", **probe_lane(GOOSE_PC_CORE, timeout_s=timeout_s, opener=opener)},
    ]


def assert_not_false_live(lane: dict[str, Any]) -> dict[str, Any]:
    if lane.get("error") in {"timeout", "fetch failed"} and lane.get("status") == "live":
        raise ValueError("timeout or fetch-failed probes stay unreachable, never live")
    return lane


def dumps(payload: dict[str, Any]) -> str:
    return json.dumps(payload, indent=2, sort_keys=True)
