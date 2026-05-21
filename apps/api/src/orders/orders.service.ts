import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq, desc } from 'drizzle-orm';
import { DB_TOKEN } from '../db/db.module';
import { orders } from '@ltic/db';

@Injectable()
export class OrdersService {
  constructor(@Inject(DB_TOKEN) private db: any) {}

  private generateTrackingNumber(): string {
    const now = new Date();
    const yymm = String(now.getFullYear()).slice(2) + String(now.getMonth() + 1).padStart(2, '0');
    const rand = Math.floor(Math.random() * 1_000_000).toString().padStart(6, '0');
    return `LTIC${yymm}${rand}`;
  }

  async create(data: {
    clientName: string;
    clientEmail?: string;
    customerId?: number;
    origin?: string;
    destination?: string;
    description?: string;
    status?: string;
    estimatedDelivery?: string;
  }) {
    const trackingNumber = data['trackingNumber'] || this.generateTrackingNumber();
    const [order] = await this.db.insert(orders).values({
      trackingNumber,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      customerId: data.customerId || null,
      origin: data.origin,
      destination: data.destination,
      description: data.description,
      status: data.status || 'processing',
      estimatedDelivery: data.estimatedDelivery,
    }).returning();
    return order;
  }

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

  async findByCustomer(customerId: number) {
    return this.db.select().from(orders).where(eq(orders.customerId, customerId))
      .orderBy(desc(orders.createdAt));
  }

  async delete(id: number) {
    const [order] = await this.db.delete(orders).where(eq(orders.id, id)).returning();
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
