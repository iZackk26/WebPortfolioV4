import { Fragment, ReactNode } from 'react';

/**
 * Markdown mínimo y seguro para las respuestas de Max: **negrita**, `código`, enlaces
 * [texto](https://…) y listas. Construye nodos de React (sin innerHTML), así que un texto
 * con <script> o atributos on* solo se muestra como texto (CWE-79).
 */
const INLINE = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g;
const SAFE_LINK = /^(https:\/\/|mailto:)/i;

const inline = (text: string, keyBase: string): ReactNode[] =>
  text.split(INLINE).map((part, i) => {
    const key = `${keyBase}-${i}`;
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={key}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('`') && part.endsWith('`')) return <code key={key}>{part.slice(1, -1)}</code>;
    const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
    if (link) {
      const [, label, href] = link;
      // Solo https y mailto: un javascript: queda como texto
      return SAFE_LINK.test(href) ? (
        <a key={key} href={href} target="_blank" rel="noopener noreferrer nofollow">
          {label}
        </a>
      ) : (
        <Fragment key={key}>{label}</Fragment>
      );
    }
    return <Fragment key={key}>{part}</Fragment>;
  });

const LIST_ITEM = /^\s*(?:[-*•]|\d+[.)])\s+/;

/** Agrupa líneas en párrafos y listas. */
export const renderChatMarkdown = (text: string): ReactNode[] => {
  const blocks: ReactNode[] = [];
  let list: string[] = [];
  const flush = () => {
    if (!list.length) return;
    const items = list;
    blocks.push(
      <ul key={`ul-${blocks.length}`}>
        {items.map((item, i) => (
          <li key={i}>{inline(item, `li-${blocks.length}-${i}`)}</li>
        ))}
      </ul>,
    );
    list = [];
  };

  text.split('\n').forEach((line, i) => {
    if (LIST_ITEM.test(line)) {
      list.push(line.replace(LIST_ITEM, ''));
      return;
    }
    flush();
    if (line.trim()) blocks.push(<p key={`p-${i}`}>{inline(line, `p-${i}`)}</p>);
  });
  flush();
  return blocks;
};
