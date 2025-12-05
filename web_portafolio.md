# Perfil Profesional

Isaac Ramírez es estudiante de Ingeniería en Computación en el TEC de Costa Rica y desarrollador de software apasionado por la automatización, transformación digital y la construcción de soluciones innovadoras que resuelven problemas del mundo real.

**Idioma:** Inglés Avanzado (B2/C1)

---

## Sobre mí

Soy estudiante de Ingeniería en Computación en el TEC de Costa Rica, profundamente apasionado por la automatización de procesos y la transformación digital. Mi camino en la tecnología está impulsado por un deseo constante de aprender y crear soluciones que marquen la diferencia.

### Motivación y Objetivos

Mi objetivo es aprovechar la tecnología para automatizar procesos, optimizar flujos de trabajo e impulsar la transformación digital en todas las industrias. Creo en el poder de la innovación para resolver problemas complejos y mejorar la vida de las personas.

---

## Proyectos

### 1. Aplicación Móvil de Avalúos
**Categoría:** Proyecto Profesional

**Descripción:**
Solución móvil híbrida desarrollada para una empresa profesional de valuación para optimizar operaciones en campo. La aplicación permite que los peritos trabajen en ubicaciones remotas sin conexión a internet, manteniendo todas las funcionalidades.

**Problema que resuelve:**
Tasadores de campo necesitan completar formularios dinámicos sin conexión a internet y sincronizar datos cuando se restaura la conectividad.

**Características clave:**
- Arquitectura offline-first para trabajo de campo sin interrupciones
- Generación de formularios dinámicos usando Formly
- Sincronización automática de datos cuando está en línea
- Captura de fotos y gestión de archivos adjuntos
- Seguimiento de ubicación GPS
- Soporte multiidioma

**Tecnologías utilizadas:**
- Angular + Capacitor (Frontend móvil multiplataforma)
- Formly (Generación de formularios dinámicos)
- TypeScript
- SQLite (Almacenamiento local)
- Redux (Gestión de estado)
- React Navigation

**Desafíos técnicos resueltos:**
- Gestión de datos offline con SQLite para manejar estructuras de datos complejos
- Renderizado de formularios dinámicos que se adaptan a diferentes tipos de avalúos
- Consistencia multiplataforma en iOS y Android

---

### 2. Sistema Anti-Spoofing Facial
**Categoría:** Proyecto de IA/ML

**Descripción:**
Solución impulsada por IA para prevenir la falsificación de identidad mediante la detección de ataques de presentación en sistemas de reconocimiento facial.

**Problema que resuelve:**
Ataques de presentación (spoofing) en sistemas de reconocimiento facial representan un desafío crítico de seguridad que puede comprometer la autenticación biométrica.

**Características clave:**
- Detección de ataques de presentación en tiempo real
- Alta precisión con baja tasa de falsos positivos
- Modelo ligero para despliegue en edge
- Detección de suplantación multimodal
- Integración con sistemas de autenticación existentes
- Pipeline de mejora continua del modelo

**Tecnologías utilizadas:**
- Python
- TensorFlow (Framework de Deep Learning)
- OpenCV (Visión por Computadora)
- Arquitectura CNN (Redes Neuronales Convolucionales)
- Data Augmentation (Aumentación de datos)

**Desafíos técnicos resueltos:**
- Detección robusta de varios tipos de ataques: impresiones, repeticiones y ataques con máscaras
- Optimización de arquitectura del modelo para procesamiento en tiempo real sin sacrificar precisión
- Generalización del modelo en diferentes condiciones de iluminación, calidades de cámara y grupos demográficos

---

### 3. Detección Inteligente de Estado de Carritos
**Categoría:** Proyecto de Visión por Computadora

**Descripción:**
Sistema de análisis de video en tiempo real para detectar y rastrear el estado de carritos en entornos industriales. El proyecto automatiza el proceso de llenado de tubos con semillas y productos, monitoreando carritos a medida que avanzan por diferentes etapas.

**Problema que resuelve:**
Automatización del proceso industrial de llenado de tubos, rastreando carritos desde vacíos hasta llenos para optimizar el proceso de producción.

**Estados del sistema:**
1. **Plataforma Vacía:** La plataforma está lista, esperando que se coloque un carrito
2. **Carrito Vacío:** Carrito con 6 espacios vacíos posicionado en la plataforma
3. **Carrito Incompleto:** Contiene entre 1 y 5 tubos de ensayo (proceso en curso)
4. **Carrito Completo:** Los 6 espacios llenos, listo para sellado y análisis de calidad

