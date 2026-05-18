import { Module, Global } from '@nestjs/common';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@ltic/db';

export const DB_TOKEN = 'DRIZZLE_DB';

@Global()
@Module({
  providers: [
    {
      provide: DB_TOKEN,
      useFactory: () => {
        const pool = new Pool({ connectionString: process.env.DATABASE_URL });
        return drizzle(pool, { schema });
      },
    },
  ],
  exports: [DB_TOKEN],
})
export class DbModule {}
