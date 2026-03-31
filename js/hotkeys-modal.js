import {
    ACTIONS, getKey, setKey, resetBindings, keyLabel,
    isBlockedKey, isBlockedMouseButton, mouseButtonToKey,
} from './hotkey-bindings.js';

const modal      = document.getElementById('hotkeys-modal');
const backdrop   = document.getElementById('hotkeys-backdrop');
const closeBtn   = document.getElementById('hotkeys-modal-close');
const resetBtn   = document.getElementById('hotkeys-modal-reset');
const body       = document.getElementById('hotkeys-modal-body');
const optionsBtn = document.querySelector('.options-btn');

let rebindingId  = null;  // action id currently awaiting a key press
let cancelRebind = null;  // removes the capture listener

// ---- Render ----

function render() {
    body.innerHTML = '';

    // Group actions by section
    const sectionMap = new Map();
    for (const action of ACTIONS) {
        if (!sectionMap.has(action.section)) sectionMap.set(action.section, []);
        sectionMap.get(action.section).push(action);
    }

    for (const [sectionName, actions] of sectionMap) {
        body.appendChild(buildSection(sectionName, actions));
    }

    // Fixed / non-rebindable entries
    body.appendChild(buildFixedSection());
}

function buildSection(title, actions) {
    const sec = document.createElement('div');
    sec.className = 'hotkeys-modal__section';

    const heading = document.createElement('div');
    heading.className = 'hotkeys-modal__section-title';
    heading.textContent = title;
    sec.appendChild(heading);

    for (const action of actions) {
        sec.appendChild(buildRow(action));
    }
    return sec;
}

function buildRow(action) {
    const row = document.createElement('div');
    row.className = 'hotkeys-modal__row';
    row.dataset.id = action.id;

    const label = document.createElement('span');
    label.className = 'hotkeys-modal__action';
    label.textContent = action.label;
    row.appendChild(label);

    const keysEl = document.createElement('span');
    keysEl.className = 'hotkeys-modal__keys';

    const badge = document.createElement('span');
    badge.className = 'hotkeys-modal__key hotkeys-modal__key--rebindable';
    badge.title = 'Click to rebind';
    badge.textContent = keyLabel(getKey(action.id));
    badge.addEventListener('click', () => startRebind(action.id));

    keysEl.appendChild(badge);
    row.appendChild(keysEl);
    return row;
}

function buildFixedSection() {
    const sec = document.createElement('div');
    sec.className = 'hotkeys-modal__section';

    const heading = document.createElement('div');
    heading.className = 'hotkeys-modal__section-title';
    heading.textContent = 'Fixed';
    sec.appendChild(heading);

    const fixed = [
        { label: 'Exit freeroll / Pause round', keys: [['Esc']] },
        { label: 'Undo',  keys: [['Ctrl', 'Z']] },
        { label: 'Redo',  keys: [['Ctrl', 'Y']] },
    ];

    for (const { label, keys } of fixed) {
        const row = document.createElement('div');
        row.className = 'hotkeys-modal__row';

        const lbl = document.createElement('span');
        lbl.className = 'hotkeys-modal__action';
        lbl.textContent = label;
        row.appendChild(lbl);

        const keysEl = document.createElement('span');
        keysEl.className = 'hotkeys-modal__keys';

        for (const combo of keys) {
            combo.forEach((k, i) => {
                const badge = document.createElement('span');
                badge.className = 'hotkeys-modal__key hotkeys-modal__key--fixed';
                badge.textContent = k;
                keysEl.appendChild(badge);
                if (i < combo.length - 1) {
                    const sep = document.createElement('span');
                    sep.className = 'hotkeys-modal__sep';
                    sep.textContent = '+';
                    keysEl.appendChild(sep);
                }
            });
        }
        row.appendChild(keysEl);
        sec.appendChild(row);
    }
    return sec;
}

// ---- Rebind ----

function flashError(badge) {
    badge.classList.add('hotkeys-modal__key--error');
    setTimeout(() => badge.classList.remove('hotkeys-modal__key--error'), 500);
}

function startRebind(id) {
    if (rebindingId) endRebind(true);
    rebindingId = id;

    const badge = getBadge(id);
    if (!badge) return;
    badge.classList.add('hotkeys-modal__key--rebinding');
    badge.textContent = '…';

    function onKey(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        if (e.key === 'Escape') {
            endRebind(true);
            return;
        }
        if (isBlockedKey(e.key)) {
            flashError(badge);
            return;
        }

        setKey(id, e.key);
        endRebind(false);
        render();
    }

    function onMouse(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        // Left click (button 0) cancels the rebind
        if (e.button === 0) {
            endRebind(true);
            return;
        }
        if (isBlockedMouseButton(e.button)) {
            flashError(badge);
            return;
        }

        setKey(id, mouseButtonToKey(e.button));
        endRebind(false);
        render();
    }

    document.addEventListener('keydown',   onKey,   { capture: true });
    document.addEventListener('mousedown', onMouse, { capture: true });
    cancelRebind = () => {
        document.removeEventListener('keydown',   onKey,   { capture: true });
        document.removeEventListener('mousedown', onMouse, { capture: true });
    };
}

function endRebind(cancelled) {
    if (!rebindingId) return;
    if (cancelled) {
        const badge = getBadge(rebindingId);
        if (badge) {
            badge.classList.remove('hotkeys-modal__key--rebinding');
            badge.textContent = keyLabel(getKey(rebindingId));
        }
    }
    cancelRebind?.();
    cancelRebind = null;
    rebindingId = null;
}

function getBadge(id) {
    return body.querySelector(`[data-id="${id}"] .hotkeys-modal__key--rebindable`);
}

// ---- Open / Close ----

function openHotkeysModal() {
    render();
    modal.classList.add('hotkeys-modal--open');
    backdrop.classList.add('hotkeys-backdrop--open');
}

function closeHotkeysModal() {
    endRebind(true);
    modal.classList.remove('hotkeys-modal--open');
    backdrop.classList.remove('hotkeys-backdrop--open');
}

optionsBtn?.addEventListener('click', openHotkeysModal);
optionsBtn?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openHotkeysModal(); }
});
closeBtn.addEventListener('click', closeHotkeysModal);
backdrop.addEventListener('click', closeHotkeysModal);
resetBtn.addEventListener('click', () => { resetBindings(); render(); });

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('hotkeys-modal--open')) {
        // If rebinding, endRebind already handled Escape via the capture listener.
        // This fires only when not rebinding.
        if (!rebindingId) closeHotkeysModal();
    }
});
