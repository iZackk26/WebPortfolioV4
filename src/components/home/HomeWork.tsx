import { STACK_MOBILE_BOTTOM, STACK_MOBILE_TOP } from '../../constants/mobileScatter';
import { ActivitySection } from './activity/ActivitySection';
import { MethodSection } from './method/MethodSection';
import { StackScatter } from './stack/StackScatter';
import { StackRowScatter } from './stack/StackRowScatter';

/** Actividad, stack y método: bloque diferido de la Home (incluye los datos de GitHub). */
export const HomeWork = () => (
  <StackScatter groups={['activity', 'method']}>
    {/* Ocupa el espacio superior de la sección sin sumar alto */}
    <StackRowScatter spots={STACK_MOBILE_TOP} className="z-[1] -mb-24 h-24 md:-mb-28 md:h-28" />
    <ActivitySection />
    <StackRowScatter spots={STACK_MOBILE_BOTTOM} className="mt-12 h-[180px]" />
    <MethodSection />
  </StackScatter>
);
