import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SseAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.query?.token as string | undefined;

    if (!token) throw new UnauthorizedException('No token provided');

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SESSION_SECRET,
      });
      if (payload.role && payload.role !== 'admin') {
        throw new UnauthorizedException('Admin access required');
      }
      request.user = payload;
      return true;
    } catch (err: any) {
      throw new UnauthorizedException(err.message || 'Invalid token');
    }
  }
}
