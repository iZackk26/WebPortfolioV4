---
name: izack-portfolio-articule-blog
description: Crea un artículo completo para el blog de izackk.com a partir de una idea suelta. Entrevista al autor con preguntas (objetivo, lector, experiencia propia, cifras, ángulo, título, idiomas), investiga en internet y respalda cada afirmación con fuentes fiables, propone esquema y títulos para aprobar, y redacta el MDX en inglés y español con el frontmatter, los componentes y la sección de fuentes que espera el blog. Úsala cuando Isaac diga "quiero escribir un artículo / post sobre…", "ayúdame con un post", "redacta un artículo", "/izack-portfolio-articule-blog", o describa un tema para el blog.
---

# Artículo para el blog

El autor solo describe de qué quiere hablar. Tú haces las preguntas, investigas, propones y redactas. El resultado es un post listo en `content/blog/<slug>/` que pasa el build, con cada afirmación respaldada por una fuente o por la experiencia del autor.

**Principio:** nada inventado. Ninguna cifra, cita, cliente, resultado ni anécdota sale de tu cabeza. Lo que no viene de una fuente verificada o del autor, no va en el artículo.

Antes de empezar, lee `content/blog/README.md` (formato y frontmatter) y aplica la skill `critical-thinking`.

## Flujo

Sigue las fases en orden. No pases de fase sin lo que pide cada una.

### 1. Entender la idea

Lee lo que describió el autor y resume en 2–3 líneas qué entendiste: tema, para quién y qué debería pasar después de leerlo. Si algo es ambiguo, dilo.

### 2. Entrevista

Haz las preguntas de `references/preguntas.md` en rondas cortas:

- **Ronda 1, decisiones** (con AskUserQuestion: máximo 4 preguntas por llamada, 2–4 opciones cada una, la recomendada primero): tipo de post, lector, objetivo y CTA, idiomas.
- **Ronda 2, experiencia propia** (en texto libre, porque no tiene opciones): qué hizo, cifras reales, qué salió mal, qué aprendió, qué se puede nombrar.
- **Ronda 3, ángulo y alcance:** qué postura toma, qué deja fuera, qué palabras usaría el lector para buscarlo.

No preguntes lo que ya dijo ni lo que puedes averiguar tú. Si responde "no sé", propón una opción con tu razón y sigue.

### 3. Investigación

Sigue `references/fuentes.md`:

- Haz varias búsquedas en paralelo: definiciones, datos, estado actual, opiniones contrarias, qué ya está publicado sobre el tema.
- Para cada afirmación de peso, busca **al menos 2 fuentes independientes y fiables**. Lee la fuente original; no te quedes con un resumen.
- Arma una **tabla de evidencia**: afirmación → fuente(s) → fecha → nivel de confianza. Lo que no tenga respaldo se reformula como opinión del autor o se quita.
- Mira qué hay publicado sobre el tema para encontrar el hueco: qué puede aportar el autor que no esté ya en internet. Suele ser su experiencia.

### 4. Propuesta para aprobar

Antes de redactar, presenta en un solo mensaje:

- **3 títulos** (≤ 60 caracteres, con la palabra clave al principio), con el recomendado marcado y la razón.
- **Descripción** (≤ 155 caracteres; el build corta en 160).
- **Slug** en kebab-case, en inglés, corto y estable.
- **Esquema:** los H2 escritos como preguntas, con una línea de qué responde cada uno y qué fuente o vivencia lo sostiene.
- **3–5 takeaways** con cifras cuando las haya.
- **Tags** (2–4, kebab-case; reutiliza los que ya existen en `content/blog/*/en.mdx` para que funcionen los relacionados).
- La **tabla de evidencia** y lo que quedó sin respaldo.

Espera la aprobación. Si pide cambios, ajusta la propuesta y vuelve a mostrarla.

### 5. Redacción

Sigue `references/redaccion.md`:

- Escribe primero `en.mdx` (idioma primario), en inglés nativo.
- Después `es.mdx`: una adaptación natural en español, no una traducción literal. Mismo slug, misma estructura y los mismos H2, traducidos.
- Cita en línea con enlaces y cierra con la sección `## Sources` / `## Fuentes`.
- `draft: true` siempre. Solo el autor decide publicar.

### 6. Portada

El post necesita `cover` de 1200×630. Pregunta si el autor tiene una imagen (captura del proyecto, foto, diagrama). Si no tiene, avísale que falta; no la inventes ni uses imágenes de terceros sin licencia. Para que el build pase mientras tanto, puedes copiar `content/blog/how-this-blog-is-built/cover.jpg` como provisional y dejarlo dicho.

### 7. Verificación

1. `npm run build`: debe pasar (valida el frontmatter). Si falla, corrige lo que diga el error.
2. Con `npm run dev`, abre `/blog/<slug>` y `/es/blog/<slug>` (los borradores se ven en dev) y revisa con capturas que el índice, los componentes y el código se vean bien.
3. Repasa la tabla de evidencia contra el texto final: cada cifra y cada afirmación tiene su fuente o es vivencia del autor.
4. Lista de revisión de `references/redaccion.md`.

### 8. Entrega

Resume en el chat:

- Ruta de los archivos.
- Título, descripción y slug finales.
- Fuentes usadas.
- Lo que el autor debe confirmar: cifras que dio de memoria, nombres de clientes, portada provisional.
- Cómo publicar: cambiar `draft: true` a `false` en ambos archivos y hacer push.

No hagas commit ni cambies `draft` sin que lo pida.
