import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { AuthGuard } from "../auth/auth.guard";

@Controller("products")
export class ProductsController {
  constructor(private svc: ProductsService) {}

  @Get("featured")
  getFeatured() { return this.svc.findFeatured(); }

  @Get()
  findAll(@Query() q: any) { return this.svc.findAll(q); }

  @Get(":id")
  findOne(@Param("id") id: string) { return this.svc.findOne(isNaN(+id) ? id : +id); }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() body: any) { return this.svc.create(body); }

  @UseGuards(AuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() body: any) { return this.svc.update(+id, body); }

  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) { return this.svc.remove(+id); }
}
