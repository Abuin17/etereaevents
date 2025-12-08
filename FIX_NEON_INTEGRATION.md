# 🔧 Corregir Integración Neon-Vercel

## Problema

La integración nativa de Neon con Vercel está usando la base de datos por defecto `neondb` en lugar de `eterea-weddings`.

## Solución

### Opción 1: Crear la base de datos `eterea-weddings` en Neon

1. Ve a Neon Dashboard: https://console.neon.tech
2. Selecciona tu proyecto (el que está conectado a Vercel)
3. Ve a **SQL Editor**
4. Ejecuta:
   ```sql
   CREATE DATABASE "eterea-weddings";
   ```
5. Luego, en Vercel:
   - Settings → Integrations → Neon
   - Verifica que esté conectado al proyecto correcto
   - La integración debería detectar la nueva base de datos

### Opción 2: Usar la base de datos actual (`neondb`)

Si prefieres seguir usando `neondb` (donde ya tienes 2 registros):

1. **No cambies nada** - la integración ya está funcionando
2. En Neon SQL Editor, asegúrate de estar consultando la base de datos `neondb`:
   ```sql
   \c neondb  -- Conectar a neondb
   SELECT * FROM wedding_leads;
   ```

### Opción 3: Configurar base de datos específica en la integración

1. Ve a Vercel → Tu proyecto → **Settings** → **Integrations**
2. Busca la integración de **Neon**
3. Haz clic en **Configure**
4. Verifica:
   - Que esté conectado al proyecto correcto de Neon
   - Si hay opción para seleccionar base de datos, selecciona `eterea-weddings`
5. Si no hay opción, necesitas crear la base de datos primero (Opción 1)

## Verificar qué base de datos está usando

Visita: `https://www.etereaevents.com/api/wedding-lead`

Deberías ver:
```json
{
  "databaseName": "neondb"  // o "eterea-weddings"
}
```

## Importante sobre Neon

En Neon:
- Cada **proyecto** puede tener múltiples **bases de datos**
- La integración de Vercel se conecta a un **proyecto** específico
- Por defecto usa la base de datos principal del proyecto (normalmente `neondb`)
- Puedes crear bases de datos adicionales dentro del mismo proyecto

## Recomendación

**Si ya tienes datos en `neondb`**: Sigue usándola. Solo asegúrate de consultar en el SQL Editor de Neon usando la base de datos `neondb`.

**Si quieres empezar limpio con `eterea-weddings`**:
1. Crea la base de datos en Neon
2. La tabla se creará automáticamente en el primer POST
3. Los registros anteriores en `neondb` no se moverán automáticamente

