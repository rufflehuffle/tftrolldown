// ============================================================
// postrd/animation.js — FLIP move animations + responsive hex sizing
// ============================================================

import { BOARD_ROWS, champIcon } from './helpers.js';
import { playSound } from '../audio.js';

// ── FLIP ghost animations ────────────────────────────────────

/** Remove any lingering ghost overlays (e.g. on cancel). */
export function clearGhosts() {
    document.querySelectorAll('.rd-fly-ghost').forEach(g => g.remove());
}

/**
 * Capture bounding rects for every occupied board hex and bench slot
 * so we can animate units that move between snapshots.
 */
export function captureRects(snap) {
    const map = new Map();

    const boardEl = document.getElementById('rd-board');
    const rows = boardEl ? boardEl.querySelectorAll('.rd-board-row') : [];
    rows.forEach((row, ri) => {
        row.querySelectorAll('.rd-hex-wrap').forEach((wrap, ci) => {
            const key = `${BOARD_ROWS[ri]}${ci + 1}`;
            const unit = snap.board?.[key];
            if (unit) {
                const inner = wrap.querySelector('.rd-hex') || wrap;
                map.set(`board:${key}`, { unit, rect: inner.getBoundingClientRect(), el: inner });
            }
        });
    });

    const benchEl = document.getElementById('rd-bench');
    if (benchEl) {
        benchEl.querySelectorAll('.rd-bench-wrap').forEach((wrap, i) => {
            const unit = snap.bench?.[i];
            if (unit) {
                const inner = wrap.querySelector('.rd-bench-slot') || wrap;
                map.set(`bench:${i}`, { unit, rect: inner.getBoundingClientRect(), el: inner });
            }
        });
    }

    return map;
}

/**
 * Synchronously compute moves between old and new position maps,
 * hide destination units, and pre-create static source ghosts.
 * Must be called immediately after renderSnap() in the same
 * synchronous block to prevent the destination hex flash.
 * @returns {Array} moves — pass to animateOneMove() sequentially.
 */
export function prepareMoves(oldRects, newRects) {
    const oldBySig = new Map();
    for (const [posKey, { unit, rect }] of oldRects) {
        const sig = `${unit.name}:${unit.stars ?? 0}`;
        if (!oldBySig.has(sig)) oldBySig.set(sig, []);
        oldBySig.get(sig).push({ posKey, rect, unit });
    }
    const newBySig = new Map();
    for (const [posKey, { unit, rect, el }] of newRects) {
        const sig = `${unit.name}:${unit.stars ?? 0}`;
        if (!newBySig.has(sig)) newBySig.set(sig, []);
        newBySig.get(sig).push({ posKey, rect, unit, el });
    }

    const moves = [];
    for (const [sig, newEntries] of newBySig) {
        const oldEntries = oldBySig.get(sig) ?? [];
        const oldPosSet = new Set(oldEntries.map(e => e.posKey));
        const newPosSet = new Set(newEntries.map(e => e.posKey));

        const movedFrom = oldEntries.filter(e => !newPosSet.has(e.posKey));
        const movedInto = newEntries.filter(e => !oldPosSet.has(e.posKey));

        const newlyAdded    = Math.max(0, newEntries.length - oldEntries.length);
        const animatableCount = Math.max(0, movedInto.length - newlyAdded);

        for (let i = 0; i < animatableCount && i < movedFrom.length; i++) {
            moves.push({
                unit: movedFrom[i].unit,
                fromRect: movedFrom[i].rect,
                toRect: movedInto[i].rect,
                destEl: movedInto[i].el,
            });
        }
    }

    if (moves.length === 0) return moves;

    // Hide destination units so they don't flash before the ghost arrives
    for (const m of moves) {
        m.savedBg = m.destEl.style.backgroundImage;
        m.destEl.style.backgroundImage = 'none';
        const stars = m.destEl.parentElement?.querySelector('.rd-star-indicator');
        if (stars) { m.starsEl = stars; m.savedStars = stars.style.visibility; stars.style.visibility = 'hidden'; }
    }

    // Pre-create static ghosts at ALL source positions so later
    // moves' hexes don't flash empty while earlier moves animate.
    for (const m of moves) {
        const g = document.createElement('div');
        g.className = 'rd-fly-ghost';
        g.style.cssText = [
            `position:fixed`,
            `left:${m.fromRect.left}px`,
            `top:${m.fromRect.top}px`,
            `width:${m.fromRect.width}px`,
            `height:${m.fromRect.height}px`,
            `background-image:url(${champIcon(m.unit.name)})`,
            `background-size:cover`,
            `background-position:center`,
            `clip-path:polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)`,
            `pointer-events:none`,
            `z-index:999`,
        ].join(';');
        document.body.appendChild(g);
        m.sourceGhost = g;
    }

    return moves;
}

/**
 * Animate a single move: remove source ghost, fly to destination, restore.
 * Returns a Promise that resolves when the fly animation finishes.
 */
export function animateOneMove(move) {
    if (move.sourceGhost?.parentNode) move.sourceGhost.remove();
    playSound('unit_select.mp3');
    return new Promise(resolve => {
        flyGhost(move.unit, move.fromRect, move.toRect, () => {
            move.destEl.style.backgroundImage = move.savedBg;
            if (move.starsEl) move.starsEl.style.visibility = move.savedStars;
            playSound('unit_drop.mp3');
            resolve();
        });
    });
}

