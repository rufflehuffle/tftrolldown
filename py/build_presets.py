"""
build_presets.py — Generate default-presets.json from js/data/comps.js

Selection logic:
  1. Sort all comps by pickRate descending.
  2. Take the top 20 by pickRate, including all ties at the 20th position
     (pool may exceed 20 entries).
  3. From that pool, sort by top4 descending; break top4 ties by avgPlace
     ascending. Take the top 10 deterministically.
  4. Write those as preset objects to default-presets.json.

Preset names are generated using the same algorithm as the app's
generateTeamName: "<Most Active Trait> <Main Carry>".

Usage (from project root):
    python py/build_presets.py
"""

import json
import re
from datetime import date
from pathlib import Path

import json5

ROOT      = Path(__file__).parent.parent
COMPS_JS  = ROOT / "js" / "data" / "comps.js"
POOL_JS   = ROOT / "js" / "data" / "pool.js"
TRAITS_JS = ROOT / "js" / "data" / "traits.js"
OUTPUT    = ROOT / "default-presets.json"

ARCHETYPE_MAP = {
    "Lv. 5":    "lv5",
    "Lv. 6":    "lv6",
    "Lv. 7":    "lv7",
    "Fast 8":   "fast8",
    "Fast 9":   "fast9",
    "Standard": "fast8",
}

# MetaTFT internal unit names → our pool names.
UNIT_NAME_MAP = {
    "AurelionSol": "Aurelion'Sol",
    "Belveth":     "Bel'Veth",
    "Chogath":     "Cho'Gath",
    "Galio":       "The Mighty Mech",
    "IvernMinion": "Meepsie",
    "Kaisa":       "Kai'Sa",
    "Leblanc":     "LeBlanc",
    "MasterYi":    "Master Yi",
    "MissFortune": "Miss Fortune",
    "Reksai":      "Rek'Sai",
    "TahmKench":   "Tahm Kench",
    "TwistedFate": "Twisted Fate",
}

# MetaTFT names with no pool equivalent — silently dropped.
UNITS_TO_DROP = {"Summon"}

TANK_ROLES = {"Tank"}


# ---------------------------------------------------------------------------
# Data loading
# ---------------------------------------------------------------------------

def _parse_js_export(path, var_name):
    """Strip 'export const <var_name> = ...' wrapper and parse with json5."""
    text = path.read_text(encoding="utf-8")
    match = re.search(rf"export const {re.escape(var_name)}\s*=\s*", text)
    if not match:
        raise ValueError(f"Could not find 'export const {var_name}' in {path}")
    return json5.loads(text[match.end():].rstrip().rstrip(";"))


def load_comps():  return _parse_js_export(COMPS_JS,  "comps")
def load_pool():   return _parse_js_export(POOL_JS,   "pool")
def load_traits(): return _parse_js_export(TRAITS_JS, "traits")


# ---------------------------------------------------------------------------
# Unit name normalisation
# ---------------------------------------------------------------------------

def normalize_units(units):
    result = []
    for u in units:
        if u in UNITS_TO_DROP:
            continue
        result.append(UNIT_NAME_MAP.get(u, u))
    return result


# ---------------------------------------------------------------------------
# Team name generation (mirrors js/teams.js generateTeamName)
# ---------------------------------------------------------------------------

def build_trait_counts(names, pool):
    counts = {}
    for name in names:
        for trait in (pool.get(name) or {}).get("synergies", []):
            counts[trait] = counts.get(trait, 0) + 1
    return counts


def is_trait_active(trait, count, traits):
    return any(count >= b for b in (traits.get(trait) or {}).get("breakpoints", []))


def local_active_count(champ, trait_counts, traits):
    return sum(
        1 for t in champ.get("synergies", [])
        if is_trait_active(t, trait_counts.get(t, 0), traits)
    )


def is2cost_reroll(names, pool, traits):
    two_costs = [n for n in names if (pool.get(n) or {}).get("cost") == 2]
    if len(two_costs) < 3:
        return False
    trait_counts = build_trait_counts(names, pool)
    fully_saturated = sum(
        1 for n in two_costs
        if (pool.get(n) or {}).get("synergies")
        and all(is_trait_active(t, trait_counts.get(t, 0), traits)
                for t in pool[n]["synergies"])
    )
    return fully_saturated >= 2


