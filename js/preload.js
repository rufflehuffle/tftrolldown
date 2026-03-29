import { pool, traits } from './tables.js';

function preloadImage(href) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = href;
    document.head.appendChild(link);
}

Object.values(pool).forEach(champ => {
    if (champ.tile) preloadImage(champ.tile);
    if (champ.icon) preloadImage(champ.icon);
});

Object.values(traits).forEach(trait => {
    if (trait.icon) preloadImage(trait.icon);
});
