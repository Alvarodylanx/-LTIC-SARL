import {
  Controller, Post, Get, Patch, Body, Req, Res, UseGuards,
  UseInterceptors, UploadedFile, BadRequestException
} from "@nestjs/common";
import { Response } from "express";
import { Throttle } from "@nestjs/throttler";
import { AuthGuard } from "../auth/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as path from "path";
import * as fs from "fs";
import { Inject } from "@nestjs/common";
import { fromFile } from "file-type";
import { eq, or } from "drizzle-orm";
import { CustomersService } from "./customers.service";
import { CustomerGuard } from "./customer.guard";
import { DB_TOKEN, Db } from "../db/db.module";
import { customers as customersTable, orders, quotes } from "@ltic/db";

const uploadsDir = path.join(__dirname, "../../../../uploads");

@Controller("customers")
export class CustomersController {
  constructor(
    private customersService: CustomersService,
    @Inject(DB_TOKEN) private db: Db,
  ) {}

  private setCookie(res: Response, token: string, maxAge: number) {
    res.cookie("customer_jwt", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge,
    });
  }

  @Post("register")
  async register(
    @Body() body: { fullName: string; email: string; password: string; phone?: string; country?: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!body.fullName || !body.email || !body.password) {
      throw new BadRequestException("fullName, email, and password are required");
    }
    const result = await this.customersService.register(body);
    this.setCookie(res, result.token, 7 * 24 * 60 * 60 * 1000);
    return { customer: result.customer };
  }

  @Post("login")
  @Throttle({ login: {} })
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!body.email || !body.password) {
      throw new BadRequestException("email and password are required");
    }
    const result = await this.customersService.login(body.email, body.password);
    this.setCookie(res, result.token, 7 * 24 * 60 * 60 * 1000);
    return { customer: result.customer };
  }

  @Post("logout")
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("customer_jwt", { path: "/" });
    return { success: true };
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
      .where(or(eq(orders.customerId, req.customer.sub), eq(orders.clientEmail, profile.email)))
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

  @UseGuards(AuthGuard)
  @Get()
  async listAll() {
    return this.db
      .select({
        id: customersTable.id,
        fullName: customersTable.fullName,
        email: customersTable.email,
        country: customersTable.country,
        company: customersTable.company,
        createdAt: customersTable.createdAt,
      })
      .from(customersTable)
      .orderBy(customersTable.createdAt);
  }
}
