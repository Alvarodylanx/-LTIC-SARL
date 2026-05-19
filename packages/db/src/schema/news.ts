import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  titleEn: text("title_en").notNull(),
  titleFr: text("title_fr").notNull(),
  slug: text("slug").notNull().unique(),
  summaryEn: text("summary_en"),
  summaryFr: text("summary_fr"),
  contentEn: text("content_en"),
  contentFr: text("content_fr"),
  imageUrl: text("image_url"),
  category: text("category"),
  published: boolean("published").default(true),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type NewsArticle = typeof news.$inferSelect;
export type NewNewsArticle = typeof news.$inferInsert;
