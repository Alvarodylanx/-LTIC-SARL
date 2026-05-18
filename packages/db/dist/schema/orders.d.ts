export interface TimelineItem {
    status: string;
    date: string;
    description: string;
    location?: string;
}
export declare const orders: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "orders";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "orders";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        trackingNumber: import("drizzle-orm/pg-core").PgColumn<{
            name: "tracking_number";
            tableName: "orders";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        clientName: import("drizzle-orm/pg-core").PgColumn<{
            name: "client_name";
            tableName: "orders";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        clientEmail: import("drizzle-orm/pg-core").PgColumn<{
            name: "client_email";
            tableName: "orders";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        origin: import("drizzle-orm/pg-core").PgColumn<{
            name: "origin";
            tableName: "orders";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        destination: import("drizzle-orm/pg-core").PgColumn<{
            name: "destination";
            tableName: "orders";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        description: import("drizzle-orm/pg-core").PgColumn<{
            name: "description";
            tableName: "orders";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        status: import("drizzle-orm/pg-core").PgColumn<{
            name: "status";
            tableName: "orders";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        estimatedDelivery: import("drizzle-orm/pg-core").PgColumn<{
            name: "estimated_delivery";
            tableName: "orders";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        timeline: import("drizzle-orm/pg-core").PgColumn<{
            name: "timeline";
            tableName: "orders";
            dataType: "json";
            columnType: "PgJsonb";
            data: TimelineItem[];
            driverParam: unknown;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "orders";
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
            tableName: "orders";
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
export declare const insertOrderSchema: import("zod").ZodObject<{
    id: import("zod").ZodOptional<import("zod").ZodNumber>;
    createdAt: import("zod").ZodOptional<import("zod").ZodDate>;
    status: import("zod").ZodOptional<import("zod").ZodString>;
    description: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    updatedAt: import("zod").ZodOptional<import("zod").ZodDate>;
    trackingNumber: import("zod").ZodString;
    clientName: import("zod").ZodString;
    clientEmail: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    origin: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    destination: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    estimatedDelivery: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    timeline: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodType<string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | /*elided*/ any | null;
    } | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null, import("zod").ZodTypeDef, string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | /*elided*/ any | null;
    } | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null>>>;
}, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
    trackingNumber: string;
    clientName: string;
    id?: number | undefined;
    createdAt?: Date | undefined;
    status?: string | undefined;
    description?: string | null | undefined;
    updatedAt?: Date | undefined;
    clientEmail?: string | null | undefined;
    origin?: string | null | undefined;
    destination?: string | null | undefined;
    estimatedDelivery?: string | null | undefined;
    timeline?: (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | /*elided*/ any | null;
    } | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null) | undefined;
}, {
    trackingNumber: string;
    clientName: string;
    id?: number | undefined;
    createdAt?: Date | undefined;
    status?: string | undefined;
    description?: string | null | undefined;
    updatedAt?: Date | undefined;
    clientEmail?: string | null | undefined;
    origin?: string | null | undefined;
    destination?: string | null | undefined;
    estimatedDelivery?: string | null | undefined;
    timeline?: (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | /*elided*/ any | null;
    } | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null) | undefined;
}>;
export declare const selectOrderSchema: import("zod").ZodObject<{
    id: import("zod").ZodNumber;
    trackingNumber: import("zod").ZodString;
    clientName: import("zod").ZodString;
    clientEmail: import("zod").ZodNullable<import("zod").ZodString>;
    origin: import("zod").ZodNullable<import("zod").ZodString>;
    destination: import("zod").ZodNullable<import("zod").ZodString>;
    description: import("zod").ZodNullable<import("zod").ZodString>;
    status: import("zod").ZodString;
    estimatedDelivery: import("zod").ZodNullable<import("zod").ZodString>;
    timeline: import("zod").ZodNullable<import("zod").ZodType<string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | /*elided*/ any | null;
    } | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null, import("zod").ZodTypeDef, string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | /*elided*/ any | null;
    } | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null>>;
    createdAt: import("zod").ZodDate;
    updatedAt: import("zod").ZodDate;
}, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
    id: number;
    createdAt: Date;
    status: string;
    description: string | null;
    updatedAt: Date;
    trackingNumber: string;
    clientName: string;
    clientEmail: string | null;
    origin: string | null;
    destination: string | null;
    estimatedDelivery: string | null;
    timeline: string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | /*elided*/ any | null;
    } | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
}, {
    id: number;
    createdAt: Date;
    status: string;
    description: string | null;
    updatedAt: Date;
    trackingNumber: string;
    clientName: string;
    clientEmail: string | null;
    origin: string | null;
    destination: string | null;
    estimatedDelivery: string | null;
    timeline: string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | /*elided*/ any | null;
    } | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
}>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;
//# sourceMappingURL=orders.d.ts.map