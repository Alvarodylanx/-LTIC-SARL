export declare const contacts: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "contacts";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "contacts";
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
            tableName: "contacts";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        email: import("drizzle-orm/pg-core").PgColumn<{
            name: "email";
            tableName: "contacts";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        phone: import("drizzle-orm/pg-core").PgColumn<{
            name: "phone";
            tableName: "contacts";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        company: import("drizzle-orm/pg-core").PgColumn<{
            name: "company";
            tableName: "contacts";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        subject: import("drizzle-orm/pg-core").PgColumn<{
            name: "subject";
            tableName: "contacts";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        message: import("drizzle-orm/pg-core").PgColumn<{
            name: "message";
            tableName: "contacts";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        read: import("drizzle-orm/pg-core").PgColumn<{
            name: "read";
            tableName: "contacts";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "contacts";
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
export declare const insertContactSchema: import("zod").ZodObject<{
    id: import("zod").ZodOptional<import("zod").ZodNumber>;
    name: import("zod").ZodString;
    createdAt: import("zod").ZodOptional<import("zod").ZodDate>;
    message: import("zod").ZodString;
    email: import("zod").ZodString;
    phone: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    company: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    subject: import("zod").ZodString;
    read: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodBoolean>>;
}, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
    name: string;
    message: string;
    email: string;
    subject: string;
    id?: number | undefined;
    createdAt?: Date | undefined;
    phone?: string | null | undefined;
    company?: string | null | undefined;
    read?: boolean | null | undefined;
}, {
    name: string;
    message: string;
    email: string;
    subject: string;
    id?: number | undefined;
    createdAt?: Date | undefined;
    phone?: string | null | undefined;
    company?: string | null | undefined;
    read?: boolean | null | undefined;
}>;
export declare const selectContactSchema: import("zod").ZodObject<{
    id: import("zod").ZodNumber;
    name: import("zod").ZodString;
    email: import("zod").ZodString;
    phone: import("zod").ZodNullable<import("zod").ZodString>;
    company: import("zod").ZodNullable<import("zod").ZodString>;
    subject: import("zod").ZodString;
    message: import("zod").ZodString;
    read: import("zod").ZodNullable<import("zod").ZodBoolean>;
    createdAt: import("zod").ZodDate;
}, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
    id: number;
    name: string;
    createdAt: Date;
    message: string;
    email: string;
    phone: string | null;
    company: string | null;
    subject: string;
    read: boolean | null;
}, {
    id: number;
    name: string;
    createdAt: Date;
    message: string;
    email: string;
    phone: string | null;
    company: string | null;
    subject: string;
    read: boolean | null;
}>;
export type Contact = typeof contacts.$inferSelect;
export type InsertContact = typeof contacts.$inferInsert;
//# sourceMappingURL=contacts.d.ts.map