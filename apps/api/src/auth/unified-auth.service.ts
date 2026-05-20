import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { DB_TOKEN } from "../db/db.module";
import { adminProfile, customers } from "@ltic/db";
import { LoginAttemptsService } from "./login-attempts.service";

@Injectable()
export class UnifiedAuthService {
  constructor(
    @Inject(DB_TOKEN) private db: any,
    private jwtService: JwtService,
    private loginAttempts: LoginAttemptsService,
  ) {}

  async login(email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase();

    this.loginAttempts.check(normalizedEmail);

    // ── 1. Check admin_profile ────────────────────────────────────────────────
    const adminRows = await this.db.select().from(adminProfile).limit(1);
    if (adminRows.length > 0) {
      const admin = adminRows[0];
      if (admin.email.toLowerCase() === normalizedEmail) {
        const valid = admin.passwordHash
          ? await bcrypt.compare(password, admin.passwordHash)
          : password === process.env.ADMIN_PASSWORD;

        if (valid) {
          this.loginAttempts.clearAttempts(normalizedEmail);
          const token = await this.jwtService.signAsync(
            { email: admin.email, role: "admin" },
            { secret: process.env.SESSION_SECRET!, expiresIn: "24h" },
          );
          return {
            role: "admin",
            token,
            user: { name: admin.name, email: admin.email },
          };
        }
        this.loginAttempts.recordFailure(normalizedEmail);
        throw new UnauthorizedException("Invalid email or password");
      }
    }

    // ── 2. Check customers table ──────────────────────────────────────────────
    const [customer] = await this.db
      .select()
      .from(customers)
      .where(eq(customers.email, normalizedEmail))
      .limit(1);

    if (customer) {
      const valid = await bcrypt.compare(password, customer.passwordHash);
      if (!valid) {
        this.loginAttempts.recordFailure(normalizedEmail);
        throw new UnauthorizedException("Invalid email or password");
      }

      this.loginAttempts.clearAttempts(normalizedEmail);
      const token = await this.jwtService.signAsync(
        { sub: customer.id, email: customer.email, role: "customer" },
        { secret: process.env.SESSION_SECRET!, expiresIn: "7d" },
      );
      return {
        role: "customer",
        token,
        user: { name: customer.fullName, email: customer.email },
      };
    }

    this.loginAttempts.recordFailure(normalizedEmail);
    throw new UnauthorizedException("Invalid email or password");
  }
}
