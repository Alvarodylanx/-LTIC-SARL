import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { sql } from 'drizzle-orm';
import { Subject, Observable } from 'rxjs';
import { MessageEvent } from '@nestjs/common';
import { DB_TOKEN } from '../db/db.module';

export interface AdminNotification {
  id: number;
  type: string;
  title: string;
  message: string;
  link: string | null;
  read: boolean;
  created_at: string;
}

@Injectable()
export class NotificationsService implements OnModuleInit {
  private readonly events$ = new Subject<MessageEvent>();

  constructor(@Inject(DB_TOKEN) private db: any) {}

  getStream(): Observable<MessageEvent> {
    return this.events$.asObservable();
  }

  async onModuleInit() {
    await this.db.execute(sql`
      CREATE TABLE IF NOT EXISTS admin_notifications (
        id        SERIAL PRIMARY KEY,
        type      VARCHAR(50) NOT NULL,
        title     TEXT NOT NULL,
        message   TEXT NOT NULL,
        link      VARCHAR(255),
        read      BOOLEAN DEFAULT FALSE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `);
  }

  async create(data: { type: string; title: string; message: string; link?: string }): Promise<AdminNotification> {
    const result = await this.db.execute(sql`
      INSERT INTO admin_notifications (type, title, message, link)
      VALUES (${data.type}, ${data.title}, ${data.message}, ${data.link ?? null})
      RETURNING *
    `);
    const notification = result.rows[0];
    this.events$.next({ data: notification });
    return notification;
  }

  async findAll(): Promise<AdminNotification[]> {
    const result = await this.db.execute(sql`
      SELECT * FROM admin_notifications ORDER BY created_at DESC LIMIT 200
    `);
    return result.rows;
  }

  async countUnread(): Promise<number> {
    const result = await this.db.execute(sql`
      SELECT COUNT(*) AS count FROM admin_notifications WHERE read = FALSE
    `);
    return Number(result.rows[0]?.count ?? 0);
  }

  async markRead(id: number): Promise<void> {
    await this.db.execute(sql`
      UPDATE admin_notifications SET read = TRUE WHERE id = ${id}
    `);
  }

  async markAllRead(): Promise<void> {
    await this.db.execute(sql`
      UPDATE admin_notifications SET read = TRUE WHERE read = FALSE
    `);
  }

  async delete(id: number): Promise<void> {
    await this.db.execute(sql`
      DELETE FROM admin_notifications WHERE id = ${id}
    `);
  }
}
