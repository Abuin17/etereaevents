// Helper for validation
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidPhone = (phone) => {
  return /^\+?[0-9\s\-()]{7,20}$/.test(phone);
};

export default async function handler(req, res) {
  // 1. CORS Configuration
  const allowedOrigins = ['https://www.etereaevents.com', 'http://localhost:5173'];
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 2. Method and Content-Type Validation
  if (req.method !== 'POST') {
    console.warn(`[Airtable API] Method Not Allowed: ${req.method}`);
    return res.status(405).json({ error: 'Method not allowed. Only POST requests are accepted.' });
  }

  if (req.headers['content-type'] !== 'application/json') {
    console.warn(`[Airtable API] Unsupported Content Type: ${req.headers['content-type']}`);
    return res.status(400).json({ error: 'Unsupported content type. Only application/json is accepted.' });
  }

  try {
    const rawFormData = req.body;
    
    // 🔍 DEBUG LOGS
    console.log('🔍 DEBUG - Raw form data received:', rawFormData);
    console.log('🔍 DEBUG - contrayente1 from request:', rawFormData.contrayente1);
    console.log('🔍 DEBUG - contrayente1 type:', typeof rawFormData.contrayente1);
    console.log('🔍 DEBUG - contrayente1 length:', rawFormData.contrayente1?.length);
    console.log('🔍 DEBUG - All keys in request:', Object.keys(rawFormData));

    // 3. Validate required environment variables
    const airtableToken = process.env.AIRTABLE_TOKEN;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const airtableTableId = process.env.AIRTABLE_TABLE_ID;

    if (!airtableToken || !airtableBaseId || !airtableTableId) {
      console.error('[Airtable API] Server configuration error: Missing Airtable environment variables.');
      return res.status(500).json({ error: 'Ha ocurrido un error en la configuración del servidor. Inténtalo de nuevo más tarde.' });
    }

    // 4. Basic Data Validation and Sanitization
    const sanitized = {};

    // Define expected fields and their validation rules
    const requiredStringFields = [
      'contrayente1', 'contrayente2', 'contrayente1_ciudadNacimiento',
      'contrayente1_ciudadResidencia', 'contrayente1_profesion',
      'contrayente2_ciudadNacimiento', 'contrayente2_ciudadResidencia',
      'contrayente2_profesion', 'contrayente1_sobre_contrayente2',
      'contrayente2_sobre_contrayente1', 'historia', 'momento_si',
      'lugar_huella', 'fecha', 'email', 'telefono', 'tipo', 'localizacion', 'duracion'
    ];

    const requiredBooleanFields = ['consent'];
    const optionalNumberFields = ['numero_invitados', 'marco_economico'];

    // Process string fields
    requiredStringFields.forEach(field => {
      const value = rawFormData[field];
      if (typeof value === 'string' && value.trim().length > 0) {
        sanitized[field] = value.trim().substring(0, 255);
      } else {
        console.warn(`[Airtable API] Validation Error: Missing or invalid string field: ${String(field)}`);
        return res.status(400).json({ error: `Falta información requerida: ${String(field)}. Por favor, revisa el formulario.` });
      }
    });

    // Process boolean fields
    requiredBooleanFields.forEach(field => {
      const value = rawFormData[field];
      if (typeof value === 'boolean') {
        sanitized[field] = value;
      } else {
        console.warn(`[Airtable API] Validation Error: Missing or invalid boolean field: ${String(field)}`);
        return res.status(400).json({ error: `Falta información requerida: ${String(field)}. Por favor, revisa el formulario.` });
      }
    });

    // Specific validation for consent
    if (!sanitized.consent) {
      console.warn('[Airtable API] Validation Error: GDPR consent not given.');
      return res.status(400).json({ error: 'Debes aceptar la Política de Privacidad para continuar.' });
    }

    // Process number fields (optional, but validate if present)
    optionalNumberFields.forEach(field => {
      const value = rawFormData[field];
      if (typeof value === 'string' && value.trim().length > 0) {
        const parsed = parseFloat(value.replace(',', '.'));
        if (!isNaN(parsed)) {
          sanitized[field] = parsed;
        } else {
          console.warn(`[Airtable API] Validation Error: Invalid number format for field: ${String(field)}`);
          return res.status(400).json({ error: `Formato numérico inválido para ${String(field)}. Por favor, introduce un número válido.` });
        }
      }
    });

    // Validate email and phone
    if (!isValidEmail(sanitized.email || '')) {
      console.warn('[Airtable API] Validation Error: Invalid email format.');
      return res.status(400).json({ error: 'El formato del email no es válido. Por favor, introduce un email correcto.' });
    }
    if (!isValidPhone(sanitized.telefono || '')) {
      console.warn('[Airtable API] Validation Error: Invalid phone format.');
      return res.status(400).json({ error: 'El formato del teléfono no es válido. Por favor, introduce un número de teléfono correcto.' });
    }

    // Sanitize date fields
    const dateFields = ['contrayente1_fechaNacimiento', 'contrayente2_fechaNacimiento'];
    dateFields.forEach(field => {
      const dateObj = rawFormData[field];
      if (dateObj && typeof dateObj === 'object' && 'dia' in dateObj && 'mes' in dateObj && 'año' in dateObj) {
        const { dia, mes, año } = dateObj;
        if (dia && mes && año) {
          sanitized[field] = `${String(dia).trim()}/${String(mes).trim()}/${String(año).trim()}`;
        } else {
          console.warn(`[Airtable API] Validation Error: Incomplete date for field: ${String(field)}`);
          return res.status(400).json({ error: `Fecha incompleta para ${String(field)}. Por favor, introduce día, mes y año.` });
        }
      } else {
        console.warn(`[Airtable API] Validation Error: Missing date object for field: ${String(field)}`);
        return res.status(400).json({ error: `Falta la fecha de nacimiento para ${String(field)}. Por favor, revisa el formulario.` });
      }
    });

    // 5. Map sanitized data to Airtable fields
    const airtableFields = {
      'Contrayente1': sanitized.contrayente1,
      'Contrayente2': sanitized.contrayente2,
      'FechaNacimientoC1': sanitized.contrayente1_fechaNacimiento,
      'CiudadNacimientoC1': sanitized.contrayente1_ciudadNacimiento,
      'CiudadResidenciaC1': sanitized.contrayente1_ciudadResidencia,
      'ProfesionC1': sanitized.contrayente1_profesion,
      'FechaNacimientoC2': sanitized.contrayente2_fechaNacimiento,
      'CiudadNacimientoC2': sanitized.contrayente2_ciudadNacimiento,
      'CiudadResidenciaC2': sanitized.contrayente2_ciudadResidencia,
      'ProfesionC2': sanitized.contrayente2_profesion,
      'C1SobreC2': sanitized.contrayente1_sobre_contrayente2,
      'C2SobreC1': sanitized.contrayente2_sobre_contrayente1,
      'Historia': sanitized.historia,
      'MomentoDelSi': sanitized.momento_si,
      'LugarConHuella': sanitized.lugar_huella,
      'Fecha': sanitized.fecha,
      'NumeroInvitados': sanitized.numero_invitados,
      'Tipo': sanitized.tipo,
      'Localizacion': sanitized.localizacion,
      'Duracion': sanitized.duracion,
      'MarcoEconomico': sanitized.marco_economico,
      'Email': sanitized.email,
      'Teléfono': sanitized.telefono,
      'Consentimiento GDPR': sanitized.consent,
    };

    const airtableRecord = {
      fields: airtableFields
    };

    // 6. Send data to Airtable
    console.log('[Airtable API] Attempting to save data to Airtable...');
    const response = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableId}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${airtableToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(airtableRecord),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('[Airtable API] Error saving data to Airtable:', response.status, errorData);
      return res.status(500).json({
        error: 'Ha ocurrido un error al guardar los datos. Inténtalo de nuevo más tarde.',
        details: process.env.NODE_ENV === 'development' ? errorData : undefined
      });
    }

    const result = await response.json();
    console.log('[Airtable API] Successfully saved to Airtable. Record ID:', result.id);

    return res.status(200).json({
      success: true,
      recordId: result.id
    });

  } catch (error) {
    console.error('[Airtable API] Unhandled error during form submission:', error);
    return res.status(500).json({
      error: 'Ha ocurrido un error interno del servidor. Inténtalo de nuevo más tarde.',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}