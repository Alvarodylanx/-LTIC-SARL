import { Module } from "@nestjs/common";
import { CustomersController } from "./customers.controller";
import { CustomersService } from "./customers.service";
import { LoginAttemptsService } from "../auth/login-attempts.service";

@Module({
  controllers: [CustomersController],
  providers: [CustomersService, LoginAttemptsService],
  exports: [CustomersService],
})
export class CustomersModule {}
