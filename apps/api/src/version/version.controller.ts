import { Controller, Get, Post, Body, UseGuards } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import { AuthGuard } from "../auth/auth.guard";

const CHANGELOG_PATH = path.resolve(__dirname, "../../../../version.json");

function readChangelog() {
  try {
    const raw = fs.readFileSync(CHANGELOG_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { version: "0.0.0", releaseDate: new Date().toISOString().slice(0, 10), changelog: [] };
  }
}

function writeChangelog(data: any) {
  fs.writeFileSync(CHANGELOG_PATH, JSON.stringify(data, null, 2), "utf-8");
}

@Controller("version")
export class VersionController {
  @Get()
  getVersion() {
    return readChangelog();
  }

  @UseGuards(AuthGuard)
  @Post("release")
  createRelease(
    @Body()
    body: {
      type: "major" | "minor" | "patch";
      summary: string;
      changes: { type: "feature" | "fix" | "improvement" | "breaking"; description: string }[];
    }
  ) {
    const data = readChangelog();
    const [major, minor, patch] = data.version.split(".").map(Number);

    let nextVersion: string;
    if (body.type === "major") nextVersion = `${major + 1}.0.0`;
    else if (body.type === "minor") nextVersion = `${major}.${minor + 1}.0`;
    else nextVersion = `${major}.${minor}.${patch + 1}`;

    const newEntry = {
      version: nextVersion,
      date: new Date().toISOString().slice(0, 10),
      type: body.type,
      summary: body.summary,
      changes: body.changes,
    };

    data.version = nextVersion;
    data.releaseDate = newEntry.date;
    data.changelog = [newEntry, ...data.changelog];

    writeChangelog(data);
    return { success: true, version: nextVersion, entry: newEntry };
  }
}
