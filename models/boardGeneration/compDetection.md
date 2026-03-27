# Comp Detection

How the board generator identifies which comp archetype (and therefore which generation curve) to use.

**Router:** `js/board-generation/generator.js` — `generateBoard(teamPlan)`
```
if is2CostReroll  → generate32Board  (Lv.5, 100g at 3-2)
else (default)    → generate41Board  (Lv.7, 140g at 4-1)
```

---

## Fast 8 (Default / Fast 4-1)

**Detection:** Fallback — any comp that doesn't match a more specific archetype is treated as a standard Fast 4-1 comp.

**File:** `js/board-generation/generator.js` → `generate41Board`

### Carry / Tank Selection (`carry-tank.js`)

| Role | Candidates | Scoring |
|------|-----------|---------|
| **Main carry** | Prefer 4-cost non-Tanks; fall back to all non-Tanks | `traitCount + 3` bonus per active-breakpoint trait |
| **Main tank** | Prefer 4-cost Tanks; fall back to all Tanks | `traitCount` only (no breakpoint bonus) |

Ties broken randomly.

### Board Scoring

```
totalScore = plannerScore + carryTraitScore + tankTraitScore + activeTraitCount
```

- **plannerScore:** +(6 − cost) per planner unit on board, −(6 − cost) if on bench, +3 bonus for main carry / main tank on board
- **carryTraitScore:** +2 per active-breakpoint trait of the main carry (if on board)
- **tankTraitScore:** +2 per active-breakpoint trait of the main tank (if on board)
- **activeTraitCount:** +1 per distinct trait at an active breakpoint on the board

Boards where any non-planned unit has zero active traits are rejected.

---

## 2-Cost Reroll

**Detection:** `js/board-generation/detect-reroll.js` → `is2CostReroll(targetNames)`

**Heuristic — trait saturation:**
1. The comp contains **≥ 3 two-cost units**
2. Among those, **≥ 2 have full trait saturation:** every one of their synergies hits an active breakpoint in the full comp's trait counts

Both conditions must be true.

### Carry / Tank Selection (`detect-reroll.js`)

Only 2-cost units are considered. Sorted by **active trait count** (descending, ties broken randomly).

| Role | Rule |
|------|------|
| **Main carry** | 2-cost non-Tank with the most active traits |
| **Duo carry** | 2-cost non-Tank with the second-most active traits |
| **Main tank** | 2-cost Tank with the most active traits |
| **Duo tank** | Set only when tied with main tank (same active count) |

### Pre-seeding

The 3-2 generator pre-seeds the board with:
- 2 copies of the main carry
- 1 copy each of the main tank and other 2-cost units in the comp

---

## 1-Cost Reroll

> **Not yet implemented.** Needs detection heuristic.

**Detection:** TBD

### Carry / Tank Selection

TBD

---

## 3-Cost Reroll

> **Not yet implemented.** Needs detection heuristic.

**Detection:** TBD

### Carry / Tank Selection

TBD

---

## Fast 9

> **Not yet implemented.** Needs detection heuristic.

**Detection:** TBD

### Carry / Tank Selection

TBD
