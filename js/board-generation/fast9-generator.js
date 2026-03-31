import { pool } from '../data/pool.js';
import { getBestBoard, getStrongestTankAndCarry, calcBoardStrength } from '../board-strength.js';
import { FRONTLINE_ROLES, SECONDARY_GOLD_FLOOR } from './constants.js';
import { localActiveBreakpoint, localSellValue, buildTraitCounts } from './helpers.js';
import { simulateShop } from './shop-sim.js';
import { getFast9CarryAndTank } from './carry-tank.js';
import { placeBoardUnits } from './positioning.js';

// Shop levels visited during a 1-1 → 5-2 curve (Fast 9).
// [2,3,3,3,4,4,4,5,5,5,5,5,6,6,6,7,7,7,7,8×8]
const FAST9_SHOP_SEQUENCE = [2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8];

// ============================================================
// Main export
//
// Assumptions:
//   • Lv.8, 150g available at 5-2
//   • No pre-seeding (Fast 9 relies on natural Lv.8 shop odds)
//   • Fast 9 curve (see FAST9_SHOP_SEQUENCE)
//   • No XP buy — already at Lv.8
//   • Board size: 8 units (level 8)
// ============================================================
export function generate52Board(teamPlan) {
    const targetNames = [...teamPlan].filter(n => pool[n]);
    if (!targetNames.length) return null;

    const targetSet = new Set(targetNames);
    const { mainCarry, mainTank } = getFast9CarryAndTank(targetNames);

    const priorityTargets = new Set(targetNames);
    const compTraits = new Set(targetNames.flatMap(n => pool[n]?.synergies ?? []));
    const secondaryTargets = new Set(
        Object.values(pool)
            .filter(c => {
                if (targetSet.has(c.name)) return false;
                if (FRONTLINE_ROLES.has(c.role)) return true;
                if (c.synergies.some(t => compTraits.has(t))) return true;
                return false;
            })
            .map(c => c.name)
    );
    const buyTargets = new Set([...priorityTargets, ...secondaryTargets]);

    const NUM_CANDIDATES = 5;
    const MAX_ATTEMPTS   = 1000;
    let bestResult       = null;
    let bestScore        = -1;
    let validCount       = 0;
    let fallbackResult   = null;
    let fallbackScore    = -1;

    const startTime = performance.now();

    for (let attempt = 0; attempt < MAX_ATTEMPTS && validCount < NUM_CANDIDATES; attempt++) {
        if (performance.now() - startTime > 100) break;

        let gold        = 150;
        const rawCopies = {};
        const taken     = {};

        // ── Simulate shops & buy ─────────────────────────────────
        for (const level of FAST9_SHOP_SEQUENCE) {
            const shop = simulateShop(level, taken);
            for (const champName of shop) {
                if (!champName || !buyTargets.has(champName)) continue;
                const cost        = pool[champName].cost;
                const isSecondary = !priorityTargets.has(champName);
                if (gold < cost) continue;
                if (isSecondary && gold < SECONDARY_GOLD_FLOOR) continue;

                rawCopies[champName] = (rawCopies[champName] ?? 0) + 1;
                taken[champName]     = (taken[champName] ?? 0) + 1;
                gold -= cost;
            }
        }

        // ── Cap copies at 3; sell excess ─────────────────────────
        for (const [name, count] of Object.entries(rawCopies)) {
            if (count > 3) {
                gold += (count - 3) * pool[name].cost;
                rawCopies[name] = 3;
            }
        }

        // ── Star-ups: 3 copies → 1 unit at 2★ ──────────────────
        const holding = [];
        for (const [name, count] of Object.entries(rawCopies)) {
            if (count === 3) {
                holding.push({ name, stars: 2 });
            } else {
                for (let i = 0; i < count; i++) holding.push({ name, stars: 1 });
            }
        }

        holding.sort((a, b) => (pool[b.name].cost - pool[a.name].cost) || (b.stars - a.stars));

        // ── Dedup — no duplicate names ───────────────────────────
        const seenNames    = new Set();
        const dedupHolding = [];
        const extraBench   = [];

        for (const unit of holding) {
            if (seenNames.has(unit.name)) {
                extraBench.push(unit);
            } else {
                seenNames.add(unit.name);
                dedupHolding.push(unit);
            }
        }

        // ── Board selection (8 units at level 8) ─────────────────
        const boardUnits = getBestBoard(dedupHolding, 8);
        const { bestCarry } = getStrongestTankAndCarry(boardUnits);

        // ── Score candidate board ────────────────────────────────
        const boardNames = new Set(boardUnits.map(u => u.name));
        let plannerScore = 0;
        for (const name of targetNames) {
            const weight = 6 - pool[name].cost;
            if (boardNames.has(name))                         plannerScore += weight;
            else if (dedupHolding.some(u => u.name === name)) plannerScore -= weight;
        }
        if (mainCarry && boardNames.has(mainCarry.name)) plannerScore += 3;
        if (mainTank  && boardNames.has(mainTank.name))  plannerScore += 3;

        const boardTraitCounts = buildTraitCounts(boardUnits.map(u => u.name));

        let carryTraitScore = 0;
        if (mainCarry && boardNames.has(mainCarry.name)) {
            for (const t of pool[mainCarry.name].synergies) {
                if (localActiveBreakpoint(t, boardTraitCounts[t] ?? 0) > 0) carryTraitScore += 2;
            }
        }
        let tankTraitScore = 0;
        if (mainTank && boardNames.has(mainTank.name)) {
            for (const t of pool[mainTank.name].synergies) {
                if (localActiveBreakpoint(t, boardTraitCounts[t] ?? 0) > 0) tankTraitScore += 2;
            }
        }

        let activeTraitCount = 0;
        for (const [traitName, count] of Object.entries(boardTraitCounts)) {
            if (localActiveBreakpoint(traitName, count) > 0) activeTraitCount++;
        }

        // ── Build full result ────────────────────────────────────
        const boardSet   = new Set(boardUnits);
        const benchUnits = [
            ...dedupHolding.filter(u => !boardSet.has(u)),
            ...extraBench,
        ];

        const finalBench = [];
        for (const unit of benchUnits) {
            if (!targetSet.has(unit.name) && !boardNames.has(unit.name)) {
                gold += localSellValue(unit);
            } else {
                finalBench.push(unit);
            }
        }

        const SELL_PRIO = { 2: 1, 3: 2, 1: 3, 4: 4, 5: 5 };
        while (boardUnits.length + finalBench.length > 15) {
            finalBench.sort((a, b) =>
                (SELL_PRIO[pool[a.name].cost] ?? 99) - (SELL_PRIO[pool[b.name].cost] ?? 99)
            );
            gold += localSellValue(finalBench.shift());
        }

        const boardState = placeBoardUnits(boardUnits, bestCarry);

        const plannerOnBench = finalBench.filter(u =>  targetSet.has(u.name));
        const otherOnBench   = finalBench.filter(u => !targetSet.has(u.name));

        const benchState = Array(9).fill(null);
        otherOnBench.slice(0, 9).forEach((u, i) => { benchState[i] = u; });
        plannerOnBench.slice(0, 9).forEach((u, i) => { benchState[8 - i] = u; });

        const candidateResult = {
            board: boardState,
            bench: benchState,
            gold:  Math.max(0, gold),
            xp:    0,
            level: 8,
        };

        const rawScore = calcBoardStrength(boardUnits);
        if (rawScore > fallbackScore) {
            fallbackScore  = rawScore;
            fallbackResult = candidateResult;
        }

        const hasTraitless = boardUnits.some(unit =>
            !targetSet.has(unit.name) &&
            !pool[unit.name].synergies.some(
                t => localActiveBreakpoint(t, boardTraitCounts[t] ?? 0) > 0
            )
        );
        if (hasTraitless) continue;

        const totalScore = plannerScore + carryTraitScore + tankTraitScore + activeTraitCount;
        if (totalScore <= bestScore) continue;
        validCount++;

        bestScore  = totalScore;
        bestResult = candidateResult;
    }

    return bestResult ?? fallbackResult;
}
