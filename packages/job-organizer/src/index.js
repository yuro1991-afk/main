export const id = "job-organizer";
export const title = "Genesis job organizer";
export const contract = "genesis.job-organizer.v1";
export const kind = "node";
export const summary = "Kanban for jobs whose mesh work is in-repo.";

/** @type {Array<{ id: string, title: string, column: string }>} */
const cards = [];

export function handshake() {
  return { protocol: contract, slice: id, version: 1 };
}

export function health() {
  return { status: "ok", slice: id, contract, cards: cards.length };
}

export function add(title, column = "todo") {
  const card = { id: `card-${cards.length + 1}`, title, column };
  cards.push(card);
  return card;
}

export function move(cardId, column) {
  const card = cards.find((item) => item.id === cardId);
  if (!card) return null;
  card.column = column;
  return card;
}

export function board() {
  return {
    todo: cards.filter((card) => card.column === "todo"),
    doing: cards.filter((card) => card.column === "doing"),
    done: cards.filter((card) => card.column === "done"),
  };
}
