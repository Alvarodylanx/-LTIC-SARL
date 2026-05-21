import { Injectable, Inject, ConflictException, UnauthorizedException, NotFoundException, BadRequestException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import * as crypto from "crypto";
import { eq } from "drizzle-orm";
import { DB_TOKEN, Db } from "../db/db.module";
import { customers } from "@ltic/db";
import { LoginAttemptsService } from "../auth/login-attempts.service";
import { MailService } from "../mail/mail.service";

@Injectable()
export class CustomersService {
  constructor(
    @Inject(DB_TOKEN) private db: Db,
    private jwtService: JwtService,
    private loginAttempts: LoginAttemptsService,
    private mail: MailService,
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
    const emailVerificationToken = crypto.randomBytes(32).toString("hex");
    const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const [customer] = await this.db
      .insert(customers)
      .values({
        fullName: body.fullName,
        email: body.email,
        passwordHash,
        phone: body.phone ?? null,
        country: body.country ?? null,
        emailVerified: false,
        emailVerificationToken,
        emailVerificationExpires,
      })
      .returning();

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const verifyUrl = `${siteUrl}/auth/verify-email?token=${emailVerificationToken}`;
    this.mail.send(body.email, "Verify Your Email — LTIC SARL", this.mail.emailVerificationEmail(verifyUrl, body.fullName)).catch(() => {});

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

  async verifyEmail(token: string) {
    const [customer] = await this.db
      .select()
      .from(customers)
      .where(eq(customers.emailVerificationToken, token))
      .limit(1);

    if (!customer) throw new BadRequestException("Invalid or expired verification link");
    if (customer.emailVerified) return { success: true };
    if (customer.emailVerificationExpires && customer.emailVerificationExpires < new Date()) {
      throw new BadRequestException("Verification link has expired");
    }

    await this.db
      .update(customers)
      .set({ emailVerified: true, emailVerificationToken: null, emailVerificationExpires: null, updatedAt: new Date() })
      .where(eq(customers.id, customer.id));

    return { success: true };
  }

  private sanitize(customer: any) {
    const { passwordHash, emailVerificationToken, emailVerificationExpires, ...rest } = customer;
    return rest;
  }
}
