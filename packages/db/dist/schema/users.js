"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectUserSchema = exports.insertUserSchema = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.varchar)('name', { length: 255 }).notNull(),
    email: (0, pg_core_1.varchar)('email', { length: 255 }).notNull().unique(),
    password: (0, pg_core_1.varchar)('password', { length: 255 }).notNull(),
    notifyProducts: (0, pg_core_1.boolean)('notify_products').default(true).notNull(),
    notifyNews: (0, pg_core_1.boolean)('notify_news').default(true).notNull(),
    notifyServices: (0, pg_core_1.boolean)('notify_services').default(true).notNull(),
    notifyOrders: (0, pg_core_1.boolean)('notify_orders').default(true).notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
exports.insertUserSchema = (0, drizzle_zod_1.createInsertSchema)(exports.users);
exports.selectUserSchema = (0, drizzle_zod_1.createSelectSchema)(exports.users);
