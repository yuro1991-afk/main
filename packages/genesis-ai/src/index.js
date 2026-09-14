export const id = "genesis-ai";
export const title = "Genesis AI";
export const contract = "genesis.ai.v1";
export const kind = "node";
export const summary = "Local-first completion. No LIVE claim without a provider probe.";

export function handshake() {
  return { protocol: contract, slice: id, version: 1 };
}

export function health() {
  return { status: "ok", slice: id, contract, provider: providerName() };
}

function providerName() {
  if (process.env.GENESIS_SANDBOX_PROVIDER) return process.env.GENESIS_SANDBOX_PROVIDER;
  if (process.env.OPENAI_API_KEY) return "openai-unprobed";
  return "local-echo";
}

export function complete(prompt) {
  const provider = providerName();
  return {
    provider,
    live: false,
    text: `[${provider}] ${prompt}`,
  };
}
