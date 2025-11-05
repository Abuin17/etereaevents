# Checklist de Migración Vite → Next.js 14

## Estado de Pruebas

### Build y Compilación
- [ ] `npm run build` pasa en local
- [ ] No hay errores de TypeScript
- [ ] No hay warnings de webpack

### Páginas Principales
- [ ] Home (/) renderiza correctamente
- [ ] `/eventos` renderiza correctamente
- [ ] `/bodas` renderiza correctamente
- [ ] `/bodas/formulario` renderiza correctamente
- [ ] `/nosotras` renderiza correctamente
- [ ] `/vip-assistance` renderiza correctamente
- [ ] `/contacto` renderiza correctamente
- [ ] `/card/:memberId` renderiza correctamente (chromeless)
- [ ] Páginas legales (`/aviso-legal`, `/privacidad`, `/cookies`, `/propiedad-intelectual`) renderizan

### Funcionalidad
- [ ] Formulario de bodas → POST `/api/airtable-lead` funciona (200 OK)
- [ ] Validación de campos requeridos funciona
- [ ] Manejo de errores de API funciona
- [ ] No hay exposición de secrets en el bundle del cliente
- [ ] Navbar y menú funcionan
- [ ] Footer y links funcionan
- [ ] Cookie consent funciona
- [ ] Transiciones de página funcionan (si aplica)

### Assets y Estilos
- [ ] Imágenes cargan desde `/public/assets`
- [ ] Fuentes cargan correctamente
- [ ] SCSS compila sin errores
- [ ] Estilos se aplican correctamente
- [ ] Favicon dinámico funciona

### SEO y Meta
- [ ] `robots.txt` accesible en `/robots.txt`
- [ ] `sitemap.xml` accesible en `/sitemap.xml`
- [ ] Compartir URLs en WhatsApp/Telegram muestra thumbnail `og.jpg`
- [ ] Metadata por página funciona
- [ ] Open Graph tags funcionan
- [ ] Twitter Cards funcionan

### Deploy Vercel
- [ ] Deploy en Vercel exitoso (sin errores de "Function Runtimes…")
- [ ] Variables de entorno configuradas:
  - `AIRTABLE_API_KEY`
  - `AIRTABLE_BASE_ID`
  - `AIRTABLE_TABLE_NAME`
- [ ] Root Directory configurado como `next-app` (si monorepo)
- [ ] Node version: 22.x
- [ ] No hay errores de "NOT_FOUND"

## Cambios Realizados

### Estructura
- ✅ Rama `next-migration` creada
- ✅ Next.js 14 en `next-app/`
- ✅ Assets movidos a `public/assets/`
- ✅ Estilos movidos a `styles/`
- ✅ Componentes movidos a `components/`
- ✅ Páginas movidas a `pages/`
- ✅ Utils y hooks movidos

### Rutas App Router
- ✅ `/` → `app/page.tsx`
- ✅ `/eventos` → `app/eventos/page.tsx`
- ✅ `/bodas` → `app/bodas/page.tsx`
- ✅ `/bodas/formulario` → `app/bodas/formulario/page.tsx`
- ✅ `/nosotras` → `app/nosotras/page.tsx`
- ✅ `/vip-assistance` → `app/vip-assistance/page.tsx`
- ✅ `/contacto` → `app/contacto/page.tsx`
- ✅ `/card/[memberId]` → `app/card/[memberId]/page.tsx`
- ✅ Páginas legales creadas

### API Routes
- ✅ `/api/airtable-lead` → `app/api/airtable-lead/route.ts` (POST, server-only)

### Componentes
- ✅ Navbar actualizado: `react-router-dom` → `next/link`
- ✅ Footer actualizado: `react-router-dom` → `next/link`
- ✅ Todos los Links actualizados a `next/link`
- ✅ `useNavigate` → `useRouter` de Next.js
- ✅ `useLocation` → `usePathname` de Next.js
- ✅ `useParams` actualizado para Next.js
- ✅ Componentes con hooks marcados con `'use client'`

### Assets
- ✅ Imports de assets cambiados de `../../assets/` a `/assets/` (strings)
- ✅ Rutas de imágenes actualizadas

### SEO
- ✅ `app/layout.tsx` con metadata global
- ✅ Metadata específica por página
- ✅ `app/robots.ts` creado
- ✅ `app/sitemap.ts` creado
- ✅ Open Graph configurado
- ✅ Twitter Cards configurado

### Variables de Entorno
- ✅ API route usa `process.env.AIRTABLE_*` (server-only)
- ✅ No hay `NEXT_PUBLIC_*` exponiendo secrets
- ✅ Variables de entorno documentadas

### Configuración
- ✅ `next.config.mjs` configurado
- ✅ `tsconfig.json` con paths actualizados
- ✅ SCSS compila correctamente
- ✅ CSS modules funcionan (con `:global()` para `:root`)

## Archivos Modificados

### Imports/Paths
- Todos los componentes que usaban `react-router-dom` → `next/link` y hooks de Next.js
- Todos los imports de assets: `../../assets/` → `/assets/` (strings)
- Rutas de SCSS ajustadas según nueva estructura

### Nuevos Archivos
- `app/layout.tsx` - Layout principal con SEO
- `app/robots.ts` - robots.txt
- `app/sitemap.ts` - sitemap.xml
- `app/api/airtable-lead/route.ts` - API route server-only
- `components/PageWrapper.tsx` - Wrapper para páginas con Navbar/Footer
- Todas las páginas en `app/*/page.tsx`

## Próximos Pasos

1. Completar pruebas según checklist
2. Ajustar cualquier problema encontrado
3. Crear PR con descripción técnica
4. Validar en preview de Vercel
5. Configurar dominio una vez validado

