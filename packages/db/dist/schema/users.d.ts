export declare const users: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "users";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "users";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        name: import("drizzle-orm/pg-core").PgColumn<{
            name: "name";
            tableName: "users";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        email: import("drizzle-orm/pg-core").PgColumn<{
            name: "email";
            tableName: "users";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        password: import("drizzle-orm/pg-core").PgColumn<{
            name: "password";
            tableName: "users";
            dataType: "string";
            columnType: "PgVarchar";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        notifyProducts: import("drizzle-orm/pg-core").PgColumn<{
            name: "notify_products";
            tableName: "users";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        notifyNews: import("drizzle-orm/pg-core").PgColumn<{
            name: "notify_news";
            tableName: "users";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        notifyServices: import("drizzle-orm/pg-core").PgColumn<{
            name: "notify_services";
            tableName: "users";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        notifyOrders: import("drizzle-orm/pg-core").PgColumn<{
            name: "notify_orders";
            tableName: "users";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "users";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        updatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "users";
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
export declare const insertUserSchema: import("zod").ZodObject<{
    id: import("zod").ZodOptional<import("zod").ZodNumber>;
    name: import("zod").ZodString;
    createdAt: import("zod").ZodOptional<import("zod").ZodDate>;
    email: import("zod").ZodString;
    updatedAt: import("zod").ZodOptional<import("zod").ZodDate>;
    password: import("zod").ZodString;
    notifyProducts: import("zod").ZodOptional<import("zod").ZodBoolean>;
    notifyNews: import("zod").ZodOptional<import("zod").ZodBoolean>;
    notifyServices: import("zod").ZodOptional<import("zod").ZodBoolean>;
    notifyOrders: import("zod").ZodOptional<import("zod").ZodBoolean>;
}, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
    name: string;
    email: string;
    password: string;
    id?: number | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    notifyProducts?: boolean | undefined;
    notifyNews?: boolean | undefined;
    notifyServices?: boolean | undefined;
    notifyOrders?: boolean | undefined;
}, {
    name: string;
    email: string;
    password: string;
    id?: number | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    notifyProducts?: boolean | undefined;
    notifyNews?: boolean | undefined;
    notifyServices?: boolean | undefined;
    notifyOrders?: boolean | undefined;
}>;
export declare const selectUserSchema: import("zod").ZodObject<{
    id: import("zod").ZodNumber;
    name: import("zod").ZodString;
    email: import("zod").ZodString;
    password: import("zod").ZodString;
    notifyProducts: import("zod").ZodBoolean;
    notifyNews: import("zod").ZodBoolean;
    notifyServices: import("zod").ZodBoolean;
    notifyOrders: import("zod").ZodBoolean;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
    id: number;
    name: string;
    createdAt: Date;
    email: string;
    updatedAt: Date;
    password: string;
    notifyProducts: boolean;
    notifyNews: boolean;
    notifyServices: boolean;
    notifyOrders: boolean;
}, {
    id: number;
    name: string;
    createdAt: Date;
    email: string;
    updatedAt: Date;
    password: string;
    notifyProducts: boolean;
    notifyNews: boolean;
    notifyServices: boolean;
    notifyOrders: boolean;
}>;
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
//# sourceMappingURL=users.d.ts.map