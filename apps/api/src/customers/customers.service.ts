import { Injectable, Inject, ConflictException, UnauthorizedException, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { DB_TOKEN, Db } from "../db/db.module";
import { customers } from "@ltic/db";
import { LoginAttemptsService } from "../auth/login-attempts.service";

@Injectable()
export class CustomersService {
  constructor(
    @Inject(DB_TOKEN) private db: Db,
    private jwtService: JwtService,
    private loginAttempts: LoginAttemptsService,
  ) {}

  async register(body: {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    country?: string;
  }) {
    const existing = await this.db
      .select()
      .from(customers)
      .where(eq(customers.email, body.email))
      .limit(1);

    if (existing.length > 0) {
      throw new ConflictException("Email already registered");
    }

    const passwordHash = await bcrypt.hash(body.password, 10);
    const [customer] = await this.db
      .insert(customers)
      .values({
        fullName: body.fullName,
        email: body.email,
        passwordHash,
        phone: body.phone ?? null,
        country: body.country ?? null,
      })
      .returning();

    const token = await this.jwtService.signAsync(
      { sub: customer.id, email: customer.email, role: "customer" },
      { secret: process.env.SESSION_SECRET!, expiresIn: "7d" }
    );

    return { token, customer: this.sanitize(customer) };
  }

  async login(email: string, password: string) {
    this.loginAttempts.check(email);

    const [customer] = await this.db
      .select()
      .from(customers)
      .where(eq(customers.email, email))
      .limit(1);

    if (!customer) {
      this.loginAttempts.recordFailure(email);
      throw new UnauthorizedException("Invalid credentials");
    }

    const valid = await bcrypt.compare(password, customer.passwordHash);
    if (!valid) {
      this.loginAttempts.recordFailure(email);
      throw new UnauthorizedException("Invalid credentials");
    }

    this.loginAttempts.clearAttempts(email);

    const token = await this.jwtService.signAsync(
      { sub: customer.id, email: customer.email, role: "customer" },
      { secret: process.env.SESSION_SECRET!, expiresIn: "7d" }
    );

    return { token, customer: this.sanitize(customer) };
  }

  async getProfile(customerId: number) {
    const [customer] = await this.db
      .select()
      .from(customers)
      .where(eq(customers.id, customerId))
      .limit(1);

    if (!customer) throw new NotFoundException("Customer not found");
    return this.sanitize(customer);
  }

  async updateProfile(
    customerId: number,
    body: { fullName?: string; phone?: string; country?: string; company?: string }
  ) {
    const [updated] = await this.db
      .update(customers)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(customers.id, customerId))
      .returning();

    return this.sanitize(updated);
  }

  async changePassword(customerId: number, currentPassword: string, newPassword: string) {
    const [customer] = await this.db
      .select()
      .from(customers)
      .where(eq(customers.id, customerId))
      .limit(1);

    if (!customer) throw new NotFoundException("Customer not found");

    const valid = await bcrypt.compare(currentPassword, customer.passwordHash);
    if (!valid) throw new UnauthorizedException("Current password is incorrect");

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await this.db
      .update(customers)
      .set({ passwordHash, updatedAt: new Date() })
      .where(eq(customers.id, customerId));

    return { success: true };
  }

  async updateAvatar(customerId: number, avatarUrl: string) {
    const [updated] = await this.db
      .update(customers)
      .set({ avatarUrl, updatedAt: new Date() })
      .where(eq(customers.id, customerId))
      .returning();

    return this.sanitize(updated);
  }

  private sanitize(customer: any) {
    const { passwordHash, ...rest } = customer;
    return rest;
  }
}
