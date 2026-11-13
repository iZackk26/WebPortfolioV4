# Fuentes y respaldo

## Qué necesita fuente

- Toda cifra que no sea del autor (estadísticas, precios, porcentajes, fechas).
- Cómo funciona una herramienta, API, ley o estándar.
- Tendencias del mercado y afirmaciones del tipo "la mayoría de…" o "cada vez más…".
- Lo que dice otra persona o empresa.

**No necesita fuente externa:** la experiencia del autor, siempre que el texto la presente como tal ("en este proyecto medimos…"). Las cifras del autor se marcan en la tabla de evidencia como *fuente: autor* y se le piden confirmar en la entrega.

## Qué fuentes valen, en orden

1. **Primarias:** documentación oficial, especificaciones (W3C, RFC, ISO), repositorios y changelogs del mantenedor, leyes y textos oficiales, papers revisados por pares.
2. **Datos de organismos y estudios con metodología publicada:** gobiernos, bancos centrales, OCDE, encuestas con muestra declarada (Stack Overflow Developer Survey, State of JS…).
3. **Medios y blogs técnicos reconocidos**, escritos por quien hizo el trabajo (blogs de ingeniería de empresas, autores con trayectoria verificable).

**Evita:** contenido SEO sin autor, agregadores que repiten a otros, foros sin respuesta verificada, cifras sin metodología y generadores de IA. Si una cifra solo aparece en blogs que se citan entre sí, busca el estudio original. Si no aparece, no la uses.

## Cómo verificar

- Para afirmaciones de peso, usa **al menos 2 fuentes independientes**: que no citen una a la otra.
- Lee la página original con WebFetch y confirma que dice lo que vas a afirmar, en ese contexto.
- Anota la **fecha**. En tecnología, lo de hace más de 2 años puede haber cambiado; busca la versión actual.
- Si las fuentes se contradicen, dilo en el texto o elige la más primaria y explica por qué.
- Usa `mode: "standard"` en WebSearch; pasa a `"extended"` solo para datos recientes, cifras difíciles de encontrar o cuando lo estándar no alcanza.

## Tabla de evidencia (para la propuesta y la verificación)

| # | Afirmación | Fuente(s) | Fecha | Confianza |
|---|---|---|---|---|
| 1 | Los crawlers de IA no ejecutan JavaScript | Vercel, "The rise of the AI crawler"; Google, JavaScript SEO basics | 2024 / 2026 | alta |
| 2 | El onboarding bajó de 3 días a 4 horas | Autor | — | confirmar |

Confianza **alta**: 2 o más fuentes primarias que coinciden. **Media**: una fuente primaria. **Baja**: sin fuente primaria; se reformula o se quita.

## Cómo citar en el MDX

- **En línea**, con un enlace descriptivo sobre las palabras que respalda, nunca "aquí" ni "este enlace":
  `Según la [documentación de Google sobre JavaScript](https://developers.google.com/…), …`
- **Al final**, una sección con todas las fuentes, en el idioma del archivo:

```mdx
## Sources

- Google Search Central, [JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) (2026).
- Vercel, [The rise of the AI crawler](https://vercel.com/blog/the-rise-of-the-ai-crawler) (2024).
```

En `es.mdx`, la sección se llama `## Fuentes`. Los enlaces externos se abren solos en pestaña nueva (lo hace el componente `a` del blog).

## Citas textuales

Solo si la frase existe tal cual en la fuente, entre comillas y con enlace. Nunca inventes ni "mejores" una cita. Prefiere parafrasear con enlace.
