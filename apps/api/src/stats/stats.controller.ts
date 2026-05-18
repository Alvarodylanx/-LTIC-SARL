import { Controller, Get, UseGuards } from '@nestjs/common';
import { StatsService } from './stats.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api/stats')
export class StatsController {
  constructor(private readonly svc: StatsService) {}

  @Get('dashboard')
  @UseGuards(AuthGuard)
  dashboard() { return this.svc.getDashboard(); }
}
