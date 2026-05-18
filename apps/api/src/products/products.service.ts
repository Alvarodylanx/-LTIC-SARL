import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq, and, ilike, desc } from 'drizzle-orm';
import { DB_TOKEN } from '../db/db.module';
import { products, categories, users, notifications } from '@ltic/db';

@Injectable()
export class ProductsService {
  constructor(@Inject(DB_TOKEN) private db: any) {}

  private shape(p: any, cat?: any) {
    return {
      id: p.id, nameEn: p.nameEn, nameFr: p.nameFr, name: p.nameEn, slug: p.slug,
      descriptionEn: p.descriptionEn, descriptionFr: p.descriptionFr,
      categoryId: p.categoryId, categoryName: cat?.nameEn ?? null,
      imageUrl: p.imageUrl, images: p.images ?? [],
      specifications: p.specifications, featured: p.featured, available: p.available,
      createdAt: p.createdAt?.toISOString?.() ?? p.createdAt,
    };
  }

  async findAll(opts: { categoryId?: number; search?: string; limit: number; offset: number }) {
    const conditions: any[] = [];
    if (opts.categoryId) conditions.push(eq(products.categoryId, opts.categoryId));
    if (opts.search) conditions.push(ilike(products.nameEn, `%${opts.search}%`));

    const rows = await this.db
      .select({ product: products, category: categories })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(products.createdAt))
      .limit(opts.limit)
      .offset(opts.offset);

    return rows.map((r: any) => this.shape(r.product, r.category));
  }

  async findFeatured() {
    const rows = await this.db
      .select({ product: products, category: categories })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(and(eq(products.featured, true), eq(products.available, true)))
      .limit(8);
    return rows.map((r: any) => this.shape(r.product, r.category));
  }

  async findOne(id: number) {
    const [row] = await this.db
      .select({ product: products, category: categories })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(eq(products.id, id));
    if (!row) throw new NotFoundException('Product not found');
    return this.shape(row.product, row.category);
  }

  async create(data: any) {
    const [p] = await this.db.insert(products).values(data).returning();
    const created = await this.findOne(p.id);
    await this.broadcastProductNotification(created);
    return created;
  }

  async update(id: number, data: any) {
    const [p] = await this.db.update(products).set(data).where(eq(products.id, id)).returning();
    if (!p) throw new NotFoundException('Product not found');
    return this.findOne(p.id);
  }

  async remove(id: number) {
    const [p] = await this.db.delete(products).where(eq(products.id, id)).returning();
    if (!p) throw new NotFoundException('Product not found');
    return { deleted: true };
  }

  private async broadcastProductNotification(product: any) {
    try {
      const subs = await this.db.select().from(users).where(eq(users.notifyProducts, true));
      if (!subs.length) return;
      const rows = subs.map((u: any) => ({
        userId: u.id,
        type: 'product',
        titleEn: 'New Product Available',
        titleFr: 'Nouveau Produit Disponible',
        messageEn: `${product.nameEn} has been added to our catalog.`,
        messageFr: `${product.nameFr} a été ajouté à notre catalogue.`,
        link: `/products/${product.slug}`,
      }));
      await this.db.insert(notifications).values(rows);
    } catch {}
  }
}
