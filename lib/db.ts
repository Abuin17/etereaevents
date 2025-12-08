import { neon, NeonQueryFunction } from '@neondatabase/serverless';

// Función para limpiar y validar la cadena de conexión
function cleanDatabaseUrl(url: string | undefined): string {
  if (!url) {
    throw new Error(
      'DATABASE_URL no está configurada. Por favor, añade DATABASE_URL a tu archivo .env.local'
    );
  }

  // Limpiar la cadena: remover 'psql', comillas simples/dobles, y espacios extra
  let cleaned = url.trim();
  
  // Remover comillas al inicio y final
  cleaned = cleaned.replace(/^['"]|['"]$/g, '');
  
  // Si empieza con 'psql', removerlo y limpiar
  if (cleaned.startsWith('psql')) {
    cleaned = cleaned.replace(/^psql\s+/, '').trim();
    // Remover comillas que puedan quedar después de psql
    cleaned = cleaned.replace(/^['"]|['"]$/g, '');
  }
  
  // Validar que sea una URL válida de PostgreSQL
  if (!cleaned.startsWith('postgresql://') && !cleaned.startsWith('postgres://')) {
    throw new Error(
      `DATABASE_URL no es una URL válida de PostgreSQL. Formato esperado: postgresql://user:password@host/database`
    );
  }

  // Verificar que la URL apunte a la base de datos correcta
  // La base de datos debe ser "eterea-weddings" (puede tener guiones)
  const urlMatch = cleaned.match(/postgres(ql)?:\/\/[^\/]+\/([^?]+)/);
  if (urlMatch) {
    const dbName = urlMatch[2];
    console.log(`[db] Conectando a la base de datos: ${dbName}`);
    
    // Advertencia si no es la base de datos esperada
    if (!dbName.includes('wedding') && !dbName.includes('eterea')) {
      console.warn(`[db] ⚠️ Advertencia: La base de datos "${dbName}" no parece ser la correcta. Se espera "eterea-weddings"`);
    }
  }

  return cleaned;
}

// Cliente SQL lazy - se inicializa solo cuando se necesita (no durante build)
let _sql: NeonQueryFunction<false, false> | null = null;

export function getDatabase(): NeonQueryFunction<false, false> {
  if (!_sql) {
    const databaseUrl = cleanDatabaseUrl(process.env.DATABASE_URL);
    _sql = neon(databaseUrl);
  }
  return _sql;
}

// Función helper para inicializar la tabla si no existe
export async function initializeDatabase() {
  const sql = getDatabase();
  
  // Asegurarse de que estamos en el esquema public
  try {
    await sql`SET search_path TO public`;
  } catch (e) {
    console.warn('[initializeDatabase] Could not set search_path:', e);
  }
  
  await sql`
    CREATE TABLE IF NOT EXISTS public.wedding_leads (
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
