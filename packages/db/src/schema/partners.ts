import { pgTable, serial, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const partners = pgTable("partners", {
  id:           serial("id").primaryKey(),
  name:         text("name").notNull(),
  logoUrl:      text("logo_url"),
  sectorEn:     text("sector_en").notNull().default(''),
  sectorFr:     text("sector_fr").notNull().default(''),
  productsEn:   text("products_en").default(''),
  productsFr:   text("products_fr").default(''),
  website:      text("website"),
  displayOrder: integer("display_order").default(0),
  active:       boolean("active").default(true),
  createdAt:    timestamp("created_at").notNull().defaultNow(),
});

export type Partner    = typeof partners.$inferSelect;
export type NewPartner = typeof partners.$inferInsert;
