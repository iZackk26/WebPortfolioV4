import { CSSProperties, ReactNode, useCallback, useState } from 'react';
import { STACK_ICONS, STACK_WINDOW_WIDTH_PX, StackGroup, StackIcon } from '../../../constants/stackIcons';
import { Draggable } from '../../ui/Draggable';
import { StackIconTile } from './StackIconTile';

interface StackScatterProps {
  /** Qué logos flotan en esta zona */
  groups: StackGroup[];
  children: ReactNode;
}

/** Centro del logo dentro del espacio libre al costado de las ventanas. */
const positionFor = (icon: StackIcon): CSSProperties => {
  const gutter = `(100% - ${STACK_WINDOW_WIDTH_PX}px) / 2`;
  const offset = `calc(${gutter} * ${icon.gutter} - 38px)`;
  return { top: icon.top, [icon.side]: offset };
};

/**
 * Envuelve uno o más bloques de la Home con los logos de sus grupos.
 * En xl+ flotan a los costados y se arrastran; en pantallas más chicas los muestra StackRow.
 */
export const StackScatter = ({ groups, children }: StackScatterProps) => {
  const [focused, setFocused] = useState(false);
  const onDragChange = useCallback((dragging: boolean) => setFocused(dragging), []);

  return (
    <div className={`desk-scope relative ${focused ? 'is-focus' : ''}`}>
      {children}
      <div className="pointer-events-none absolute inset-0 hidden xl:block" aria-hidden="true">
        {STACK_ICONS.filter((icon) => groups.includes(icon.group)).map((icon) => (
          <Draggable key={icon.id} className="desk-item desk-dim pointer-events-auto" style={positionFor(icon)} rotate={icon.rotate} onDragChange={onDragChange}>
            <StackIconTile icon={icon} />
          </Draggable>
        ))}
      </div>
    </div>
  );
};
