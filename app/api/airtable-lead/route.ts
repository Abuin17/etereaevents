import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json(
      { error: 'Method Not Allowed' },
      { status: 405 }
    );
  }

  try {
    const data = await req.json();
    console.log('[airtable-lead] Body keys:', Object.keys(data));

    // Validación mínima
    const required = ['contrayente1', 'contrayente2', 'email', 'telefono', 'consent'];
    const missing = required.filter(k => !data[k] || String(data[k]).trim() === '');
    if (missing.length) {
      console.warn('[airtable-lead] Missing fields:', missing);
      return NextResponse.json(
        {
          error: `Faltan campos requeridos: ${missing.join(', ')}`
        },
        { status: 400 }
      );
    }

    // Mapea a nombres EXACTOS de columnas en Airtable
    const airtableRecord: Record<string, any> = {
      // Contrayentes
      Contrayente1: data.contrayente1,
      Contrayente2: data.contrayente2,
      
      // Fechas de nacimiento
      FechaNacimientoC1: data.contrayente1_fechaNacimiento ? 
        `${data.contrayente1_fechaNacimiento.dia}/${data.contrayente1_fechaNacimiento.mes}/${data.contrayente1_fechaNacimiento.año}` : undefined,
      FechaNacimientoC2: data.contrayente2_fechaNacimiento ? 
        `${data.contrayente2_fechaNacimiento.dia}/${data.contrayente2_fechaNacimiento.mes}/${data.contrayente2_fechaNacimiento.año}` : undefined,
      
      // Ciudades y profesiones
      CiudadNacimientoC1: data.contrayente1_ciudadNacimiento,
      CiudadResidenciaC1: data.contrayente1_ciudadResidencia,
      ProfesionC1: data.contrayente1_profesion,
      CiudadNacimientoC2: data.contrayente2_ciudadNacimiento,
      CiudadResidenciaC2: data.contrayente2_ciudadResidencia,
      ProfesionC2: data.contrayente2_profesion,
      
      // Relaciones y historia
      C1SobreC2: data.c1AboutC2 || data.contrayente1_sobre_contrayente2,
      C2SobreC1: data.c2AboutC1 || data.contrayente2_sobre_contrayente1,
      Historia: data.story || data.historia,
      MomentoDeSi: data.proposal || data.momento_si,
      LugarConHuella: data.favoritePlace || data.lugar_huella,
      
      // Evento
      Fecha: data.eventDateText || data.fecha,
      NumeroInvitados: data.guests || data.numero_invitados,
      Tipo: data.ceremonyType || data.tipo,
      Localizacion: data.locationType || data.localizacion,
      Duracion: data.duration || data.duracion,
      MarcoEconomico: data.budget || data.marco_economico,
      
      // Contacto
      Email: data.email,
      Telefono: data.telefono,
      
      // Consentimiento y metadatos
      ConsentimientoRGPD: data.consent === true ? 'Sí' : 'No',
      FechaEnvio: new Date().toISOString(),
    };

    // Limpia campos undefined para no enviarlos a Airtable
    Object.keys(airtableRecord).forEach(key => {
      if (airtableRecord[key] === undefined || airtableRecord[key] === null || airtableRecord[key] === '') {
        delete airtableRecord[key];
      }
    });

    // Variables de entorno server-only
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.AIRTABLE_TABLE_NAME;
    const apiKey = process.env.AIRTABLE_API_KEY;

    if (!baseId || !tableName || !apiKey) {
      console.error('[airtable-lead] Missing environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Llama a Airtable vía fetch (server-side con token en env)
    const r = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ records: [{ fields: airtableRecord }] }),
      }
    );

    const out = await r.json();
    if (!r.ok) {
      console.error('[airtable-lead] Airtable error:', out);
      return NextResponse.json(
        { error: 'Error guardando en Airtable', detail: out },
        { status: 502 }
      );
    }

    console.log('[airtable-lead] Saved OK, id:', out.records?.[0]?.id);
    return NextResponse.json(
      { ok: true, id: out.records?.[0]?.id },
      { status: 200 }
    );
  } catch (err) {
    console.error('[airtable-lead] Handler error:', err);
    return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 }
    );
  }
}

