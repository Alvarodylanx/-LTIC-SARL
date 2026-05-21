import { Injectable, OnModuleInit, Logger, Inject } from '@nestjs/common';
import { DB_TOKEN, Db } from './db.module';
import { sql } from 'drizzle-orm';

@Injectable()
export class DbInitService implements OnModuleInit {
  private readonly logger = new Logger(DbInitService.name);

  constructor(@Inject(DB_TOKEN) private db: Db) {}

  async onModuleInit() {
    await this.db.execute(sql`
      ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_id INTEGER;
    `);
    await this.db.execute(sql`
      ALTER TABLE customers ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE;
      ALTER TABLE customers ADD COLUMN IF NOT EXISTS email_verification_token TEXT;
      ALTER TABLE customers ADD COLUMN IF NOT EXISTS email_verification_expires TIMESTAMP;
    `);
    await this.db.execute(sql`
      CREATE TABLE IF NOT EXISTS password_reset_tokens (
        id         SERIAL PRIMARY KEY,
        email      TEXT NOT NULL,
        token      TEXT NOT NULL UNIQUE,
        expires_at TIMESTAMP NOT NULL,
        used       BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    this.logger.log('Database tables verified');
  }
}
