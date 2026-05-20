import { Module } from "@nestjs/common";
import { UnifiedAuthController } from "./unified-auth.controller";
import { UnifiedAuthService } from "./unified-auth.service";
import { LoginAttemptsService } from "./login-attempts.service";

@Module({
  controllers: [UnifiedAuthController],
  providers: [UnifiedAuthService, LoginAttemptsService],
})
export class UnifiedAuthModule {}
