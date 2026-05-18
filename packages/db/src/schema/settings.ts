import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const settings = pgTable('settings', {
  key: text('key').primaryKey(),
  value: text('value'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const insertSettingSchema = createInsertSchema(settings);
export const selectSettingSchema = createSelectSchema(settings);
export type Setting = typeof settings.$inferSelect;
export type InsertSetting = typeof settings.$inferInsert;
