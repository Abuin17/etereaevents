/**
 * Aplica la migración de client_feedback en Neon.
 *
 * Uso:
 *   feedback_DATABASE_URL="postgresql://..." node scripts/migrate-client-feedback.js
 * o
 *   DATABASE_URL="postgresql://..." node scripts/migrate-client-feedback.js
 */

const { neon } = require('@neondatabase/serverless');

const databaseUrl = process.env.feedback_DATABASE_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ Define feedback_DATABASE_URL o DATABASE_URL');
  process.exit(1);
}

const sql = neon(databaseUrl);

async function run() {
  console.log('🔄 Aplicando migración client_feedback...');

  await sql`ALTER TABLE client_feedback ADD COLUMN IF NOT EXISTS experiencia_general SMALLINT`;
  await sql`ALTER TABLE client_feedback ADD COLUMN IF NOT EXISTS valorado_mas TEXT`;
  await sql`ALTER TABLE client_feedback ADD COLUMN IF NOT EXISTS momento_destacar TEXT`;
  await sql`ALTER TABLE client_feedback ADD COLUMN IF NOT EXISTS impacto_evento TEXT`;
  await sql`ALTER TABLE client_feedback ADD COLUMN IF NOT EXISTS recomendacion TEXT`;

  await sql`
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
    END $$
  `;

  const columns = await sql`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = 'client_feedback'
    ORDER BY ordinal_position
  `;

  console.log('\n✅ Migración completada. Columnas actuales:');
  columns.forEach((row) => console.log('  -', row.column_name));
}

run().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
