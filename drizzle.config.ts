import type { Config } from 'drizzle-kit';

export default {
  dialect: 'postgresql',
  schema: './src/lib/server/db/schemas/*.ts',
  out: './migrations',
  dbCredentials: {
    url: process.env.DB_CONNECTION_STRING!,
  },
} satisfies Config;
