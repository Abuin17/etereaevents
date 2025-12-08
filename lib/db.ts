import { neon } from '@neondatabase/serverless';

// Crear cliente de Neon usando la variable de entorno DATABASE_URL
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    'DATABASE_URL no está configurada. Por favor, añade DATABASE_URL a tu archivo .env.local'
  );
}

export const sql = neon(databaseUrl);

// Función helper para inicializar la tabla si no existe
export async function initializeDatabase() {
  await sql`
    CREATE TABLE IF NOT EXISTS wedding_leads (
      id SERIAL PRIMARY KEY,
      
      -- Contrayentes
      contrayente1 VARCHAR(255) NOT NULL,
      contrayente2 VARCHAR(255) NOT NULL,
      
      -- Info Contrayente 1
      c1_fecha_nacimiento VARCHAR(50),
      c1_ciudad_nacimiento VARCHAR(255),
      c1_ciudad_residencia VARCHAR(255),
      c1_profesion VARCHAR(255),
      
      -- Info Contrayente 2
      c2_fecha_nacimiento VARCHAR(50),
      c2_ciudad_nacimiento VARCHAR(255),
      c2_ciudad_residencia VARCHAR(255),
      c2_profesion VARCHAR(255),
      
      -- Textos sobre la pareja
      c1_sobre_c2 TEXT,
      c2_sobre_c1 TEXT,
      
      -- Historia
      historia TEXT,
      momento_si TEXT,
      lugar_huella VARCHAR(500),
      
      -- Detalles del evento
      fecha_evento VARCHAR(255),
      numero_invitados VARCHAR(100),
      tipo_ceremonia VARCHAR(50),
      localizacion VARCHAR(50),
      duracion VARCHAR(50),
      presupuesto VARCHAR(100),
      
      -- Contacto
      email VARCHAR(255) NOT NULL,
      telefono VARCHAR(50) NOT NULL,
      
      -- Consentimiento y metadatos
      consentimiento_rgpd BOOLEAN DEFAULT false,
      fecha_envio TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      
      -- Índices para búsqueda
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;
}

