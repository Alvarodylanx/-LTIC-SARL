import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { SseAuthGuard } from '../auth/sse-auth.guard';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, SseAuthGuard],
  exports: [NotificationsService],
})
export class NotificationsModule {}
