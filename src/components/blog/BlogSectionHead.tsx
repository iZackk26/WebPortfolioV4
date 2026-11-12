import type { ReactNode } from 'react';

interface BlogSectionHeadProps {
  id: string;
  kicker: string;
  title: string;
  /** A la derecha del título (p. ej. "Página 1 de 3") */
  aside?: ReactNode;
}

/** Encabezado de sección del blog: kicker mono y H2 alineados a la izquierda */
export const BlogSectionHead = ({ id, kicker, title, aside }: BlogSectionHeadProps) => (
  <div className="mb-[18px] flex flex-wrap items-end justify-between gap-4">
    <div>
      <span className="carousel-kicker">{kicker}</span>
      <h2 id={id} className="m-0 mt-0.5 text-balance text-[clamp(26px,3.4vw,36px)] font-medium leading-[1.05] tracking-[-0.05em] text-black">
        {title}
      </h2>
    </div>
    {aside}
  </div>
);
