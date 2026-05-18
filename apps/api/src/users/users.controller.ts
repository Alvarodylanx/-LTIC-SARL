import { Controller, Post, Get, Patch, Body, Req, UseGuards, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserGuard } from './user.guard';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  register(@Body() body: { name: string; email: string; password: string; notifyProducts?: boolean; notifyNews?: boolean; notifyServices?: boolean; notifyOrders?: boolean }) {
    return this.usersService.register(body);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() body: { email: string; password: string }) {
    return this.usersService.login(body.email, body.password);
  }

  @Get('me')
  @UseGuards(UserGuard)
  me(@Req() req: any) {
    return this.usersService.findById(req.userId);
  }

  @Patch('preferences')
  @UseGuards(UserGuard)
  updatePreferences(@Req() req: any, @Body() body: { notifyProducts?: boolean; notifyNews?: boolean; notifyServices?: boolean; notifyOrders?: boolean }) {
    return this.usersService.updatePreferences(req.userId, body);
  }
}
