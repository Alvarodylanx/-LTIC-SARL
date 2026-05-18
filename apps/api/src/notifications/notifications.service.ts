import { Injectable, Inject } from '@nestjs/common';
import { eq, and, desc } from 'drizzle-orm';
import { DB_TOKEN } from '../db/db.module';
import { notifications, users } from '@ltic/db';

@Injectable()
export class NotificationsService {
  constructor(@Inject(DB_TOKEN) private db: any) {}

  async getForUser(userId: number) {
    return this.db.select().from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(desc(notifications.createdAt))
      .limit(50);
  }

  async getUnreadCount(userId: number) {
    const rows = await this.db.select().from(notifications)
      .where(and(eq(notifications.userId, userId), eq(notifications.read, false)));
    return { count: rows.length };
  }

  async markRead(userId: number, id: number) {
    await this.db.update(notifications)
      .set({ read: true })
      .where(and(eq(notifications.id, id), eq(notifications.userId, userId)));
    return { ok: true };
  }

  async markAllRead(userId: number) {
    await this.db.update(notifications).set({ read: true }).where(eq(notifications.userId, userId));
    return { ok: true };
  }

  async broadcast(type: string, titleEn: string, titleFr: string, messageEn: string, messageFr: string, link?: string) {
    const prefField = type === 'product' ? 'notifyProducts'
      : type === 'news' ? 'notifyNews'
      : type === 'service' ? 'notifyServices'
      : 'notifyOrders';

    const allUsers = await this.db.select().from(users).where(eq((users as any)[prefField], true));
    if (!allUsers.length) return;

    const rows = allUsers.map((u: any) => ({ userId: u.id, type, titleEn, titleFr, messageEn, messageFr, link: link ?? null }));
    await this.db.insert(notifications).values(rows);
  }
}