def get_reroll_carry(names, pool, traits, cost):
    """Main carry for a reroll comp at the given cost tier. Alphabetical tiebreak (deterministic)."""
    trait_counts = build_trait_counts(names, pool)
    carries = [
        pool[n] for n in names
        if n in pool and pool[n].get("cost") == cost and pool[n].get("role") not in TANK_ROLES
    ]
    carries.sort(key=lambda c: (-local_active_count(c, trait_counts, traits), c["name"]))
    return carries[0] if carries else None


REROLL_COST = {"lv5": 1, "lv6": 2, "lv7": 3}


def generate_team_name(units, pool, traits, archetype=None):
    """Replicate generateTeamName: '<Best Trait> <Main Carry>'.

    archetype: one of ARCHETYPE_MAP values (lv5/lv6/lv7/fast8/fast9), or None.
    When provided, carry selection uses the archetype's cost tier directly
    instead of running the reroll heuristics.
    """
    names = [u for u in units if u in pool]
    if not names:
        return "New Team"

    trait_counts = build_trait_counts(names, pool)

    # Best trait: active > count > alphabetical
    best_trait, best_count, best_active = None, 0, False
    for trait, count in trait_counts.items():
        active = is_trait_active(trait, count, traits)
        if (
            best_trait is None
            or (active and not best_active)
            or (active == best_active and count > best_count)
            or (active == best_active and count == best_count and trait < best_trait)
        ):
            best_trait, best_count, best_active = trait, count, active

    # Main carry — use archetype to pick cost tier for reroll archetypes;
    # fall back to 4-cost preference for fast8/fast9.
    if archetype in REROLL_COST:
        carry = get_reroll_carry(names, pool, traits, REROLL_COST[archetype])
    else:
        carries = [pool[n] for n in names if pool.get(n, {}).get("role") not in TANK_ROLES]
        four_cost = [c for c in carries if c.get("cost") == 4]
        carry_pool = four_cost if four_cost else carries

        def carry_score(champ):
            s = sum(trait_counts.get(t, 0) for t in champ.get("synergies", []))
            s += sum(3 for t in champ.get("synergies", [])
                     if is_trait_active(t, trait_counts.get(t, 0), traits))
            return s

        carry = None
        for c in carry_pool:
            if carry is None or carry_score(c) > carry_score(carry) or (
                carry_score(c) == carry_score(carry) and c["name"] < carry["name"]
            ):
                carry = c

    carry_name = carry["name"] if carry else names[0]
    return f"{best_trait} {carry_name}" if best_trait else carry_name


# ---------------------------------------------------------------------------
# Comp selection
# ---------------------------------------------------------------------------

def select_comps(comps):
    by_pick = sorted(comps, key=lambda c: c["pickRate"], reverse=True)
    cutoff_pick = by_pick[min(19, len(by_pick) - 1)]["pickRate"]
    pool_comps = [c for c in by_pick if c["pickRate"] >= cutoff_pick]
    by_top4 = sorted(pool_comps, key=lambda c: (-c["top4"], c["avgPlace"]))
    return by_top4[:10]


# ---------------------------------------------------------------------------
# Preset construction
# ---------------------------------------------------------------------------

def make_preset(comp, preset_id, pool, traits):
    units = normalize_units(comp["units"])
    archetype = ARCHETYPE_MAP.get(comp["archetype"], "fast8")
    return {
        "id": preset_id,
        "name": generate_team_name(units, pool, traits, archetype),
        "nameIsAuto": True,
        "isDefault": True,
        "date_accessed": date.today().isoformat(),
        "level": 0,
        "gold": 0,
        "board": {},
        "bench": [],
        "teamPlan": units,
        "targetTeam": [],
        "autoGenerateTeam": True,
        "generationOverride": ARCHETYPE_MAP.get(comp["archetype"], None),
        "unlocks": [],
    }


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def main():
    comps  = load_comps()
    pool   = load_pool()
    traits = load_traits()
    print(f"Loaded {len(comps)} comps, {len(pool)} champions, {len(traits)} traits")

    selected = select_comps(comps)
    print(f"\nSelected {len(selected)} presets:")
    for i, c in enumerate(selected, 1):
        units    = normalize_units(c["units"])
        override = ARCHETYPE_MAP.get(c["archetype"], "fast8")
        name     = generate_team_name(units, pool, traits, override)
        print(f"  {i:2}. {name:<40}  pick={c['pickRate']:.2f}%  top4={c['top4']:.1f}%  override={override}")

    presets = [make_preset(c, i, pool, traits) for i, c in enumerate(selected, 1)]
    OUTPUT.write_text(json.dumps(presets, indent=2), encoding="utf-8")
    print(f"\nWritten -> {OUTPUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
