import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq, desc } from 'drizzle-orm';
import { DB_TOKEN } from '../db/db.module';
import { quotes } from '@ltic/db';
import { NotificationsService } from '../notifications/notifications.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class QuotesService {
  constructor(
    @Inject(DB_TOKEN) private db: any,
    private notifications: NotificationsService,
    private mail: MailService,
  ) {}

  async findAll(opts: { status?: string; limit: number; offset: number }) {
    let q = this.db.select().from(quotes).orderBy(desc(quotes.createdAt)).limit(opts.limit).offset(opts.offset);
    if (opts.status) q = this.db.select().from(quotes).where(eq(quotes.status, opts.status))
      .orderBy(desc(quotes.createdAt)).limit(opts.limit).offset(opts.offset);
    return q;
  }

  async findOne(id: number) {
    const [q] = await this.db.select().from(quotes).where(eq(quotes.id, id));
    if (!q) throw new NotFoundException('Quote not found');
    return q;
  }

  async create(data: any) {
    const [q] = await this.db.insert(quotes).values(data).returning();
    // fire-and-forget: don't block the response
    this.notifications.create({
      type: 'quote',
      title: `New quote from ${data.name ?? 'Unknown'}`,
      message: `${data.company ? data.company + ' · ' : ''}${data.serviceType ?? 'General enquiry'} — ${data.email ?? ''}`,
      link: '/admin/quotes',
    }).catch(() => {});
    this.mail.sendAdminNotification(
      `New Quote Request from ${data.name ?? 'Unknown'}`,
      this.mail.quoteEmail(data),
    ).catch(() => {});
    return q;
  }

  async update(id: number, data: any) {
    const [q] = await this.db.update(quotes).set({ ...data, updatedAt: new Date() })
      .where(eq(quotes.id, id)).returning();
    if (!q) throw new NotFoundException('Quote not found');
    return q;
  }
}
