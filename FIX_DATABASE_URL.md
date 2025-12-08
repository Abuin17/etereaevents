# 🔧 Corregir DATABASE_URL en Vercel

## Problema Identificado

La API está conectándose a la base de datos `neondb`, pero tu base de datos se llama `eterea-weddings`.

## Solución

### 1. Obtener la URL correcta de Neon

1. Ve a tu dashboard de Neon: https://console.neon.tech
2. Selecciona el proyecto **eterea-weddings**
3. Ve a **Connection Details** o **Connection String**
4. Copia la **Connection String** que apunte a la base de datos `eterea-weddings`

La URL debería verse así:
```
postgresql://usuario:password@ep-xxxxx.region.aws.neon.tech/eterea-weddings?sslmode=require
```

**IMPORTANTE**: El nombre de la base de datos (`eterea-weddings`) debe estar en la URL, justo antes del `?`.

### 2. Actualizar en Vercel

1. Ve a tu proyecto en Vercel: https://vercel.com/dashboard
2. Settings → **Environment Variables**
3. Busca `DATABASE_URL`
4. **Edita** el valor y reemplázalo con la URL correcta que incluye `eterea-weddings`
5. Asegúrate de que el formato sea:
   ```
   postgresql://user:password@host/eterea-weddings?sslmode=require
   ```
   (sin `psql`, sin comillas)

### 3. Verificar en todas las entornos

Asegúrate de que `DATABASE_URL` esté configurada para:
- ✅ **Production**
- ✅ **Preview** (opcional)
- ✅ **Development** (opcional)

### 4. Redesplegar

Después de actualizar la variable de entorno:
1. Ve a **Deployments**
2. Haz clic en los **3 puntos** del último deployment
3. Selecciona **Redeploy**
4. O simplemente haz un nuevo commit y push

### 5. Verificar

Después del redespliegue, visita:
```
https://www.etereaevents.com/api/wedding-lead
```

Deberías ver:
```json
{
  "databaseName": "eterea-weddings",  // ← Debe decir esto, no "neondb"
  "tableExists": true,
  "totalRecords": 2
}
```

## Formato Correcto de DATABASE_URL

✅ **Correcto:**
```
postgresql://usuario:password@ep-xxxxx.region.aws.neon.tech/eterea-weddings?sslmode=require
```

❌ **Incorrecto:**
```
postgresql://usuario:password@ep-xxxxx.region.aws.neon.tech/neondb?sslmode=require
psql 'postgresql://.../neondb?sslmode=require'
```

## Nota sobre Neon

En Neon, cada proyecto puede tener múltiples bases de datos. Asegúrate de:
1. Estar en el proyecto correcto (`eterea-weddings`)
2. Seleccionar la base de datos correcta en el Connection String
3. Usar la URL que apunta específicamente a `eterea-weddings`

