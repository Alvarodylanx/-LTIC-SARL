import { Module, Global } from '@nestjs/common';
import { Pool } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@ltic/db';
import { DbInitService } from './db-init.service';
import { DB_TOKEN } from './db.constants';

export { DB_TOKEN } from './db.constants';
export type Db = NodePgDatabase<typeof schema>;

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
    DbInitService,
  ],
  exports: [DB_TOKEN],
})
export class DbModule {}
