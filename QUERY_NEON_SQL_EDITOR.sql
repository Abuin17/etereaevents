-- Query para ejecutar en Neon SQL Editor
-- Asegúrate de que el dropdown muestre "neondb" y el schema sea "public"

-- 1. Verificar conexión
SELECT current_database(), current_schema();

-- 2. Ver todos los registros
SELECT * FROM public.wedding_leads ORDER BY created_at DESC;

-- 3. Si la query anterior falla, prueba sin el prefijo "public."
SELECT * FROM wedding_leads ORDER BY created_at DESC;

-- 4. Ver solo los campos principales
SELECT 
  id,
  contrayente1,
  contrayente2,
  email,
  telefono,
  created_at
FROM public.wedding_leads 
ORDER BY created_at DESC;

-- 5. Contar registros
SELECT COUNT(*) as total FROM public.wedding_leads;

