import { ActivitySection } from './activity/ActivitySection';
import { MethodSection } from './method/MethodSection';
import { StackScatter } from './stack/StackScatter';
import { StackRow } from './stack/StackRow';

/** Actividad, stack y método: bloque diferido de la Home (incluye los datos de GitHub). */
export const HomeWork = () => (
  <StackScatter groups={['activity', 'method']}>
    <ActivitySection />
    <StackRow groups={['activity', 'method', 'contact']} />
    <MethodSection />
  </StackScatter>
);
