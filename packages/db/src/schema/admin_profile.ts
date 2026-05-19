import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const adminProfile = pgTable("admin_profile", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().default("Administrator"),
  email: text("email").notNull().default("admin@ltic-sarl.com"),
  avatarUrl: text("avatar_url"),
  passwordHash: text("password_hash"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type AdminProfile = typeof adminProfile.$inferSelect;
export type NewAdminProfile = typeof adminProfile.$inferInsert;
