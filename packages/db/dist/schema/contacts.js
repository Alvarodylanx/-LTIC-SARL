"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectContactSchema = exports.insertContactSchema = exports.contacts = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
exports.contacts = (0, pg_core_1.pgTable)('contacts', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.text)('name').notNull(),
    email: (0, pg_core_1.text)('email').notNull(),
    phone: (0, pg_core_1.text)('phone'),
    company: (0, pg_core_1.text)('company'),
    subject: (0, pg_core_1.text)('subject').notNull(),
    message: (0, pg_core_1.text)('message').notNull(),
    read: (0, pg_core_1.boolean)('read').default(false),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
});
exports.insertContactSchema = (0, drizzle_zod_1.createInsertSchema)(exports.contacts);
exports.selectContactSchema = (0, drizzle_zod_1.createSelectSchema)(exports.contacts);
