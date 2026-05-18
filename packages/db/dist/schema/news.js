"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectNewsSchema = exports.insertNewsSchema = exports.news = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
exports.news = (0, pg_core_1.pgTable)('news', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    titleEn: (0, pg_core_1.text)('title_en').notNull(),
    titleFr: (0, pg_core_1.text)('title_fr').notNull(),
    slug: (0, pg_core_1.text)('slug').notNull().unique(),
    summaryEn: (0, pg_core_1.text)('summary_en'),
    summaryFr: (0, pg_core_1.text)('summary_fr'),
    contentEn: (0, pg_core_1.text)('content_en'),
    contentFr: (0, pg_core_1.text)('content_fr'),
    imageUrl: (0, pg_core_1.text)('image_url'),
    category: (0, pg_core_1.text)('category'),
    published: (0, pg_core_1.boolean)('published').default(true),
    publishedAt: (0, pg_core_1.timestamp)('published_at').notNull().defaultNow(),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
});
exports.insertNewsSchema = (0, drizzle_zod_1.createInsertSchema)(exports.news);
exports.selectNewsSchema = (0, drizzle_zod_1.createSelectSchema)(exports.news);
