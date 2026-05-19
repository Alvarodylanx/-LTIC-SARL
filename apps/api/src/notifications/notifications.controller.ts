import { Controller, Get, Patch, Delete, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('notifications')
@UseGuards(AuthGuard)
export class NotificationsController {
  constructor(private readonly svc: NotificationsService) {}

  @Get()
  findAll() { return this.svc.findAll(); }

  @Get('unread-count')
  unreadCount() { return this.svc.countUnread().then(count => ({ count })); }

  @Patch('read-all')
  markAllRead() { return this.svc.markAllRead().then(() => ({ success: true })); }

  @Patch(':id/read')
  markRead(@Param('id', ParseIntPipe) id: number) { return this.svc.markRead(id).then(() => ({ success: true })); }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) { return this.svc.delete(id).then(() => ({ success: true })); }
}
