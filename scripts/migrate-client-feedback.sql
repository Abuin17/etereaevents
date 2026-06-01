-- Migración: nueva encuesta de satisfacción (client_feedback)
-- Ejecutar en Neon SQL Editor o con: node scripts/migrate-client-feedback.js

ALTER TABLE client_feedback ADD COLUMN IF NOT EXISTS experiencia_general SMALLINT;
ALTER TABLE client_feedback ADD COLUMN IF NOT EXISTS valorado_mas TEXT;
ALTER TABLE client_feedback ADD COLUMN IF NOT EXISTS momento_destacar TEXT;
ALTER TABLE client_feedback ADD COLUMN IF NOT EXISTS impacto_evento TEXT;
ALTER TABLE client_feedback ADD COLUMN IF NOT EXISTS recomendacion TEXT;

-- Validar puntuación 1-5 en filas nuevas (opcional; ignora si ya existe)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'client_feedback_experiencia_general_check'
  ) THEN
    ALTER TABLE client_feedback
      ADD CONSTRAINT client_feedback_experiencia_general_check
      CHECK (experiencia_general IS NULL OR (experiencia_general >= 1 AND experiencia_general <= 5));
  END IF;
END $$;

-- Columnas del formulario anterior (se conservan por histórico):
-- sorpresa_positiva, tranquilidad, buenas_manos, cuidado_detalles,
-- anticipacion, interpretacion_identidad
