const STORAGE_KEY = 'tft_hotkeys';

/** All rebindable actions, in display order. */
export const ACTIONS = [
    { id: 'round',       label: 'Start / Pause / Resume round', defaultKey: ' ',  section: 'Round' },
    { id: 'reroll',      label: 'Reroll / Return to planning',  defaultKey: 'd',  section: 'Round' },
    { id: 'buyXp',       label: 'Buy XP',                       defaultKey: 'f',  section: 'Round' },
    { id: 'moveToBoard', label: 'Move hovered unit to board',   defaultKey: 'w',  section: 'Round' },
    { id: 'sell',        label: 'Sell hovered / dragged unit',  defaultKey: 'e',  section: 'Round' },
    { id: 'loadPreset',  label: 'Load last preset',             defaultKey: 'F1', section: 'Presets' },
];

/** Keyboard keys that cannot be assigned to any action. */
const BLOCKED_KEYS = new Set(['Escape', 'Tab', 'F5', 'F11', 'F12',
    'Control', 'Alt', 'Shift', 'Meta', 'CapsLock', 'NumLock', 'ScrollLock']);

/**
 * Mouse buttons that cannot be assigned. Left click (0) is blocked because it is
 * required for all UI interaction.
 */
const BLOCKED_MOUSE_BUTTONS = new Set([0]);

// Gaming-convention display labels: M1=left(0), M3=middle(1), M2=right(2), M4=back(3), M5=forward(4)
const MOUSE_LABELS = ['M1', 'M3', 'M2', 'M4', 'M5'];

// ---- Format helpers ----

/** Returns true if the stored binding represents a mouse button. */
export function isMouseBinding(key) {
    return key.startsWith('Mouse');
}

/** Encode a MouseEvent.button index as a storable binding string. */
export function mouseButtonToKey(button) {
    return `Mouse${button}`;
}

/** Decode a stored mouse binding back to a browser button index. */
export function mouseButtonFromKey(key) {
    return parseInt(key.slice(5), 10);
}

/** Normalize keyboard keys: lowercase single chars, exact otherwise. */
export function normalizeKey(key) {
    return key.length === 1 ? key.toLowerCase() : key;
}

export function isBlockedKey(key) {
    return BLOCKED_KEYS.has(key) || key.startsWith('Dead') || key.startsWith('Meta');
}

export function isBlockedMouseButton(button) {
    return BLOCKED_MOUSE_BUTTONS.has(button);
}

/** Human-readable display label for a stored binding (keyboard or mouse). */
export function keyLabel(key) {
    if (!key) return '–';
    if (isMouseBinding(key)) {
        const btn = mouseButtonFromKey(key);
        return MOUSE_LABELS[btn] ?? `M${btn}`;
    }
    if (key === ' ')           return 'Space';
    if (key === 'ArrowUp')    return '↑';
    if (key === 'ArrowDown')  return '↓';
    if (key === 'ArrowLeft')  return '←';
    if (key === 'ArrowRight') return '→';
    return key.toUpperCase();
}

// ---- Bindings store ----
// Each action stores { primary: string|null, secondary: string|null }.

let _bindings = _load();

function _load() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        return Object.fromEntries(ACTIONS.map(a => {
            const v = saved[a.id];
            if (v === undefined || typeof v === 'string') {
                // No saved value, or old single-string format — migrate.
                return [a.id, { primary: v ?? a.defaultKey, secondary: null }];
            }
            return [a.id, { primary: v.primary ?? null, secondary: v.secondary ?? null }];
        }));
    } catch {
        return Object.fromEntries(ACTIONS.map(a => [a.id, { primary: a.defaultKey, secondary: null }]));
    }
}

function _save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(_bindings));
}

/** Returns the primary binding key string (may be null). */
export function getKey(id) {
    return _bindings[id].primary;
}

/** Returns { primary, secondary } for an action. Either may be null. */
export function getKeys(id) {
    return { ..._bindings[id] };
}

/**
 * Set a binding slot for an action.
 * @param {string} id    - Action id.
 * @param {'primary'|'secondary'} slot - Which slot to set.
 * @param {string|null} raw - Key string, `Mouse{n}`, or null to clear the slot.
 */
export function setKey(id, slot, raw) {
    const key = (raw === null) ? null : (isMouseBinding(raw) ? raw : normalizeKey(raw));

    if (key !== null) {
        // Clear this key from every other slot it already occupies.
        for (const a of ACTIONS) {
            if (a.id === id) continue;
            if (_bindings[a.id].primary === key)   _bindings[a.id].primary   = null;
            if (_bindings[a.id].secondary === key) _bindings[a.id].secondary = null;
        }
        // Also clear it from the other slot of this same action.
        const other = slot === 'primary' ? 'secondary' : 'primary';
        if (_bindings[id][other] === key) _bindings[id][other] = null;
    }

    _bindings[id][slot] = key;
    _save();
}

export function resetBindings() {
    _bindings = Object.fromEntries(ACTIONS.map(a => [a.id, { primary: a.defaultKey, secondary: null }]));
    localStorage.removeItem(STORAGE_KEY);
}

// ---- Match helpers ----

/** Returns true if the KeyboardEvent matches any binding slot for id. */
export function matches(e, id) {
    const { primary, secondary } = _bindings[id];
    const check = key => {
        if (!key || isMouseBinding(key)) return false;
        return key.length === 1 ? e.key.toLowerCase() === key : e.key === key;
    };
    return check(primary) || check(secondary);
}

/** Returns true if the MouseEvent matches any binding slot for id. */
export function matchesMouse(e, id) {
    const { primary, secondary } = _bindings[id];
    const check = key => key && isMouseBinding(key) && mouseButtonFromKey(key) === e.button;
    return check(primary) || check(secondary);
}
