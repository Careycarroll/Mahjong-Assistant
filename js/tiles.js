// =============================================================
// MASTER TILE DICTIONARY
// All possible tiles across all NMJL set configurations.
// Total encoded: 156 (152 active per game based on flower setting)
//
// Tile code format:
//   Suits:   "1b"-"9b" (bamboo), "1c"-"9c" (crak), "1d"-"9d" (dot)
//   Winds:   "Ew","Sw","Ww","Nw"
//   Dragons: "Rd" (red), "Gd" (green), "Wd" (white/soap)
//   Flowers: "F1"-"F8"
//   Seasons: "S1"-"S4" (alternate sets only)
//   Joker:   "JK"
//
// count: number of copies in a standard set
// category: logical grouping for hand matching
// suit: used by pattern matcher (bamboo | crak | dot | wind | dragon | flower | joker)
// value: numeric or string value for pattern variable resolution
// display: human-readable label
// =============================================================

const TILES = {

  // ── BAMBOO (36 tiles) ──────────────────────────────────────
  "1b": { suit: "bamboo", value: 1, display: "1 Bam",   count: 4 },
  "2b": { suit: "bamboo", value: 2, display: "2 Bam",   count: 4 },
  "3b": { suit: "bamboo", value: 3, display: "3 Bam",   count: 4 },
  "4b": { suit: "bamboo", value: 4, display: "4 Bam",   count: 4 },
  "5b": { suit: "bamboo", value: 5, display: "5 Bam",   count: 4 },
  "6b": { suit: "bamboo", value: 6, display: "6 Bam",   count: 4 },
  "7b": { suit: "bamboo", value: 7, display: "7 Bam",   count: 4 },
  "8b": { suit: "bamboo", value: 8, display: "8 Bam",   count: 4 },
  "9b": { suit: "bamboo", value: 9, display: "9 Bam",   count: 4 },

  // ── CRAK (36 tiles) ───────────────────────────────────────
  "1c": { suit: "crak",   value: 1, display: "1 Crak",  count: 4 },
  "2c": { suit: "crak",   value: 2, display: "2 Crak",  count: 4 },
  "3c": { suit: "crak",   value: 3, display: "3 Crak",  count: 4 },
  "4c": { suit: "crak",   value: 4, display: "4 Crak",  count: 4 },
  "5c": { suit: "crak",   value: 5, display: "5 Crak",  count: 4 },
  "6c": { suit: "crak",   value: 6, display: "6 Crak",  count: 4 },
  "7c": { suit: "crak",   value: 7, display: "7 Crak",  count: 4 },
  "8c": { suit: "crak",   value: 8, display: "8 Crak",  count: 4 },
  "9c": { suit: "crak",   value: 9, display: "9 Crak",  count: 4 },

  // ── DOT (36 tiles) ────────────────────────────────────────
  "1d": { suit: "dot",    value: 1, display: "1 Dot",   count: 4 },
  "2d": { suit: "dot",    value: 2, display: "2 Dot",   count: 4 },
  "3d": { suit: "dot",    value: 3, display: "3 Dot",   count: 4 },
  "4d": { suit: "dot",    value: 4, display: "4 Dot",   count: 4 },
  "5d": { suit: "dot",    value: 5, display: "5 Dot",   count: 4 },
  "6d": { suit: "dot",    value: 6, display: "6 Dot",   count: 4 },
  "7d": { suit: "dot",    value: 7, display: "7 Dot",   count: 4 },
  "8d": { suit: "dot",    value: 8, display: "8 Dot",   count: 4 },
  "9d": { suit: "dot",    value: 9, display: "9 Dot",   count: 4 },

  // ── WINDS (16 tiles) ──────────────────────────────────────
  "Ew": { suit: "wind",   value: "E", display: "East",  count: 4 },
  "Sw": { suit: "wind",   value: "S", display: "South", count: 4 },
  "Ww": { suit: "wind",   value: "W", display: "West",  count: 4 },
  "Nw": { suit: "wind",   value: "N", display: "North", count: 4 },

  // ── DRAGONS (12 tiles) ────────────────────────────────────
  "Rd": { suit: "dragon", value: "R", display: "Red",   count: 4 },
  "Gd": { suit: "dragon", value: "G", display: "Green", count: 4 },
  "Wd": { suit: "dragon", value: "W", display: "White", count: 4 },

  // ── FLOWERS (8 tiles — standard 8-flower sets) ────────────
  // When flowerSet === "8flowers", F1-F8 are all active
  // When flowerSet === "seasons",  F1-F4 are active (F5-F8 inactive)
  "F1": { suit: "flower", value: 1, display: "Flower 1", count: 1 },
  "F2": { suit: "flower", value: 2, display: "Flower 2", count: 1 },
  "F3": { suit: "flower", value: 3, display: "Flower 3", count: 1 },
  "F4": { suit: "flower", value: 4, display: "Flower 4", count: 1 },
  "F5": { suit: "flower", value: 5, display: "Flower 5", count: 1 },
  "F6": { suit: "flower", value: 6, display: "Flower 6", count: 1 },
  "F7": { suit: "flower", value: 7, display: "Flower 7", count: 1 },
  "F8": { suit: "flower", value: 8, display: "Flower 8", count: 1 },

  // ── SEASONS (4 tiles — alternate sets only) ───────────────
  // Only active when flowerSet === "seasons"
  // Functionally identical to flowers for hand matching purposes
  "S1": { suit: "flower", value: "S1", display: "Spring", count: 1 },
  "S2": { suit: "flower", value: "S2", display: "Summer", count: 1 },
  "S3": { suit: "flower", value: "S3", display: "Autumn", count: 1 },
  "S4": { suit: "flower", value: "S4", display: "Winter", count: 1 },

  // ── JOKERS (8 tiles) ──────────────────────────────────────
  // Can substitute for any tile in pung/kong/quint
  // Cannot substitute in pairs or single tiles
  "JK": { suit: "joker",  value: null, display: "Joker",  count: 8 },
};

