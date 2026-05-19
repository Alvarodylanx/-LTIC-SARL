import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { DB_TOKEN } from "../db/db.module";
import { adminProfile } from "@ltic/db";

@Injectable()
export class AdminProfileService {
  constructor(@Inject(DB_TOKEN) private db: any) {}

  async getProfile() {
    const rows = await this.db.select().from(adminProfile).limit(1);
    if (rows.length === 0) {
      const [created] = await this.db
        .insert(adminProfile)
        .values({ name: "Administrator", email: process.env.ADMIN_USERNAME || "admin@ltic-sarl.com" })
        .returning();
      const { passwordHash, ...rest } = created;
      return rest;
    }
    const { passwordHash, ...rest } = rows[0];
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

  private async ensureProfile() {
    const rows = await this.db.select().from(adminProfile).limit(1);
    if (rows.length === 0) {
      const [created] = await this.db
        .insert(adminProfile)
        .values({ name: "Administrator", email: process.env.ADMIN_USERNAME || "admin@ltic-sarl.com" })
        .returning();
      return created;
    }
    return rows[0];
  }
}
