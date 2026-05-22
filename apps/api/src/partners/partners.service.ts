import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq, asc } from 'drizzle-orm';
import { DB_TOKEN, Db } from '../db/db.module';
import { partners, NewPartner, Partner } from '@ltic/db';

@Injectable()
export class PartnersService {
  constructor(@Inject(DB_TOKEN) private db: Db) {}

  findAll() {
    return this.db.select().from(partners).orderBy(asc(partners.displayOrder), asc(partners.id));
  }

  findActive() {
    return this.db.select().from(partners)
      .where(eq(partners.active, true))
      .orderBy(asc(partners.displayOrder), asc(partners.id));
  }

  async create(data: NewPartner) {
    const [p] = await this.db.insert(partners).values(data).returning();
    return p;
  }

  async update(id: number, data: Partial<Partner>) {
    const [p] = await this.db.update(partners).set(data).where(eq(partners.id, id)).returning();
    if (!p) throw new NotFoundException('Partner not found');
    return p;
  }

  async remove(id: number) {
    const [p] = await this.db.delete(partners).where(eq(partners.id, id)).returning();
    if (!p) throw new NotFoundException('Partner not found');
    return { deleted: true };
  }
}
