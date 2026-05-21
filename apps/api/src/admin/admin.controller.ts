import {
  Controller, Post, Get, Patch, Body, Req, UseGuards,
  UnauthorizedException, UseInterceptors, UploadedFile, BadRequestException
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as path from "path";
import * as fs from "fs";
import { JwtService } from "@nestjs/jwt";
import { SkipThrottle } from "@nestjs/throttler";
import { AuthGuard } from "../auth/auth.guard";
import { AdminProfileService } from "./admin-profile.service";
import { Request } from "express";

const uploadsDir = path.join(__dirname, "../../../../uploads");

const validTokens = new Set<string>();

@SkipThrottle({ login: true, form: true })
@Controller("admin")
export class AdminController {
  constructor(
    private jwtService: JwtService,
    private adminProfileService: AdminProfileService,
  ) {}

  @Post("login")
  async login(@Body() body: { email: string; password: string }) {
    if (!body.email || !body.password) {
      throw new UnauthorizedException("Email and password are required");
    }

    const valid = await this.adminProfileService.validateCredentials(body.email, body.password);
    if (!valid) throw new UnauthorizedException("Invalid email or password");

    const token = await this.jwtService.signAsync(
      { email: body.email },
      { secret: process.env.SESSION_SECRET!, expiresIn: "24h" }
    );
    validTokens.add(token);

    return { authenticated: true, username: body.email, token };
  }

  @UseGuards(AuthGuard)
  @Post("logout")
  logout(@Req() req: Request) {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (token) validTokens.delete(token);
    return { success: true };
  }

  @UseGuards(AuthGuard)
  @Get("me")
  async me() {
    const profile = await this.adminProfileService.getProfile();
    return { authenticated: true, username: profile.name, email: profile.email };
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  getProfile() {
    return this.adminProfileService.getProfile();
  }

  @UseGuards(AuthGuard)
  @Patch("profile")
  updateProfile(@Body() body: { name?: string }) {
    return this.adminProfileService.updateProfile(body);
  }

  @UseGuards(AuthGuard)
  @Patch("profile/email")
  changeEmail(@Body() body: { email: string; currentPassword: string }) {
    if (!body.email || !body.currentPassword) {
      throw new BadRequestException("email and currentPassword are required");
    }
    return this.adminProfileService.changeEmail(body.email, body.currentPassword);
  }

  @UseGuards(AuthGuard)
  @Patch("profile/password")
  changePassword(@Body() body: { currentPassword: string; newPassword: string }) {
    if (!body.currentPassword || !body.newPassword) {
      throw new BadRequestException("currentPassword and newPassword are required");
    }
    return this.adminProfileService.changePassword(body.currentPassword, body.newPassword);
  }

  @UseGuards(AuthGuard)
  @Post("profile/avatar")
  @UseInterceptors(
    FileInterceptor("avatar", {
      storage: diskStorage({
        destination: (req, file, cb) => {
          if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
          cb(null, uploadsDir);
        },
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          cb(null, `admin-${Date.now()}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
          return cb(new BadRequestException("Only image files are allowed") as any, false);
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    })
  )
  async uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException("No file uploaded");
    const avatarUrl = `/uploads/${file.filename}`;
    return this.adminProfileService.updateAvatar(avatarUrl);
  }
}
