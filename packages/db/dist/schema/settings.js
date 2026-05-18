"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectSettingSchema = exports.insertSettingSchema = exports.settings = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
exports.settings = (0, pg_core_1.pgTable)('settings', {
    key: (0, pg_core_1.text)('key').primaryKey(),
    value: (0, pg_core_1.text)('value'),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').notNull().defaultNow(),
});
exports.insertSettingSchema = (0, drizzle_zod_1.createInsertSchema)(exports.settings);
exports.selectSettingSchema = (0, drizzle_zod_1.createSelectSchema)(exports.settings);
