// Shop levels visited during a standard 2-1 → 4-1 curve.
// 1 Lv.2 shop, 2 Lv.3, 3 Lv.4, 4 Lv.5, 3 Lv.6, 3 Lv.7
export const SHOP_SEQUENCE = [2, 3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 7];

// Role classifications
export const TANK_CLASS      = new Set(['Tank']);
export const BACKLINE_ROLES  = new Set(['Caster', 'Marksman', 'Specialist']);
export const FRONTLINE_ROLES = new Set(['Tank', 'Fighter', 'Assassin']);

// 2-range units: positioned at B1/B7, not A-row, despite frontline roles
export const TWO_RANGE_UNITS = new Set(["Bel'Veth", 'Gwen', 'Urgot', 'Morgana']);

// Gold floor below which secondary item holders are skipped
export const SECONDARY_GOLD_FLOOR = 20;
