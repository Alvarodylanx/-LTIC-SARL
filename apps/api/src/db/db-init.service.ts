import { Injectable, OnModuleInit, Logger, Inject } from '@nestjs/common';
import { DB_TOKEN } from './db.module';
import { sql } from 'drizzle-orm';

@Injectable()
export class DbInitService implements OnModuleInit {
  private readonly logger = new Logger(DbInitService.name);

  constructor(@Inject(DB_TOKEN) private db: any) {}

  async onModuleInit() {
    await this.db.execute(sql`
      ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_id INTEGER;
    `);
    this.logger.log('Database tables verified');
  }
}
