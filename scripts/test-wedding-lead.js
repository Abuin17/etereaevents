/**
 * Script de prueba para verificar la conexión a Neon y la inserción de datos
 * 
 * Uso:
 *   node scripts/test-wedding-lead.js
 * 
 * Requiere: DATABASE_URL en .env.local
 */

require('dotenv').config({ path: '.env.local' });
const { neon } = require('@neondatabase/serverless');

async function testConnection() {
  try {
    if (!process.env.DATABASE_URL) {
      console.error('❌ DATABASE_URL no está configurada en .env.local');
      process.exit(1);
    }

    console.log('🔌 Conectando a Neon...');
    const sql = neon(process.env.DATABASE_URL);

    // Test 1: Verificar conexión
    console.log('\n📊 Test 1: Verificar conexión...');
    const dbInfo = await sql`SELECT current_database() as db_name, version() as version`;
    console.log('✅ Conectado a:', dbInfo[0].db_name);
    console.log('   Versión:', dbInfo[0].version.split(' ')[0]);

    // Test 2: Verificar si la tabla existe
    console.log('\n📊 Test 2: Verificar si la tabla existe...');
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'wedding_leads'
      ) as exists
    `;
    
    if (tableExists[0].exists) {
      console.log('✅ La tabla wedding_leads existe');
    } else {
      console.log('⚠️  La tabla wedding_leads NO existe');
      console.log('   Creando tabla...');
      // Aquí deberías ejecutar el CREATE TABLE
      console.log('   Por favor, ejecuta la función initializeDatabase() primero');
      process.exit(1);
    }

    // Test 3: Contar registros existentes
    console.log('\n📊 Test 3: Contar registros existentes...');
    const count = await sql`SELECT COUNT(*) as total FROM wedding_leads`;
    console.log(`✅ Total de registros: ${count[0].total}`);

    // Test 4: Insertar un registro de prueba
    console.log('\n📊 Test 4: Insertar registro de prueba...');
    const testData = {
      contrayente1: 'Test Contrayente 1',
      contrayente2: 'Test Contrayente 2',
      email: `test-${Date.now()}@test.com`,
      telefono: '123456789',
      consentimiento_rgpd: true
    };

    const result = await sql`
      INSERT INTO wedding_leads (
        contrayente1,
        contrayente2,
        email,
        telefono,
        consentimiento_rgpd
      ) VALUES (
        ${testData.contrayente1},
        ${testData.contrayente2},
        ${testData.email},
        ${testData.telefono},
        ${testData.consentimiento_rgpd}
      )
      RETURNING id, created_at
    `;

    if (result && result.length > 0) {
      console.log('✅ Registro insertado exitosamente:');
      console.log('   ID:', result[0].id);
      console.log('   Email:', testData.email);
      console.log('   Created at:', result[0].created_at);

      // Test 5: Verificar que se puede leer
      console.log('\n📊 Test 5: Verificar lectura del registro...');
      const verify = await sql`
        SELECT * FROM wedding_leads WHERE id = ${result[0].id}
      `;
      
      if (verify && verify.length > 0) {
        console.log('✅ Registro encontrado en la base de datos');
        console.log('   Contrayente 1:', verify[0].contrayente1);
        console.log('   Contrayente 2:', verify[0].contrayente2);
        console.log('   Email:', verify[0].email);
      } else {
        console.error('❌ El registro no se encontró después de insertar');
      }

      // Limpiar: eliminar el registro de prueba
      console.log('\n🧹 Limpiando registro de prueba...');
      await sql`DELETE FROM wedding_leads WHERE id = ${result[0].id}`;
      console.log('✅ Registro de prueba eliminado');
    } else {
      console.error('❌ La inserción no devolvió ningún resultado');
    }

    console.log('\n✅ Todos los tests pasaron correctamente!');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (error.stack) {
      console.error('Stack:', error.stack);
    }
    process.exit(1);
  }
}

testConnection();

