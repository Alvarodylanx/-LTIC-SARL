import { Injectable, OnModuleInit, Inject, Logger } from '@nestjs/common';
import { sql } from 'drizzle-orm';
import { DB_TOKEN } from './db.module';

@Injectable()
export class DbInitService implements OnModuleInit {
  private readonly logger = new Logger(DbInitService.name);

  constructor(@Inject(DB_TOKEN) private db: any) {}

  async onModuleInit() {
    try {
      await this.db.execute(sql`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          notify_products BOOLEAN NOT NULL DEFAULT true,
          notify_news BOOLEAN NOT NULL DEFAULT true,
          notify_services BOOLEAN NOT NULL DEFAULT true,
          notify_orders BOOLEAN NOT NULL DEFAULT true,
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `);
      await this.db.execute(sql`
        CREATE TABLE IF NOT EXISTS notifications (
          id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          type VARCHAR(50) NOT NULL,
          title_en TEXT NOT NULL,
          title_fr TEXT NOT NULL,
          message_en TEXT NOT NULL,
          message_fr TEXT NOT NULL,
          link VARCHAR(255),
          read BOOLEAN NOT NULL DEFAULT false,
          created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )
      `);
      this.logger.log('Database tables verified');
    } catch (err) {
      this.logger.error('DB init error', err);
    }
  }
}
