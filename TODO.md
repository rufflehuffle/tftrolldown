# TODO

## Fast 9 & 1/2/3-cost RR Support
- Build comp detection for 1-cost, 3-cost, Fast 9
- Add comp detection in UI / allow user to manually set the generation

## 🔥 Active
- Add feedback to round detail
- Add QHD & 4K support (support more viewports)

See [BUGS.md](BUGS.md) for known bugs.

---

## Polish

### Trait Indicators
- Units in hover info panel should have colored border indicating rarity

### Shop
- Change star-up animation to ring-like effect
- Add gem to top of shop slot
- Add lock icon to shop

### SFX
- Record: buy XP, combine, end-of-round timer SFX
- Add tick SFX (every 1s while holding a unit; also when switching hovered hex)
- Investigate how often champion SFX play

### Settings
- Change hotkeys
- Add "regenerate planner on reset" setting

### Team Planner
- Snapshot feature

### Codebase
- Split `pool` object in `tables.js` into `unit_info` and `pool`

### Grading
- Needs another pass to see if weights are distributed correctly and if any more metrics need to be added

---

## Ideas
- Add items
- Add augments
- Bot that simulates another player rolling down

---

## Before Release -> aiming for ~April 15th
- Update for new set
- Fast 9 / 1–3 cost RR support (see above)
- Expand viewport support beyond current display
- Make UX as polished as possible
- Final pass over:
  - Shop UI
  - Team Builder
  - Popup
  - Unit shop tile animations (in planner / shop shine, star up)
- Change CDN from MetaTFT's CDN to my own / host images on github