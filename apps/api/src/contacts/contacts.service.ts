import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq, desc } from 'drizzle-orm';
import { DB_TOKEN, Db } from '../db/db.module';
import { contacts, NewContact, Contact } from '@ltic/db';
import { NotificationsService } from '../notifications/notifications.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class ContactsService {
  constructor(
    @Inject(DB_TOKEN) private db: Db,
    private notifications: NotificationsService,
    private mail: MailService,
  ) {}

  async findAll(opts: { read?: boolean; limit: number; offset: number }) {
    let q = this.db.select().from(contacts).orderBy(desc(contacts.createdAt)).limit(opts.limit).offset(opts.offset);
    if (opts.read !== undefined) q = this.db.select().from(contacts).where(eq(contacts.read, opts.read))
      .orderBy(desc(contacts.createdAt)).limit(opts.limit).offset(opts.offset);
    return q;
  }

  async create(data: NewContact) {
    const [c] = await this.db.insert(contacts).values(data).returning();
    this.notifications.create({
      type: 'contact',
      title: `New message from ${data.name ?? 'Unknown'}`,
      message: `${data.subject ? '"' + data.subject + '" · ' : ''}${data.email ?? ''}`,
      link: '/admin/contacts',
    }).catch(() => {});
    this.mail.sendAdminNotification(
      `New Contact Message from ${data.name ?? 'Unknown'}`,
      this.mail.contactEmail(data as unknown as Record<string, string | undefined>),
    ).catch(() => {});
    if (data.email) {
      this.mail.send(
        data.email,
        'Message Received — LTIC SARL',
        this.mail.contactConfirmationEmail({ name: data.name ?? '', subject: data.subject ?? '' }),
      ).catch(() => {});
    }
    return c;
  }

  async update(id: number, data: Partial<Contact>) {
    const [c] = await this.db.update(contacts).set(data).where(eq(contacts.id, id)).returning();
    if (!c) throw new NotFoundException('Contact not found');
    return c;
  }
}
