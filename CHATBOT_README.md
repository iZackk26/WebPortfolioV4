# Chatbot Implementation

Este documento describe la implementación del chatbot flotante "Max" en el portfolio.

## Estructura de Archivos

```
src/
├── components/
│   └── Chatbot/
│       ├── index.tsx           # Componente principal
│       ├── ChatButton.tsx      # Botón flotante
│       ├── ChatWindow.tsx      # Ventana de chat
│       ├── ChatMessage.tsx     # Mensajes individuales
│       └── ChatInput.tsx       # Input de texto
├── hooks/
│   └── useChatbot.ts          # Hook personalizado para lógica del chat
└── services/
    └── chatbot.ts             # Servicio de API
```

## Configuración

### Variables de Entorno

Crea o edita el archivo `.env` en la raíz del proyecto:

```env
VITE_CHATBOT_API_URL=https://izackk26.app.n8n.cloud/webhook/[TU_WEBHOOK_ID]
VITE_CHATBOT_API_KEY=[TU_API_KEY]
```

Reemplaza:
- `[TU_WEBHOOK_ID]`: ID del webhook de n8n
- `[TU_API_KEY]`: Tu API key para autenticación

### Integración en la App

El chatbot ya está integrado en `src/App.tsx`:

```tsx
import { Chatbot } from './components/Chatbot';

function App() {
  return (
    <Router>
      {/* ... otros componentes ... */}
      <Chatbot />
    </Router>
  );
}
```

## Características

### 1. Botón Flotante
- Posición fija en la esquina inferior derecha
- Animación de entrada con efecto spring
- Efecto pulse continuo para llamar la atención
- Icono que cambia entre MessageCircle y X
- Punto de notificación rojo cuando está cerrado

### 2. Ventana de Chat
- **Dimensiones**: 380px × 500px en desktop, pantalla completa en móvil
- **Animaciones**: Slide up + fade in con Framer Motion
- **Header**: Avatar de "Max", nombre y subtítulo
- **Área de mensajes**:
  - Auto-scroll al último mensaje
  - Scrollbar personalizada
  - Mensajes del usuario (azul/púrpura, derecha)
  - Mensajes del bot (gris oscuro, izquierda)
  - Indicador de "escribiendo..."
- **Input**:
  - Envío con Enter
  - Se deshabilita mientras espera respuesta

### 3. Persistencia de Datos
- **sessionId**: Se genera una vez y se guarda en `localStorage`
- **Mensajes**: Se guardan en `sessionStorage` para no perderlos al recargar

### 4. Manejo de Errores
- Mensajes de error amigables
- Reintentos automáticos en caso de fallo
- Mensaje de bienvenida por defecto

### 5. Soporte de Markdown
El componente soporta markdown básico en las respuestas:
- **Negritas**: `**texto**`
- *Cursivas*: `*texto*`
- Listas: `- item`

## Tema "Kanagawa Wave"

Colores utilizados:
- Background oscuro: `#1a1b26`, `#24283b`, `#1f2335`
- Bordes: `#414868`
- Texto: `#c0caf5`
- Gradientes: `#7aa2f7` → `#bb9af7`
- Texto secundario: `#565f89`

## API Endpoint

### Request
```typescript
POST https://izackk26.app.n8n.cloud/webhook/[WEBHOOK_ID]
Headers:
  Content-Type: application/json
  X-API-Key: [API_KEY]

Body:
{
  "question": "mensaje del usuario",
  "sessionId": "uuid-v4"
}
```

### Response
```typescript
{
  "response": "respuesta del bot",
  "success": true
}
```

## Uso del Hook

```tsx
import { useChatbot } from '../hooks/useChatbot';

function MyComponent() {
  const {
    messages,       // Array de mensajes
    isLoading,      // Estado de carga
    isOpen,         // Chat abierto/cerrado
    error,          // Error si hay
    sendMessage,    // Función para enviar mensaje
    toggleChat,     // Abrir/cerrar chat
    closeChat,      // Cerrar chat
    openChat,       // Abrir chat
    clearChat,      // Limpiar historial
  } = useChatbot();
}
```

## Responsive Design

- **Desktop**: Botón flotante 64×64px, ventana 380×500px
- **Mobile**: Botón flotante 56×56px, ventana ocupa casi toda la pantalla
- **Backdrop**: Overlay oscuro en móvil para mejor UX

## Accesibilidad

- Botones con `aria-label` apropiados
- Contraste de colores optimizado
- Teclado navegable (Enter para enviar)
- Focus visible en inputs

## Próximas Mejoras

- [ ] Soporte para archivos adjuntos
- [ ] Historial de conversaciones múltiples
- [ ] Modo oscuro/claro
- [ ] Soporte para emojis
- [ ] Indicador de mensajes sin leer
- [ ] Sonido de notificación
- [ ] Sugerencias de preguntas rápidas

## Troubleshooting

### El chatbot no aparece
1. Verifica que `<Chatbot />` esté en `App.tsx`
2. Revisa la consola del navegador por errores

### Las respuestas no llegan
1. Verifica las variables de entorno en `.env`
2. Comprueba la configuración del webhook en n8n
3. Revisa la Network tab para ver errores de red

### Los mensajes no persisten
1. Verifica que `sessionStorage` esté habilitado
2. Comprueba que no haya errores en la consola

## Licencia

Este componente es parte del portfolio personal de Isaac.
