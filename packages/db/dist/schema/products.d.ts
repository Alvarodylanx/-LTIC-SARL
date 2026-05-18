export declare const products: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "products";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "products";
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
            tableName: "products";
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
            tableName: "products";
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
            tableName: "products";
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
            tableName: "products";
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
            tableName: "products";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        categoryId: import("drizzle-orm/pg-core").PgColumn<{
            name: "category_id";
            tableName: "products";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        imageUrl: import("drizzle-orm/pg-core").PgColumn<{
            name: "image_url";
            tableName: "products";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        images: import("drizzle-orm/pg-core").PgColumn<{
            name: "images";
            tableName: "products";
            dataType: "json";
            columnType: "PgJsonb";
            data: string[];
            driverParam: unknown;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        specifications: import("drizzle-orm/pg-core").PgColumn<{
            name: "specifications";
            tableName: "products";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
        }, {}, {}>;
        featured: import("drizzle-orm/pg-core").PgColumn<{
            name: "featured";
            tableName: "products";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: false;
            hasDefault: true;
            enumValues: undefined;
            baseColumn: never;
        }, {}, {}>;
        available: import("drizzle-orm/pg-core").PgColumn<{
            name: "available";
            tableName: "products";
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
            tableName: "products";
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
export declare const insertProductSchema: import("zod").ZodObject<{
    id: import("zod").ZodOptional<import("zod").ZodNumber>;
    nameEn: import("zod").ZodString;
    nameFr: import("zod").ZodString;
    slug: import("zod").ZodString;
    descriptionEn: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    descriptionFr: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    imageUrl: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    createdAt: import("zod").ZodOptional<import("zod").ZodDate>;
    categoryId: import("zod").ZodNumber;
    images: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodType<string | number | boolean | {
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
    specifications: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>;
    featured: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodBoolean>>;
    available: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodBoolean>>;
}, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
    nameEn: string;
    nameFr: string;
    slug: string;
    categoryId: number;
    id?: number | undefined;
    descriptionEn?: string | null | undefined;
    descriptionFr?: string | null | undefined;
    imageUrl?: string | null | undefined;
    createdAt?: Date | undefined;
    images?: (string | number | boolean | {
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
    specifications?: string | null | undefined;
    featured?: boolean | null | undefined;
    available?: boolean | null | undefined;
}, {
    nameEn: string;
    nameFr: string;
    slug: string;
    categoryId: number;
    id?: number | undefined;
    descriptionEn?: string | null | undefined;
    descriptionFr?: string | null | undefined;
    imageUrl?: string | null | undefined;
    createdAt?: Date | undefined;
    images?: (string | number | boolean | {
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
    specifications?: string | null | undefined;
    featured?: boolean | null | undefined;
    available?: boolean | null | undefined;
}>;
export declare const selectProductSchema: import("zod").ZodObject<{
    id: import("zod").ZodNumber;
    nameEn: import("zod").ZodString;
    nameFr: import("zod").ZodString;
    slug: import("zod").ZodString;
    descriptionEn: import("zod").ZodNullable<import("zod").ZodString>;
    descriptionFr: import("zod").ZodNullable<import("zod").ZodString>;
    categoryId: import("zod").ZodNumber;
    imageUrl: import("zod").ZodNullable<import("zod").ZodString>;
    images: import("zod").ZodNullable<import("zod").ZodType<string | number | boolean | {
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
    specifications: import("zod").ZodNullable<import("zod").ZodString>;
    featured: import("zod").ZodNullable<import("zod").ZodBoolean>;
    available: import("zod").ZodNullable<import("zod").ZodBoolean>;
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
    categoryId: number;
    images: string | number | boolean | {
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
    specifications: string | null;
    featured: boolean | null;
    available: boolean | null;
}, {
    id: number;
    nameEn: string;
    nameFr: string;
    slug: string;
    descriptionEn: string | null;
    descriptionFr: string | null;
    imageUrl: string | null;
    createdAt: Date;
    categoryId: number;
    images: string | number | boolean | {
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
    specifications: string | null;
    featured: boolean | null;
    available: boolean | null;
}>;
export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;
//# sourceMappingURL=products.d.ts.map