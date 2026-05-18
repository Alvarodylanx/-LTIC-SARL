import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq, desc } from 'drizzle-orm';
import { DB_TOKEN } from '../db/db.module';
import { news, users, notifications } from '@ltic/db';

@Injectable()
export class NewsService {
  constructor(@Inject(DB_TOKEN) private db: any) {}

  async findAll(opts: { limit: number; offset: number }) {
    return this.db.select().from(news).where(eq(news.published, true))
      .orderBy(desc(news.publishedAt)).limit(opts.limit).offset(opts.offset);
  }

  async findOne(id: number) {
    const [article] = await this.db.select().from(news).where(eq(news.id, id));
    if (!article) throw new NotFoundException('Article not found');
    return article;
  }

  async create(data: any) {
    const [article] = await this.db.insert(news).values(data).returning();
    if (article.published) await this.broadcastNewsNotification(article);
    return article;
  }

  async update(id: number, data: any) {
    const [article] = await this.db.update(news).set(data).where(eq(news.id, id)).returning();
    if (!article) throw new NotFoundException('Article not found');
    return article;
  }

  async remove(id: number) {
    const [article] = await this.db.delete(news).where(eq(news.id, id)).returning();
    if (!article) throw new NotFoundException('Article not found');
    return { deleted: true };
  }

  private async broadcastNewsNotification(article: any) {
    try {
      const subs = await this.db.select().from(users).where(eq(users.notifyNews, true));
      if (!subs.length) return;
      const rows = subs.map((u: any) => ({
        userId: u.id,
        type: 'news',
        titleEn: 'New Article Published',
        titleFr: 'Nouvel Article Publié',
        messageEn: article.titleEn,
        messageFr: article.titleFr,
        link: `/news/${article.id}`,
      }));
      await this.db.insert(notifications).values(rows);
    } catch {}
  }
}
