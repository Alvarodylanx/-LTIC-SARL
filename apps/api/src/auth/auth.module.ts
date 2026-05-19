import { Module } from "@nestjs/common";
import { JwtStrategy } from "./jwt.strategy";
import { AuthGuard } from "./auth.guard";

@Module({
  providers: [JwtStrategy, AuthGuard],
  exports: [JwtStrategy, AuthGuard],
})
export class AuthModule {}
