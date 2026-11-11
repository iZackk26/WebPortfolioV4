import { StackIcon } from '../../../constants/stackIcons';

interface StackIconTileProps {
  icon: StackIcon;
}

/** Logo en una ficha blanca con el nombre de archivo debajo. */
export const StackIconTile = ({ icon }: StackIconTileProps) => (
  <div className="stack-icon" title={icon.label}>
    <span className="stack-icon-tile">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={icon.path} fill={icon.color} />
      </svg>
    </span>
    <span className="stack-icon-caption">{icon.fileName}</span>
  </div>
);