**Características clave:**
- Detección de estado de carrito en tiempo real
- Muestreo eficiente de frames de video
- Técnicas avanzadas de seguimiento de objetos
- ROI personalizable para análisis enfocado
- Análisis detallado y visualizaciones
- Compatibilidad multiplataforma

**Tecnologías utilizadas:**
- Python
- YOLOv8 (Detección de objetos)
- OpenCV (Procesamiento de imágenes)
- FastAPI (Backend)
- React (Frontend)
- Computer Vision (IA/ML)

**Desafíos técnicos resueltos:**
- Optimización de tasa de muestreo para balance entre velocidad y precisión
- Seguimiento robusto de múltiples carritos simultáneamente
- Rendimiento en tiempo real con arquitectura optimizada

**Nota sobre el dataset:**
El modelo fue entrenado con únicamente 260 imágenes debido a daños en la cinta transportadora. A pesar de esta limitación, el sistema muestra resultados prometedores y es altamente probable que su desempeño mejore significativamente con un conjunto de datos más amplio.

---

### 4. Sistema de Reconocimiento Facial con Weaviate y TensorFlow (CRPS)
**Categoría:** Proyecto de IA/ML

**Descripción:**
Sistema integral de reconocimiento facial en tiempo real que combina técnicas avanzadas de visión por computadora y bases de datos vectoriales para identificar y buscar rostros de manera eficiente en vigilancia, control de acceso y autenticación de usuarios.

**Problema que resuelve:**
Identificación rápida y precisa de rostros en escenarios del mundo real, manejando diversos factores como diferentes ángulos faciales, oclusiones, condiciones de iluminación variables y la necesidad de hacer coincidir rostros con un gran conjunto de datos de identidades conocidas.

**Características clave:**
- Detección facial en tiempo real con YuNet
- Embeddings faciales robustos usando FaceNet
- Búsqueda por similitud vectorial con Weaviate
- Interfaz gráfica de usuario construida con PyQt
- Almacenamiento encriptado de datos de usuario
- Procesamiento de video multi-hilo

**Tecnologías utilizadas:**
- YuNet (Detección facial precisa en condiciones desafiantes)
- FaceNet (Generación de embeddings faciales robustos)
- Weaviate (Base de datos vectorial para búsqueda por similitud)
- PyQt (Framework GUI)
- Python
- Encriptación (Seguridad)

**Desafíos técnicos resueltos:**
- Detección facial robusta en condiciones con ángulos variables, oclusiones e iluminación
- Búsqueda por similitud eficiente en grandes conjuntos de datos usando Weaviate
- Arquitectura multi-hilo para rendimiento en tiempo real sin bloqueos

---

### 5. iFixIt - Plataforma de Gestión de Talleres
**Categoría:** Proyecto Universitario

**Descripción:**
Plataforma integral web y móvil para la gestión de talleres automotrices, diseñada para modernizar las operaciones de talleres conectando clientes, técnicos y gerentes a través de interfaces intuitivas.

**Problema que resuelve:**
Talleres automotrices necesitan gestión eficiente de citas, seguimiento de ubicación de técnicos móviles, historial de servicios y comunicación automatizada con clientes.

**Características clave:**
- Seguimiento de ubicación en tiempo real para técnicos móviles
- Programación y gestión de citas
- Historial y seguimiento de servicios
- Portal de cliente para solicitudes de servicio
- Interfaces móvil y web
- Notificaciones y recordatorios automatizados
- Búsqueda instantánea por placas de vehículos
- Sistema de estados que notifica progreso del mantenimiento
- Galería visual para documentar estado del vehículo
- Historial de notas y observaciones
- App móvil nativa iOS y Android para clientes

**Tecnologías utilizadas:**
- PostgreSQL (Base de datos)
- Node.js (Backend)
- React (Frontend)
- Tailwind CSS (Estilos)
- Google Maps API (Integración de mapas)
- WebSockets (Comunicación en tiempo real)

**Desafíos técnicos resueltos:**
- Seguimiento de ubicación en tiempo real eficiente con impacto mínimo en batería
- Sistema de programación inteligente que optimiza rutas y minimiza tiempo de viaje
- Gestión integral del ciclo de vida completo del servicio

---

