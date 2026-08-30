import 'dotenv/config';

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

const { Client } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '../..');
const migrationsDir = path.join(projectRoot, 'database', 'migrations');

const requiredEnv = [
  'POSTGRES_DB',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_PORT',
];

for (const variable of requiredEnv) {
  if (!process.env[variable]) {
    throw new Error(
      `Falta la variable de entorno: ${variable}`
    );
  }
}

const client = new Client({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

async function main() {
  console.log('Conectando a PostgreSQL...');

  await client.connect();

  console.log('✓ Conexión establecida');

  // Tabla utilizada únicamente para controlar las migraciones.
  await client.query(`
    CREATE TABLE IF NOT EXISTS public.schema_migrations (
      version VARCHAR(255) PRIMARY KEY,
      executed_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const files = await fs.readdir(migrationsDir);

  const migrations = files
    .filter((file) => /^\d{3}_.+\.sql$/.test(file))
    .sort();

  if (migrations.length === 0) {
    console.log('No se encontraron migraciones.');
    return;
  }

  const { rows: executedRows } = await client.query(`
    SELECT version
    FROM public.schema_migrations
    ORDER BY version;
  `);

  const executed = new Set(
    executedRows.map((row) => row.version)
  );

  const pending = migrations.filter(
    (migration) => !executed.has(migration)
  );

  if (pending.length === 0) {
    console.log('✓ No hay migraciones pendientes.');
    return;
  }

  console.log(`Migraciones pendientes: ${pending.length}`);

  for (const migration of pending) {
    const migrationPath = path.join(
      migrationsDir,
      migration
    );

    console.log(`\n→ Ejecutando ${migration}`);

    const sql = await fs.readFile(
      migrationPath,
      'utf8'
    );

    try {
      await client.query('BEGIN');

      await client.query(sql);

      await client.query(
        `
          INSERT INTO public.schema_migrations (version)
          VALUES ($1);
        `,
        [migration]
      );

      await client.query('COMMIT');

      console.log(`✓ ${migration}`);
    } catch (error) {
      await client.query('ROLLBACK');

      console.error(`✗ Error en ${migration}`);

      throw error;
    }
  }

  console.log(
    '\n✓ Todas las migraciones fueron ejecutadas correctamente.'
  );
}

main()
  .catch((error) => {
    console.error(
      '\n✗ Error ejecutando migraciones:'
    );

    console.error(error.message);

    process.exitCode = 1;
  })
  .finally(async () => {
    await client.end().catch(() => {});
  });