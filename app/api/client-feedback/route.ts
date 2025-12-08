import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '../../../lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Initialize table on first request
let isInitialized = false;

async function initializeFeedbackTable() {
  const sql = getDatabase();
  
  await sql`
    CREATE TABLE IF NOT EXISTS client_feedback (
      id SERIAL PRIMARY KEY,
      
      -- Datos personales
      nombre VARCHAR(255) NOT NULL,
      empresa VARCHAR(255),
      cargo VARCHAR(255),
      
      -- Preguntas abiertas
      sorpresa_positiva TEXT,
      tranquilidad TEXT,
      buenas_manos TEXT,
      experiencia TEXT,
      
      -- Multiple choice
      cuidado_detalles VARCHAR(50),
      anticipacion VARCHAR(50),
      interpretacion_identidad VARCHAR(50),
      
      -- Autorizaciones
      autoriza_nombre_web BOOLEAN DEFAULT false,
      autoriza_experiencia_anonima BOOLEAN DEFAULT false,
      
      -- Metadatos
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'DATABASE_URL no configurada' },
        { status: 500 }
      );
    }

    const sql = getDatabase();
    
    // Initialize if needed
    if (!isInitialized) {
      console.log('[client-feedback] Inicializando tabla...');
      await initializeFeedbackTable();
      isInitialized = true;
    }

    const data = await req.json();
    console.log('[client-feedback] Received data:', {
      nombre: data.nombre,
      empresa: data.empresa,
      cargo: data.cargo
    });

    // Validate required fields
    if (!data.nombre || data.nombre.trim() === '') {
      return NextResponse.json(
        { error: 'El nombre es obligatorio' },
        { status: 400 }
      );
    }

    // Insert into database
    const result = await sql`
      INSERT INTO client_feedback (
        nombre,
        empresa,
        cargo,
        sorpresa_positiva,
        tranquilidad,
        buenas_manos,
        experiencia,
        cuidado_detalles,
        anticipacion,
        interpretacion_identidad,
        autoriza_nombre_web,
        autoriza_experiencia_anonima
      ) VALUES (
        ${data.nombre},
        ${data.empresa || null},
        ${data.cargo || null},
        ${data.sorpresa_positiva || null},
        ${data.tranquilidad || null},
        ${data.buenas_manos || null},
        ${data.experiencia || null},
        ${data.cuidado_detalles || null},
        ${data.anticipacion || null},
        ${data.interpretacion_identidad || null},
        ${data.autoriza_nombre_web === true},
        ${data.autoriza_experiencia_anonima === true}
      )
      RETURNING id, created_at
    `;

    console.log('[client-feedback] ✅ Feedback saved:', {
      id: result[0]?.id,
      nombre: data.nombre
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
        detail: err instanceof Error ? err.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'DATABASE_URL no configurada' },
        { status: 500 }
      );
    }

    const sql = getDatabase();

    // Initialize if needed
    if (!isInitialized) {
      await initializeFeedbackTable();
      isInitialized = true;
    }

    // Get stats
    const dbInfo = await sql`SELECT current_database() as db_name`;
    const countResult = await sql`SELECT COUNT(*)::int as total FROM client_feedback`;
    
    // Get recent feedback (for admin purposes)
    const recent = await sql`
      SELECT id, nombre, empresa, cargo, created_at 
      FROM client_feedback 
      ORDER BY created_at DESC 
      LIMIT 10
    `;

    return NextResponse.json({
      status: 'connected',
      database: dbInfo[0]?.db_name,
      totalFeedback: countResult[0]?.total || 0,
      recentFeedback: recent,
      isInitialized
    });

  } catch (err) {
    console.error('[client-feedback] GET Error:', err);
    return NextResponse.json(
      { 
        error: 'Error de conexión', 
        detail: err instanceof Error ? err.message : 'Unknown'
      },
      { status: 500 }
    );
  }
}

