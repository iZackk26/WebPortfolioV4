# Assets & Media Guide

Esta guía te indica dónde colocar todos los archivos de imágenes, PDFs y otros recursos del portfolio.

## 📁 Estructura de Carpetas

```
/public/
├── cv-en.pdf          # CV en inglés
├── cv-es.pdf          # CV en español
├── og-image.jpg       # Imagen Open Graph (1200x630px)
├── favicon.ico        # Favicon principal (32x32px)
├── robots.txt         # ✅ Ya existe
├── sitemap.xml        # ✅ Ya existe
└── icons/             # Carpeta para iconos de certificaciones
    ├── aws.svg
    ├── gcp.svg
    ├── azure.svg
    ├── snowflake.svg
    ├── databricks.svg
    ├── oracle.svg
    ├── archlinux.svg
    ├── ubuntu.svg
    ├── fedora.svg
    ├── kalilinux.svg
    ├── manjaro.svg
    ├── endeavouros.svg
    ├── macos.svg
    └── windows.svg
```

---

## 📄 CVs / Currículums

### Ubicación
Coloca los PDFs en: **`/public/`**

### Nombres de Archivo EXACTOS
- **CV en Inglés:** `cv-en.pdf`
- **CV en Español:** `cv-es.pdf`

### Código de Referencia
**Archivo:** `/src/pages/About.tsx`
```typescript
const cvPath = i18n.language === 'es' ? '/cv-es.pdf' : '/cv-en.pdf';
link.download = i18n.language === 'es' ? 'CV-Spanish.pdf' : 'CV-English.pdf';
```
- **Línea 16:** Define la ruta del CV según el idioma
- **Línea 19:** Define el nombre del archivo al descargar

---

## 🎖️ Iconos de Certificaciones

### Ubicación
Crea la carpeta y coloca los SVGs en: **`/public/icons/`**

### Nombres de Archivo EXACTOS

#### Cloud Providers
| Certificación | Nombre del Archivo | Referencia en Código |
|--------------|-------------------|---------------------|
| AWS | `aws.svg` | `/icons/aws.svg` |
| Google Cloud Platform | `gcp.svg` | `/icons/gcp.svg` |
| Microsoft Azure | `azure.svg` | `/icons/azure.svg` |

#### Bases de Datos
| Plataforma | Nombre del Archivo | Referencia en Código |
|-----------|-------------------|---------------------|
| Snowflake | `snowflake.svg` | `/icons/snowflake.svg` |
| Databricks | `databricks.svg` | `/icons/databricks.svg` |
| Oracle | `oracle.svg` | `/icons/oracle.svg` |

#### Sistemas Operativos Linux
| Distribución | Nombre del Archivo | Referencia en Código |
|-------------|-------------------|---------------------|
| Arch Linux | `archlinux.svg` | `/icons/archlinux.svg` |
| Ubuntu | `ubuntu.svg` | `/icons/ubuntu.svg` |
| Fedora | `fedora.svg` | `/icons/fedora.svg` |
| Kali Linux | `kalilinux.svg` | `/icons/kalilinux.svg` |
| Manjaro | `manjaro.svg` | `/icons/manjaro.svg` |
| EndeavourOS | `endeavouros.svg` | `/icons/endeavouros.svg` |

#### Otros Sistemas Operativos
| Sistema | Nombre del Archivo | Referencia en Código |
|---------|-------------------|---------------------|
| macOS | `macos.svg` | `/icons/macos.svg` |
| Windows | `windows.svg` | `/icons/windows.svg` |

### Código de Referencia
**Archivo:** `/src/pages/Certificates.tsx`

**Certificaciones Cloud (Líneas 17-29):**
```typescript
certifications: [
  {
    name: 'AWS Certified Solutions Architect',
    iconPath: '/icons/aws.svg',
    // ...
  },
  {
    name: 'Google Cloud Professional',
    iconPath: '/icons/gcp.svg',
    // ...
  },
  {
    name: 'Microsoft Azure Administrator',
    iconPath: '/icons/azure.svg',
    // ...
  }
]
```

**Distribuciones Linux (Líneas 35-40):**
```typescript
linuxDistros = [
  { name: 'Arch Linux', iconPath: '/icons/archlinux.svg', color: '#1793D1' },
  { name: 'Ubuntu', iconPath: '/icons/ubuntu.svg', color: '#E95420' },
  { name: 'Fedora', iconPath: '/icons/fedora.svg', color: '#294172' },
  { name: 'Kali Linux', iconPath: '/icons/kalilinux.svg', color: '#367BF0' },
  { name: 'Manjaro', iconPath: '/icons/manjaro.svg', color: '#35BF5C' },
  { name: 'EndeavourOS', iconPath: '/icons/endeavouros.svg', color: '#7F7FFF' }
]
```

**Otros OS (Líneas 44-45):**
```typescript
otherOS = [
  { name: 'macOS', iconPath: '/icons/macos.svg' },
  { name: 'Windows', iconPath: '/icons/windows.svg', color: '#00ADEF' }
]
```

