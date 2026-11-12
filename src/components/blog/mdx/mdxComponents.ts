import type { MDXComponents } from 'mdx/types';
import { CodeFigure } from './CodeFigure';
import { Faq } from './Faq';
import { Anchor, Heading2, Image, Table } from './MdxElements';
import { Stats } from './Stats';

/** Lo que el MDX pinta con piezas del sitio; Stats y Faq se usan sin importarlos */
export const MDX_COMPONENTS: MDXComponents = {
  h2: Heading2,
  a: Anchor,
  table: Table,
  img: Image,
  figure: CodeFigure,
  Stats,
  Faq,
};
