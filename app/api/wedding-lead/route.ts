import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, initializeDatabase } from '../../../lib/db';

// Forzar que esta ruta sea dinámica (no pre-renderizada durante build)
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Inicializar tabla al primer request (solo crea si no existe)
let isInitialized = false;

export async function POST(req: NextRequest) {
  try {
    // Verificar DATABASE_URL primero
    if (!process.env.DATABASE_URL) {
      console.error('[wedding-lead] DATABASE_URL no configurada');
      return NextResponse.json(
        { error: 'DATABASE_URL no configurada' },
        { status: 500 }
      );
    }

    const sql = getDatabase();
    
    // Inicializar base de datos si es la primera vez
    if (!isInitialized) {
      console.log('[wedding-lead] Inicializando base de datos...');
      await initializeDatabase();
      isInitialized = true;
      console.log('[wedding-lead] Base de datos inicializada');
    }

    const data = await req.json();
    console.log('[wedding-lead] Received data keys:', Object.keys(data));
    console.log('[wedding-lead] Data sample:', {
      contrayente1: data.contrayente1,
      contrayente2: data.contrayente2,
      email: data.email,
      telefono: data.telefono,
      consent: data.consent
    });

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

    // Preparar datos para inserción
    const insertData = {
      contrayente1: data.contrayente1,
      contrayente2: data.contrayente2,
      c1_fecha_nacimiento: formatBirthDate(data.contrayente1_fechaNacimiento),
      c1_ciudad_nacimiento: data.contrayente1_ciudadNacimiento || null,
      c1_ciudad_residencia: data.contrayente1_ciudadResidencia || null,
      c1_profesion: data.contrayente1_profesion || null,
      c2_fecha_nacimiento: formatBirthDate(data.contrayente2_fechaNacimiento),
      c2_ciudad_nacimiento: data.contrayente2_ciudadNacimiento || null,
      c2_ciudad_residencia: data.contrayente2_ciudadResidencia || null,
      c2_profesion: data.contrayente2_profesion || null,
      c1_sobre_c2: data.c1AboutC2 || data.contrayente1_sobre_contrayente2 || null,
      c2_sobre_c1: data.c2AboutC1 || data.contrayente2_sobre_contrayente1 || null,
      historia: data.story || data.historia || null,
      momento_si: data.proposal || data.momento_si || null,
      lugar_huella: data.favoritePlace || data.lugar_huella || null,
      fecha_evento: data.eventDateText || data.fecha || null,
      numero_invitados: data.guests || data.numero_invitados || null,
      tipo_ceremonia: data.ceremonyType || data.tipo || null,
      localizacion: data.locationType || data.localizacion || null,
      duracion: data.duration || data.duracion || null,
      presupuesto: data.budget || data.marco_economico || null,
      email: data.email,
      telefono: data.telefono,
      consentimiento_rgpd: data.consent === true
    };

    console.log('[wedding-lead] Inserting data:', {
      contrayente1: insertData.contrayente1,
      contrayente2: insertData.contrayente2,
      email: insertData.email,
      telefono: insertData.telefono
    });

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
        ${insertData.contrayente1},
        ${insertData.contrayente2},
        ${insertData.c1_fecha_nacimiento},
        ${insertData.c1_ciudad_nacimiento},
        ${insertData.c1_ciudad_residencia},
        ${insertData.c1_profesion},
        ${insertData.c2_fecha_nacimiento},
        ${insertData.c2_ciudad_nacimiento},
        ${insertData.c2_ciudad_residencia},
        ${insertData.c2_profesion},
        ${insertData.c1_sobre_c2},
        ${insertData.c2_sobre_c1},
        ${insertData.historia},
        ${insertData.momento_si},
        ${insertData.lugar_huella},
        ${insertData.fecha_evento},
        ${insertData.numero_invitados},
        ${insertData.tipo_ceremonia},
        ${insertData.localizacion},
        ${insertData.duracion},
        ${insertData.presupuesto},
        ${insertData.email},
        ${insertData.telefono},
        ${insertData.consentimiento_rgpd}
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
    console.error('[wedding-lead] Error completo:', err);
    console.error('[wedding-lead] Error stack:', err instanceof Error ? err.stack : 'No stack');
    console.error('[wedding-lead] Error message:', err instanceof Error ? err.message : String(err));
    
    return NextResponse.json(
      { 
        error: 'Error guardando los datos', 
        detail: err instanceof Error ? err.message : 'Unknown error',
        stack: process.env.NODE_ENV === 'development' && err instanceof Error ? err.stack : undefined
      },
      { status: 500 }
    );
  }
}

// Endpoint GET para verificar el estado de la conexión y la tabla
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
      console.log('[wedding-lead GET] Inicializando base de datos...');
      await initializeDatabase();
      isInitialized = true;
      console.log('[wedding-lead GET] Base de datos inicializada');
    }

    // Probar conexión y obtener información de la base de datos
    const [timeResult, dbResult, tableCheck, countResult] = await Promise.all([
      sql`SELECT NOW() as current_time`,
      sql`SELECT current_database() as database_name, version() as postgres_version`,
      sql`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'wedding_leads'
        ) as table_exists
      `,
      sql`SELECT COUNT(*) as total FROM wedding_leads`
    ]);
    
    return NextResponse.json({
      status: 'connected',
      database: 'Neon PostgreSQL',
      databaseName: dbResult[0]?.database_name,
      serverTime: timeResult[0]?.current_time,
      postgresVersion: dbResult[0]?.postgres_version?.split(' ')[0] + ' ' + dbResult[0]?.postgres_version?.split(' ')[1],
      tableExists: tableCheck[0]?.table_exists,
      totalRecords: Number(countResult[0]?.total || 0),
      isInitialized: isInitialized
    });
  } catch (err) {
    console.error('[wedding-lead GET] Error:', err);
    return NextResponse.json(
      { 
        error: 'Error de conexión', 
        detail: err instanceof Error ? err.message : 'Unknown',
        hint: 'Verifica que DATABASE_URL sea correcta y que la base de datos esté accesible',
        stack: process.env.NODE_ENV === 'development' && err instanceof Error ? err.stack : undefined
      },
      { status: 500 }
    );
  }
}
