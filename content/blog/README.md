# Blog

Cada post es una carpeta `content/blog/<slug>/`. El nombre de la carpeta es la URL (`/blog/<slug>`), en kebab-case.

```
<slug>/
  en.mdx      ← obligatorio (idioma primario)
  es.mdx      ← opcional; si falta, /es/blog lo lista con el aviso "Disponible en inglés"
  cover.webp  ← 1200×630 (también sirve .jpg/.png)
```

Las carpetas que empiezan con `_` se ignoran.

## Frontmatter

```yaml
---
title: Título del post (es el H1 y el <title>)
description: Resumen para Google y para el lede, máximo 160 caracteres.
date: 2026-11-12T09:00:00-06:00   # o solo 2026-11-12 (se toma mediodía de Costa Rica)
updated: 2026-11-20               # opcional
kind: case-study                  # case-study | guide | note
tags: [automation, ai-agents]     # kebab-case; definen los relacionados
cover: ./cover.webp
coverAlt: Qué se ve en la portada
takeaways:                        # 1 a 5 frases cortas, con cifras si las hay
  - Primer punto clave.
featured: false                   # true lo fija como destacado
draft: true                       # se ve en `npm run dev`, no se publica
---
```

Si un campo falta o no cumple, `npm run build` falla e indica el archivo y el campo.

## Cuerpo

- Los `##` son las secciones: arman el índice "En esta página". Escríbelos como preguntas y responde en la primera frase.
- Bloques de código con nombre de archivo: ` ```ts title="archivo.ts" `.
- Componentes disponibles sin importar nada:
  - `<Stats items={[{ value: '4 h', label: 'de onboarding' }]} />`
  - `<Faq items={[{ question: '¿…?', answer: '…' }]} />`
