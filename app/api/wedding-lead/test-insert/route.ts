import { NextResponse } from 'next/server';
import { getDatabase } from '../../../../lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const sql = getDatabase();
    
    // Crear un identificador único con timestamp
    const timestamp = Date.now();
    const testEmail = `API_TEST_${timestamp}@test.com`;
    
    // Insertar registro de prueba
    const insertResult = await sql`
      INSERT INTO wedding_leads (
        contrayente1, 
        contrayente2, 
        email, 
        telefono, 
        consentimiento_rgpd
      ) VALUES (
        ${'API_TEST_' + timestamp},
        ${'API_TEST_' + timestamp},
        ${testEmail},
        ${'TEST_' + timestamp},
        true
      )
      RETURNING id, email, created_at
    `;
    
    // Inmediatamente leer el registro insertado
    const verifyResult = await sql`
      SELECT id, contrayente1, email, created_at 
      FROM wedding_leads 
      WHERE email = ${testEmail}
    `;
    
    // Contar todos los registros
    const countResult = await sql`
      SELECT COUNT(*)::int as total FROM wedding_leads
    `;
    
    // Obtener los últimos 5 registros
    const recentRecords = await sql`
      SELECT id, contrayente1, contrayente2, email, created_at 
      FROM wedding_leads 
      ORDER BY id DESC 
      LIMIT 5
    `;
    
    // Info de conexión
    const dbInfo = await sql`
      SELECT current_database() as db, current_schema() as schema
    `;
    
    return NextResponse.json({
      success: true,
      testIdentifier: testEmail,
      insertResult: insertResult[0],
      verifyResult: verifyResult[0],
      totalRecords: countResult[0]?.total,
      recentRecords: recentRecords,
      connection: dbInfo[0],
      instructions: {
        step1: `Busca en Neon SQL Editor: SELECT * FROM wedding_leads WHERE email = '${testEmail}';`,
        step2: `Si NO aparece, el API está conectado a un proyecto/branch diferente`,
        step3: `Compara el total de registros aquí (${countResult[0]?.total}) con lo que ves en Neon`
      }
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err instanceof Error ? err.message : String(err)
    }, { status: 500 });
  }
}