### 6. Pura Compra - Intermediario de E-commerce
**Categoría:** Proyecto Universitario (Plataforma en Producción)

**Descripción:**
Plataforma intermediaria de e-commerce que simplifica las compras en línea al agregar productos de múltiples tiendas en una única interfaz unificada. Diseñada y desplegada para uso real.

**Problema que resuelve:**
Los usuarios deben navegar entre diferentes sitios web para comparar precios y completar compras. Esta plataforma unifica la experiencia de compra.

**Características clave:**
- Integración multi-tienda
- Comparación de precios en tiempo real
- Proceso de checkout unificado
- Agregación de catálogo de productos
- Sincronización de carrito de compras
- Seguimiento de pedidos entre tiendas
- Sistema de pagos con pasarelas seguras
- Panel de administración para gestión de productos, pedidos y usuarios
- Gestor de direcciones para múltiples direcciones de envío
- Selector de colores para variantes de productos
- Web scraping para extracción automática de información
- Cotizaciones automáticas

**Tecnologías utilizadas:**
- SQL (Base de datos)
- Node.js (Backend)
- Sequelize (ORM)
- React (Frontend)
- Tailwind CSS (Estilos)
- REST API (Integración)

**Desafíos técnicos resueltos:**
- Capa de integración flexible que conecta con múltiples tiendas con diferentes formatos de datos y APIs
- Algoritmos de comparación de precios en tiempo real que consideran envío, impuestos y ofertas
- Experiencia de compra fluida que abstrae la complejidad de comprar en múltiples tiendas

---

## Servicios / Áreas de experiencia

### 1. IA y Visión por Computadora
Construcción de sistemas de detección, clasificación e inferencia usando frameworks modernos de ML, optimización de modelos y decisiones basadas en datos. Experiencia en reconocimiento facial, anti-spoofing, detección de objetos y análisis de video en tiempo real.

### 2. Plataformas Inteligentes y Automatización
Desarrollo de herramientas que conectan usuarios, datos y flujos de trabajo reduciendo errores humanos y optimizando procesos complejos. Implementación de soluciones que automatizan procesos industriales y empresariales.

### 3. Nube e Infraestructura
Despliegue de sistemas resilientes y pipelines eficientes usando AWS, Docker y principios de arquitectura distribuida. Experiencia en diseño de arquitecturas escalables y mantenimiento de sistemas en producción.

### 4. Desarrollo Full-Stack
Creación de aplicaciones web y móviles completas, desde el diseño de bases de datos hasta interfaces de usuario. Implementación de soluciones offline-first, sincronización de datos y experiencias multiplataforma.

### 5. Desarrollo Móvil
Desarrollo de aplicaciones móviles híbridas y nativas para iOS y Android con arquitecturas offline-first, formularios dinámicos y sincronización de datos.

---

## Tecnologías

### Frontend
- **Web:** React, TypeScript, Tailwind CSS
- **Móvil:** React Native, Nativewind, Angular + Capacitor
- **Frameworks de formularios:** Formly

### Backend
- **Lenguajes:** Node.js, Python, TypeScript
- **Frameworks:** FastAPI, Express
- **APIs:** REST, GraphQL

### Bases de Datos
- **Relacionales:** PostgreSQL, SQL, SQLite
- **Vector Databases:** Weaviate
- **ORMs:** Sequelize, Redux

### IA / Machine Learning
- **Frameworks:** TensorFlow, YOLOv8, FaceNet
- **Técnicas:** Deep Learning, CNN, Computer Vision
- **Herramientas:** OpenCV, YuNet
- **Aplicaciones:** Reconocimiento Facial, Anti-Spoofing, Detección de Objetos, Clasificación de Imágenes

### DevOps / Infraestructura
- **Cloud:** AWS (CloudWatch, Cognito), Google Cloud Platform (VMs, Firewall, Storage), Microsoft Azure
- **Contenedores:** Docker, Heroku
- **Sistemas Operativos:** Linux (Arch, Ubuntu, Fedora, Kali, Manjaro, EndevourOS), macOS, Windows

### Otras Herramientas
- **Tiempo Real:** WebSockets
- **Mapas:** Google Maps API
- **GUI:** PyQt
- **Seguridad:** Encriptación de datos
- **Gestión de Estado:** Redux
- **Navegación:** React Navigation

---

## Habilidades

