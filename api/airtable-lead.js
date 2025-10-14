import { VercelRequest, VercelResponse } from '@vercel/node';

interface AirtableRecord {
  fields: {
    [key: string]: any;
  };
}

interface FormData {
  contrayente1: string;
  contrayente2: string;
  contrayente1_fechaNacimiento: { dia: string; mes: string; año: string };
  contrayente1_ciudadNacimiento: string;
  contrayente1_ciudadResidencia: string;
  contrayente1_profesion: string;
  contrayente2_fechaNacimiento: { dia: string; mes: string; año: string };
  contrayente2_ciudadNacimiento: string;
  contrayente2_ciudadResidencia: string;
  contrayente2_profesion: string;
  contrayente1_sobre_contrayente2: string;
  contrayente2_sobre_contrayente1: string;
  historia: string;
  momento_si: string;
  lugar_huella: string;
  fecha: string;
  numero_invitados: string;
  tipo: 'Religiosa' | 'Civil';
  localizacion: 'España' | 'Wedding Destination';
  duracion: 'Un día' | 'FIN DE SEMANA';
  marco_economico: string;
  email: string;
  telefono: string;
  consentimiento_gdpr: boolean;
  consent: boolean;
}

// CORS configuration
const allowedOrigins = [
  'https://www.etereaevents.com',
  'http://localhost:5173',
  'https://localhost:5173'
];

function setCorsHeaders(res: VercelResponse, origin?: string) {
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');
}

