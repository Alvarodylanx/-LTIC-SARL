"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectCategorySchema = exports.insertCategorySchema = exports.categories = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
exports.categories = (0, pg_core_1.pgTable)('categories', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    nameEn: (0, pg_core_1.text)('name_en').notNull(),
    nameFr: (0, pg_core_1.text)('name_fr').notNull(),
    slug: (0, pg_core_1.text)('slug').notNull().unique(),
    descriptionEn: (0, pg_core_1.text)('description_en'),
    descriptionFr: (0, pg_core_1.text)('description_fr'),
    imageUrl: (0, pg_core_1.text)('image_url'),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
});
exports.insertCategorySchema = (0, drizzle_zod_1.createInsertSchema)(exports.categories);
exports.selectCategorySchema = (0, drizzle_zod_1.createSelectSchema)(exports.categories);
