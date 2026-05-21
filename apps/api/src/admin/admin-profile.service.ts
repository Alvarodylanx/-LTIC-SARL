import { Injectable, Inject, UnauthorizedException, BadRequestException, OnModuleInit } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { DB_TOKEN, Db } from "../db/db.module";
import { adminProfile } from "@ltic/db";

@Injectable()
export class AdminProfileService implements OnModuleInit {
  constructor(@Inject(DB_TOKEN) private db: Db) {}

  /** Migrate legacy admin_profile rows that stored a username instead of an email. */
  async onModuleInit() {
    const rows = await this.db.select().from(adminProfile).limit(1);
    if (rows.length > 0 && !rows[0].email.includes("@")) {
      const correctEmail = process.env.ADMIN_EMAIL || "admin@ltic-sarl.com";
      await this.db
        .update(adminProfile)
        .set({ email: correctEmail, updatedAt: new Date() })
        .where(eq(adminProfile.id, rows[0].id));
    }
  }

  async getProfile() {
    const profile = await this.ensureProfile();
    const { passwordHash, ...rest } = profile;
    return rest;
  }

  async updateProfile(body: { name?: string }) {
    const profile = await this.ensureProfile();
    const [updated] = await this.db
      .update(adminProfile)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(adminProfile.id, profile.id))
      .returning();
    const { passwordHash, ...rest } = updated;
    return rest;
  }

  /** Change email — requires current password verification */
  async changeEmail(newEmail: string, currentPassword: string) {
    if (!newEmail?.trim()) throw new BadRequestException("Email is required");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(newEmail)) throw new BadRequestException("Invalid email format");

    const profile = await this.ensureProfile();
    const rows = await this.db.select().from(adminProfile).where(eq(adminProfile.id, profile.id)).limit(1);
    const row = rows[0];

    // Verify current password
    if (row.passwordHash) {
      const valid = await bcrypt.compare(currentPassword, row.passwordHash);
      if (!valid) throw new UnauthorizedException("Current password is incorrect");
    } else {
      const envPass = process.env.ADMIN_PASSWORD || "ltic2024!";
      if (currentPassword !== envPass) throw new UnauthorizedException("Current password is incorrect");
    }

    const [updated] = await this.db
      .update(adminProfile)
      .set({ email: newEmail.trim().toLowerCase(), updatedAt: new Date() })
      .where(eq(adminProfile.id, profile.id))
      .returning();

    const { passwordHash, ...rest } = updated;
    return rest;
  }

  async changePassword(currentPassword: string, newPassword: string) {
    if (newPassword.length < 8) throw new BadRequestException("Password must be at least 8 characters");

    const profile = await this.ensureProfile();
    const rows = await this.db.select().from(adminProfile).where(eq(adminProfile.id, profile.id)).limit(1);
    const row = rows[0];

    if (row.passwordHash) {
      const valid = await bcrypt.compare(currentPassword, row.passwordHash);
      if (!valid) throw new UnauthorizedException("Current password is incorrect");
    } else {
      const envPass = process.env.ADMIN_PASSWORD || "ltic2024!";
      if (currentPassword !== envPass) throw new UnauthorizedException("Current password is incorrect");
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);
    await this.db
      .update(adminProfile)
      .set({ passwordHash, updatedAt: new Date() })
      .where(eq(adminProfile.id, profile.id));

    return { success: true };
  }

  async updateAvatar(avatarUrl: string) {
    const profile = await this.ensureProfile();
    const [updated] = await this.db
      .update(adminProfile)
      .set({ avatarUrl, updatedAt: new Date() })
      .where(eq(adminProfile.id, profile.id))
      .returning();
    const { passwordHash, ...rest } = updated;
    return rest;
  }

  async validateCredentials(email: string, password: string): Promise<boolean> {
    const profile = await this.ensureProfile();
    const rows = await this.db.select().from(adminProfile).where(eq(adminProfile.id, profile.id)).limit(1);
    const row = rows[0];
    if (row.email.toLowerCase() !== email.toLowerCase()) return false;
    if (row.passwordHash) return bcrypt.compare(password, row.passwordHash);
    const envPass = process.env.ADMIN_PASSWORD || "ltic2024!";
    return password === envPass;
  }

  private async ensureProfile() {
    const rows = await this.db.select().from(adminProfile).limit(1);
    if (rows.length === 0) {
      const defaultEmail = process.env.ADMIN_EMAIL || "admin@ltic-sarl.com";
      const [created] = await this.db
        .insert(adminProfile)
        .values({ name: "Administrator", email: defaultEmail })
        .returning();
      return created;
    }
    return rows[0];
  }
}
