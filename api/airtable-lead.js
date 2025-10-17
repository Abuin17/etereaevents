// api/airtable-lead.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Vercel parsea JSON si viene con Content-Type correcto.
    const data = req.body || {};
    console.log('[airtable-lead] Body keys:', Object.keys(data));

    // Validación mínima
    const required = ['contrayente1', 'contrayente2', 'email', 'telefono', 'consent'];
    const missing = required.filter(k => !data[k] || String(data[k]).trim() === '');
    if (missing.length) {
      console.warn('[airtable-lead] Missing fields:', missing);
      return res.status(400).json({
        error: `Faltan campos requeridos: ${missing.join(', ')}`
      });
    }

    // Mapea a nombres EXACTOS de columnas en Airtable
    const airtableRecord = {
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
      C1SobreC2: data.c1AboutC2,
      C2SobreC1: data.c2AboutC1,
      Historia: data.story,
      MomentoDeSi: data.proposal,
      LugarConHuella: data.favoritePlace,
      
      // Evento
      Fecha: data.eventDateText,
      NumeroInvitados: data.guests,
      Tipo: data.ceremonyType,
      Localizacion: data.locationType,
      Duracion: data.duration,
      MarcoEconomico: data.budget,
      
      // Contacto
      Email: data.email,
      Telefono: data.telefono,
      
      // Consentimiento y metadatos
      ConsentimientoRGPD: data.consent === true ? 'Sí' : 'No',
      FechaEnvio: new Date().toISOString(),
    };

    // Limpia campos undefined para no enviarlos a Airtable
    Object.keys(airtableRecord).forEach(key => {
      if (airtableRecord[key] === undefined) {
        delete airtableRecord[key];
      }
    });

    // Llama a Airtable vía fetch (server-side con token en env)
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableId = process.env.AIRTABLE_TABLE_ID;
    const token = process.env.AIRTABLE_TOKEN;

    const r = await fetch(`https://api.airtable.com/v0/${baseId}/${tableId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ records: [{ fields: airtableRecord }] })
    });

    const out = await r.json();
    if (!r.ok) {
      console.error('[airtable-lead] Airtable error:', out);
      return res.status(502).json({ error: 'Error guardando en Airtable', detail: out });
    }

    console.log('[airtable-lead] Saved OK, id:', out.records?.[0]?.id);
    return res.status(200).json({ ok: true, id: out.records?.[0]?.id });
  } catch (err) {
    console.error('[airtable-lead] Handler error:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}