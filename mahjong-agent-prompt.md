# Mahjong Assistant — Project Agent Prompt

You are a development agent for a Progressive Web App (PWA) Mahjong assistant tool. The app helps American Mahjong (NMJL) players track their hand, analyze odds, and receive discard recommendations during live play.

---

## Project Context

- **Type:** Progressive Web App — installable, offline capable, no dependencies, no build step
- **Repo:** TBD (private or public — card data never committed, see Copyright section)
- **Stack:** Vanilla JS, HTML5 Canvas where needed, CSS custom properties
- **Target devices:** Laptop (primary) and phone (secondary — PWA installed to home screen)
- **Players:** Currently 2-player, designed to scale to 3-4

---

## Copyright — Critical

The NMJL card is copyrighted material. The card data files (`cards/`) are **never committed to the repository**.

- `cards/` is in `.gitignore` from day one
- The app engine, UI, and logic are original code — safe to publish
- Card data is encoded locally from a physical card and stays on the developer's machine
- Do not reproduce full hand listings from online sources in code or comments

---

## Game Rules Context

**American Mahjong (NMJL rules):**

- 152 tiles: Bamboo 1-9 (×4), Crak 1-9 (×4), Dot 1-9 (×4), Winds E/S/W/N (×4 each), Dragons R/G/W (×4 each), Flowers 1-4 (×1 each), Jokers (×8)
- Winning hands defined by the annual NMJL card (~71 printed hands, ~1000 playable variations)
- Jokers substitute for any tile in pungs/kongs/quints but NOT in pairs or single tiles
- Jokers can be stolen from exposed melds
- Charleston (tile passing) only applies to 3-4 player games
- 2-player games: no Charleston

**Card structure (2025 NMJL — current working version):**

- 9 sections: 2025, 2468, Any Like Numbers, Quints, Consecutive Run, 13579, Winds & Dragons, 369, Singles & Pairs
- 71 printed hands, ~1002 playable variations when suit/number variables are expanded

---

## Architecture

```
mahjong/
├── index.html              # PWA entry point
├── manifest.json           # PWA manifest (icon, name, theme color)
├── service-worker.js       # Offline caching
│
├── css/
│   ├── base.css            # Reset, CSS variables, dark theme
│   ├── tiles.css           # Tile display styles
│   └── app.css             # Layout, screens, components
│
├── js/
│   ├── tiles.js            # Master TILES dictionary + TOTAL_TILES count
│   ├── app.js              # App init, screen routing, settings state
│   ├── game-state.js       # Hand, dead tiles, wall count, opponents
│   ├── engine/
│   │   ├── matcher.js      # Hand pattern matching against card
│   │   ├── search.js       # BFS tenpai distance calculation
│   │   ├── odds.js         # Monte Carlo win probability
│   │   └── advisor.js      # Discard recommendation, decision theory
│   └── ui/
│       ├── tile-input.js   # Tile palette, hand display, tile selection
│       ├── dead-tiles.js   # Opponent discard tracking UI
│       └── results.js      # Analysis results display
│
└── cards/                  # GITIGNORED — never committed
    ├── card-schema.js      # Pattern language definition + validator
    ├── 2025.js             # 2025 NMJL card data
    └── 2026.js             # 2026 NMJL card data (when available)
```

---

## Data Model

### Tile String Codes

```javascript
// Suits
"1b" - "9b"; // Bamboo
"1c" - "9c"; // Crak
"1d" - "9d"; // Dot

// Honors
("Ew", "Sw", "Ww", "Nw"); // Winds
("Rd", "Gd", "Wd"); // Dragons (Red, Green, White)

// Specials
"F1" - "F4"; // Flowers
("JK"); // Joker
```

### Master Tile Dictionary (tiles.js)

```javascript
const TILES = {
  "1b": { suit: "bamboo", value: 1, display: "1 Bam", count: 4 },
  Ew: { suit: "wind", value: "E", display: "East", count: 4 },
  Rd: { suit: "dragon", value: "R", display: "Red", count: 4 },
  F1: { suit: "flower", value: 1, display: "Flower 1", count: 1 },
  JK: { suit: "joker", value: null, display: "Joker", count: 8 },
  //... all 152 tiles
};
```

### Game State Shape

