import { Module } from "@nestjs/common";
import { CustomersController } from "./customers.controller";
import { CustomersService } from "./customers.service";
import { LoginAttemptsService } from "../auth/login-attempts.service";
import { MailService } from "../mail/mail.service";

@Module({
  controllers: [CustomersController],
  providers: [CustomersService, LoginAttemptsService, MailService],
  exports: [CustomersService],
})
export class CustomersModule {}
