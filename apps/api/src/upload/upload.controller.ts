import {
  Controller, Post, UseGuards, UseInterceptors,
  UploadedFile, BadRequestException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as path from "path";
import * as fs from "fs";
import { AuthGuard } from "../auth/auth.guard";

const MEDIA_DIR = path.join(__dirname, "../../../../uploads/media");
const MAX_SIZE = 100 * 1024 * 1024; // 100 MB
const ALLOWED_EXT = /\.(jpg|jpeg|png|gif|webp|svg|mp4|mov|avi|mkv|webm)$/i;

@Controller("upload")
export class UploadController {
  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          if (!fs.existsSync(MEDIA_DIR)) fs.mkdirSync(MEDIA_DIR, { recursive: true });
          cb(null, MEDIA_DIR);
        },
        filename: (_req, file, cb) => {
          const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, unique + path.extname(file.originalname).toLowerCase());
        },
      }),
      limits: { fileSize: MAX_SIZE },
      fileFilter: (_req, file, cb) => {
        if (!ALLOWED_EXT.test(path.extname(file.originalname))) {
          return cb(
            new BadRequestException("Only images (JPG, PNG, GIF, WebP, SVG) and videos (MP4, MOV, AVI, MKV, WebM) are allowed"),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException("No file provided");
    return { url: `/uploads/media/${file.filename}` };
  }
}
