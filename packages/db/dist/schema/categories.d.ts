export declare const categories: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "categories";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "categories";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        nameEn: import("drizzle-orm/pg-core").PgColumn<{
            name: "name_en";
            tableName: "categories";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        nameFr: import("drizzle-orm/pg-core").PgColumn<{
            name: "name_fr";
            tableName: "categories";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        slug: import("drizzle-orm/pg-core").PgColumn<{
            name: "slug";
            tableName: "categories";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        descriptionEn: import("drizzle-orm/pg-core").PgColumn<{
            name: "description_en";
            tableName: "categories";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        descriptionFr: import("drizzle-orm/pg-core").PgColumn<{
            name: "description_fr";
            tableName: "categories";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        imageUrl: import("drizzle-orm/pg-core").PgColumn<{
            name: "image_url";
            tableName: "categories";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "categories";
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
export declare const insertCategorySchema: import("zod").ZodObject<{
    id: import("zod").ZodOptional<import("zod").ZodNumber>;
    nameEn: import("zod").ZodString;
    nameFr: import("zod").ZodString;
    slug: import("zod").ZodString;
    descriptionEn: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    descriptionFr: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    imageUrl: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    createdAt: import("zod").ZodOptional<import("zod").ZodDate>;
}, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
    nameEn: string;
    nameFr: string;
    slug: string;
    id?: number | undefined;
    descriptionEn?: string | null | undefined;
    descriptionFr?: string | null | undefined;
    imageUrl?: string | null | undefined;
    createdAt?: Date | undefined;
}, {
    nameEn: string;
    nameFr: string;
    slug: string;
    id?: number | undefined;
    descriptionEn?: string | null | undefined;
    descriptionFr?: string | null | undefined;
    imageUrl?: string | null | undefined;
    createdAt?: Date | undefined;
}>;
export declare const selectCategorySchema: import("zod").ZodObject<{
    id: import("zod").ZodNumber;
    nameEn: import("zod").ZodString;
    nameFr: import("zod").ZodString;
    slug: import("zod").ZodString;
    descriptionEn: import("zod").ZodNullable<import("zod").ZodString>;
    descriptionFr: import("zod").ZodNullable<import("zod").ZodString>;
    imageUrl: import("zod").ZodNullable<import("zod").ZodString>;
    createdAt: import("zod").ZodDate;
}, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
    id: number;
    nameEn: string;
    nameFr: string;
    slug: string;
    descriptionEn: string | null;
    descriptionFr: string | null;
    imageUrl: string | null;
    createdAt: Date;
}, {
    id: number;
    nameEn: string;
    nameFr: string;
    slug: string;
    descriptionEn: string | null;
    descriptionFr: string | null;
    imageUrl: string | null;
    createdAt: Date;
}>;
export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;
//# sourceMappingURL=categories.d.ts.map