import { Injectable, UnauthorizedException } from "@nestjs/common";

interface AttemptRecord {
  count: number;
  lockedUntil: number;
}

const LOCKOUT_THRESHOLD = 10;
const LOCKOUT_DURATION_MS = 5 * 60 * 1000; // 5 minutes
const WINDOW_MS = 15 * 60 * 1000;          // 15-minute window

@Injectable()
export class LoginAttemptsService {
  private readonly attempts = new Map<string, AttemptRecord>();

  check(key: string): void {
    const entry = this.attempts.get(key);
    if (!entry) return;
    if (entry.lockedUntil > Date.now()) {
      const minutesLeft = Math.ceil((entry.lockedUntil - Date.now()) / 60000);
      throw new UnauthorizedException(
        `Account temporarily locked due to too many failed attempts. Try again in ${minutesLeft} minute(s).`
      );
    }
    // Clear expired window
    if (Date.now() - (entry.lockedUntil - LOCKOUT_DURATION_MS) > WINDOW_MS) {
      this.attempts.delete(key);
    }
  }

  recordFailure(key: string): void {
    const entry = this.attempts.get(key) ?? { count: 0, lockedUntil: 0 };
    entry.count++;
    if (entry.count >= LOCKOUT_THRESHOLD) {
      entry.lockedUntil = Date.now() + LOCKOUT_DURATION_MS;
    }
    this.attempts.set(key, entry);
  }

  clearAttempts(key: string): void {
    this.attempts.delete(key);
  }
}
