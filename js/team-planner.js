import { pool } from './tables.js';
import { state, saveTeamPlan, saveUnlockedOverrides, isOriginallyLocked } from './state.js';
import { render, costColor } from './render.js';

// ============================================================
// Constants (shared with team-builder.js)
// ============================================================
export const TEAM_MAX    = 10;
export const COST_TIERS  = [1, 2, 3, 4, 5];
export const COST_LABELS = { 1: '1-Cost', 2: '2-Cost', 3: '3-Cost', 4: '4-Cost', 5: '5-Cost' };
export const COST_COLORS = { 1: '#9e9e9e', 2: '#4caf50', 3: '#2196f3', 4: '#9c27b0', 5: '#ff9800' };

// ============================================================
// Team Planner
// ============================================================
const backdrop        = document.querySelector('.team-planner-backdrop');
const pickerEl        = document.querySelector('.team-planner-picker');
const selectedRowEl   = document.querySelector('.team-planner-selected-row');
const selectedCountEl = document.querySelector('.team-planner-count');

export function buildPicker() {
    pickerEl.innerHTML = '';

    function makeUnitEl(champ) {
        const isSelected = state.teamPlan.has(champ.name);
        const isLocked   = isOriginallyLocked(champ.name);
        const cost       = champ.cost;

        const unit = document.createElement('div');
        unit.className = 'picker-unit' + (isSelected ? ' selected' : '') + (isLocked ? ' lockable' : '');
        unit.dataset.name = champ.name;
        unit.style.borderColor = isSelected ? '#22c55e' : (COST_COLORS[cost] ?? '#444') + '55';
        unit.title = champ.name;

        const img = document.createElement('img');
        img.src = champ.icon;
        img.alt = champ.name;
        if (isLocked && !pool[champ.name].unlocked) img.style.filter = 'brightness(0.45) saturate(0.3)';
        unit.appendChild(img);

        if (isLocked) {
            const lockEl = document.createElement('span');
            lockEl.className = 'picker-lock';
            lockEl.textContent = pool[champ.name].unlocked ? '🔓' : '🔒';
            unit.appendChild(lockEl);
        }

        // Left click (MB1) - add/remove from team plan
        unit.addEventListener('click', () => {
            if (state.teamPlan.has(champ.name)) {
                state.teamPlan.delete(champ.name);
            } else {
                if (state.teamPlan.size >= TEAM_MAX) return;
                state.teamPlan.add(champ.name);
            }
            saveTeamPlan();

            const isSelected = state.teamPlan.has(champ.name);
            const cost = champ.cost;
            unit.classList.toggle('selected', isSelected);
            unit.style.borderColor = isSelected ? '#22c55e' : (COST_COLORS[cost] ?? '#444') + '55';
            const lockEl = unit.querySelector('.picker-lock');
            if (lockEl) lockEl.textContent = pool[champ.name].unlocked ? '🔓' : '🔒';

            renderTeamPlannerSelected();
            render();
        });

        // Right click (MB2) - toggle unlock for locked champions
        if (isLocked) {
            unit.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                pool[champ.name].unlocked = !pool[champ.name].unlocked;
                saveUnlockedOverrides();

                const img = unit.querySelector('img');
                const lockEl = unit.querySelector('.picker-lock');
                if (img) img.style.filter = pool[champ.name].unlocked ? '' : 'brightness(0.45) saturate(0.3)';
                if (lockEl) lockEl.textContent = pool[champ.name].unlocked ? '🔓' : '🔒';
            });
        }

        return unit;
    }

    for (const cost of COST_TIERS) {
        const unlocked = Object.values(pool).filter(c => c.cost === cost && !isOriginallyLocked(c.name));
        const locked   = Object.values(pool).filter(c => c.cost === cost &&  isOriginallyLocked(c.name));
        if (!unlocked.length && !locked.length) continue;

        const group = document.createElement('div');
        group.className = 'cost-group';

        const label = document.createElement('div');
        label.className = 'cost-group-label';
        label.textContent = COST_LABELS[cost];
        label.style.color = COST_COLORS[cost];
        group.appendChild(label);

        const unitsRow = document.createElement('div');
        unitsRow.className = 'cost-group-units';
        unlocked.forEach(c => unitsRow.appendChild(makeUnitEl(c)));
        group.appendChild(unitsRow);

        if (locked.length) {
            const lockedRow = document.createElement('div');
            lockedRow.className = 'cost-group-units cost-group-units--locked';
            locked.forEach(c => lockedRow.appendChild(makeUnitEl(c)));
            group.appendChild(lockedRow);
        }
        pickerEl.appendChild(group);
    }
}

export function renderTeamPlannerSelected() {
    selectedRowEl.innerHTML = '';
    selectedCountEl.textContent = `${state.teamPlan.size}/10`;

    if (state.teamPlan.size === 0) {
        const hint = document.createElement('span');
        hint.className = 'empty-hint';
        hint.textContent = 'Click units above to add them to your team plan';
        selectedRowEl.appendChild(hint);
        return;
    }

    for (const name of state.teamPlan) {
        const champ = pool[name];
        if (!champ) continue;
        const cost = champ.cost;

        const wrap = document.createElement('div');
        wrap.className = 'selected-unit';
        wrap.title = name;

        const img = document.createElement('img');
        img.src = champ.icon;
        img.alt = name;
        img.style.borderColor = COST_COLORS[cost] ?? '#444';
        wrap.appendChild(img);

        const btn = document.createElement('button');
        btn.className = 'remove-btn';
        btn.textContent = '✕';
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleTeamPlan(name);
        });
        wrap.appendChild(btn);

        selectedRowEl.appendChild(wrap);
    }
}

export function toggleTeamPlan(name) {
    if (state.teamPlan.has(name)) {
        state.teamPlan.delete(name);
        if (isOriginallyLocked(name)) pool[name].unlocked = false;
    } else {
        if (state.teamPlan.size >= TEAM_MAX) return;
        state.teamPlan.add(name);
        if (isOriginallyLocked(name)) pool[name].unlocked = true;
    }
    saveTeamPlan();
    saveUnlockedOverrides();

    const unitEl = pickerEl.querySelector(`.picker-unit[data-name="${CSS.escape(name)}"]`);
    if (unitEl) {
        const isSelected = state.teamPlan.has(name);
        const isLocked   = isOriginallyLocked(name);
        const cost       = pool[name]?.cost;
        unitEl.classList.toggle('selected', isSelected);
        unitEl.style.borderColor = isSelected ? '#22c55e' : (COST_COLORS[cost] ?? '#444') + '55';
        const lockEl = unitEl.querySelector('.picker-lock');
        if (lockEl) lockEl.textContent = isSelected ? '🔓' : '🔒';
        const imgEl = unitEl.querySelector('img');
        if (imgEl && isLocked) imgEl.style.filter = isSelected ? '' : 'brightness(0.45) saturate(0.3)';
    }

    renderTeamPlannerSelected();
    render();
}

function openTeamPlanner() {
    buildPicker();
    renderTeamPlannerSelected();
    backdrop.style.display = 'flex';
}

function closeTeamPlanner() {
    backdrop.style.display = 'none';
}

document.querySelector('.team-planner-button').addEventListener('click', openTeamPlanner);
document.querySelector('.team-planner-close').addEventListener('click', closeTeamPlanner);
backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeTeamPlanner();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.style.display !== 'none') closeTeamPlanner();
});
