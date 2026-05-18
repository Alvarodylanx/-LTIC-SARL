"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectProductSchema = exports.insertProductSchema = exports.products = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
const categories_1 = require("./categories");
exports.products = (0, pg_core_1.pgTable)('products', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    nameEn: (0, pg_core_1.text)('name_en').notNull(),
    nameFr: (0, pg_core_1.text)('name_fr').notNull(),
    slug: (0, pg_core_1.text)('slug').notNull().unique(),
    descriptionEn: (0, pg_core_1.text)('description_en'),
    descriptionFr: (0, pg_core_1.text)('description_fr'),
    categoryId: (0, pg_core_1.integer)('category_id').notNull().references(() => categories_1.categories.id),
    imageUrl: (0, pg_core_1.text)('image_url'),
    images: (0, pg_core_1.jsonb)('images').$type().default([]),
    specifications: (0, pg_core_1.text)('specifications'),
    featured: (0, pg_core_1.boolean)('featured').default(false),
    available: (0, pg_core_1.boolean)('available').default(true),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
});
exports.insertProductSchema = (0, drizzle_zod_1.createInsertSchema)(exports.products);
exports.selectProductSchema = (0, drizzle_zod_1.createSelectSchema)(exports.products);
