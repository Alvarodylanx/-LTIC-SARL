import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class CustomerGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const cookieToken: string | undefined = request.cookies?.customer_jwt;
    const authHeader: string | undefined = request.headers["authorization"];
    const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : undefined;
    const token = cookieToken || bearerToken;

    if (!token) throw new UnauthorizedException("No token provided");

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SESSION_SECRET!,
      });
      if (payload.role !== "customer") throw new Error("Not a customer token");
      request.customer = payload;
      return true;
    } catch {
      throw new UnauthorizedException("Invalid token");
    }
  }
}
