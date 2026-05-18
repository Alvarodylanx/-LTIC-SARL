"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectOrderSchema = exports.insertOrderSchema = exports.orders = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
exports.orders = (0, pg_core_1.pgTable)('orders', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    trackingNumber: (0, pg_core_1.text)('tracking_number').notNull().unique(),
    clientName: (0, pg_core_1.text)('client_name').notNull(),
    clientEmail: (0, pg_core_1.text)('client_email'),
    origin: (0, pg_core_1.text)('origin'),
    destination: (0, pg_core_1.text)('destination'),
    description: (0, pg_core_1.text)('description'),
    status: (0, pg_core_1.text)('status').notNull().default('processing'),
    estimatedDelivery: (0, pg_core_1.text)('estimated_delivery'),
    timeline: (0, pg_core_1.jsonb)('timeline').$type().default([]),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').notNull().defaultNow(),
});
exports.insertOrderSchema = (0, drizzle_zod_1.createInsertSchema)(exports.orders);
exports.selectOrderSchema = (0, drizzle_zod_1.createSelectSchema)(exports.orders);
