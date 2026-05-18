import { pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const news = pgTable('news', {
  id: serial('id').primaryKey(),
  titleEn: text('title_en').notNull(),
  titleFr: text('title_fr').notNull(),
  slug: text('slug').notNull().unique(),
  summaryEn: text('summary_en'),
  summaryFr: text('summary_fr'),
  contentEn: text('content_en'),
  contentFr: text('content_fr'),
  imageUrl: text('image_url'),
  category: text('category'),
  published: boolean('published').default(true),
  publishedAt: timestamp('published_at').notNull().defaultNow(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const insertNewsSchema = createInsertSchema(news);
export const selectNewsSchema = createSelectSchema(news);
export type News = typeof news.$inferSelect;
export type InsertNews = typeof news.$inferInsert;
