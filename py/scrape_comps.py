"""
scrape_comps.py — Scrape MetaTFT PBE comp data and write js/data/comps.js

Usage:
    python py/scrape_comps.py

Requires:
    pip install playwright
    python -m playwright install chromium

--------------------------------------------------------------------------------
API Endpoints
--------------------------------------------------------------------------------

Both endpoints are discovered by loading https://www.metatft.com/pbe-comps in a
headless browser and intercepting network requests. They require no auth.

1. comps_stats
   GET https://api-hc.metatft.com/tft-comps-api/comps_stats?queue=PBE&patch=current&days=3&permit_filter_adjustment=true

   Returns placement distribution for each cluster (comp archetype group).

   Schema:
   {
     "results": [
       {
         "cluster": "",          // empty string = totals row (all games)
         "places": [int, ...]    // index 0 = 1st place count, ..., index 7 = 8th place count
                                 // totals row has a single entry: total game-slots (players × games)
       },
       {
         "cluster": "398000",    // cluster ID string
         "places": [int, ...],   // 8 placement buckets + optional 9th (total)
         "count": int            // total instances of this comp
       },
       ...
     ],
     "updated": int,             // unix timestamp ms
     "tft_set": "TFTSet17",
     "queue_id": "1090",
     "cluster_id": int           // 398 for Set 17 PBE
   }

2. comps_data
   GET https://api-hc.metatft.com/tft-comps-api/comps_data?queue=PBE

   Returns full comp metadata: unit lists, names, levelling strategy, builds, etc.

   Schema (trimmed to fields we use):
   {
     "results": {
       "data": {
         "cluster_id": int,
         "tft_set": "TFTSet17",
         "cluster_details": {
           "398000": {
             "Cluster": "398000",
             "units_string": "TFT17_Aatrox, TFT17_Gwen, ...",   // comma-separated champion IDs
             "name": [
               { "name": "TFT17_HPTank", "type": "trait", "score": float },
               { "name": "TFT17_MissFortune", "type": "unit", "score": float }
             ],
             "overall": { "count": int, "avg": float },          // avg placement
             "levelling": "lvl 7",                               // archetype string
             "trends": [
               { "day": "ISO date", "count": int, "avg": float, "pick": float }
                                                                 // pick is a ratio (0–1)
             ]
           },
           ...
         }
       },
       "games": {
         "398000": [{ "count": int, "avg": float }],
         ...
       }
     },
     "updated": int,
     "tft_set": "TFTSet17",
     "queue_id": "1090",
     "cluster_id": int
   }

--------------------------------------------------------------------------------
Output schema (written to js/data/comps.js)
--------------------------------------------------------------------------------

export const comps = [
  {
    name:         string,   // human-readable comp label, e.g. "DarkStar / Jhin / Nunu"
    archetype:    string,   // levelling strategy, e.g. "Fast 9", "Lv. 7", "Standard"
    top4:         float,    // top-4 finish rate as a percentage, e.g. 71.8
    avgPlace:     float,    // average placement (1–8), e.g. 3.23
    pickRate:     float,    // % of games this comp appeared in, e.g. 4.96
    winRate:      float,    // 1st-place finish rate as a percentage, e.g. 30.5
    units:        string[], // champion names with TFT17_ prefix stripped
    patch:        string,   // e.g. "Set 17 PBE"
    time_accessed: string,  // ISO 8601 UTC timestamp of when the data was fetched
  },
  ...
]

Sorted by avgPlace ascending (best comps first).
"""

import asyncio
import json
import re
from datetime import datetime, timezone
from pathlib import Path

from playwright.async_api import async_playwright

OUTPUT_PATH = Path(__file__).parent.parent / "js" / "data" / "comps.js"
PAGE_URL = "https://www.metatft.com/pbe-comps"
PATCH_LABEL = "Set 17 PBE"


# ---------------------------------------------------------------------------
# Scraping
# ---------------------------------------------------------------------------

async def fetch_api_data():
    """Load the MetaTFT PBE comps page in a headless browser and capture the
    two API responses we need."""
    captured = {}

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        async def on_response(response):
            url = response.url
            if "comps_stats" in url and "PBE" in url:
                captured["stats"] = await response.json()
            elif "comps_data" in url and "PBE" in url:
                captured["data"] = await response.json()

        page.on("response", on_response)
        await page.goto(PAGE_URL, wait_until="domcontentloaded", timeout=60_000)

        # Wait until both responses have arrived (poll up to ~15 s).
        for _ in range(30):
            if "stats" in captured and "data" in captured:
                break
            await page.wait_for_timeout(500)

        await browser.close()

    if "stats" not in captured or "data" not in captured:
        missing = [k for k in ("stats", "data") if k not in captured]
        raise RuntimeError(f"Did not capture API responses: {missing}")

    return captured["stats"], captured["data"]


# ---------------------------------------------------------------------------
# Parsing
# ---------------------------------------------------------------------------

