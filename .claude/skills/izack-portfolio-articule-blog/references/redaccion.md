# Redacción y formato

## Estructura del post

1. **Frontmatter** completo (ver abajo).
2. **Primer H2 = la pregunta principal del lector**, respondida en la primera frase. Los takeaways ya salen arriba, solos, desde el frontmatter; no los repitas en el cuerpo.
3. **4–6 H2 en forma de pregunta**, cada uno con la respuesta directa en su primera oración y el detalle después. Es la estructura que mejor citan Google y los motores de IA, y arma el índice "On this page".
4. H3 solo para dividir un H2 largo. Nunca un H1 en el cuerpo: el título ya es el H1.
5. `<Stats />` cuando haya 2–4 cifras clave; `<Faq />` para 2–4 preguntas que haría un cliente.
6. Cierre: qué hacer con esto. El CTA de contacto ya lo pone la página; no lo repitas.
7. `## Sources` / `## Fuentes` al final.

**Largo:** caso de estudio 900–1.600 palabras, guía 1.200–2.000, nota 400–800. Más largo no es mejor: corta lo que no responde una pregunta del lector.

## Frontmatter

```yaml
---
title: ≤ 60 caracteres, con la palabra clave al principio; promete algo concreto
description: ≤ 155 caracteres; qué aprende el lector y para quién. Es el snippet de Google y el lede
date: AAAA-MM-DDT09:00:00-06:00
kind: case-study | guide | note
tags: [kebab-case, 2-a-4]
cover: ./cover.webp
coverAlt: lo que se ve en la imagen, no "portada del post"
takeaways:
  - 3 a 5 frases que se entienden solas, con la cifra cuando la haya
draft: true
---
```

`updated` solo al editar un post ya publicado. `featured: true` solo si el autor lo pide.

## Estilo

Escribe como una persona que sabe del tema y se lo explica a un cliente inteligente:

- Frases cortas y voz activa. Primera persona del autor ("I", "yo"; "we" cuando hubo equipo).
- Concreto antes que abstracto: el ejemplo, la cifra, el nombre de la herramienta.
- Una idea por párrafo, de 2–4 oraciones.
- Términos técnicos explicados la primera vez si el lector no es técnico.
- **Evita las marcas de texto generado por IA:** apartes entre rayas, el esquema "no es X, es Y", frases de dos puntos con revelación, palabras infladas ("revolucionario", "potenciar", "en el mundo actual", "sin lugar a dudas", "delve", "leverage", "game-changer"), comillas irónicas y cierres del tipo "en conclusión". El autor ya lo señaló en otras páginas: suena "pura AI".
- **Inglés:** natural y directo, sin calcos del español.
- **Español:** neutro latinoamericano, tuteo, sin "vosotros". Adapta los ejemplos si hace falta; no traduzcas palabra por palabra.

## Neuromarketing (ético)

- El título y la primera frase responden lo que el lector busca: nada de suspenso para retenerlo.
- Prueba antes que promesa: cifras, capturas y lo que salió mal dan más credibilidad que los adjetivos.
- Nada de urgencia falsa, escasez inventada ni "solo hoy".

## Componentes disponibles en el MDX

```mdx
<Stats items={[{ value: '4 h', label: 'onboarding, down from 3 days' }]} />

<Faq items={[{ question: 'Does it work with our CRM?', answer: 'Yes, if…' }]} />
```

Código con nombre de archivo: ` ```ts title="onboarding.flow.ts" `. Tablas markdown normales (GFM). Imágenes dentro del post: guárdalas en la carpeta del post y enlázalas con ruta relativa.

## Lista de revisión antes de entregar

- [ ] `npm run build` pasa.
- [ ] El título tiene ≤ 60 caracteres y la descripción ≤ 155.
- [ ] Cada H2 es una pregunta y su primera frase la responde.
- [ ] Cada cifra y cada afirmación externa tiene enlace en línea y aparece en Sources/Fuentes.
- [ ] Ninguna cifra, cita, cliente o resultado sale de otro lado que no sea una fuente o el autor.
- [ ] Los nombres de clientes o empresas tienen permiso del autor.
- [ ] `en.mdx` y `es.mdx` tienen el mismo slug, los mismos tags y los mismos H2, traducidos.
- [ ] `coverAlt` describe la imagen; la portada es de 1200×630.
- [ ] `draft: true`.
- [ ] Capturas en dev de `/blog/<slug>` y `/es/blog/<slug>`, revisadas con ojo crítico.
