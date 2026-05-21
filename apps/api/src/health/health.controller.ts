import { Controller, Get } from "@nestjs/common";
import { SkipThrottle } from "@nestjs/throttler";

@SkipThrottle({ login: true, form: true })
@Controller("health")
export class HealthController {
  @Get()
  check() {
    return { status: "ok" };
  }
}
