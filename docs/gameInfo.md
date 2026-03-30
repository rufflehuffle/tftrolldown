# Game Info

All game data lives in `js/tables.js`. See `js/CLAUDE.md` → "tables.js Reference" for the schema, line ranges, and read guidance.

For Set 17 champion and trait data (names, costs, traits, abilities, breakpoints, Stargazer constellations), see [`set17_data.md`](set17_data.md).

---

## Champion Roles

Every champion has a `role` property (string). There are six roles:

| Role | Line | Description |
|------|------|-------------|
| **Tank** | Frontline | Soaks damage; scored by EHP (Effective HP) |
| **Fighter** | Frontline | Melee damage dealer |
| **Assassin** | Frontline | Melee burst damage |
| **Caster** | Backline | Magic ranged damage |
| **Marksman** | Backline | Physical ranged damage |
| **Specialist** | Backline | Utility / unique mechanics |

Each champion also has a `damageType` (`'Magic'`, `'Attack'`, or `'Hybrid'`) which is independent of role.

### Colloquial Terms

The codebase and TFT community use shorthand terms that map to roles:

| Term | Meaning | Roles | Code identifier |
|------|---------|-------|-----------------|
| **carry** | Primary damage dealer; the unit your comp is built around | Any non-Tank (Fighter, Assassin, Caster, Marksman, Specialist) | `role !== 'Tank'` — used in `helper.js:findStrongestCarry`, `carry-tank.js`, `teams.js` |
| **ranged carry** | Carry that fights from the backline | Caster, Marksman, Specialist | `RANGED_ROLES` / `BACKLINE_ROLES` |
| **melee carry** | Carry that fights in the frontline | Fighter, Assassin | `MELEE_CARRY_ROLES` |
| **tank** | Frontline unit whose job is to absorb damage, not deal it | Tank | `TANK_CLASS` / `isTank()` |
| **frontline** | All units positioned in rows A–B | Tank, Fighter, Assassin | `FRONTLINE_ROLES` |
| **backline** | All units positioned in rows C–D | Caster, Marksman, Specialist | `BACKLINE_ROLES` |

Key nuances:
- **"Carry" is contextual.** `findStrongestCarry` returns the highest-DPS non-Tank unit, but "main carry" (`getMainCarryAndTank`) specifically prefers a 4-cost non-Tank that matches the comp's traits and damage type.
- **Fighter ≠ Tank.** Fighters are frontline but scored by DPS, not EHP. In code, Fighters are "melee carries" — they deal damage while standing in the front row.
- **Assassin = melee carry.** Despite the name suggesting a unique playstyle, the codebase treats Assassins identically to Fighters for positioning and scoring purposes (both are `MELEE_CARRY_ROLES`).
- **Specialist is a backline wildcard.** Only Twisted Fate (2-cost) and Jinx (3-cost) have this role. They're grouped with ranged units for positioning.
- **2-range units blur the line.** Graves, Gwen, Fiddlesticks, and Bel'Veth have frontline roles (Fighter/Assassin) but are positioned at B-corners (B1/B7) instead of A-row due to their shorter attack range.

### Role Classifications

Defined in `js/board-generation/constants.js`:

```js
TANK_CLASS      = new Set(['Tank']);
FRONTLINE_ROLES = new Set(['Tank', 'Fighter', 'Assassin']);
BACKLINE_ROLES  = new Set(['Caster', 'Marksman', 'Specialist']);
```

The grading module (`js/grading/positioning.js`) uses its own equivalent sets:

```js
RANGED_ROLES      = new Set(['Marksman', 'Caster', 'Specialist']);
MELEE_CARRY_ROLES = new Set(['Fighter', 'Assassin']);
TANK_ROLES_POS    = new Set(['Tank']);
```

### How Roles Are Used

**Board Strength (`js/board-strength.js`)**
- `isTank(name)` checks `pool[name]?.role === 'Tank'`.
- **Tanks** contribute EHP to the board score; **non-tanks** contribute DPS.
- Scoring tracks `strongest_tank`, `strongest_carry`, and `second_strongest_carry` separately.

**Board Generation (`js/board-generation/`)**
- **`carry-tank.js`** — `getMainCarryAndTank` picks the main carry (highest-DPS non-Tank) and main tank (highest-EHP Tank-role unit) from the planned comp. Prefers 4-cost units.
- **`generator.js`** — secondary buy targets include any `FRONTLINE_ROLES` unit, broadening the frontline pool.
- **`positioning.js`** — places units on the hex grid by role:
  - Tanks and Fighters/Assassins → A-row (frontline).
  - Casters, Marksmen, Specialists → D-row (backline).
  - 2-range exceptions (`TWO_RANGE_UNITS`: Graves, Gwen, Fiddlesticks, Bel'Veth) → B1/B7 corners instead of A-row.

**Grading (`js/grading/`)**
- **`positioning.js`** — penalises melee carries (Fighter/Assassin) placed in the backline (D-row) and ranged units (Caster/Marksman/Specialist) not in the backline.
- **`discipline.js`** — weights Tank-role units at 8x and carries at 5x for strength assessment.
- **`flexibility.js`** — identifies alternate tanks by checking `pool[name]?.role === 'Tank'` and evaluating trait synergy.
- **`helper.js`** — `findStrongestCarry` skips Tanks; `findStrongestTank` only considers Tanks.

**Team Planner (`js/teams.js`)**
- Carry selection filters out Tanks: `names.filter(c => c.role !== 'Tank')`.

**UI Display (`js/planner.js`)**
- The planner modal shows each champion's role alongside damage type:
  ```js
  panelRole.textContent = `${champ.damageType} ${champ.role}`;
  ```
- Styled via `.unit-info__role` in `style/planner.css`.

---

## Shop Odds

Probability of each cost tier appearing per shop slot, by player level:

| Level | 1-cost | 2-cost | 3-cost | 4-cost | 5-cost |
|-------|--------|--------|--------|--------|--------|
| 2 | 100% | 0% | 0% | 0% | 0% |
| 3 | 75% | 25% | 0% | 0% | 0% |
| 4 | 55% | 30% | 15% | 0% | 0% |
| 5 | 45% | 33% | 20% | 2% | 0% |
| 6 | 30% | 40% | 25% | 5% | 0% |
| 7 | 16% | 30% | 43% | 10% | 1% |
| 8 | 15% | 20% | 32% | 30% | 3% |
| 9 | 10% | 17% | 25% | 33% | 15% |
| 10 | 5% | 10% | 20% | 40% | 25% |

---

## XP to Level

| Current Level | XP to Next Level |
|---------------|-----------------|
| 2 | 2 |
| 3 | 6 |
| 4 | 10 |
| 5 | 20 |
| 6 | 36 |
| 7 | 60 |
| 8 | 68 |
| 9 | 68 |

Buying XP costs 4 gold for 4 XP.
