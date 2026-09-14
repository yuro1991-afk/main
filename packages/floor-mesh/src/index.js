export const id = "floor-mesh";
export const title = "Genesis floor mesh";
export const contract = "genesis.floor-mesh.v1";
export const kind = "node";
export const summary = "Occupancy seats for world/village slices.";

/** @type {Map<string, { occupant: string, at: string }>} */
const seats = new Map();

export function handshake() {
  return { protocol: contract, slice: id, version: 1 };
}

export function health() {
  return { status: "ok", slice: id, contract, occupied: seats.size };
}

export function occupy(seat, occupant) {
  const current = seats.get(seat);
  if (current && current.occupant !== occupant) {
    return { ok: false, seat, occupant: current.occupant };
  }
  const record = { occupant, at: new Date().toISOString() };
  seats.set(seat, record);
  return { ok: true, seat, ...record };
}

export function release(seat, occupant) {
  const current = seats.get(seat);
  if (!current || current.occupant !== occupant) {
    return { ok: false, seat };
  }
  seats.delete(seat);
  return { ok: true, seat };
}

export function listSeats() {
  return [...seats.entries()].map(([seat, record]) => ({ seat, ...record }));
}
