import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { QuotesService } from './quotes.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly svc: QuotesService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Query('status') status?: string, @Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.svc.findAll({ status, limit: limit ? Number(limit) : 50, offset: offset ? Number(offset) : 0 });
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number) { return this.svc.findOne(id); }

  @Post()
  @Throttle({ form: {} })
  create(@Body() body: any) { return this.svc.create(body); }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any) { return this.svc.update(id, body); }
}
