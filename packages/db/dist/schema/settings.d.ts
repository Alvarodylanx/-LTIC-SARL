export declare const settings: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "settings";
    schema: undefined;
    columns: {
        key: import("drizzle-orm/pg-core").PgColumn<{
            name: "key";
            tableName: "settings";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        value: import("drizzle-orm/pg-core").PgColumn<{
            name: "value";
            tableName: "settings";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        updatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "settings";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const insertSettingSchema: import("zod").ZodObject<{
    value: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    updatedAt: import("zod").ZodOptional<import("zod").ZodDate>;
    key: import("zod").ZodString;
}, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
    key: string;
    value?: string | null | undefined;
    updatedAt?: Date | undefined;
}, {
    key: string;
    value?: string | null | undefined;
    updatedAt?: Date | undefined;
}>;
export declare const selectSettingSchema: import("zod").ZodObject<{
    key: import("zod").ZodString;
    value: import("zod").ZodNullable<import("zod").ZodString>;
    updatedAt: import("zod").ZodDate;
}, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
    value: string | null;
    updatedAt: Date;
    key: string;
}, {
    value: string | null;
    updatedAt: Date;
    key: string;
}>;
export type Setting = typeof settings.$inferSelect;
export type InsertSetting = typeof settings.$inferInsert;
//# sourceMappingURL=settings.d.ts.map