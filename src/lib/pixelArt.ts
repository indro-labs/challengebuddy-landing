// Pixel art engine — ported from the Claude Design dc components

export type AnimalType = 'cat' | 'bear' | 'dog';
export type ItemType = 'halo' | 'shades' | 'headphones' | 'cape' | 'wizard' | 'sword';
export type IconName =
  | 'home' | 'trophy' | 'plus' | 'person' | 'camera' | 'crown' | 'flame'
  | 'lock' | 'coin' | 'check' | 'heart' | 'target' | 'gift' | 'star'
  | 'sparkle' | 'bolt' | 'users' | 'medal';

interface Rect { x: number; y: number; w: number; h: number; fill: string; }

function shade(hex: string, p: number): string {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const f = (c: number) => Math.max(0, Math.min(255, Math.round(c + (p < 0 ? c * p : (255 - c) * p))));
  return '#' + ((1 << 24) + (f(r) << 16) + (f(g) << 8) + f(b)).toString(16).slice(1);
}

export function avatarSVG(
  animal: AnimalType,
  color: string,
  size: number,
  items: ItemType[] = [],
  crown = false,
): string {
  const fur = color;
  const dk = shade(fur, -0.34), lt = shade(fur, 0.32);
  const eye = '#241027', wht = '#ffffff', nose = '#2a1020', pink = '#f7b7cf';
  const R: Rect[] = [];
  const r = (x: number, y: number, w: number, h: number, fill: string) => R.push({ x, y, w, h, fill });

  if (items.includes('cape')) {
    r(4,11,8,5,'#7c3aed'); r(3,14,10,2,'#6d28d9'); r(4,16,8,1,'#5b21b6');
  }
  if (animal === 'cat') {
    r(3,3,2,1,fur); r(4,2,1,1,fur); r(4,3,1,1,pink);
    r(11,3,2,1,fur); r(11,2,1,1,fur); r(11,3,1,1,pink);
  } else if (animal === 'dog') {
    r(1,3,3,10,dk); r(12,3,3,10,dk);
    r(2,5,1,7,fur); r(13,5,1,7,fur);
  } else if (animal === 'bear') {
    r(3,2,3,3,fur); r(10,2,3,3,fur); r(4,3,1,1,lt); r(11,3,1,1,lt);
  }
  r(3,4,10,7,fur); r(4,11,8,4,fur); r(6,12,4,3,lt);
  r(3,12,2,2,fur); r(11,12,2,2,fur);
  r(4,15,3,1,dk); r(9,15,3,1,dk);
  r(5,6,2,2,eye); r(9,6,2,2,eye);
  r(5,6,1,1,wht); r(9,6,1,1,wht);
  r(5,8,6,2,lt); r(7,8,2,1,nose);
  if (animal === 'cat') { r(1,8,2,1,dk); r(13,8,2,1,dk); }
  if (items.includes('wizard')) {
    r(7,0,2,1,'#5b21b6'); r(6,1,4,1,'#6d28d9'); r(5,2,6,1,'#7c3aed');
    r(4,3,8,1,'#6d28d9'); r(3,4,10,1,'#5b21b6'); r(7,1,1,1,'#fde047');
  }
  if (items.includes('shades')) {
    r(5,6,2,2,'#0b0b14'); r(9,6,2,2,'#0b0b14'); r(7,6,2,1,'#0b0b14'); r(5,6,1,1,'#3ad1e6');
  }
  if (items.includes('headphones')) {
    r(3,3,1,1,'#22d3ee'); r(12,3,1,1,'#22d3ee');
    r(2,5,1,3,'#22d3ee'); r(13,5,1,3,'#22d3ee'); r(4,3,8,1,'#0e7490');
  }
  if (items.includes('sword')) {
    r(13,7,1,7,'#cbd5e1'); r(12,13,3,1,'#fbbf24'); r(13,14,1,1,'#92400e');
  }
  if (items.includes('halo')) {
    r(5,0,6,1,'#fde047'); r(4,1,1,1,'#fde047'); r(11,1,1,1,'#fde047');
  }
  if (crown) {
    r(4,0,8,1,'#fbbf24'); r(4,-1,1,1,'#fbbf24'); r(7,-1,2,1,'#fbbf24');
    r(11,-1,1,1,'#fbbf24'); r(7,0,2,1,'#22d3ee');
  }
  const minY = crown ? -1 : 0;
  const vbH = 17 - minY;
  const rects = R.map(o =>
    `<rect x="${o.x}" y="${o.y - minY}" width="${o.w + 0.02}" height="${o.h + 0.02}" fill="${o.fill}"/>`
  ).join('');
  return `<svg width="${size}" height="${Math.round(size * vbH / 16)}" viewBox="0 0 16 ${vbH}" shape-rendering="crispEdges" style="display:block;image-rendering:pixelated">${rects}</svg>`;
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
