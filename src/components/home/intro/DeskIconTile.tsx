import { DeskIcon } from '../../../constants/intro';

interface DeskIconTileProps {
  icon: DeskIcon;
}

/** Ícono de escritorio: sticker con sombra y nombre de archivo debajo. */
export const DeskIconTile = ({ icon }: DeskIconTileProps) => (
  <div className="desk-icon" data-size={icon.size} title={icon.label}>
    <img src={icon.src} alt="" draggable={false} loading="lazy" decoding="async" />
    <div className="desk-icon-caption">{icon.fileName}</div>
  </div>
);
