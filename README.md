# 🀄 Mahjong Assistant

A Progressive Web App (PWA) that serves as an intelligent assistant during live American Mahjong (NMJL) play. Track your hand, monitor dead tiles, and receive real-time recommendations on which hand to pursue and what to discard.

Works on laptop and phone. Installable to home screen. Offline capable.

---

## Features

- **Hand tracking** — input and display your 13/14 tile hand
- **Dead tile tracking** — monitor opponent discards and called tiles
- **Hand analysis** — see which NMJL hands you're closest to completing
- **Odds calculation** — real-time win probability based on live tiles remaining
- **Discard recommendation** — AI-powered advice on what to discard and why
- **Multi-player support** — 2, 3, or 4 player games
- **Charleston support** — tile passing phase for 3-4 player games
- **Annual card support** — drop in a new card file each year, no engine changes needed

---

## Running Locally

```zsh
# Clone
git clone https://github.com/Careycarroll/Mahjong-Assistant.git
cd Mahjong-Assistant

# Serve
python3 -m http.server 8000
# open http://localhost:8000

# Kill and restart
pkill -f "python.*http" && python3 -m http.server 8000
```

No npm, no build step, no dependencies.

---

## Project Structure

```
mahjong-assistant/
├── index.html              # PWA entry point
├── manifest.json           # PWA manifest (icon, name, theme)
├── service-worker.js       # Offline caching
│
├── css/
│   ├── base.css            # Reset, CSS variables, dark theme
│   ├── tiles.css           # Tile display styles
│   └── app.css             # Layout, screens, components
│
├── js/
│   ├── tiles.js            # Master tile dictionary (156 tiles, 152 active per config)
│   ├── app.js              # App init, screen routing, settings
│   ├── game-state.js       # Hand, dead tiles, wall count, opponents
│   ├── engine/
│   │   ├── matcher.js      # Hand pattern matching against card
│   │   ├── search.js       # BFS tenpai distance calculation
│   │   ├── odds.js         # Monte Carlo win probability
│   │   └── advisor.js      # Discard recommendation, decision theory
│   └── ui/
│       ├── tile-input.js   # Tile palette and hand display
│       ├── dead-tiles.js   # Opponent discard tracking
│       └── results.js      # Analysis results display
│
└── cards/                  # ⚠️ GITIGNORED — never committed
    ├── card-schema.js      # Pattern language definition
    └── 2025.js             # 2025 NMJL card data
```

---

## Technical Notes

- **No dependencies** — vanilla JS, CSS custom properties, HTML5
- **PWA** — installable to home screen, offline capable via service worker
- **Responsive** — laptop and phone both first-class experiences
- **Annual card updates** — add a new file to `cards/` each year, select it in settings

### AI Engine Layers

| Layer           | File                | Technique                        |
| --------------- | ------------------- | -------------------------------- |
| Hand matching   | `engine/matcher.js` | Rule-based expert system         |
| Tenpai distance | `engine/search.js`  | BFS graph search                 |
| Win probability | `engine/odds.js`    | Monte Carlo simulation           |
| Discard advice  | `engine/advisor.js` | Decision theory / expected value |

---

## Copyright Notice

The NMJL card is copyrighted material. Card data files are not included in this repository and are never committed. The `cards/` directory is listed in `.gitignore`.

Users encode their own card data locally from a physical card they own.

---

## Game Settings

Configured at the start of each game:

| Setting         | Options                           |
| --------------- | --------------------------------- |
| Players         | 2 / 3 / 4                         |
| Charleston      | On / Off (auto-off for 2 players) |
| Track opponents | On / Off                          |
| Card year       | 2025 / 2026 / ...                 |
| Display mode    | Tiles / Text                      |

---

## Roadmap

### v1 — Core

- [ ] Tile input UI and hand display
- [ ] Settings screen
- [ ] Dead tile tracking
- [ ] Hand analysis (matcher + BFS)
- [ ] Win probability (Monte Carlo)
- [ ] Discard recommendations

### Future

- [ ] LLM natural language advice
- [ ] Opponent hand inference (Bayesian)
- [ ] Reinforcement learning discard agent
- [ ] 2026+ card support
