import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

let isInitialized = false;

function getFeedbackDatabaseUrl(): string {
  const feedbackUrl = process.env.feedback_DATABASE_URL;
  if (feedbackUrl) {
    console.log('[client-feedback] Usando feedback_DATABASE_URL');
    return feedbackUrl;
  }

  const standardUrl = process.env.DATABASE_URL;
  if (standardUrl) {
    console.log('[client-feedback] Usando DATABASE_URL estándar');
    return standardUrl;
  }

  throw new Error('No se encontró feedback_DATABASE_URL ni DATABASE_URL');
}

function getFeedbackDatabase() {
  return neon(getFeedbackDatabaseUrl());
}

async function initializeFeedbackTable() {
  const sql = getFeedbackDatabase();

  await sql`
    CREATE TABLE IF NOT EXISTS client_feedback (
      id SERIAL PRIMARY KEY,

      nombre VARCHAR(255) NOT NULL,
      empresa VARCHAR(255),
      cargo VARCHAR(255),

      experiencia_general SMALLINT CHECK (experiencia_general >= 1 AND experiencia_general <= 5),
      valorado_mas TEXT,
      momento_destacar TEXT,
      impacto_evento TEXT,
      recomendacion TEXT,

      experiencia TEXT,

      autoriza_nombre_web BOOLEAN DEFAULT false,
      autoriza_experiencia_anonima BOOLEAN DEFAULT false,

      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;

  await sql`ALTER TABLE client_feedback ADD COLUMN IF NOT EXISTS experiencia_general SMALLINT`;
  await sql`ALTER TABLE client_feedback ADD COLUMN IF NOT EXISTS valorado_mas TEXT`;
  await sql`ALTER TABLE client_feedback ADD COLUMN IF NOT EXISTS momento_destacar TEXT`;
  await sql`ALTER TABLE client_feedback ADD COLUMN IF NOT EXISTS impacto_evento TEXT`;
  await sql`ALTER TABLE client_feedback ADD COLUMN IF NOT EXISTS recomendacion TEXT`;
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.feedback_DATABASE_URL && !process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'feedback_DATABASE_URL ni DATABASE_URL configuradas' },
        { status: 500 }
      );
    }

    const sql = getFeedbackDatabase();

    if (!isInitialized) {
      console.log('[client-feedback] Inicializando tabla...');
      await initializeFeedbackTable();
      isInitialized = true;
    }

    const data = await req.json();

    if (!data.nombre || data.nombre.trim() === '') {
      return NextResponse.json(
        { error: 'El nombre es obligatorio' },
        { status: 400 }
      );
    }

    const rating = Number(data.experiencia_general);
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'La valoración general debe ser un número entre 1 y 5' },
        { status: 400 }
      );
    }

    if (data.autoriza_nombre_web !== true && data.autoriza_experiencia_anonima !== true) {
      return NextResponse.json(
        { error: 'Debes elegir una opción de autorización' },
        { status: 400 }
      );
    }

    const testimonio =
      (typeof data.recomendacion === 'string' && data.recomendacion.trim()) ||
      (typeof data.experiencia === 'string' && data.experiencia.trim()) ||
      null;

    const result = await sql`
      INSERT INTO client_feedback (
        nombre,
        empresa,
        cargo,
        experiencia_general,
        valorado_mas,
        momento_destacar,
        impacto_evento,
        recomendacion,
        experiencia,
        autoriza_nombre_web,
        autoriza_experiencia_anonima
      ) VALUES (
        ${data.nombre},
        ${data.empresa || null},
        ${data.cargo || null},
        ${rating},
        ${data.valorado_mas || null},
        ${data.momento_destacar || null},
        ${data.impacto_evento || null},
        ${data.recomendacion || null},
        ${testimonio},
        ${data.autoriza_nombre_web === true},
        ${data.autoriza_experiencia_anonima === true}
      )
      RETURNING id, created_at
    `;

    console.log('[client-feedback] ✅ Feedback saved:', {
      id: result[0]?.id,
      nombre: data.nombre,
    });

    return NextResponse.json(
      { ok: true, id: result[0]?.id },
      { status: 200 }
    );
  } catch (err) {
    console.error('[client-feedback] Error:', err);
    return NextResponse.json(
      {
        error: 'Error guardando el feedback',
        detail: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (!process.env.feedback_DATABASE_URL && !process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'feedback_DATABASE_URL ni DATABASE_URL configuradas' },
        { status: 500 }
      );
    }

    const sql = getFeedbackDatabase();

    if (!isInitialized) {
      await initializeFeedbackTable();
      isInitialized = true;
    }

    const dbInfo = await sql`SELECT current_database() as db_name`;
    const countResult = await sql`SELECT COUNT(*)::int as total FROM client_feedback`;

    const recent = await sql`
      SELECT id, nombre, empresa, cargo, experiencia_general, created_at
      FROM client_feedback
      ORDER BY created_at DESC
      LIMIT 10
    `;

    return NextResponse.json({
      status: 'connected',
      database: dbInfo[0]?.db_name,
      totalFeedback: countResult[0]?.total || 0,
      recentFeedback: recent,
      isInitialized,
    });
  } catch (err) {
    console.error('[client-feedback] GET Error:', err);
    return NextResponse.json(
      {
        error: 'Error de conexión',
        detail: err instanceof Error ? err.message : 'Unknown',
      },
      { status: 500 }
    );
  }
}
