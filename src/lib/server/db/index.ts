import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

import { DB_CONNECTION_STRING } from '$env/static/private';
import * as users from './schemas/users';
import * as sessions from './schemas/sessions';

const pool = new pg.Pool({
  connectionString: DB_CONNECTION_STRING,
});

export const db = drizzle(pool, {
  schema: { ...users, ...sessions },
});
