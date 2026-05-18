"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifications = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const users_1 = require("./users");
exports.notifications = (0, pg_core_1.pgTable)('notifications', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    userId: (0, pg_core_1.integer)('user_id').references(() => users_1.users.id, { onDelete: 'cascade' }).notNull(),
    type: (0, pg_core_1.varchar)('type', { length: 50 }).notNull(), // 'product' | 'news' | 'service' | 'order'
    titleEn: (0, pg_core_1.text)('title_en').notNull(),
    titleFr: (0, pg_core_1.text)('title_fr').notNull(),
    messageEn: (0, pg_core_1.text)('message_en').notNull(),
    messageFr: (0, pg_core_1.text)('message_fr').notNull(),
    link: (0, pg_core_1.varchar)('link', { length: 255 }),
    read: (0, pg_core_1.boolean)('read').default(false).notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
});
