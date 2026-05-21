import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const cookieToken: string | undefined = request.cookies?.admin_jwt;
    const authHeader: string | undefined = request.headers["authorization"];
    const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : undefined;
    const token = cookieToken || bearerToken;

    if (!token) {
      throw new UnauthorizedException("No token provided");
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SESSION_SECRET,
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
