interface PhoneMockupProps {
  src: string;
  position: 'front' | 'back';
}

/** iPhone de titanio con bisel y Dynamic Island; la pantalla es una captura real. */
export const PhoneMockup = ({ src, position }: PhoneMockupProps) => (
  <div className={`iphone is-${position}`}>
    <div className="iphone-screen">
      <img src={src} alt="" loading="lazy" decoding="async" />
    </div>
  </div>
);
