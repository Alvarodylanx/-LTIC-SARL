import { Controller, Post, Body, BadRequestException } from "@nestjs/common";
import { UnifiedAuthService } from "./unified-auth.service";

@Controller("auth")
export class UnifiedAuthController {
  constructor(private readonly svc: UnifiedAuthService) {}

  @Post("login")
  login(@Body() body: { email: string; password: string }) {
    if (!body.email?.trim() || !body.password) {
      throw new BadRequestException("Email and password are required");
    }
    return this.svc.login(body.email, body.password);
  }
}
