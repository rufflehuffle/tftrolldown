// ============================================================
// postrd/analysis.js — Public API for the analysis tab
// ============================================================

import { buildSnapshots } from './snapshots.js';
import { setupResponsive } from './animation.js';
import { renderSpeedStats } from './renderers.js';
import {
    getSnapshots, setSnapshots, setCurrent,
    setReviewMode, cancelPendingAnim,
    renderSnap, renderRolldownReview, goToSnapshot,
} from './review.js';

/**
 * Initialize the analysis tab with round events and final board.
 * Called once per completed rolldown from postrd.js.
 */
export function initAnalysis(events, board = {}, scores = []) {
    const snapshots = buildSnapshots(events);
    setSnapshots(snapshots);
    cancelPendingAnim();
    setReviewMode(false);
    if (!snapshots.length) return;
    setCurrent(snapshots.length - 1);   // default to final board
    // setupResponsive + renderSnap are deferred to onAnalysisVisible() —
    // the panel is hidden at this point so dimensions read as 0.
    _needsFirstRender = true;
    renderSpeedStats(events);
    renderRolldownReview(events, board, scores);
}

let _needsFirstRender = false;

/**
 * Called when the analysis tab becomes visible.
 * Sets up responsive sizing and renders the first snapshot at correct size.
 * Only performs the initial render once per rolldown; subsequent tab switches
 * are no-ops since the DOM is already populated at the right size.
 */
export function onAnalysisVisible() {
    if (!_needsFirstRender) return;
    _needsFirstRender = false;
    const snapshots = getSnapshots();
    if (!snapshots.length) return;
    setupResponsive();
    renderSnap(snapshots, snapshots.length - 1);
}

export { goToSnapshot };
