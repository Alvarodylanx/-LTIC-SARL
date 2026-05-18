import { Controller, Post, Get, Body, Req, Res, UseGuards, HttpCode } from '@nestjs/common';
import { Request, Response } from 'express';
import { z } from 'zod';
import { AuthGuard, storeToken, removeToken, isValidToken } from '../auth/auth.guard';
import { randomBytes } from 'crypto';

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

@Controller('api/admin')
export class AdminController {
  @Post('login')
  @HttpCode(200)
  login(@Body() body: any, @Req() req: Request) {
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return { authenticated: false, error: 'Invalid input' };
    }

    const { username, password } = parsed.data;
    const expectedUser = process.env.ADMIN_USERNAME || 'admin';
    const expectedPass = process.env.ADMIN_PASSWORD || 'ltic2024!';

    if (username !== expectedUser || password !== expectedPass) {
      return { authenticated: false, error: 'Invalid credentials' };
    }

    const token = randomBytes(32).toString('hex');
    storeToken(token, username);

    const session = (req as any).session;
    if (session) {
      session.authenticated = true;
      session.username = username;
    }

    return { authenticated: true, username, token };
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  logout(@Req() req: Request) {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      removeToken(authHeader.slice(7));
    }
    const session = (req as any).session;
    if (session) session.destroy?.(() => {});
    return { authenticated: false };
  }

  @Get('me')
  me(@Req() req: Request) {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      const username = isValidToken(authHeader.slice(7));
      if (username) return { authenticated: true, username };
    }
    const session = (req as any).session;
    if (session?.authenticated) return { authenticated: true, username: session.username };
    return { authenticated: false };
  }
}
