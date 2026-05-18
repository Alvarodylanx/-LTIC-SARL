import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { AdminModule } from './admin/admin.module';
import { HealthModule } from './health/health.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { QuotesModule } from './quotes/quotes.module';
import { OrdersModule } from './orders/orders.module';
import { NewsModule } from './news/news.module';
import { ContactsModule } from './contacts/contacts.module';
import { SettingsModule } from './settings/settings.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [
    DbModule,
    AdminModule,
    HealthModule,
    ProductsModule,
    CategoriesModule,
    QuotesModule,
    OrdersModule,
    NewsModule,
    ContactsModule,
    SettingsModule,
    StatsModule,
  ],
})
export class AppModule {}