def parse_stats(stats_raw):
    """Build a lookup {cluster_id_str: {top4_rate, win_rate, pick_rate}} from
    the comps_stats response.  Pick rate is expressed as % of games."""
    total_game_slots = 0
    lookup = {}

    for entry in stats_raw.get("results", []):
        cluster = entry.get("cluster", "")
        places = entry.get("places", [])

        if not cluster:
            # Totals row: places[0] is total game-slots (players × games).
            total_game_slots = places[0] if places else 0
            continue

        count = entry.get("count", 0)
        if count == 0:
            continue

        total = sum(places[:8])
        top4 = sum(places[:4])
        first = places[0] if places else 0

        lookup[cluster] = {
            "total": total,
            "top4_rate": round(top4 / total * 100, 1) if total else 0.0,
            "win_rate":  round(first / total * 100, 1) if total else 0.0,
            "count": count,
            # Pick rate computed later once we know total_game_slots.
            "_first": first,
        }

    # Second pass: compute pick rate now that total_game_slots is known.
    # total_game_slots / 8 = number of actual games.
    total_games = total_game_slots / 8 if total_game_slots else 1
    for v in lookup.values():
        v["pick_rate"] = round(v["count"] / total_games * 100, 2)

    return lookup


def clean_unit(raw):
    """Strip TFT17_ / TFT_ prefixes from a unit ID."""
    return re.sub(r"^TFT\d*_", "", raw.strip())


def clean_name(name_list):
    """Convert the 'name' array from comps_data into a human-readable label."""
    parts = []
    for item in (name_list or []):
        n = item.get("name", "")
        n = re.sub(r"^TFT\d*_", "", n)
        n = n.replace("UniqueTrait", "").replace("Trait", "")
        parts.append(n)
    return " / ".join(parts) if parts else "Unknown"


LEVELLING_MAP = {
    "lvl 5":     "Lv. 5",
    "lvl 6":     "Lv. 6",
    "lvl 7":     "Lv. 7",
    "lvl 8":     "Lv. 8",
    "lvl 9":     "Lv. 9",
    "fast 8":    "Fast 8",
    "fast 9":    "Fast 9",
    "slow roll": "Slow Roll",
    "standard":  "Standard",
}

def clean_levelling(raw):
    key = (raw or "").strip().lower()
    for pattern, label in LEVELLING_MAP.items():
        if pattern in key:
            return label
    return raw.title() if raw else "Unknown"


def parse_comps(stats_raw, data_raw, time_accessed):
    stats_lookup = parse_stats(stats_raw)
    cluster_details = (
        data_raw.get("results", {})
                .get("data", {})
                .get("cluster_details", {})
    )

    comps = []
    for cluster_id, detail in cluster_details.items():
        name      = clean_name(detail.get("name"))
        archetype = clean_levelling(detail.get("levelling"))
        units_raw = detail.get("units_string", "")
        units     = [clean_unit(u) for u in units_raw.split(",") if u.strip()]

        avg_place = detail.get("overall", {}).get("avg", 0.0)

        s = stats_lookup.get(cluster_id, {})

        # Prefer the trend pick rate (ratio × 100) when available.
        trends = detail.get("trends") or []
        if trends and trends[0].get("pick"):
            pick_rate = round(trends[0]["pick"] * 100, 2)
        else:
            pick_rate = s.get("pick_rate", 0.0)

        comps.append({
            "name":          name,
            "archetype":     archetype,
            "top4":          s.get("top4_rate", 0.0),
            "avgPlace":      round(avg_place, 2),
            "pickRate":      pick_rate,
            "winRate":       s.get("win_rate", 0.0),
            "units":         units,
            "patch":         PATCH_LABEL,
            "time_accessed": time_accessed,
        })

    comps.sort(key=lambda c: c["avgPlace"])
    return comps


# ---------------------------------------------------------------------------
# Writing js/data/comps.js
# ---------------------------------------------------------------------------

def format_js(comps):
    """Serialize the comp list to a JS module string."""
    lines = [
        "// Source: https://www.metatft.com/pbe-comps",
        "// Refreshed by re-running py/scrape_comps.py and overwriting this file.",
        "",
        "export const comps = [",
    ]

    for i, c in enumerate(comps):
        comma = "," if i < len(comps) - 1 else ""
        units_js = json.dumps(c["units"])
        lines += [
            "  {",
            f'    name: {json.dumps(c["name"])},',
            f'    archetype: {json.dumps(c["archetype"])},',
            f'    top4: {c["top4"]},',
            f'    avgPlace: {c["avgPlace"]},',
            f'    pickRate: {c["pickRate"]},',
            f'    winRate: {c["winRate"]},',
            f'    units: {units_js},',
            f'    patch: {json.dumps(c["patch"])},',
            f'    time_accessed: {json.dumps(c["time_accessed"])},',
            f"  }}{comma}",
        ]

    lines.append("];")
    lines.append("")
    return "\n".join(lines)


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

async def main():
    print("Launching headless browser...")
    stats_raw, data_raw = await fetch_api_data()
    print(f"  comps_stats: {len(stats_raw.get('results', []))} entries")
    print(f"  comps_data:  {len(data_raw.get('results', {}).get('data', {}).get('cluster_details', {}))} clusters")

    time_accessed = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.000Z")
    comps = parse_comps(stats_raw, data_raw, time_accessed)
    print(f"  Parsed {len(comps)} comps")

    js = format_js(comps)
    OUTPUT_PATH.write_text(js, encoding="utf-8")
    print(f"Written -> {OUTPUT_PATH}")


if __name__ == "__main__":
    asyncio.run(main())
