# TFT Rolldown — CSS Style Guide

> Viewports tested in `tests/layout.spec.js` and `tests/spacing.spec.js`.

---

## Fonts

| Family | Role | Weights |
|---|---|---|
| `'Beaufort'` | Game UI labels, headings, buttons | 300 400 500 **700** 900 |
| `'Spiegel'` | Body, captions, supporting copy | 400 **600** 700 |

Self-hosted OTF under `style/fonts/`. **Never CDN.** Titles always `text-transform: uppercase`.

**Type scale**

All font sizes outside scale-wrapped elements (HUD, toolbar, timer, trait panel, popup) use `rem` so they scale with the root font-size at QHD/4K. The pixel values below are the 1× equivalents at the 16px root.

| Use | rem | px equiv | Weight | Family |
|---|---|---|---|---|
| Modal title | 1.5–1.75rem | 24–28px | 700 | Beaufort |
| Section header | 1.125rem | 18px | 700 | Beaufort |
| Button label | 0.8125–1rem | 13–16px | 700 | Beaufort |
| Body / trait names | 0.875rem | 14px | 400–500 | Spiegel |
| Caption / hint | 0.6875–0.75rem | 11–12px | 400 | Spiegel |
| Board unit count | `clamp(20px, 3vmin, 5vmin)` | — | 700 | Beaufort |

`letter-spacing` = tracking ÷ 1000 × font-size. (Tracking 50 at 14px → `0.7px`.)

---

## Colours

See [`colors.md`](colors.md) for all colour values (backgrounds, gold/blue palettes, trait tiers, cost borders, scrollbars).

**Rule:** Gold = frames/static structure. Blue = animation/attention/interaction. Do not mix.

---

## CSS Custom Properties

Defined in `board.css`. **Always use these for anything aligned to the hex grid.**

```css
:root {
  --hex-w:       clamp(48px, min(9vh, 7.5vw), max(80px, 4.17vw));
  --hex-h:       calc(var(--hex-w) * 1.15);
  --hex-gap:     4px;    /* 6px @ QHD, 8px @ 4K */
  --row-offset:  calc(var(--hex-w) * 0.5 + var(--hex-gap) * 0.5);
  --row-overlap: calc(var(--hex-h) * -0.217);
  --timer-h:     36px;   /* 54px @ QHD, 72px @ 4K */
  --hud-h:       200px;  /* 130px @ ≤900px, 300px @ QHD, 400px @ 4K */
}
```

---

## Layout

### Centering pattern (board, HUD, timer bar)
```css
position: fixed; left: 50%; transform: translateX(-50%);
```

### Modal pattern
```css
position: fixed; top: 10vh; left: 12.5vw; width: 75vw; height: 75vh;
```
Always pair with `position: fixed; inset: 0` backdrop at z-index 499.

### z-index layers

| z | Element |
|---|---|
| 10 | `.no-comp-popup` |
| 100 | `.trait-panel`, `.toolbar` |
| 200 | Dropdowns, `.btn-panel` |
| 400 | `.top-timer-bar` |
| 499 | `.planner-backdrop` |
| 500 | `.planner`, `.teams` |
| 600 | `.planner__unit-info` |
| 999 | `.sell-zone` |
| 1000 | Drag ghosts |
| 2000 | Tooltips |

---

## Shapes

**Hexagon** (board cells, bench, trait icons)
```css
clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
/* width × height ratio 1 : 1.15 — always use --hex-w / --hex-h */
```

**Top timer pill**
```css
clip-path: polygon(0% 0%, 100% 0%, calc(100% - 20px) 100%, 20px 100%);
```

No `border-radius` on game-chrome buttons. `border-radius: 4px` only for small utility controls.

---

## Buttons

| Type | Style |
|---|---|
| Modal action | `border: 0.125rem solid #C0A366; background: #1E2429` |
| HUD (Buy XP / Reroll) | Diagonal `linear-gradient`, `height: 65px`, `box-shadow: inset 0 0 0 2px` |
| Hover (gold-bordered) | `background: rgba(192, 163, 102, 0.15)` |
| Disabled | `opacity: 0.35; cursor: not-allowed` |

---

## Transitions

| Context | Value |
|---|---|
| Interactive (hover bg/border) | `0.15s ease` |
| Filter (trait icon) | `filter 0.15s ease` |
| XP bar fill | `width 0.3s ease` |
| Timer progress | `width 1s linear, background 0.4s` |

---

## Viewport & Scaling

See [`scaling.md`](scaling.md) for the two-track scaling strategy, breakpoint rules, and switch slider formula.

**Summary:** Track 1 (HUD/toolbar/timer/trait panel/popup) → `px` + `transform: scale()`. Track 2 (modals/planner/teams) → `rem`. Never mix tracks.

---

## File Map

| File | Scope |
|---|---|
| `base.css` | Body font + bg |
| `fonts.css` | `@font-face` declarations |
| `board.css` | `:root` tokens, hex grid, bench |
| `hud.css` | HUD bar, gold, level, XP, buttons |
| `buttons.css` | Toolbar, hover panels |
| `shop.css` | Shop slots, cost bar |
| `ghost.css` | Drag ghosts (`.drag-ghost`, `.shop-slot-ghost`) |
| `timer.css` | Top timer bar |
| `trait.css` | Trait panel, rows, tooltip |
| `popup.css` | `.no-comp-popup` |
| `planner.css` | Team Planner modal |
| `planner-filter.css` | Planner filter bar |
| `teams.css` | Saved Teams modal |
| `postrd.css` | Post-RD overlay |
| `postrd-analysis.css` | Post-RD analysis panel |
| `postrd-performance.css` | Post-RD chart |
| `presets.css` | Preset toolbar |
| `hotkeys-modal.css` | Hotkeys reference modal (z 649/650) |

---

## Do / Don't

| Do | Don't |
|---|---|
| Gold = frames/structure; Blue = animation/attention | Mix blue framing with gold animated elements |
| `clamp()` for values that flex across viewports | Hard-code sizes that should track `--hex-w` |
| `transform: scale()` at QHD/4K for Track 1; `rem` for Track 2 | Add *scaling* breakpoints between 900px and 2560px (layout breakpoints for panel sizing are OK) |
| `rem` for font-size and border in modal/planner CSS | Use `px` in Track 2 files (breaks QHD/4K scaling) |
| `px` for font-size and border inside scale-wrapped elements | Use `rem` inside HUD/toolbar/timer (causes double-scaling) |
| `user-select: none` on all display-only game elements | Add `border-radius` to game-chrome buttons |
| Always pair new modals with a backdrop at z-499 | Skip the backdrop |
| Use `@font-face` with exact weight/style | Import fonts from CDN or rely on faux-bold |
| Beaufort for game labels; Spiegel for body copy | Use Beaufort at very small sizes or in paragraphs |
| Lines terminate in straights (Hextech Metal rule) | Round or point decorative line ends |
| Test at 800×600 and 3840×2160 | Assume 1920×1080 only |
