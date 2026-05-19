import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly svc: OrdersService) {}

  @Get('track')
  track(@Query('trackingNumber') trackingNumber: string) { return this.svc.track(trackingNumber); }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Query('status') status?: string, @Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.svc.findAll({ status, limit: limit ? Number(limit) : 50, offset: offset ? Number(offset) : 0 });
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number) { return this.svc.findOne(id); }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any) { return this.svc.update(id, body); }
}
