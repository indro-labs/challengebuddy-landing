import { avatarSVG, type AnimalType, type ItemType } from '../lib/pixelArt';

interface Props {
  animal: AnimalType;
  color: string;
  size: number;
  items?: ItemType[];
  crown?: boolean;
}

export default function Avatar({ animal, color, size, items = [], crown = false }: Props) {
  return (
    <span
      style={{ display: 'inline-flex', lineHeight: 0 }}
      dangerouslySetInnerHTML={{ __html: avatarSVG(animal, color, size, items, crown) }}
    />
  );
}
