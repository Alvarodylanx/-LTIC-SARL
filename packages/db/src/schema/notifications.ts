import { pgTable, serial, integer, varchar, text, boolean, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';

export const notifications = pgTable('notifications', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // 'product' | 'news' | 'service' | 'order'
  titleEn: text('title_en').notNull(),
  titleFr: text('title_fr').notNull(),
  messageEn: text('message_en').notNull(),
  messageFr: text('message_fr').notNull(),
  link: varchar('link', { length: 255 }),
  read: boolean('read').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;
