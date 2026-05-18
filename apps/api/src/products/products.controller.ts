import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly svc: ProductsService) {}

  @Get('featured')
  featured() { return this.svc.findFeatured(); }

  @Get()
  findAll(@Query('categoryId') categoryId?: string, @Query('search') search?: string,
    @Query('limit') limit?: string, @Query('offset') offset?: string) {
    return this.svc.findAll({
      categoryId: categoryId ? Number(categoryId) : undefined,
      search, limit: limit ? Number(limit) : 50, offset: offset ? Number(offset) : 0,
    });
  }

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
