import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api/settings')
export class SettingsController {
  constructor(private readonly svc: SettingsService) {}

  @Get()
  findAll() { return this.svc.findAll(); }

  @Patch()
  @UseGuards(AuthGuard)
  update(@Body() body: Record<string, string>) { return this.svc.update(body); }
}
