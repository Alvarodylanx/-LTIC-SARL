import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq, desc } from 'drizzle-orm';
import { DB_TOKEN } from '../db/db.module';
import { orders } from '@ltic/db';

@Injectable()
export class OrdersService {
  constructor(@Inject(DB_TOKEN) private db: any) {}

  async track(trackingNumber: string) {
    const [order] = await this.db.select().from(orders).where(eq(orders.trackingNumber, trackingNumber));
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async findAll(opts: { status?: string; limit: number; offset: number }) {
    let q = this.db.select().from(orders).orderBy(desc(orders.createdAt)).limit(opts.limit).offset(opts.offset);
    if (opts.status) q = this.db.select().from(orders).where(eq(orders.status, opts.status))
      .orderBy(desc(orders.createdAt)).limit(opts.limit).offset(opts.offset);
    return q;
  }

  async findOne(id: number) {
    const [order] = await this.db.select().from(orders).where(eq(orders.id, id));
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async update(id: number, data: any) {
    const [order] = await this.db.update(orders).set({ ...data, updatedAt: new Date() })
      .where(eq(orders.id, id)).returning();
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
}
