import { Injectable, Inject } from '@nestjs/common';
import { eq, sql, desc } from 'drizzle-orm';
import { DB_TOKEN } from '../db/db.module';
import { products, quotes, orders, contacts } from '@ltic/db';

@Injectable()
export class StatsService {
  constructor(@Inject(DB_TOKEN) private db: any) {}

  async getDashboard() {
    const [[{ total: totalProducts }], [{ total: totalQuotes }], [{ total: pendingQuotes }],
      [{ total: totalOrders }], [{ total: unreadContacts }],
      recentQuotes, recentContacts] = await Promise.all([
      this.db.select({ total: sql<number>`count(*)` }).from(products),
      this.db.select({ total: sql<number>`count(*)` }).from(quotes),
      this.db.select({ total: sql<number>`count(*)` }).from(quotes).where(eq(quotes.status, 'pending')),
      this.db.select({ total: sql<number>`count(*)` }).from(orders),
      this.db.select({ total: sql<number>`count(*)` }).from(contacts).where(eq(contacts.read, false)),
      this.db.select().from(quotes).orderBy(desc(quotes.createdAt)).limit(5),
      this.db.select().from(contacts).orderBy(desc(contacts.createdAt)).limit(5),
    ]);

    return {
      totalProducts: Number(totalProducts),
      totalQuotes: Number(totalQuotes),
      pendingQuotes: Number(pendingQuotes),
      totalOrders: Number(totalOrders),
      unreadContacts: Number(unreadContacts),
      recentQuotes,
      recentContacts,
    };
  }
}