```javascript
{
  settings: {
    playerCount: 2,         // 2 | 3 | 4
    charleston: false,      // auto-false when playerCount === 2
    trackOpponents: true,
    cardYear: "2025",
    displayMode: "tiles",   // "tiles" | "text"
  },
  hand: {
    tiles: [],              // ["1b","1b","Ew",...] — 13 or 14 tiles
    exposed: [],            // [{ tiles:["1b","1b","1b"], type:"pung" }]
  },
  deadTiles: {},            // { "1b": 2, "Ew": 3 } — count of dead copies
  wallCount: 136,           // decrements each draw
  opponents: [
    {
      id: 1,
      position: "left",     // "left" | "across" | "right"
      discards: [],         // tile strings in discard order
      exposed: [],          // called melds
    }
  ],
  charleston: {
    round: 0,               // 0-2
    direction: "right",     // right → across → left
    tilesSelected: [],
  },
  analysis: null,           // populated by advisor.js after each tile event
}
```

### Card Hand Pattern Shape

```javascript
{
  id: "2468-1",
  display: "FF 2468 2468 2468",   // as printed on card
  concealed: false,
  jokerAllowed: true,
  value: 25,                       // point value
  groups: [
    { type: "pair",  suit: "flower", value: "any"   },
    { type: "pung",  suit: "var:s1", value: "even"  },
    { type: "pung",  suit: "var:s1", value: "even"  },
    { type: "pung",  suit: "var:s1", value: "even"  },
  ]
}
```

### Pattern Variable System

```javascript
// Suit variables
"var:s1"; // any suit — bind on first use, same suit required after
"var:s2"; // second independent suit variable
"any"; // truly any, no binding

// Value variables
"var:n1"; // any number 1-9, bind on first use
"var:n1+1"; // one more than n1
"var:n1+2"; // two more than n1
"even"; // any even number (2,4,6,8)
"odd"; // any odd number (1,3,5,7,9)
"any"; // any value

// Group types
"pair"; // 2 of a kind
"pung"; // 3 of a kind
"kong"; // 4 of a kind
"quint"; // 5 of a kind (requires joker)
"single"; // 1 tile

// Special suit values
"flower"; // flower tiles only
"wind"; // any wind
"dragon"; // any dragon
"joker"; // joker only
```

---

## AI / Engine Architecture

The analysis engine uses layered AI techniques:

```
Layer 1 — Rule-Based Expert System (matcher.js)
  Hand matching, legal move validation, card encoding
  Deterministic, 100% accurate

Layer 2 — BFS Graph Search (search.js)
  Tenpai distance — how many tiles away from each hand
  Treats hand as state, winning hand as goal state

Layer 3 — Monte Carlo Simulation (odds.js)
  Win probability accounting for dead tiles, wall count, opponents
  10,000 iterations, runs in ~5ms

Layer 4 — Decision Theory / Utility Maximization (advisor.js)
  Discard recommendation based on expected value
  Combines layers 1-3 into actionable advice

Layer 5 — LLM (future)
  Natural language explanation of recommendations via API call
```

---

## Settings Screen

Configured before each game:

```
Players        [ 2 ] [ 3 ] [ 4 ]
Charleston     [ Off ] [ On ]      ← auto-off for 2 players
Track opponents[ Off ] [ On ]
Card year      [ 2025 ▼ ]
Display        [ Tiles ] [ Text ]
```

---

## Build Conventions

### Environment

- **Terminal:** zsh (macOS)
- **No build step** — files served directly by browser or local Python server
- **No dependencies** — vanilla JS only

### Workflow

- Use `audit.txt` for all file inspection: `: > audit.txt && command >> audit.txt`
- All code changes via `python3` string replacement scripts
- Verify every change with grep/sed audit before moving on
- One logical change at a time

### Audit Convention

```zsh
: > audit.txt
grep -n "pattern" js/file.js >> audit.txt
sed -n '100,150p' js/file.js >> audit.txt
```

### Local Server

```zsh
python3 -m http.server 8000
# open http://localhost:8000

# Kill and restart
pkill -f "python.*http" && python3 -m http.server 8000
```

---

## PWA Requirements

- `manifest.json` with name, icons, theme color, display standalone
- `service-worker.js` caching all app shell files for offline use
- `<meta name="viewport">` for mobile
- Touch-friendly tile input (minimum 44px tap targets)
- Responsive layout — laptop and phone both first-class

---

## Current Status

**Not started.** Next step is project scaffold:

1. Folder structure
2. `index.html`
3. `manifest.json`
4. `service-worker.js` stub
5. `js/tiles.js` — complete master tile dictionary
6. Settings screen UI

---

## Future Features (Out of Scope for v1)

- Multi-game scoring tracker
- LLM natural language advice layer
- Opponent hand inference (Bayesian)
- Reinforcement learning discard agent
- 2026+ card support (drop-in via cards/ folder)
