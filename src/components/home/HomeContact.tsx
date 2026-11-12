import { ContactSection } from './contact/ContactSection';
import { StackScatter } from './stack/StackScatter';

/** Contacto con sus logos flotantes: bloque diferido al final de la Home. */
export const HomeContact = () => (
  <StackScatter groups={['contact']}>
    <ContactSection />
  </StackScatter>
);
