# TFT Rolldown — Colour Reference

**Do not introduce new colours. No pure black/white.**

## Backgrounds (darkest = Hextech Black)

| Role | Value |
|---|---|
| Page `<body>` | `hsl(210, 90%, 4%)` |
| Modals | `#000B13` |
| HUD / popups | `#0D1416` |
| Planner panel / tooltips | `#0F171E` |
| Cards / placeholders | `#1E2429` |
| Timer pill | `#090a0c` |
| Toolbar | `#162021` |

## Gold — Hextech Metal (frames, labels, static structure)

| Role | Value |
|---|---|
| Primary text (Gold 1) | `#F0E6D2` |
| HUD labels (Gold 2) | `#C8AA6E` |
| Action button border (Gold 3) | `#C0A366` |
| HUD outer border (Gold 4) | `#947842` |
| Toolbar trim (Gold 5) | `#735D31` |
| Inactive border (Gold 6) | `#675F4C` |
| Scrollbar thumb (Gold 7) | `#795b29` |

## Blue — Hextech Magic (attention, interaction, timers)

| Role | Value |
|---|---|
| Level text | `#90c8ff` |
| XP text | `#6a9fd8` |
| Buy XP border | `#42829C` |
| Teal toolbar caps | `#21555A` |
| Teal hover | `#529A94` |
| Timer — normal | `#38bdf8` |
| Timer — warning | `#f97316` |
| Timer — expired | `#ef4444` |

## Text on dark

| Role | Value |
|---|---|
| Primary (Gold 1) | `#F0E6D2` |
| Active trait name | `#EAE0CD` |
| Muted | `#A09B8C` |
| Inactive | `#999` |
| Pip / secondary | `#635F56` |
| Team name | `#CDBE91` |

## Trait tier colours

| Tier | Value |
|---|---|
| Bronze | `#876049` |
| Silver | `#819193` |
| Gold | `#BCA55B` |
| Legendary | `#E37B23` |
| Prismatic | `#BDF3ED` |
| Inactive | `#1E2429` |

## Unit cost borders

| Cost | Value |
|---|---|
| 1 | `#3E505E` |
| 2 | `#0B7827` |
| 3 | `#2166A6` |
| 4 | `#B91C8C` |
| 5 | `#B88502` |

## Official gradients

| Name | Direction | Use |
|---|---|---|
| Dark Blue | Blue 7 → Blue 6 | Background surfaces only |
| Gold | Gold 3 → Gold 5 | Metal framing only |
| Blue | Blue 2 → Blue 4 | Magic/animated elements |

## Scrollbars

```css
--sb-track-color: #000b13;
--sb-thumb-color: #795b29;
--sb-size: 7px;
```
Always provide both `::-webkit-scrollbar` rules and the `@supports not selector(::-webkit-scrollbar)` `scrollbar-color` fallback.