// =============================================================
// ACTIVE TILE RESOLVER
// Returns the set of tile codes active for a given game config.
// flowerSet: "8flowers" | "seasons"
// =============================================================
function getActiveTiles(flowerSet = "8flowers") {
  const inactive = flowerSet === "seasons"
    ? new Set(["F5", "F6", "F7", "F8"])
    : new Set(["S1", "S2", "S3", "S4"]);

  return Object.fromEntries(
    Object.entries(TILES).filter(([code]) => !inactive.has(code))
  );
}

// =============================================================
// TILE COUNT VALIDATOR
// Verifies total tile count matches expected 152 for a config.
// =============================================================
function validateTileCount(flowerSet = "8flowers") {
  const active = getActiveTiles(flowerSet);
  const total = Object.values(active).reduce((sum, t) => sum + t.count, 0);
  console.assert(total === 152, `Expected 152 tiles, got ${total}`);
  return total;
}

// =============================================================
// LOOKUP HELPERS
// =============================================================

// Get full tile object from code
function getTile(code) {
  return TILES[code] ?? null;
}

// Get all codes for a given suit
function getTilesBySuit(suit, flowerSet = "8flowers") {
  const active = getActiveTiles(flowerSet);
  return Object.entries(active).filter(([, t]) => t.suit === suit).map(([code]) => code);
}

// Get all numeric suit tiles (bamboo, crak, dot) sorted by value
function getNumberTiles(suit) {
  return Object.entries(TILES).filter(([, t]) => t.suit === suit && typeof t.value === "number").sort(([, a], [, b]) => a.value - b.value).map(([code]) => code);
}

// Check if a tile code is a joker
function isJoker(code) {
  return code === "JK";
}

// Check if a tile can substitute via joker rules
// Jokers can sub in pungs/kongs/quints but NOT pairs or singles
function jokerCanSub(groupType) {
  return ["pung", "kong", "quint"].includes(groupType);
}
