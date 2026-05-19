import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [NotificationsModule],
  controllers: [ContactsController],
  providers: [ContactsService, MailService],
})
export class ContactsModule {}
