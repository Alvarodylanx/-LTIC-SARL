import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ContactsService } from './contacts.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly svc: ContactsService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Query('read') read?: string, @Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.svc.findAll({ read: read === 'true' ? true : read === 'false' ? false : undefined,
      limit: limit ? Number(limit) : 50, offset: offset ? Number(offset) : 0 });
  }

  @Post()
  @Throttle({ form: {} })
  create(@Body() body: any) { return this.svc.create(body); }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any) { return this.svc.update(id, body); }
}
