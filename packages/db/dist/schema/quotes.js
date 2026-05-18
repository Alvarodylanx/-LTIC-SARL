"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectQuoteSchema = exports.insertQuoteSchema = exports.quotes = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
exports.quotes = (0, pg_core_1.pgTable)('quotes', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    companyName: (0, pg_core_1.text)('company_name').notNull(),
    contactName: (0, pg_core_1.text)('contact_name').notNull(),
    email: (0, pg_core_1.text)('email').notNull(),
    phone: (0, pg_core_1.text)('phone'),
    country: (0, pg_core_1.text)('country'),
    productInterest: (0, pg_core_1.text)('product_interest').notNull(),
    quantity: (0, pg_core_1.text)('quantity'),
    message: (0, pg_core_1.text)('message'),
    status: (0, pg_core_1.text)('status').notNull().default('pending'),
    adminNotes: (0, pg_core_1.text)('admin_notes'),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').notNull().defaultNow(),
});
exports.insertQuoteSchema = (0, drizzle_zod_1.createInsertSchema)(exports.quotes);
exports.selectQuoteSchema = (0, drizzle_zod_1.createSelectSchema)(exports.quotes);
