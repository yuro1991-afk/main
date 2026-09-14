CONTRACT = "genesis.python-infra.v1"

SUPERBRAIN_HEALTH = "http://169.254.124.8:45001/health"
SUPERBRAIN_LIVE = "http://169.254.124.8:45001/live"
GOOSE_PC_CORE = "http://127.0.0.1:8791/health"

# UDP pong/notify only. This process never binds it.
PONG_UDP = 2419

RESERVED_PORTS = {
    "infra": 8800,
    "glasses": 8765,
    "inventory": 8787,
    "sandbox": 8788,
    "cpu_bridge": 8789,
    "lattice": 8790,
    "unifier": 8792,
    "world_pm": 8793,
    "host": 8794,
    "python_hub": 8801,
}

HUB_HEADS = (
    {"id": "genesis", "title": "Genesis", "lane": "Origin"},
    {"id": "sentinel", "title": "Sentinel", "lane": "Wire"},
    {"id": "mnemosyne", "title": "Mnemosyne", "lane": "Keep"},
    {"id": "forge", "title": "Forge", "lane": "Iron"},
    {"id": "atlas", "title": "Atlas", "lane": "Chart"},
    {"id": "lumen", "title": "Lumen", "lane": "Lens"},
)
