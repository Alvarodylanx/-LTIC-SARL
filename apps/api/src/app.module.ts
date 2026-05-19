import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { Pool } from "pg";
import * as dotenv from "dotenv";
dotenv.config();

import { DbModule } from "./db/db.module";
import { AdminModule } from "./admin/admin.module";
import { ProductsModule } from "./products/products.module";
import { CategoriesModule } from "./categories/categories.module";
import { QuotesModule } from "./quotes/quotes.module";
import { OrdersModule } from "./orders/orders.module";
import { NewsModule } from "./news/news.module";
import { ContactsModule } from "./contacts/contacts.module";
import { SettingsModule } from "./settings/settings.module";
import { CustomersModule } from "./customers/customers.module";
import { StatsModule } from "./stats/stats.module";
import { HealthModule } from "./health/health.module";
import { AuthModule } from "./auth/auth.module";
import { VersionModule } from "./version/version.module";
import { UploadModule } from "./upload/upload.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { UnifiedAuthModule } from "./auth/unified-auth.module";

export const DB_PROVIDER = "DB_POOL";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      global: true,
      secret: process.env.SESSION_SECRET || "ltic-secret",
      signOptions: { expiresIn: "24h" },
    }),
    DbModule,
    AuthModule,
    AdminModule,
    ProductsModule,
    CategoriesModule,
    QuotesModule,
    OrdersModule,
    NewsModule,
    ContactsModule,
    SettingsModule,
    StatsModule,
    HealthModule,
    CustomersModule,
    VersionModule,
    UploadModule,
    NotificationsModule,
    UnifiedAuthModule,
  ],
  providers: [
    {
      provide: DB_PROVIDER,
      useFactory: () => {
        return new Pool({
          connectionString: process.env.DATABASE_URL,
        });
      },
    },
  ],
  exports: [DB_PROVIDER],
})
export class AppModule {}
