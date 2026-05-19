import {
  Controller, Post, Get, Patch, Body, Req, UseGuards,
  UnauthorizedException, UseInterceptors, UploadedFile, BadRequestException
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as path from "path";
import * as fs from "fs";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "../auth/auth.guard";
import { AdminProfileService } from "./admin-profile.service";
import { Request } from "express";

const uploadsDir = path.join(__dirname, "../../../../uploads");

const validTokens = new Set<string>();

@Controller("admin")
export class AdminController {
  constructor(
    private jwtService: JwtService,
    private adminProfileService: AdminProfileService,
  ) {}

  @Post("login")
  async login(@Body() body: { username: string; password: string }) {
    const expectedUser = process.env.ADMIN_USERNAME || "admin";
    const expectedPass = process.env.ADMIN_PASSWORD || "ltic2024!";

    if (body.username !== expectedUser || body.password !== expectedPass) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const token = await this.jwtService.signAsync(
      { username: body.username },
      { secret: process.env.SESSION_SECRET || "ltic-secret", expiresIn: "24h" }
    );
    validTokens.add(token);

    return { authenticated: true, username: body.username, token };
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
  me(@Req() req: Request & { user: any }) {
    return { authenticated: true, username: req.user?.username };
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  getProfile() {
    return this.adminProfileService.getProfile();
  }

  @UseGuards(AuthGuard)
  @Patch("profile")
  updateProfile(@Body() body: { name?: string; email?: string }) {
    return this.adminProfileService.updateProfile(body);
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
