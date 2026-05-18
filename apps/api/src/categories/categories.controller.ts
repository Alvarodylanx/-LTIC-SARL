import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly svc: CategoriesService) {}

  @Get()
  findAll() { return this.svc.findAll(); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.svc.findOne(id); }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() body: any) { return this.svc.create(body); }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any) { return this.svc.update(id, body); }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) { return this.svc.remove(id); }
}
