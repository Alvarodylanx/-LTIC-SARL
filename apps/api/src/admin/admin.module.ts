import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminProfileService } from "./admin-profile.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [AuthModule],
  controllers: [AdminController],
  providers: [AdminProfileService],
})
export class AdminModule {}
