import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

const validTokens = new Map<string, string>();

export function storeToken(token: string, username: string) {
  validTokens.set(token, username);
}

export function removeToken(token: string) {
  validTokens.delete(token);
}

export function isValidToken(token: string): string | null {
  return validTokens.get(token) ?? null;
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      const username = isValidToken(token);
      if (username) {
        (req as any).adminUser = username;
        return true;
      }
    }

    // Check session as fallback
    const session = (req as any).session;
    if (session?.authenticated && session?.username) {
      (req as any).adminUser = session.username;
      return true;
    }

    throw new UnauthorizedException('Authentication required');
  }
}
