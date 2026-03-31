import { pool } from '../data/pool.js';
import { getBestBoard, getStrongestTankAndCarry, calcBoardStrength } from '../board-strength.js';
import { FRONTLINE_ROLES, SECONDARY_GOLD_FLOOR } from './constants.js';
import { localActiveBreakpoint, localSellValue, buildTraitCounts } from './helpers.js';
import { simulateShop } from './shop-sim.js';
import { get1CostCarryAndTank } from './detect-reroll.js';
import { placeBoardUnits } from './positioning.js';

// Shop levels visited during a 1-1 → 3-1 curve (1-cost reroll).
// 1-1: Lv2, 1-2: Lv3, 1-3: Lv3,
// 2-1: Lv3, 2-2: Lv3, 2-3: Lv3,
// 2-5: Lv4, 2-6: Lv4, 2-7: Lv4, 3-1: Lv4
const REROLL_1COST_SHOP_SEQUENCE = [2, 3, 3, 3, 3, 3, 4, 4, 4, 4];

// ============================================================
// Main export
//
// Assumptions:
//   • Lv.4, 60g available at 3-1
//   • Pre-seeded: 2★ copy of the main 1-cost carry (3 raw
//     copies → star up before shops, free — simulates natural
//     accumulation across rounds 1-x through 2-x)
//   • 1-cost reroll curve (see REROLL_1COST_SHOP_SEQUENCE)
//   • 3-cost+ units skipped during shop (preserve rolling gold)
//   • No XP buy — stay at Lv.4 for max 1-cost odds
//   • Board size: 4 units (level 4)
// ============================================================
export function generate31Board(teamPlan) {
    const targetNames = [...teamPlan].filter(n => pool[n]);
    if (!targetNames.length) return null;

    const targetSet = new Set(targetNames);
    const { mainCarry, mainTank } = get1CostCarryAndTank(targetNames);

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

        let gold        = 60;
        const rawCopies = {};
        const taken     = {};

        // ── Preseed: 3 copies of main 1-cost carry (→ 2★ after star-up) ─
        if (mainCarry) {
            rawCopies[mainCarry.name] = 3;
            taken[mainCarry.name]     = 3;
        }

        // ── Simulate shops & buy ─────────────────────────────────
        for (const level of REROLL_1COST_SHOP_SEQUENCE) {
            const shop = simulateShop(level, taken);
            for (const champName of shop) {
                if (!champName || !buyTargets.has(champName)) continue;
                const cost        = pool[champName].cost;
                if (cost >= 3) continue; // skip 3-cost+ to preserve rolling gold
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

        // ── Board selection (4 units at level 4) ─────────────────
        const boardUnits = getBestBoard(dedupHolding, 4);
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
            level: 4,
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
