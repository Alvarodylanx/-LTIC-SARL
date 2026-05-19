import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { DB_TOKEN } from "../db/db.module";
import { adminProfile } from "@ltic/db";

@Injectable()
export class AdminProfileService {
  constructor(@Inject(DB_TOKEN) private db: any) {}

  async getProfile() {
    const profile = await this.ensureProfile();
    const { passwordHash, ...rest } = profile;
    return rest;
  }

  async updateProfile(body: { name?: string; email?: string }) {
    const profile = await this.ensureProfile();
    const [updated] = await this.db
      .update(adminProfile)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(adminProfile.id, profile.id))
      .returning();
    const { passwordHash, ...rest } = updated;
    return rest;
  }

  async changePassword(currentPassword: string, newPassword: string) {
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

    const passwordHash = await bcrypt.hash(newPassword, 10);
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

  /**
   * Validates email + password against the admin_profile row.
   * Falls back to ADMIN_PASSWORD env var if no passwordHash is set yet.
   */
  async validateCredentials(email: string, password: string): Promise<boolean> {
    const profile = await this.ensureProfile();
    const rows = await this.db.select().from(adminProfile).where(eq(adminProfile.id, profile.id)).limit(1);
    const row = rows[0];

    // Email must match (case-insensitive)
    if (row.email.toLowerCase() !== email.toLowerCase()) return false;

    // Password check
    if (row.passwordHash) {
      return bcrypt.compare(password, row.passwordHash);
    }
    // Fallback to env var before a password has been set via UI
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