### Habilidades Técnicas
- Desarrollo Full-Stack (React, Node.js, TypeScript)
- Desarrollo Móvil (React Native, Nativewind)
- Diseño de Bases de Datos (PostgreSQL, SQL, Bases de Datos Vectoriales)
- Computación en la Nube (AWS, Google Cloud, Azure)
- IA/ML (Reconocimiento Facial, Anti-Spoofing, Optimización de Modelos)
- DevOps y Administración de Sistemas (Linux, Docker, Heroku)
- Desarrollo de APIs (REST, GraphQL)

### Habilidades Blandas
- Resolución de Problemas y Pensamiento Crítico
- Colaboración en Equipo y Liderazgo
- Adaptabilidad y Aprendizaje Rápido
- Comunicación Efectiva
- Gestión de Proyectos
- Atención al Detalle
- Inglés Avanzado (B2/C1)

---

## Mensajes clave

### Innovación en la Práctica
"Donde la ingeniería se encuentra con el impacto real construyendo sistemas inteligentes y escalables desde el prototipo hasta la producción."

### Enfoque de Trabajo
- **Automatización:** Apasionado por automatizar procesos, optimizar flujos de trabajo e impulsar la transformación digital
- **Innovación:** Creo en el poder de la innovación para resolver problemas complejos y mejorar la vida de las personas
- **Aprendizaje continuo:** Deseo constante de aprender y crear soluciones que marquen la diferencia
- **Soluciones reales:** Construcción de soluciones innovadoras que resuelven problemas del mundo real

### Propuesta de Valor
- Construcción de sistemas de IA que toman decisiones basadas en datos
- Desarrollo de plataformas que reducen errores humanos y optimizan procesos
- Despliegue de sistemas resilientes con arquitecturas distribuidas
- Capacidad de trabajar desde el prototipo hasta la producción
- Desarrollo de soluciones multiplataforma (web, móvil, desktop)
- Implementación de arquitecturas offline-first para trabajo en campo
- Optimización de modelos de ML para funcionamiento con datasets limitados

### Áreas de Especialización
1. **IA y Visión por Computadora:** Sistemas de detección, clasificación e inferencia con frameworks modernos de ML
2. **Plataformas Inteligentes:** Herramientas que conectan usuarios, datos y flujos de trabajo
3. **Nube e Infraestructura:** Sistemas resilientes y pipelines eficientes en AWS y Docker

---

## Experiencia en Cloud y Sistemas Operativos

### Experiencia en la Nube
- **Amazon Web Services (AWS):** CloudWatch, Cognito
- **Google Cloud Platform (GCP):** VMs, Firewall, Storage
- **Microsoft Azure**

### Sistemas Operativos
- **Linux:** Distribuciones Arch, Ubuntu, Fedora, Kali, Manjaro, EndevourOS
- **Otros:** macOS, Windows

---

## Casos de Uso Destacados

### Optimización con Datasets Limitados
En el proyecto de Detección de Estado de Carritos, el modelo fue entrenado con solo 260 imágenes debido a limitaciones de hardware. A pesar de esta restricción, el sistema demuestra resultados prometedores, evidenciando capacidad de optimización de modelos con recursos limitados.

### Arquitecturas Offline-First
La Aplicación Móvil de Avalúos implementa una arquitectura offline-first robusta que permite a tasadores trabajar en ubicaciones remotas sin internet, garantizando integridad de datos y sincronización fluida.

### Sistemas en Tiempo Real
Múltiples proyectos implementan procesamiento en tiempo real:
- Detección facial y reconocimiento con video streaming
- Seguimiento de ubicación GPS de técnicos móviles
- Análisis de video para detección de objetos
- Arquitecturas multi-hilo para rendimiento sin bloqueos

### Integración Multi-Sistema
Pura Compra demuestra capacidad de integración con múltiples APIs y normalización de datos de diferentes fuentes para crear experiencias unificadas.

---

## Formación

**Estudiante de Ingeniería en Computación**
TEC de Costa Rica (Tecnológico de Costa Rica)

---

## Información de Contacto

**Nombre:** Isaac Ramírez (Isaac Ramírez Rojas)
**Ubicación:** Costa Rica
**Idiomas:** Español (Nativo), Inglés Avanzado (B2/C1)

---

*Todos los proyectos demuestran competencia en desarrollo full-stack, arquitectura de sistemas, optimización de modelos de ML y creación de soluciones centradas en el usuario desde el prototipo hasta la producción.*