function validateFormData(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Required fields validation
  const requiredFields = [
    'contrayente1', 'contrayente2', 'email', 'telefono'
  ];
  
  requiredFields.forEach(field => {
    if (!data[field] || typeof data[field] !== 'string' || data[field].trim().length === 0) {
      errors.push(`Campo requerido: ${field}`);
    }
  });
  
  // Email validation
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Email inválido');
  }
  
  // Phone validation (basic)
  if (data.telefono && data.telefono.length < 9) {
    errors.push('Teléfono inválido');
  }
  
  // Consent validation
  if (!data.consent || data.consent !== true) {
    errors.push('Consentimiento RGPD requerido');
  }
  
  // String length validation
  const stringFields = [
    'contrayente1', 'contrayente2', 'email', 'telefono'
  ];
  
  stringFields.forEach(field => {
    if (data[field] && data[field].length > 255) {
      errors.push(`Campo ${field} demasiado largo`);
    }
  });
  
  // Text area length validation
  const textFields = [
    'contrayente1_sobre_contrayente2', 'contrayente2_sobre_contrayente1',
    'historia', 'momento_si', 'lugar_huella'
  ];
  
  textFields.forEach(field => {
    if (data[field] && data[field].length > 1000) {
      errors.push(`Campo ${field} demasiado largo`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

function sanitizeData(data: FormData): FormData {
  const sanitized = { ...data };
  
  // Sanitize string fields
  const stringFields = [
    'contrayente1', 'contrayente2', 'contrayente1_ciudadNacimiento',
    'contrayente1_ciudadResidencia', 'contrayente1_profesion',
    'contrayente2_ciudadNacimiento', 'contrayente2_ciudadResidencia',
    'contrayente2_profesion', 'contrayente1_sobre_contrayente2',
    'contrayente2_sobre_contrayente1', 'historia', 'momento_si',
    'lugar_huella', 'fecha', 'email', 'telefono'
  ];
  
  stringFields.forEach(field => {
    if (sanitized[field as keyof FormData]) {
      (sanitized as any)[field] = String(sanitized[field as keyof FormData])
        .trim()
        .substring(0, 255);
    }
  });
  
  // Sanitize date fields
  if (sanitized.contrayente1_fechaNacimiento) {
    sanitized.contrayente1_fechaNacimiento = {
      dia: String(sanitized.contrayente1_fechaNacimiento.dia).trim().substring(0, 2),
      mes: String(sanitized.contrayente1_fechaNacimiento.mes).trim().substring(0, 2),
      año: String(sanitized.contrayente1_fechaNacimiento.año).trim().substring(0, 4)
    };
  }
  
  if (sanitized.contrayente2_fechaNacimiento) {
    sanitized.contrayente2_fechaNacimiento = {
      dia: String(sanitized.contrayente2_fechaNacimiento.dia).trim().substring(0, 2),
      mes: String(sanitized.contrayente2_fechaNacimiento.mes).trim().substring(0, 2),
      año: String(sanitized.contrayente2_fechaNacimiento.año).trim().substring(0, 4)
    };
  }
  
  return sanitized;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin;
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    setCorsHeaders(res, origin as string);
    return res.status(200).end();
  }
  
  // Set CORS headers
  setCorsHeaders(res, origin as string);
  
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Ha ocurrido un error. Inténtalo de nuevo más tarde.' });
  }
  
  // Check Content-Type
  if (req.headers['content-type'] !== 'application/json') {
    return res.status(400).json({ error: 'Ha ocurrido un error. Inténtalo de nuevo más tarde.' });
  }
  
  try {
    const formData = req.body as FormData;
    
    // Validate form data
    const validation = validateFormData(formData);
    if (!validation.isValid) {
      console.error('Validation errors:', validation.errors);
      return res.status(400).json({ error: 'Ha ocurrido un error. Inténtalo de nuevo más tarde.' });
    }
    
    // Sanitize data
    const sanitizedData = sanitizeData(formData);
    
    // Validate required environment variables
    const airtableToken = process.env.AIRTABLE_TOKEN;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const airtableTableId = process.env.AIRTABLE_TABLE_ID;
    
    if (!airtableToken || !airtableBaseId || !airtableTableId) {
      console.error('Missing Airtable environment variables');
      return res.status(500).json({ error: 'Ha ocurrido un error. Inténtalo de nuevo más tarde.' });
    }
    
    // Map form data to Airtable fields
    const airtableFields = {
      'Contrayente1': sanitizedData.contrayente1,
      'Contrayente2': sanitizedData.contrayente2,
      'FechaNacimientoC1': `${sanitizedData.contrayente1_fechaNacimiento.dia}/${sanitizedData.contrayente1_fechaNacimiento.mes}/${sanitizedData.contrayente1_fechaNacimiento.año}`,
      'CiudadNacimientoC1': sanitizedData.contrayente1_ciudadNacimiento,
      'CiudadResidenciaC1': sanitizedData.contrayente1_ciudadResidencia,
      'ProfesionC1': sanitizedData.contrayente1_profesion,
      'FechaNacimientoC2': `${sanitizedData.contrayente2_fechaNacimiento.dia}/${sanitizedData.contrayente2_fechaNacimiento.mes}/${sanitizedData.contrayente2_fechaNacimiento.año}`,
      'CiudadNacimientoC2': sanitizedData.contrayente2_ciudadNacimiento,
      'CiudadResidenciaC2': sanitizedData.contrayente2_ciudadResidencia,
      'ProfesionC2': sanitizedData.contrayente2_profesion,
      'C1SobreC2': sanitizedData.contrayente1_sobre_contrayente2,
      'C2SobreC1': sanitizedData.contrayente2_sobre_contrayente1,
      'Historia': sanitizedData.historia,
      'MomentoDelSi': sanitizedData.momento_si,
      'LugarConHuella': sanitizedData.lugar_huella,
      'Fecha': sanitizedData.fecha,
      'NumeroInvitados': parseInt(sanitizedData.numero_invitados) || 0,
      'Tipo': sanitizedData.tipo,
      'Localizacion': sanitizedData.localizacion,
      'Duracion': sanitizedData.duracion,
      'MarcoEconomico': parseFloat(sanitizedData.marco_economico) || 0,
      'Email': sanitizedData.email,
      'Teléfono': sanitizedData.telefono,
      'ConsentimientoRGPD': sanitizedData.consent,
    };
    
    // Create record in Airtable
    const airtableRecord: AirtableRecord = {
      fields: airtableFields
    };
    
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
      console.error('Airtable API error:', response.status, errorData);
      return res.status(500).json({ error: 'Ha ocurrido un error. Inténtalo de nuevo más tarde.' });
    }
    
    const result = await response.json();
    console.log('Successfully saved to Airtable:', result.id);
    
    return res.status(200).json({ 
      success: true, 
      recordId: result.id 
    });
    
  } catch (error) {
    console.error('Error processing form submission:', error);
    return res.status(500).json({ 
      error: 'Ha ocurrido un error. Inténtalo de nuevo más tarde.'
    });
  }
}