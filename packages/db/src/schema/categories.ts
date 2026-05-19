import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  nameEn: text("name_en").notNull(),
  nameFr: text("name_fr").notNull(),
  slug: text("slug").notNull().unique(),
  descriptionEn: text("description_en"),
  descriptionFr: text("description_fr"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
