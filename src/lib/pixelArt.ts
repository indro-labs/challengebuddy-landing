// Pixel art engine — ported from the Claude Design dc components

export type AnimalType = 'cat' | 'bear' | 'dog';
export type ItemType = 'halo' | 'shades' | 'headphones' | 'cape' | 'wizard' | 'sword';
export type IconName =
  | 'home' | 'trophy' | 'plus' | 'person' | 'camera' | 'crown' | 'flame'
  | 'lock' | 'coin' | 'check' | 'heart' | 'target' | 'gift' | 'star'
  | 'sparkle' | 'bolt' | 'users' | 'medal';

interface Rect { x: number; y: number; w: number; h: number; fill: string; }

// Item accessories were designed against the old full-bleed 16x17 body grid.
// The real character art occupies a smaller, centered region of its 16x16
// frame, so accessory coordinates are rescaled/recentered onto that region.
// Calibrated against the actual character art: old ear-top (y=2) and eye
// row (y=6) map to the real sprite's ear-top (y=5.5) and eye row (y=7).
const SX = 0.425, OX = 4.975;
const SY = 0.375, OY = 4.75;

function buildItems(items: ItemType[], crown: boolean): { back: Rect[]; front: Rect[] } {
  const back: Rect[] = [];
  const front: Rect[] = [];
  const r = (arr: Rect[], x: number, y: number, w: number, h: number, fill: string) =>
    arr.push({ x: OX + x * SX, y: OY + y * SY, w: w * SX, h: h * SY, fill });

  if (items.includes('cape')) {
    r(back,4,9,8,5,'#7c3aed'); r(back,3,12,10,2,'#6d28d9'); r(back,4,14,8,1,'#5b21b6');
  }
  if (items.includes('wizard')) {
    r(front,7,0,2,1,'#5b21b6'); r(front,6,1,4,1,'#6d28d9'); r(front,5,2,6,1,'#7c3aed');
    r(front,4,3,8,1,'#6d28d9'); r(front,3,4,10,1,'#5b21b6'); r(front,7,1,1,1,'#fde047');
  }
  if (items.includes('shades')) {
    r(front,5,6,2,2,'#0b0b14'); r(front,9,6,2,2,'#0b0b14'); r(front,7,6,2,1,'#0b0b14'); r(front,5,6,1,1,'#3ad1e6');
  }
  if (items.includes('headphones')) {
    r(front,3,3,1,1,'#22d3ee'); r(front,12,3,1,1,'#22d3ee');
    r(front,2,5,1,3,'#22d3ee'); r(front,13,5,1,3,'#22d3ee'); r(front,4,3,8,1,'#0e7490');
  }
  if (items.includes('sword')) {
    r(front,13,7,1,7,'#cbd5e1'); r(front,12,13,3,1,'#fbbf24'); r(front,13,14,1,1,'#92400e');
  }
  if (items.includes('halo')) {
    r(front,5,0,6,1,'#fde047'); r(front,4,1,1,1,'#fde047'); r(front,11,1,1,1,'#fde047');
  }
  if (crown) {
    r(front,4,0,8,1,'#fbbf24'); r(front,4,-1,1,1,'#fbbf24'); r(front,7,-1,2,1,'#fbbf24');
    r(front,11,-1,1,1,'#fbbf24'); r(front,7,0,2,1,'#22d3ee');
  }
  return { back, front };
}

function rectsToSVG(rects: Rect[], size: number): string {
  const inner = rects.map(o =>
    `<rect x="${o.x}" y="${o.y}" width="${o.w + 0.02}" height="${o.h + 0.02}" fill="${o.fill}"/>`
  ).join('');
  return `<svg width="${size}" height="${size}" viewBox="0 0 16 16" shape-rendering="crispEdges" style="display:block;image-rendering:pixelated">${inner}</svg>`;
}

// Accessories layered behind the character art (e.g. a cape).
export function avatarBackSVG(items: ItemType[], size: number): string {
  return rectsToSVG(buildItems(items, false).back, size);
}

// Accessories layered in front of the character art (hats, shades, etc).
export function avatarFrontSVG(items: ItemType[], crown: boolean, size: number): string {
  return rectsToSVG(buildItems(items, crown).front, size);
}

const ICONS: Record<IconName, string[]> = {
  home:    ['0001000','0011100','0111110','1111111','0111110','0111110','0110110'],
  trophy:  ['1111111','1111111','0111110','0011100','0001000','0011100','0111110'],
  plus:    ['0001000','0001000','0001000','1111111','0001000','0001000','0001000'],
  person:  ['0011100','0011100','0011100','0000000','0111110','1111111','1111111'],
  camera:  ['0011000','1111111','1001001','1011101','1001001','1111111','0000000'],
  crown:   ['0000000','1010101','1111111','1111111','1111111','1111111','0000000'],
  flame:   ['0001000','0011000','0011100','0111110','1111111','1111111','0111110'],
  lock:    ['0011100','0100010','0100010','1111111','1111111','1101011','1111111'],
  coin:    ['0011100','0111110','1101011','1101011','1101011','0111110','0011100'],
  check:   ['0000000','0000010','0000110','1001100','1111000','0110000','0000000'],
  heart:   ['0110110','1111111','1111111','1111111','0111110','0011100','0001000'],
  target:  ['0011100','0100010','1011101','1010101','1011101','0100010','0011100'],
  gift:    ['0001000','0011100','1111111','0111110','0111110','0111110','0000000'],
  star:    ['0001000','0011100','1111111','0111110','0111110','0110110','0100010'],
  sparkle: ['0001000','0001000','0101010','0011100','0101010','0001000','0001000'],
  bolt:    ['0001100','0011000','0110000','1111110','0001100','0011000','0110000'],
  users:   ['0110110','1111111','0110110','0000000','1111111','1101011','1111111'],
  medal:   ['1010101','1111111','0111110','0011100','0111110','1111111','0111110'],
};

export function iconSVG(name: IconName, color: string, size: number): string {
  const grid = ICONS[name] ?? ICONS.home;
  const n = grid.length;
  const rects = grid.map((row, y) =>
    [...row].map((c, x) =>
      c === '1' ? `<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="${color}"/>` : ''
    ).join('')
  ).join('');
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges" style="display:block">${rects}</svg>`;
}
