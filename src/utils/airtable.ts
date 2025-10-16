import { FormData } from '../components/wedding-form/WeddingForm';

export interface AirtableRecord {
  fields: {
    [key: string]: any;
  };
}

export const submitToAirtable = async (formData: FormData): Promise<{ success: boolean; recordId?: string; error?: string }> => {
  try {
    // Map form data to Airtable fields - using simple field names
    const airtableFields = {
      'Contrayente1': formData.contrayente1,
      'Contrayente2': formData.contrayente2,
      'FechaNacimientoC1': `${formData.contrayente1_fechaNacimiento.dia}/${formData.contrayente1_fechaNacimiento.mes}/${formData.contrayente1_fechaNacimiento.año}`,
      'CiudadNacimientoC1': formData.contrayente1_ciudadNacimiento,
      'CiudadResidenciaC1': formData.contrayente1_ciudadResidencia,
      'ProfesionC1': formData.contrayente1_profesion,
      'FechaNacimientoC2': `${formData.contrayente2_fechaNacimiento.dia}/${formData.contrayente2_fechaNacimiento.mes}/${formData.contrayente2_fechaNacimiento.año}`,
      'CiudadNacimientoC2': formData.contrayente2_ciudadNacimiento,
      'CiudadResidenciaC2': formData.contrayente2_ciudadResidencia,
      'ProfesionC2': formData.contrayente2_profesion,
      'C1SobreC2': formData.contrayente1_sobre_contrayente2,
      'C2SobreC1': formData.contrayente2_sobre_contrayente1,
      'Historia': formData.historia,
      'MomentoDelSi': formData.momento_si,
      'LugarConHuella': formData.lugar_huella,
      'Fecha': formData.fecha,
      'NumeroInvitados': parseInt(formData.numero_invitados) || 0, // Convert to number
      'Tipo': formData.tipo,
      'Localizacion': formData.localizacion,
      'Duracion': formData.duracion,
      'MarcoEconomico': parseFloat(formData.marco_economico) || 0, // Convert to number
      'Email': formData.email,
      'Teléfono': formData.telefono,
      'ConsentimientoRGPD': formData.consent,
      // 'FechaEnvio' removed - it's a computed field in Airtable
    };

    // Create record in Airtable
    const airtableRecord: AirtableRecord = {
      fields: airtableFields
    };

    // TEMPORARY: Use Airtable directly in both development and production
    // until Vercel build issues are resolved
    const airtableToken = import.meta.env.VITE_AIRTABLE_TOKEN;
    const airtableBaseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
    const airtableTableId = import.meta.env.VITE_AIRTABLE_TABLE_ID;
    
    if (!airtableToken || !airtableBaseId || !airtableTableId) {
      throw new Error('Missing Airtable environment variables');
    }
    
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
      return { 
        success: false, 
        error: 'Error saving data to Airtable' 
      };
    }

    const result = await response.json();
    console.log('Successfully saved to Airtable:', result.recordId);

    return { 
      success: true, 
      recordId: result.recordId 
    };

  } catch (error) {
    console.error('Error processing form submission:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
