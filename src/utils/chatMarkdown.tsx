import { Fragment, ReactNode } from 'react';
import { BARE_LINK, bareLink, ChatLink } from './chatLinks';

/**
 * Markdown mínimo y seguro para las respuestas de Max: **negrita**, `código`, enlaces
 * [texto](https://…), URLs y correos sueltos (como enlace corto) y listas. Construye nodos
 * de React (sin innerHTML), así que un texto con <script> o atributos on* solo se muestra
 * como texto (CWE-79).
 */
// **negrita** | `código` | [texto](url) | https://… suelto | correo suelto
const INLINE = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\)|https:\/\/[^\s<>()[\]]+|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;
const MD_LINK = /^\[([^\]]+)\]\(([^)\s]+)\)$/;
const IS_BARE = new RegExp(`^${BARE_LINK.source}$`);

const inline = (text: string, keyBase: string): ReactNode[] =>
  text.split(INLINE).map((part, i) => {
    const key = `${keyBase}-${i}`;
    if (!part) return null;
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={key}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('`') && part.endsWith('`')) return <code key={key}>{part.slice(1, -1)}</code>;
    const link = MD_LINK.exec(part);
    if (link) return <ChatLink key={key} href={link[2]} label={link[1]} />;
    if (IS_BARE.test(part)) return bareLink(part, key);
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
