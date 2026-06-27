import { iconSVG, type IconName } from '../lib/pixelArt';

interface Props {
  icon: IconName;
  color: string;
  size: number;
}

export default function PixelIcon({ icon, color, size }: Props) {
  return (
    <span
      style={{ display: 'inline-flex', lineHeight: 0 }}
      dangerouslySetInnerHTML={{ __html: iconSVG(icon, color, size) }}
    />
  );
}
