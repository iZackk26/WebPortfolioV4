import type { Plugin, ViteDevServer } from 'vite';
import { CONTENT_DIR, scanPosts } from './scan';

const VIRTUAL_ID = 'virtual:blog-index';
const RESOLVED_ID = `\0${VIRTUAL_ID}`;

/** Código del módulo: cada portada se importa para que Vite la procese y le ponga hash */
const moduleCode = (root: string, includeDrafts: boolean) => {
  const posts = scanPosts(root, includeDrafts);
  const imports = posts.map((post, i) => `import cover${i} from ${JSON.stringify(post.coverImport)};`);
  const entries = posts.map((post, i) => `{ ...${JSON.stringify(post.meta)}, cover: cover${i} }`);
  return `${imports.join('\n')}\nexport default [${entries.join(',\n')}];\n`;
};

/**
 * Índice del blog como módulo virtual (`virtual:blog-index`): lee content/blog en cada
 * build, valida el frontmatter y expone solo metadatos (el cuerpo de cada post se carga
 * aparte). En desarrollo incluye los borradores y se recarga al editar un .mdx.
 */
export const blogIndexPlugin = (): Plugin => {
  let root = process.cwd();
  let includeDrafts = false;

  const invalidate = (server: ViteDevServer, file: string) => {
    if (!file.includes(CONTENT_DIR)) return;
    const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
    if (!mod) return;
    server.moduleGraph.invalidateModule(mod);
    server.ws.send({ type: 'full-reload' });
  };

  return {
    name: 'blog-index',
    configResolved(config) {
      root = config.root;
      includeDrafts = config.command === 'serve';
    },
    resolveId: (id) => (id === VIRTUAL_ID ? RESOLVED_ID : undefined),
    load(id) {
      if (id !== RESOLVED_ID) return undefined;
      return moduleCode(root, includeDrafts);
    },
    configureServer(server) {
      server.watcher.add(`${root}/${CONTENT_DIR}`);
      ['add', 'change', 'unlink'].forEach((event) => server.watcher.on(event, (file: string) => invalidate(server, file)));
    },
  };
};
