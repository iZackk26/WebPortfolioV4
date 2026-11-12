import type { LegalBlock } from '../../types/legal';
import { isLegalBlock } from '../../utils/legalGuards';

/** Nombres técnicos (claves de almacenamiento, cookies) entre `comillas invertidas` se muestran como código */
const withCode = (text: string) =>
  text.split(/(`[^`]+`)/g).map((part, i) =>
    part.startsWith('`') && part.endsWith('`') ? <code key={i}>{part.slice(1, -1)}</code> : part,
  );

const Block = ({ block }: { block: LegalBlock }) => {
  switch (block.type) {
    case 'h3':
      return <h3>{block.text}</h3>;
    case 'ul':
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{withCode(item)}</li>
          ))}
        </ul>
      );
    case 'table':
      return (
        <div className="legal-table">
          <table>
            <thead>
              <tr>
                {block.head.map((cell) => (
                  <th key={cell} scope="col">{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join('|')}>
                  {row.map((cell, i) => (
                    <td key={i}>{withCode(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return <p>{withCode(block.text)}</p>;
  }
};

/** Contenido de una cláusula; los bloques mal formados del locale se descartan */
export const LegalBlocks = ({ blocks }: { blocks: unknown[] }) => (
  <>
    {blocks.filter(isLegalBlock).map((block, i) => (
      <Block key={i} block={block} />
    ))}
  </>
);
