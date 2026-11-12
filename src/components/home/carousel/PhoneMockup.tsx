import { ProgressiveImage } from '../../ui/ProgressiveImage';

interface PhoneMockupProps {
  src: string;
  placeholder?: string;
  position: 'front' | 'back';
}

/** iPhone de titanio con bisel y Dynamic Island; la pantalla es una captura real. */
export const PhoneMockup = ({ src, placeholder, position }: PhoneMockupProps) => (
  <div className={`iphone is-${position}`}>
    <div className="iphone-screen">
      <ProgressiveImage src={src} placeholder={placeholder} alt="" width={320} height={693} loading="lazy" decoding="async" />
    </div>
  </div>
);
