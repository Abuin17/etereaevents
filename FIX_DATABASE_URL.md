# 🔧 Corregir DATABASE_URL en Vercel

## Problema Identificado

Tu connection string actual apunta a:
```
postgresql://...@host/neondb?sslmode=require
```

Pero necesitas que apunte a:
```
postgresql://...@host/eterea-weddings?sslmode=require
```

## Solución

### 1. Obtener la Connection String correcta en Neon

1. Ve a tu dashboard de Neon: https://console.neon.tech
2. Selecciona el proyecto **eterea-weddings** (no el proyecto que tiene `neondb`)
3. Ve a **Connection Details** o haz clic en el proyecto
4. Busca la sección **Connection String** o **Connection Details**
5. **IMPORTANTE**: Asegúrate de seleccionar la base de datos `eterea-weddings` (no `neondb`)
6. Copia la Connection String

### 2. Si no ves la base de datos `eterea-weddings`

Puede que necesites crearla:

1. En Neon Dashboard → Tu proyecto
2. Ve a **Databases** o **SQL Editor**
3. Ejecuta:
   ```sql
   CREATE DATABASE "eterea-weddings";
   ```
4. Luego obtén la Connection String para esa base de datos

### 3. Formato correcto para Vercel

La URL que debes poner en Vercel debe ser **SOLO** esto (sin `psql`, sin comillas):

```
postgresql://neondb_owner:npg_zibDNV1TdlK7@ep-square-recipe-ahbnc2d5-pooler.c-3.us-east-1.aws.neon.tech/eterea-weddings?sslmode=require&channel_binding=require
```

**Nota**: Cambia `/neondb?` por `/eterea-weddings?` en la URL.

### 4. Actualizar en Vercel

1. Ve a Vercel: https://vercel.com/dashboard
2. Tu proyecto → **Settings** → **Environment Variables**
3. Busca `DATABASE_URL`
4. **Edita** y pega la URL correcta (sin `psql`, sin comillas, con `/eterea-weddings?`)
5. Asegúrate de que esté marcada para **Production**
6. **Save**

### 5. Redesplegar

1. Ve a **Deployments**
2. Último deployment → **3 puntos** → **Redeploy**
3. O haz un nuevo commit

### 6. Verificar

Después del redespliegue, visita:
```
https://www.etereaevents.com/api/wedding-lead
```

Deberías ver:
```json
{
  "databaseName": "eterea-weddings",  // ← Debe decir esto
  "tableExists": true,
  "totalRecords": 0  // Empezará en 0 porque es una nueva base de datos
}
```

## ⚠️ Importante

Si cambias la base de datos de `neondb` a `eterea-weddings`:
- Los 2 registros que ya están en `neondb` **NO** se moverán automáticamente
- La nueva base de datos `eterea-weddings` empezará vacía
- La tabla se creará automáticamente en el primer POST

## Alternativa: Usar la base de datos actual

Si prefieres seguir usando `neondb` (y los 2 registros que ya tienes):
- No cambies nada
- La tabla ya existe y funciona
- Solo asegúrate de consultar en el SQL Editor de Neon usando la base de datos `neondb`
