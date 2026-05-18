import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

export * from './schema';

let _db: ReturnType<typeof drizzle> | null = null;

export function getDb(databaseUrl?: string) {
  if (!_db) {
    const pool = new Pool({
      connectionString: databaseUrl || process.env.DATABASE_URL,
    });
    _db = drizzle(pool, { schema });
  }
  return _db;
}

export { schema };