/** Animate a translucent ghost hex from one rect to another. Calls onDone when finished. */
function flyGhost(unit, fromRect, toRect, onDone) {
    const ghost = document.createElement('div');
    ghost.className = 'rd-fly-ghost';
    const dx = fromRect.left - toRect.left;
    const dy = fromRect.top  - toRect.top;

    ghost.style.cssText = [
        `position:fixed`,
        `left:${toRect.left}px`,
        `top:${toRect.top}px`,
        `width:${toRect.width}px`,
        `height:${toRect.height}px`,
        `background-image:url(${champIcon(unit.name)})`,
        `background-size:cover`,
        `background-position:center`,
        `clip-path:polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)`,
        `pointer-events:none`,
        `z-index:1000`,
        `transform:translate(${dx.toFixed(2)}px,${dy.toFixed(2)}px)`,
        `will-change:transform`,
    ].join(';');
    document.body.appendChild(ghost);

    ghost.getBoundingClientRect(); // force reflow

    requestAnimationFrame(() => {
        ghost.style.transition = 'transform 90ms cubic-bezier(0.15,0,0.2,1)';
        ghost.style.transform  = 'translate(0,0)';
        let done = false;
        const cleanup = () => {
            if (done) return;
            done = true;
            if (ghost.parentNode) ghost.remove();
            if (onDone) onDone();
        };
        ghost.addEventListener('transitionend', cleanup, { once: true });
        setTimeout(cleanup, 250);
    });
}

// ── Shop buy animation ───────────────────────────────────────

/**
 * Synchronously hide bought state on the given shop slots so
 * they can be revealed one-by-one via revealBuy().
 * Must be called in the same synchronous block as renderSnap().
 * @returns {Array} targets — pass each to revealBuy().
 */
export function prepareShopBuys(boughtIndices) {
    const shopEl = document.getElementById('rd-shop');
    const slots  = shopEl?.querySelectorAll('.rd-shop-slot') ?? [];
    const targets = [];
    for (const i of boughtIndices) {
        const slot = slots[i];
        if (!slot) continue;
        const overlay = slot.querySelector('.rd-shop-bought-overlay');
        const img     = slot.querySelector('.rd-shop-img');
        if (overlay) overlay.style.display = 'none';
        if (img) img.classList.remove('rd-shop-img--bought');
        targets.push({ slot, overlay, img });
    }
    return targets;
}

/** Synchronously snap a single shop slot to its bought state + play buy sfx. */
export function revealBuy(target) {
    playSound('buy.mp3');
    if (target.overlay) target.overlay.style.display = '';
    if (target.img)     target.img.classList.add('rd-shop-img--bought');
}

// ── Responsive hex sizing ────────────────────────────────────

let _resizeObserver = null;
let _lastHexW   = -1;
let _lastScale  = -1;
let _rafId      = 0;

/**
 * Attach a ResizeObserver to the board area so hex size and
 * trait panel position adapt when the container resizes.
 */
export function setupResponsive() {
    const HEX_GAP_BASE = 3;
    const rdEl        = document.querySelector('.postrd-rd');
    const boardArea   = document.querySelector('.postrd-rd__board-area');
    const leftPanel   = document.querySelector('.postrd-rd__left');
    const rdScreen    = document.querySelector('.postrd-rd__screen');
    const postrdPanel = document.querySelector('.postrd__panel');

    function updateTraitPos() {
        const benchRect  = document.getElementById('rd-bench').getBoundingClientRect();
        const boardRect  = document.getElementById('rd-board').getBoundingClientRect();
        const screenRect = rdScreen.getBoundingClientRect();
        const newLeft = benchRect.left - screenRect.left - leftPanel.offsetWidth - 8;
        const newTop  = boardRect.top  - screenRect.top;
        leftPanel.style.left = `${Math.max(4, newLeft)}px`;
        leftPanel.style.top  = `${Math.max(0, newTop)}px`;
    }

    function updateHexSize() {
        // Use the screen container (flex: 1, stable height) instead of
        // boardArea (flex: 0 0 auto, content-driven) to avoid a resize
        // feedback loop where changing --rd-hex-w resizes boardArea which
        // re-triggers the observer.
        const W = rdScreen.clientWidth;
        const H = rdScreen.clientHeight;
        if (!W || !H) return;
        const uiScale   = Math.max(0.45, Math.min(postrdPanel.clientWidth / 1440, 2.5));
        const scaledGap = HEX_GAP_BASE * uiScale;
        const fromH = (H * 0.8 - 8) / 5.0;
        const fromW = (W * 0.9 - 6.5 * scaledGap) / 7.5;
        const hexW  = Math.max(20, Math.min(fromH, fromW));

        // Skip update if values haven't meaningfully changed (< 0.5px / 0.01 scale)
        if (Math.abs(hexW - _lastHexW) < 0.5 && Math.abs(uiScale - _lastScale) < 0.01) {
            return;
        }
        _lastHexW  = hexW;
        _lastScale = uiScale;

        rdEl.style.setProperty('--rd-ui-scale', uiScale.toFixed(4));
        rdEl.style.setProperty('--rd-hex-w', `${hexW.toFixed(2)}px`);
        requestAnimationFrame(updateTraitPos);
    }

    // Debounce ResizeObserver to avoid jarring intermediate frames
    function onResize() {
        cancelAnimationFrame(_rafId);
        _rafId = requestAnimationFrame(updateHexSize);
    }

    if (_resizeObserver) _resizeObserver.disconnect();
    _resizeObserver = new ResizeObserver(onResize);
    _resizeObserver.observe(rdScreen);

    // Reset cache so first call always applies
    _lastHexW  = -1;
    _lastScale = -1;
    updateHexSize();
}