**Certificaciones Adicionales (Líneas 51-107):**
```typescript
additionalCertifications = [
  {
    title: 'Snowflake Fundamentals',
    iconPath: '/icons/snowflake.svg',
    // ...
  },
  {
    title: 'Databricks Certification',
    iconPath: '/icons/databricks.svg',
    // ...
  },
  {
    title: 'Oracle Cloud Infrastructure',
    iconPath: '/icons/oracle.svg',
    // ...
  }
]
```

---

## 🖼️ Imagen Open Graph (Redes Sociales)

### Ubicación
Coloca la imagen en: **`/public/`**

### Nombre de Archivo EXACTO
`og-image.jpg`

### Especificaciones
- **Dimensiones:** 1200x630 píxeles
- **Formato:** JPG o PNG
- **Peso:** Máximo 300KB
- **Contenido sugerido:**
  - Tu nombre: "Isaac Ramírez"
  - Tu título: "Computer Engineering Student & Software Developer"
  - Logo o elementos visuales
  - Colores de tu marca

### Código de Referencia
**Archivo:** `/src/components/SEO.tsx`
```typescript
ogImage = '/og-image.jpg',  // Línea 18
```

Esta imagen se usa para:
- Compartir en Facebook, LinkedIn, Twitter
- Vista previa de enlaces en redes sociales
- Meta tag `og:image`

---

## 🎨 Favicon

### Ubicación
Coloca el favicon en: **`/public/`**

### Nombres de Archivo Recomendados
- **Favicon principal:** `favicon.ico` (32x32px)
- **Apple Touch Icon:** `apple-touch-icon.png` (180x180px)
- **Favicon PNG:** `favicon.png` (192x192px)

### Actualizar en HTML
**Archivo:** `/index.html` - Línea 5
```html
<link rel="icon" type="image/svg+xml" href="/vite.svg" />
```

Reemplazar con:
```html
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

---

## 📌 Recomendaciones

### Dónde Obtener Iconos SVG de Certificaciones

1. **Simple Icons** (https://simpleicons.org/)
   - Iconos oficiales de marcas en SVG
   - Descarga: AWS, GCP, Azure, Snowflake, Oracle, etc.

2. **SVG Repo** (https://www.svgrepo.com/)
   - Gran colección de iconos SVG gratuitos
   - Busca por nombre: "aws", "google cloud", "azure"

3. **Sitios Oficiales**
   - AWS: https://aws.amazon.com/architecture/icons/
   - GCP: https://cloud.google.com/icons
   - Azure: https://learn.microsoft.com/en-us/azure/architecture/icons/

### Crear Open Graph Image

**Herramientas recomendadas:**
- **Canva** (canva.com) - Plantillas pre-diseñadas
- **Figma** (figma.com) - Diseño personalizado
- **Adobe Express** - Rápido y fácil

**Template sugerido:**
```
+----------------------------------+
|                                  |
|        ISAAC RAMÍREZ             |
|                                  |
|   Computer Engineering Student   |
|     & Software Developer         |
|                                  |
|    🌐 Advanced English (B2/C1)   |
|                                  |
+----------------------------------+
```

### Verificar Rutas

Después de agregar los archivos:

```bash
# Verificar estructura
ls -la public/
ls -la public/icons/

# Debe mostrar todos los archivos mencionados en esta guía
```

---

## ✅ Checklist de Archivos

- [ ] `/public/cv-en.pdf` - CV en inglés
- [ ] `/public/cv-es.pdf` - CV en español
- [ ] `/public/og-image.jpg` - Imagen Open Graph (1200x630px)
- [ ] `/public/favicon.ico` - Favicon principal
- [ ] `/public/icons/aws.svg`
- [ ] `/public/icons/gcp.svg`
- [ ] `/public/icons/azure.svg`
- [ ] `/public/icons/snowflake.svg`
- [ ] `/public/icons/databricks.svg`
- [ ] `/public/icons/oracle.svg`
- [ ] `/public/icons/archlinux.svg`
- [ ] `/public/icons/ubuntu.svg`
- [ ] `/public/icons/fedora.svg`
- [ ] `/public/icons/kalilinux.svg`
- [ ] `/public/icons/manjaro.svg`
- [ ] `/public/icons/endeavouros.svg`
- [ ] `/public/icons/macos.svg`
- [ ] `/public/icons/windows.svg`

---

## 🚨 Importante

1. **Nombres exactos:** Los nombres de archivo deben coincidir exactamente con los especificados
2. **Formato:** Los iconos de certificaciones deben ser SVG para mejor calidad
3. **Rutas:** Todos los archivos en `/public/` son accesibles desde la raíz del sitio
4. **Mayúsculas/Minúsculas:** Los nombres son case-sensitive (sensibles a mayúsculas)

## 🔄 Después de Agregar Archivos

1. Reinicia el servidor de desarrollo si está corriendo
2. Limpia la caché del navegador (Ctrl + Shift + R)
3. Verifica que las imágenes se muestren correctamente
4. Prueba la descarga de CVs en ambos idiomas
