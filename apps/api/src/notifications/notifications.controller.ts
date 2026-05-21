import { Controller, Get, Patch, Delete, Param, UseGuards, ParseIntPipe, Sse, MessageEvent } from '@nestjs/common';
import { Observable } from 'rxjs';
import { NotificationsService } from './notifications.service';
import { AuthGuard } from '../auth/auth.guard';
import { SseAuthGuard } from '../auth/sse-auth.guard';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly svc: NotificationsService) {}

  @UseGuards(SseAuthGuard)
  @Sse('stream')
  stream(): Observable<MessageEvent> {
    return this.svc.getStream();
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() { return this.svc.findAll(); }

  @UseGuards(AuthGuard)
  @Get('unread-count')
  unreadCount() { return this.svc.countUnread().then(count => ({ count })); }

  @UseGuards(AuthGuard)
  @Patch('read-all')
  markAllRead() { return this.svc.markAllRead().then(() => ({ success: true })); }

  @UseGuards(AuthGuard)
  @Patch(':id/read')
  markRead(@Param('id', ParseIntPipe) id: number) { return this.svc.markRead(id).then(() => ({ success: true })); }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) { return this.svc.delete(id).then(() => ({ success: true })); }
}
