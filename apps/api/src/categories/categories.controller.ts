import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { AuthGuard } from "../auth/auth.guard";

@Controller("categories")
export class CategoriesController {
  constructor(private svc: CategoriesService) {}

  @Get()
  findAll() { return this.svc.findAll(); }

  @Get(":id")
  findOne(@Param("id") id: string) { return this.svc.findOne(+id); }

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
