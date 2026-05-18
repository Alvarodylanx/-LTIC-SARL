import { pgTable, serial, text, timestamp, integer, boolean, jsonb } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { categories } from './categories';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  nameEn: text('name_en').notNull(),
  nameFr: text('name_fr').notNull(),
  slug: text('slug').notNull().unique(),
  descriptionEn: text('description_en'),
  descriptionFr: text('description_fr'),
  categoryId: integer('category_id').notNull().references(() => categories.id),
  imageUrl: text('image_url'),
  images: jsonb('images').$type<string[]>().default([]),
  specifications: text('specifications'),
  featured: boolean('featured').default(false),
  available: boolean('available').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const insertProductSchema = createInsertSchema(products);
export const selectProductSchema = createSelectSchema(products);
export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;
