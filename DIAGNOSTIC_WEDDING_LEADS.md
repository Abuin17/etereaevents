# Diagnóstico: Formulario de Bodas no guarda en Neon

## Pasos para diagnosticar

### 1. Verificar que la API esté funcionando

Visita en tu navegador o con curl:
```
https://www.etereaevents.com/api/wedding-lead
```

Deberías ver un JSON con:
- `status: "connected"`
- `databaseName`: nombre de tu base de datos
- `tableExists: true`
- `totalRecords`: número de registros existentes

### 2. Verificar en Vercel

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Verifica que `DATABASE_URL` esté configurada
4. El formato debe ser: `postgresql://user:password@host/database?sslmode=require`
5. **IMPORTANTE**: El nombre de la base de datos debe ser `eterea-weddings` (o el que uses)

### 3. Verificar en Neon

1. Ve a tu dashboard de Neon
2. Selecciona la base de datos `eterea-weddings`
3. Ve a "SQL Editor"
4. Ejecuta:
```sql
SELECT * FROM wedding_leads ORDER BY created_at DESC LIMIT 10;
```

### 4. Verificar logs en Vercel

1. Ve a tu proyecto en Vercel
2. Deployments → Último deployment → Functions
3. Busca `/api/wedding-lead`
4. Revisa los logs cuando envíes un formulario

### 5. Verificar que el dominio apunte al proyecto correcto

**CRÍTICO**: Asegúrate de que `etereaevents.com` apunte al proyecto Next.js, no al proyecto Vite viejo.

1. Ve a Vercel → Tu proyecto Next.js
2. Settings → Domains
3. Verifica que `etereaevents.com` y `www.etereaevents.com` estén añadidos
4. Si están en otro proyecto, muévelos

## Problemas comunes

### Problema 1: La tabla no existe
**Solución**: La tabla se crea automáticamente en el primer request. Si no existe:
1. Visita `https://www.etereaevents.com/api/wedding-lead` (GET)
2. Esto debería crear la tabla

### Problema 2: DATABASE_URL incorrecta
**Síntomas**: Error "No database connection string"
**Solución**: 
1. Verifica que `DATABASE_URL` en Vercel tenga el formato correcto
2. El nombre de la base de datos debe estar en la URL: `postgresql://...@host/eterea-weddings?sslmode=require`

### Problema 3: El dominio apunta al proyecto viejo
**Síntomas**: El formulario envía pero no llega a la API
**Solución**: Mueve los dominios al proyecto Next.js en Vercel

### Problema 4: La tabla existe pero no se insertan datos
**Síntomas**: `tableExists: true` pero `totalRecords: 0`
**Solución**: Revisa los logs en Vercel para ver errores de inserción

## Testing local

Para probar localmente:

1. Crea `.env.local`:
```
DATABASE_URL=postgresql://user:password@host/eterea-weddings?sslmode=require
```

2. Inicia el servidor:
```bash
npm run dev
```

3. Prueba la API:
```bash
curl http://localhost:3000/api/wedding-lead
```

4. Envía un formulario de prueba:
```bash
curl -X POST http://localhost:3000/api/wedding-lead \
  -H "Content-Type: application/json" \
  -d '{
    "contrayente1": "Test",
    "contrayente2": "Test",
    "email": "test@test.com",
    "telefono": "123456789",
    "consent": true
  }'
```

