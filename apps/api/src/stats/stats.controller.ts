import { Controller, Get, UseGuards } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { StatsService } from './stats.service';
import { AuthGuard } from '../auth/auth.guard';

@SkipThrottle({ login: true, form: true })
@Controller('stats')
export class StatsController {
  constructor(private readonly svc: StatsService) {}

  @Get('dashboard')
  @UseGuards(AuthGuard)
  dashboard() { return this.svc.getDashboard(); }
}
