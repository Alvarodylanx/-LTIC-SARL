import { Controller, Get, Patch, Param, UseGuards, Req } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { UserGuard } from '../users/user.guard';
import { UsersService } from '../users/users.service';

@Controller('api/notifications')
@UseGuards(UserGuard)
export class NotificationsController {
  constructor(
    private notificationsService: NotificationsService,
    private usersService: UsersService,
  ) {}

  @Get()
  getAll(@Req() req: any) {
    return this.notificationsService.getForUser(req.userId);
  }

  @Get('unread-count')
  unreadCount(@Req() req: any) {
    return this.notificationsService.getUnreadCount(req.userId);
  }

  @Patch(':id/read')
  markRead(@Req() req: any, @Param('id') id: string) {
    return this.notificationsService.markRead(req.userId, +id);
  }

  @Patch('mark-all-read')
  markAllRead(@Req() req: any) {
    return this.notificationsService.markAllRead(req.userId);
  }
}
