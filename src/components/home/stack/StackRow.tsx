import { useTranslation } from 'react-i18next';
import { STACK_ICONS, StackGroup } from '../../../constants/stackIcons';
import { StackIconTile } from './StackIconTile';

/** Fila fija de logos para pantallas donde no hay espacio a los costados. */
interface StackRowProps {
  groups: StackGroup[];
}

export const StackRow = ({ groups }: StackRowProps) => {
  const { t } = useTranslation();

  return (
    <ul aria-label={t('home.stackLabel')} className="m-0 mx-auto mt-14 grid max-w-[300px] list-none grid-cols-3 justify-items-center gap-x-3 gap-y-4 px-4 sm:max-w-[520px] sm:grid-cols-4 xl:hidden">
      {STACK_ICONS.filter((icon) => groups.includes(icon.group)).map((icon) => (
        <li key={icon.id}>
          <StackIconTile icon={icon} />
        </li>
      ))}
    </ul>
  );
};
