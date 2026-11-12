/** Índice que genera vite/blog/plugin.ts a partir de content/blog */
declare module 'virtual:blog-index' {
  const posts: import('./blog').PostMeta[];
  export default posts;
}
