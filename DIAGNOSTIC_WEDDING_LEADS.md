# Diagnóstico: Formulario de Bodas no guarda en Neon

## ✅ Estado Actual

Según la respuesta de `/api/wedding-lead`:
- ✅ Conexión: Funcionando
- ✅ Base de datos: `neondb`
- ✅ Tabla existe: `wedding_leads`
- ✅ Registros: 2 registros guardados
- ✅ Inicializada: Sí

**Los datos SÍ se están guardando correctamente.**

## 🔍 Cómo ver los registros en Neon

### Opción 1: SQL Editor en Neon Dashboard

1. Ve a tu dashboard de Neon: https://console.neon.tech
2. Selecciona el proyecto que contiene la base de datos `neondb`
3. Ve a **SQL Editor**
4. Ejecuta esta query:

```sql
SELECT * FROM wedding_leads 
ORDER BY created_at DESC;
```

Esto te mostrará todos los registros ordenados por fecha de creación (más recientes primero).

### Opción 2: Ver registros específicos

```sql
-- Ver los últimos 10 registros
SELECT 
  id,
  contrayente1,
  contrayente2,
  email,
  telefono,
  created_at,
  fecha_envio
FROM wedding_leads 
ORDER BY created_at DESC 
LIMIT 10;
```

### Opción 3: Contar registros

```sql
SELECT COUNT(*) as total_registros FROM wedding_leads;
```

### Opción 4: Ver estructura de la tabla

```sql
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'wedding_leads'
ORDER BY ordinal_position;
```

## ⚠️ Si no ves los registros en "Tables"

La interfaz "Tables" de Neon a veces:
- Tiene un delay en mostrar datos nuevos
- Requiere refresh manual
- Solo muestra tablas con datos recientes

**Solución**: Usa siempre el **SQL Editor** para ver los datos. Es más confiable.

## 📊 Verificar desde la API

También puedes crear un endpoint para ver los registros (solo para desarrollo/admin):

```typescript
// app/api/wedding-leads/route.ts (nuevo archivo)
export async function GET() {
  const sql = getDatabase();
  const leads = await sql`SELECT * FROM wedding_leads ORDER BY created_at DESC LIMIT 50`;
  return NextResponse.json({ leads });
}
```

## 🔐 Seguridad

**IMPORTANTE**: No expongas este endpoint en producción sin autenticación. Es solo para debugging.

## ✅ Verificación Final

Para confirmar que todo funciona:

1. Envía un formulario de prueba desde `/bodas/formulario`
2. Espera unos segundos
3. Ejecuta en SQL Editor:
   ```sql
   SELECT * FROM wedding_leads ORDER BY created_at DESC LIMIT 1;
   ```
4. Deberías ver el nuevo registro

## 🐛 Troubleshooting

### Problema: "No rows returned"
- Verifica que estés en la base de datos correcta (`neondb`)
- Verifica que estés en el esquema `public`
- Ejecuta: `SELECT current_database(), current_schema();`

### Problema: "Table does not exist"
- La tabla se crea automáticamente en el primer POST
- Visita `/api/wedding-lead` (GET) para forzar la creación

### Problema: Los registros no aparecen
- Verifica los logs en Vercel para ver si hay errores
- Revisa que `consent: true` esté en el payload
- Verifica que los campos requeridos estén presentes
