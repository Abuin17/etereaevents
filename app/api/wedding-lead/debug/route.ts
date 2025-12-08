import { NextResponse } from 'next/server';
import { getDatabase } from '../../../../lib/db';

// Endpoint de diagnóstico detallado
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: 'DATABASE_URL no configurada' }, { status: 500 });
    }

    // Extraer información del hostname para identificar el proyecto
    const dbUrl = process.env.DATABASE_URL;
    let hostInfo = 'No disponible';
    let projectEndpoint = 'No disponible';
    
    try {
      // Parsear la URL para obtener el host
      const urlMatch = dbUrl.match(/postgresql:\/\/[^@]+@([^\/]+)/);
      if (urlMatch) {
        hostInfo = urlMatch[1];
        // El endpoint de Neon tiene formato: ep-xxx-xxx-xxxx-pooler.region.aws.neon.tech
        const endpointMatch = hostInfo.match(/ep-[a-z]+-[a-z]+-[a-z0-9]+/);
        if (endpointMatch) {
          projectEndpoint = endpointMatch[0];
        }
      }
    } catch (e) {
      // Ignorar errores de parseo
    }

    const sql = getDatabase();
    
    // Información de conexión
    const dbInfo = await sql`
      SELECT 
        current_database() as database_name,
        current_schema() as current_schema,
        current_user as current_user,
        version() as postgres_version
    `;
    
    // Listar todas las bases de datos disponibles
    const allDatabases = await sql`
      SELECT datname 
      FROM pg_database 
      WHERE datistemplate = false
      ORDER BY datname
    `;
    
    // Listar todos los schemas en la base de datos actual
    const allSchemas = await sql`
      SELECT schema_name 
      FROM information_schema.schemata
      WHERE schema_name NOT IN ('pg_catalog', 'information_schema', 'pg_toast')
      ORDER BY schema_name
    `;
    
    // Buscar la tabla en todos los schemas
    const tableInSchemas = await sql`
      SELECT 
        table_schema,
        table_name,
        (SELECT COUNT(*) FROM information_schema.columns WHERE table_schema = t.table_schema AND table_name = t.table_name) as column_count
      FROM information_schema.tables t
      WHERE table_name = 'wedding_leads'
      ORDER BY table_schema
    `;
    
    // Si la tabla existe en public, obtener detalles
    let tableDetails = null;
    let recordCount = 0;
    
    if (tableInSchemas.length > 0) {
      const publicTable = tableInSchemas.find(t => t.table_schema === 'public');
      if (publicTable) {
        // Obtener columnas
        const columns = await sql`
          SELECT 
            column_name,
            data_type,
            is_nullable
          FROM information_schema.columns
          WHERE table_schema = 'public' 
          AND table_name = 'wedding_leads'
          ORDER BY ordinal_position
        `;
        
        // Contar registros
        try {
          const count = await sql`SELECT COUNT(*)::int as total FROM public.wedding_leads`;
          recordCount = Number(count[0]?.total || 0);
        } catch (e) {
          console.error('Error counting records:', e);
        }
        
        tableDetails = {
          schema: 'public',
          name: 'wedding_leads',
          columns: columns,
          recordCount: recordCount
        };
      }
    }
    
    // Obtener las últimas conexiones/transacciones (si es posible)
    let recentActivity = null;
    try {
      const activity = await sql`
        SELECT 
          COUNT(*) as total_connections
        FROM pg_stat_activity
        WHERE datname = current_database()
      `;
      recentActivity = activity[0];
    } catch (e) {
      // Ignorar si no hay permisos
    }
    
    return NextResponse.json({
      connection: {
        database: dbInfo[0]?.database_name,
        schema: dbInfo[0]?.current_schema,
        user: dbInfo[0]?.current_user,
        version: dbInfo[0]?.postgres_version,
        neonHost: hostInfo,
        neonProjectEndpoint: projectEndpoint
      },
      availableDatabases: allDatabases.map(d => d.datname),
      availableSchemas: allSchemas.map(s => s.schema_name),
      tableSearch: {
        foundInSchemas: tableInSchemas,
        publicTableDetails: tableDetails
      },
      recentActivity: recentActivity,
      instructions: {
        step1: `La API está conectada al proyecto de Neon con endpoint: "${projectEndpoint}"`,
        step2: `En Neon Console, busca el proyecto que tenga este endpoint en su connection string`,
        step3: `La base de datos es "${dbInfo[0]?.database_name}" en el schema "public"`,
        step4: tableDetails 
          ? `La tabla existe con ${tableDetails.recordCount} registros. Query: SELECT * FROM public.wedding_leads ORDER BY created_at DESC;`
          : `La tabla NO existe. Debería crearse automáticamente en el primer POST al formulario.`,
        importantNote: `Si en tu Neon Console no ves este endpoint (${projectEndpoint}), estás mirando un proyecto diferente. La integración de Vercel pudo haber creado un proyecto nuevo.`
      }
    });
  } catch (err) {
    return NextResponse.json({
      error: 'Error en diagnóstico',
      detail: err instanceof Error ? err.message : String(err),
      stack: process.env.NODE_ENV === 'development' && err instanceof Error ? err.stack : undefined
    }, { status: 500 });
  }
}

