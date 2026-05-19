import { Module } from '@nestjs/common';
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [NotificationsModule],
  controllers: [QuotesController],
  providers: [QuotesService, MailService],
})
export class QuotesModule {}
