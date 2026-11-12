# Eventos de GA4, UTMs y tráfico entre sitios

El sitio empuja eventos al `dataLayer` de Tag Manager (`src/utils/analytics.ts`). GTM los
reenvía a GA4 con **una sola etiqueta**. Contenedor: `GTM-5M27LJ6D` · GA4: `G-NN9J8V5D1Z`.

## Eventos

Todos llevan los mismos tres parámetros (vacíos cuando no aplican):
`ui_location` (dónde), `item_name` (sobre qué) y `link_url` (destino).

| Evento | Cuándo | Parámetros |
|---|---|---|
| `chat_open` | Se abre Max | `ui_location`: `navbar_right` / `navbar_left` |
| `chat_message` | El visitante envía un mensaje (solo se cuenta, nunca el texto) | — |
| `chat_new_conversation` | Botón de nueva conversación | — |
| `chat_link_click` | Clic en un enlace que dio Max | `link_url` (sin UTMs) |
| `contact_form_start` | Primer foco en el formulario de contacto | — |
| `contact_send` | Clic en enviar (abre el correo del visitante) | — |
| `contact_copy_email` | Copió el correo | — |
| `project_open` | "Ver caso" en el carrusel | `item_name`: id del proyecto |
| `project_visit_site` | "Visitar sitio" en el carrusel | `item_name`, `link_url` |
| `language_change` | Cambió el idioma | `item_name`: `es` / `en` / `ko` |
| `cookie_choice` | Decidió en el aviso de cookies | `item_name`: `accept_all`, `reject_all`, `custom_analytics_on`, `custom_analytics_off` |

GA4 ya mide solo (Enhanced Measurement): páginas vistas, scroll, **clics salientes** y
**descargas de archivos** (el CV). No se duplican.

## Configurar Tag Manager (una vez)

1. **Variables → Nueva → Variable de capa de datos**, tres veces:
   `DLV ui_location` (nombre `ui_location`), `DLV item_name` (`item_name`), `DLV link_url` (`link_url`).
2. **Activadores → Nuevo → Evento personalizado**, nombre `Eventos izackk`:
   - Nombre del evento, con **"Usar coincidencia de expresión regular"** marcado:
     `^(chat_open|chat_message|chat_new_conversation|chat_link_click|contact_form_start|contact_send|contact_copy_email|project_open|project_visit_site|language_change|cookie_choice)$`
3. **Etiquetas → Nueva → Google Analytics: evento de GA4**:
   - ID de medición: `G-NN9J8V5D1Z`
   - Nombre del evento: `{{Event}}`
   - Parámetros: `ui_location` → `{{DLV ui_location}}`, `item_name` → `{{DLV item_name}}`, `link_url` → `{{DLV link_url}}`
   - Activador: `Eventos izackk`
4. **Vista previa** con Tag Assistant en `https://www.izackk.com`, abre Max y envía algo: deben verse
   `chat_open` y `chat_message`. Después **Enviar → Publicar**.

## Configurar GA4 (una vez)

1. **Administrar → Definiciones personalizadas → Crear dimensión**, alcance *Evento*:
   `ui_location` y `item_name`. (`link_url` ya existe como dimensión "URL del enlace".)
2. **Administrar → Eventos clave**: marca `contact_send` y `chat_message` para medirlos como conversiones.
3. Los informes tardan hasta 24 h. Para verlo al instante: **Informes → Tiempo real**.

## Tráfico que sale (ya implementado)

Los enlaces a sitios propios llevan UTMs automáticamente (`src/utils/utm.ts`, dominios en
`src/constants/analytics.ts`):

| Desde | Ejemplo |
|---|---|
| Carrusel de la Home | `?utm_source=izackk.com&utm_medium=portfolio&utm_campaign=home_carousel&utm_content=theGrowthPath` |
| Enlaces de Max | `?utm_source=izackk.com&utm_medium=max_chat&utm_campaign=max` |

En el GA4 de The Growth Path: **Adquisición → Adquisición de tráfico**, dimensión
*Origen / medio de la sesión*: aparecen `izackk.com / portfolio` y `izackk.com / max_chat`.

## Tráfico que entra (para poner a mano)

Usa estos enlaces donde apuntes a tu sitio. En tu GA4 aparecen en *Origen / medio de la sesión*.

| Dónde | Enlace |
|---|---|
| LinkedIn (sitio web del perfil) | `https://www.izackk.com/?utm_source=linkedin&utm_medium=social&utm_campaign=profile` |
| GitHub (README del perfil) | `https://www.izackk.com/?utm_source=github&utm_medium=social&utm_campaign=profile` |
| CV en español (PDF) | `https://www.izackk.com/?utm_source=cv&utm_medium=document&utm_campaign=cv_es` |
| CV en inglés (PDF) | `https://www.izackk.com/?utm_source=cv&utm_medium=document&utm_campaign=cv_en` |
| Footer de The Growth Path | `https://www.izackk.com/?utm_source=thegrowth-path.com&utm_medium=referral&utm_campaign=footer` |
| Firma de correo | `https://www.izackk.com/?utm_source=email&utm_medium=signature&utm_campaign=firma` |

Reglas: todo en minúsculas, `utm_source` = quién envía, `utm_medium` = tipo de canal,
`utm_campaign` = qué enlace concreto. Usa siempre `https://www.izackk.com` (el dominio sin
`www` redirige y conserva la query, pero así evitas un salto).
