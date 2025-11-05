# Etérea Events - Next.js 14

Migración completa de Vite a Next.js 14 (App Router).

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar servidor de producción
npm start
```

## 📁 Estructura del Proyecto

```
├── app/                    # Next.js App Router
│   ├── api/               # API Routes (server-only)
│   ├── [páginas]/         # Rutas de la aplicación
│   └── layout.tsx         # Layout principal con SEO
├── components/            # Componentes React reutilizables
├── pages/                 # Componentes de página (lógica)
├── public/                # Assets estáticos
│   └── assets/           # Imágenes, fuentes, logos, etc.
├── styles/                # Estilos SCSS globales
└── utils/                 # Utilidades y helpers
```

## 🔧 Configuración

### Variables de Entorno

Crear `.env.local` con:

```env
AIRTABLE_API_KEY=tu_api_key
AIRTABLE_BASE_ID=tu_base_id
AIRTABLE_TABLE_NAME=tu_table_name
```

### Vercel Deploy

El proyecto está configurado para Vercel. Variables de entorno:
- `AIRTABLE_API_KEY`
- `AIRTABLE_BASE_ID`
- `AIRTABLE_TABLE_NAME`

## 📝 Rutas Disponibles

- `/` - Home
- `/eventos` - Eventos
- `/bodas` - Bodas
- `/bodas/formulario` - Formulario de bodas
- `/nosotras` - Nosotras
- `/vip-assistance` - VIP Assistance
- `/contacto` - Contacto
- `/card/[memberId]` - Tarjetas de visita
- Páginas legales: `/aviso-legal`, `/privacidad`, `/cookies`, `/propiedad-intelectual`

## 🔍 SEO

- Metadata global configurada en `app/layout.tsx`
- Metadata específica por página
- `robots.ts` y `sitemap.ts` generados automáticamente
- Open Graph y Twitter Cards configurados

## 🛠 Tecnologías

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **SCSS**
- **Framer Motion**
- **GSAP**
- **Swiper**

## 📚 API

### POST `/api/airtable-lead`

Endpoint server-only para enviar leads a Airtable.

**Body:**
```json
{
  "contrayente1": "string",
  "contrayente2": "string",
  "email": "string",
  "telefono": "string",
  "consent": true,
  ...
}
```

**Respuesta:**
- `200`: `{ ok: true, id: "..." }`
- `400`: Error de validación
- `502`: Error de Airtable
- `500`: Error interno

## ✅ Checklist de Pruebas

Ver `MIGRATION_CHECKLIST.md` para lista completa de pruebas.
