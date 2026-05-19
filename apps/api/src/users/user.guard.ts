import { Injectable, CanActivate } from '@nestjs/common';

@Injectable()
export class UserGuard implements CanActivate {
  canActivate(): boolean {
    return false;
  }
}
