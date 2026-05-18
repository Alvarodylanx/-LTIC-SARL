import { pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  company: text('company'),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  read: boolean('read').default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const insertContactSchema = createInsertSchema(contacts);
export const selectContactSchema = createSelectSchema(contacts);
export type Contact = typeof contacts.$inferSelect;
export type InsertContact = typeof contacts.$inferInsert;
