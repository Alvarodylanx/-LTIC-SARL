import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { DB_TOKEN } from '../db/db.module';
import { categories, products } from '@ltic/db';

@Injectable()
export class CategoriesService {
  constructor(@Inject(DB_TOKEN) private db: any) {}

  private async withCount(rows: any[]) {
    return Promise.all(
      rows.map(async (cat) => {
        const [{ count }] = await this.db
          .select({ count: sql<number>`count(*)` })
          .from(products)
          .where(eq(products.categoryId, cat.id));
        return { ...cat, productCount: Number(count) };
      })
    );
  }

  async findAll() {
    const rows = await this.db.select().from(categories).orderBy(categories.nameEn);
    return this.withCount(rows);
  }

  async findOne(id: number) {
    const [cat] = await this.db.select().from(categories).where(eq(categories.id, id));
    if (!cat) throw new NotFoundException('Category not found');
    const [{ count }] = await this.db
      .select({ count: sql<number>`count(*)` })
      .from(products)
      .where(eq(products.categoryId, id));
    return { ...cat, productCount: Number(count) };
  }

  async create(data: any) {
    const [cat] = await this.db.insert(categories).values(data).returning();
    return { ...cat, productCount: 0 };
  }

  async update(id: number, data: any) {
    const [cat] = await this.db.update(categories).set(data).where(eq(categories.id, id)).returning();
    if (!cat) throw new NotFoundException('Category not found');
    return cat;
  }

  async remove(id: number) {
    const [cat] = await this.db.delete(categories).where(eq(categories.id, id)).returning();
    if (!cat) throw new NotFoundException('Category not found');
    return { deleted: true };
  }
}
