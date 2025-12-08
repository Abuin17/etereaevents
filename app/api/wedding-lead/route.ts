import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, initializeDatabase } from '../../../lib/db';

// Forzar que esta ruta sea dinámica (no pre-renderizada durante build)
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Inicializar tabla al primer request (solo crea si no existe)
let isInitialized = false;

export async function POST(req: NextRequest) {
  try {
    const sql = getDatabase();
    
    // Inicializar base de datos si es la primera vez
    if (!isInitialized) {
      await initializeDatabase();
      isInitialized = true;
    }

    const data = await req.json();
    console.log('[wedding-lead] Received data keys:', Object.keys(data));

    // Validación de campos requeridos
    const required = ['contrayente1', 'contrayente2', 'email', 'telefono', 'consent'];
    const missing = required.filter(k => !data[k] || String(data[k]).trim() === '');
    
    if (missing.length) {
      console.warn('[wedding-lead] Missing required fields:', missing);
      return NextResponse.json(
        { error: `Faltan campos requeridos: ${missing.join(', ')}` },
        { status: 400 }
      );
    }

    // Formatear fechas de nacimiento
    const formatBirthDate = (dateObj: { dia?: string; mes?: string; año?: string } | undefined) => {
      if (!dateObj || !dateObj.dia || !dateObj.mes || !dateObj.año) return null;
      return `${dateObj.dia}/${dateObj.mes}/${dateObj.año}`;
    };

    // Insertar en la base de datos
    const result = await sql`
      INSERT INTO wedding_leads (
        contrayente1,
        contrayente2,
        c1_fecha_nacimiento,
        c1_ciudad_nacimiento,
        c1_ciudad_residencia,
        c1_profesion,
        c2_fecha_nacimiento,
        c2_ciudad_nacimiento,
        c2_ciudad_residencia,
        c2_profesion,
        c1_sobre_c2,
        c2_sobre_c1,
        historia,
        momento_si,
        lugar_huella,
        fecha_evento,
        numero_invitados,
        tipo_ceremonia,
        localizacion,
        duracion,
        presupuesto,
        email,
        telefono,
        consentimiento_rgpd
      ) VALUES (
        ${data.contrayente1},
        ${data.contrayente2},
        ${formatBirthDate(data.contrayente1_fechaNacimiento)},
        ${data.contrayente1_ciudadNacimiento || null},
        ${data.contrayente1_ciudadResidencia || null},
        ${data.contrayente1_profesion || null},
        ${formatBirthDate(data.contrayente2_fechaNacimiento)},
        ${data.contrayente2_ciudadNacimiento || null},
        ${data.contrayente2_ciudadResidencia || null},
        ${data.contrayente2_profesion || null},
        ${data.c1AboutC2 || data.contrayente1_sobre_contrayente2 || null},
        ${data.c2AboutC1 || data.contrayente2_sobre_contrayente1 || null},
        ${data.story || data.historia || null},
        ${data.proposal || data.momento_si || null},
        ${data.favoritePlace || data.lugar_huella || null},
        ${data.eventDateText || data.fecha || null},
        ${data.guests || data.numero_invitados || null},
        ${data.ceremonyType || data.tipo || null},
        ${data.locationType || data.localizacion || null},
        ${data.duration || data.duracion || null},
        ${data.budget || data.marco_economico || null},
        ${data.email},
        ${data.telefono},
        ${data.consent === true}
      )
      RETURNING id
    `;

    const insertedId = result[0]?.id;
    console.log('[wedding-lead] Lead saved successfully, id:', insertedId);

    return NextResponse.json(
      { ok: true, id: insertedId },
      { status: 200 }
    );

  } catch (err) {
    console.error('[wedding-lead] Error:', err);
    return NextResponse.json(
      { error: 'Error guardando los datos', detail: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Endpoint GET para verificar el estado de la conexión
export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { 
          error: 'DATABASE_URL no configurada',
          hint: 'Asegúrate de tener DATABASE_URL en tu archivo .env.local y reinicia el servidor'
        },
        { status: 500 }
      );
    }

    const sql = getDatabase();

    // Inicializar base de datos si es la primera vez
    if (!isInitialized) {
      await initializeDatabase();
      isInitialized = true;
    }

    // Probar conexión y obtener información de la base de datos
    const [timeResult, dbResult] = await Promise.all([
      sql`SELECT NOW() as current_time`,
      sql`SELECT current_database() as database_name, version() as postgres_version`
    ]);
    
    return NextResponse.json({
      status: 'connected',
      database: 'Neon PostgreSQL',
      databaseName: dbResult[0]?.database_name,
      serverTime: timeResult[0]?.current_time,
      postgresVersion: dbResult[0]?.postgres_version?.split(' ')[0] + ' ' + dbResult[0]?.postgres_version?.split(' ')[1]
    });
  } catch (err) {
    return NextResponse.json(
      { 
        error: 'Error de conexión', 
        detail: err instanceof Error ? err.message : 'Unknown',
        hint: 'Verifica que DATABASE_URL sea correcta y que la base de datos esté accesible'
      },
      { status: 500 }
    );
  }
}
