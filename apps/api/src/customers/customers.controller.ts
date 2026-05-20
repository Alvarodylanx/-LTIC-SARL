import {
  Controller, Post, Get, Patch, Body, Req, UseGuards,
  UseInterceptors, UploadedFile, BadRequestException
} from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as path from "path";
import * as fs from "fs";
import { Inject } from "@nestjs/common";
import { fromFile } from "file-type";
import { eq } from "drizzle-orm";
import { CustomersService } from "./customers.service";
import { CustomerGuard } from "./customer.guard";
import { DB_TOKEN } from "../db/db.module";
import { orders, quotes } from "@ltic/db";

const uploadsDir = path.join(__dirname, "../../../../uploads");

@Controller("customers")
export class CustomersController {
  constructor(
    private customersService: CustomersService,
    @Inject(DB_TOKEN) private db: any,
  ) {}

  @Post("register")
  register(
    @Body() body: {
      fullName: string;
      email: string;
      password: string;
      phone?: string;
      country?: string;
    }
  ) {
    if (!body.fullName || !body.email || !body.password) {
      throw new BadRequestException("fullName, email, and password are required");
    }
    return this.customersService.register(body);
  }

  @Post("login")
  @Throttle({ login: {} })
  login(@Body() body: { email: string; password: string }) {
    if (!body.email || !body.password) {
      throw new BadRequestException("email and password are required");
    }
    return this.customersService.login(body.email, body.password);
  }

  @UseGuards(CustomerGuard)
  @Get("me")
  getProfile(@Req() req: any) {
    return this.customersService.getProfile(req.customer.sub);
  }

  @UseGuards(CustomerGuard)
  @Patch("me")
  updateProfile(
    @Req() req: any,
    @Body() body: { fullName?: string; phone?: string; country?: string; company?: string }
  ) {
    return this.customersService.updateProfile(req.customer.sub, body);
  }

  @UseGuards(CustomerGuard)
  @Patch("me/password")
  changePassword(
    @Req() req: any,
    @Body() body: { currentPassword: string; newPassword: string }
  ) {
    if (!body.currentPassword || !body.newPassword) {
      throw new BadRequestException("currentPassword and newPassword are required");
    }
    return this.customersService.changePassword(req.customer.sub, body.currentPassword, body.newPassword);
  }

  @UseGuards(CustomerGuard)
  @Post("me/avatar")
  @UseInterceptors(
    FileInterceptor("avatar", {
      storage: diskStorage({
        destination: (req, file, cb) => {
          if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
          cb(null, uploadsDir);
        },
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          cb(null, `customer-${Date.now()}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowed.includes(file.mimetype)) {
          return cb(new BadRequestException("Only JPG, PNG, GIF, or WebP images are allowed"), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    })
  )
  async uploadAvatar(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException("No file uploaded");
    const detected = await fromFile(file.path);
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!detected || !allowedMimes.includes(detected.mime)) {
      fs.unlinkSync(file.path);
      throw new BadRequestException("Invalid image file content");
    }
    const avatarUrl = `/uploads/${file.filename}`;
    return this.customersService.updateAvatar(req.customer.sub, avatarUrl);
  }

  @UseGuards(CustomerGuard)
  @Get("me/orders")
  async getMyOrders(@Req() req: any) {
    const profile = await this.customersService.getProfile(req.customer.sub);
    return this.db
      .select()
      .from(orders)
      .where(eq(orders.clientEmail, profile.email))
      .orderBy(orders.createdAt);
  }

  @UseGuards(CustomerGuard)
  @Get("me/quotes")
  async getMyQuotes(@Req() req: any) {
    const profile = await this.customersService.getProfile(req.customer.sub);
    return this.db
      .select()
      .from(quotes)
      .where(eq(quotes.email, profile.email))
      .orderBy(quotes.createdAt);
  }
}
