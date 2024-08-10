import path from 'path';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
const { Client } = pg;

async function main() {
  const client = new Client({
    connectionString: process.env.DB_CONNECTION_STRING,
  });

  await client.connect();

  const db = drizzle(client);

  console.log('Running migrations ...');

  const migrationsFolder = path.join(import.meta.dirname, './');
  await migrate(db, {
    migrationsFolder,
  });

  console.log('Migrations ran successfully.');

  client.end();
}

main();
