import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers["authorization"];

    if (!authHeader?.startsWith("Bearer ")) {
      throw new UnauthorizedException("No token provided");
    }

    const token = authHeader.split(" ")[1];
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SESSION_SECRET || "ltic-secret",
      });

      // Reject customer tokens from accessing admin routes.
      // Old admin tokens (pre-v1.7) have no role field — still accepted.
      if (payload.role && payload.role !== "admin") {
        throw new UnauthorizedException("Admin access required");
      }

      request.user = payload;
      return true;
    } catch (err: any) {
      throw new UnauthorizedException(err.message || "Invalid token");
    }
  }
}
