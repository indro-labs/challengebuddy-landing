import { avatarBackSVG, avatarFrontSVG, type AnimalType, type ItemType } from '../lib/pixelArt';
import { characterImage } from '../lib/characterAssets';

interface Props {
  animal: AnimalType;
  color: string;
  size: number;
  items?: ItemType[];
  crown?: boolean;
}

export default function Avatar({ animal, color, size, items = [], crown = false }: Props) {
  return (
    <span style={{ position: 'relative', display: 'inline-block', width: size, height: size, lineHeight: 0 }}>
      <span
        style={{ position: 'absolute', inset: 0 }}
        dangerouslySetInnerHTML={{ __html: avatarBackSVG(items, size) }}
      />
      <img
        src={characterImage(animal, color)}
        width={size}
        height={size}
        alt={`${animal} avatar`}
        style={{ position: 'relative', display: 'block', width: size, height: size, imageRendering: 'pixelated' }}
      />
      <span
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        dangerouslySetInnerHTML={{ __html: avatarFrontSVG(items, crown, size) }}
      />
    </span>
  );
}
