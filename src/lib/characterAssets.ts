// Maps animal + arbitrary hex color to the closest matching character asset PNG.

export type AnimalType = 'cat' | 'bear' | 'dog';
export type ColorName = 'blue' | 'green' | 'magenta' | 'orange' | 'pink' | 'purple' | 'red' | 'yellow';

const PALETTE: Record<ColorName, [number, number, number]> = {
  blue: [56, 189, 248],
  green: [52, 211, 153],
  magenta: [232, 121, 249],
  orange: [251, 146, 60],
  pink: [244, 114, 182],
  purple: [167, 139, 250],
  red: [248, 113, 113],
  yellow: [251, 191, 36],
};

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function nearestColorName(hex: string): ColorName {
  const [r, g, b] = hexToRgb(hex);
  let best: ColorName = 'blue';
  let bestDist = Infinity;
  (Object.keys(PALETTE) as ColorName[]).forEach((name) => {
    const [pr, pg, pb] = PALETTE[name];
    const dist = (r - pr) ** 2 + (g - pg) ** 2 + (b - pb) ** 2;
    if (dist < bestDist) {
      bestDist = dist;
      best = name;
    }
  });
  return best;
}

const files = import.meta.glob('../assets/characters/*/*.png', { eager: true, import: 'default' }) as Record<string, string>;

const CHAR_MAP: Record<AnimalType, Partial<Record<ColorName, string>>> = { cat: {}, bear: {}, dog: {} };

for (const path in files) {
  const match = path.match(/characters\/(bear|cat|dog)\/\1_base_(\w+)\.png$/);
  if (match) {
    const [, animal, color] = match;
    CHAR_MAP[animal as AnimalType][color as ColorName] = files[path];
  }
}

export function characterImage(animal: AnimalType, color: string): string {
  const src = CHAR_MAP[animal][nearestColorName(color)];
  if (!src) throw new Error(`No character asset for ${animal}`);
  return src;
}
