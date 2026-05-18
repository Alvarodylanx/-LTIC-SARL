import { Injectable, Inject, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { DB_TOKEN } from '../db/db.module';
import { users } from '@ltic/db';

const JWT_SECRET = process.env.SESSION_SECRET || 'ltic-sarl-user-secret';

@Injectable()
export class UsersService {
  constructor(@Inject(DB_TOKEN) private db: any) {}

  async register(data: { name: string; email: string; password: string; notifyProducts?: boolean; notifyNews?: boolean; notifyServices?: boolean; notifyOrders?: boolean }) {
    const existing = await this.db.select().from(users).where(eq(users.email, data.email));
    if (existing.length) throw new ConflictException('Email already registered');

    const hashed = await bcrypt.hash(data.password, 10);
    const [user] = await this.db.insert(users).values({
      name: data.name,
      email: data.email,
      password: hashed,
      notifyProducts: data.notifyProducts ?? true,
      notifyNews: data.notifyNews ?? true,
      notifyServices: data.notifyServices ?? true,
      notifyOrders: data.notifyOrders ?? true,
    }).returning();

    return { token: this.sign(user), user: this.safe(user) };
  }

  async login(email: string, password: string) {
    const [user] = await this.db.select().from(users).where(eq(users.email, email));
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    return { token: this.sign(user), user: this.safe(user) };
  }

  async findById(id: number) {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));
    if (!user) throw new NotFoundException('User not found');
    return this.safe(user);
  }

  async updatePreferences(id: number, prefs: { notifyProducts?: boolean; notifyNews?: boolean; notifyServices?: boolean; notifyOrders?: boolean }) {
    const [user] = await this.db.update(users).set({ ...prefs, updatedAt: new Date() }).where(eq(users.id, id)).returning();
    return this.safe(user);
  }

  verify(token: string): number | null {
    try {
      const payload = jwt.verify(token, JWT_SECRET) as any;
      return payload.sub;
    } catch {
      return null;
    }
  }

  private sign(user: any) {
    return jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: '30d' });
  }

  private safe(user: any) {
    const { password, ...rest } = user;
    return rest;
  }
}
