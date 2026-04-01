# TFT Rolldown — Viewport & Scaling Reference

## Viewports

| Group | Resolution | HUD scale | Root font-size |
|---|---|---|---|
| low-res | 800×600 | 0.62× | 16px (default) |
| standard | 1280–1920px wide | 1× (design target) | 16px (default) |
| QHD | 2560×1440 | 1.5× | 24px |
| 4K | 3840×2160 | 2.0× | 32px |

## Two-track scaling strategy

**Track 1 — Scale-wrapped widgets** (HUD, toolbar, timer, trait panel, popup): use `transform: scale()` at QHD/4K breakpoints. All sizing inside these elements stays in `px` to avoid double-scaling.

**Track 2 — Modals and standalone elements** (planner, teams, postrd, presets, team-builder): sized with `rem`. Root font-size bumps at QHD/4K drive scaling automatically — no per-element media queries needed.

> `border` and `font-size` values in Track 2 files are written in `rem`. `postrd-analysis.css` is an exception — it uses `calc(Npx * var(--rd-ui-scale, 1))` driven by JS and must stay that way.

**`transform-origin` by component:**
- HUD → `center bottom`
- Toolbar → `right top`
- Timer bar → `top center`
- Trait panel → `top right`
- Popup → keep in `translate(-50%, -50%) scale(…)` chain

## Breakpoint rules

**`max-width: 1280px`**
- `.tb-picker-panel`: width 200px, `.tb-unit`: 36px
- TB-mode button offset: `right: calc(200px + 16px)`

**`max-width: 900px`**
- `.hud`, `.toolbar`: scale `0.62`
- `.trait-panel`: `left: 20px; top: 80px; width: 165px; max-height: 40vh; overflow-y: auto`
- `--hud-h: 130px`
- Planner: `.planner-picker__unit-trait-container { display: none }` — trait icons hidden in picker cards (too small to read; pagination planned)
- Planner: `.planner-traits { overflow: hidden }` — trait panel clips rather than overflows
- `.tb-picker-panel`: width 160px, `.tb-unit`: 32px
- TB-mode button offset: `right: calc(160px + 16px)`

**`max-width: 1919px`**
- Trait rows: `.trait-row:nth-child(n+7) { display: none }`

**`min-width: 2560px`**
- HUD scale `1.5`; `--hud-h: 300px`, `--timer-h: 54px`, `--hex-gap: 6px`; `html { font-size: 24px }`

**`min-width: 3840px`**
- HUD scale `2.0`; `--hud-h: 400px`, `--timer-h: 72px`, `--hex-gap: 8px`; `html { font-size: 32px }`

**Toolbar right offset:** standard `right: min(18vw, calc(50vw - 497px))`; `≤900px`: `right: 0`

## Switch slider formula

Toggle switches (planner + teams) use a `3vw` track. All icon dimensions are `vw`-based so proportions match 1920×1080 at every resolution.

| Property | Value | 1920px equiv |
|---|---|---|
| Icon size | `2.4vw` | 46px |
| Icon `left` | `-0.78vw` | −15px |
| Icon `top` | `-0.42vw` | −8px |
| `::before` size | `2.083vw` | 40px |
| Symbol (planner) | `1.3vw` | 25px |
| Symbol (teams) | `1.04vw` | 20px |
| Track height (teams) | `1.56vw` | 30px |
| Travel (checked state) | `2.16vw` | 41.5px |

Travel derived from: `3vw − icon(2.4vw) + 2 × overhang(0.78vw)` = `2.16vw`.
