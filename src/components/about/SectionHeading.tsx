interface SectionHeadingProps {
  id: string;
  kicker: string;
  title: string;
  lede?: string;
}

/** Encabezado centrado de las secciones del About. */
export const SectionHeading = ({ id, kicker, title, lede }: SectionHeadingProps) => (
  <>
    <span className="carousel-kicker">{kicker}</span>
    <h2 id={id} className="m-0 text-balance text-[clamp(30px,4.6vw,48px)] font-medium leading-[1.02] tracking-[-0.05em] text-black">
      {title}
    </h2>
    {lede && <p className="m-0 max-w-[52ch] text-balance text-[17px] text-black/60">{lede}</p>}
  </>
);
