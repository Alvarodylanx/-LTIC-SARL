import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { PartnersService } from './partners.service';
import { NewPartner, Partner } from '@ltic/db';
import { AuthGuard } from '../auth/auth.guard';

@SkipThrottle({ login: true, form: true })
@Controller('partners')
export class PartnersController {
  constructor(private readonly svc: PartnersService) {}

  @Get()
  findActive() { return this.svc.findActive(); }

  @Get('all')
  @UseGuards(AuthGuard)
  findAll() { return this.svc.findAll(); }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() body: NewPartner) { return this.svc.create(body); }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() body: Partial<Partner>) { return this.svc.update(id, body); }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) { return this.svc.remove(id); }
}
