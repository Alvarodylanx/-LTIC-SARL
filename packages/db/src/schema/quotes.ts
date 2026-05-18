import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const quotes = pgTable('quotes', {
  id: serial('id').primaryKey(),
  companyName: text('company_name').notNull(),
  contactName: text('contact_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  country: text('country'),
  productInterest: text('product_interest').notNull(),
  quantity: text('quantity'),
  message: text('message'),
  status: text('status').notNull().default('pending'),
  adminNotes: text('admin_notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const insertQuoteSchema = createInsertSchema(quotes);
export const selectQuoteSchema = createSelectSchema(quotes);
export type Quote = typeof quotes.$inferSelect;
export type InsertQuote = typeof quotes.$inferInsert;
